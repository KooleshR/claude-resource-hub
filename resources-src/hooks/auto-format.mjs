#!/usr/bin/env node
// Hook: auto-format
// Event: PostToolUse   Matcher: Edit|Write|MultiEdit
// After Claude edits a file, runs the project's formatter on THAT file only.
// Picks the formatter by extension and only if the project actually uses it, so it never
// installs anything. Formatting failures are reported to Claude but never block (exit 0).
// Node 18+, no dependencies.

import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { spawnSync } from 'node:child_process';

function readInput() {
  try { return JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { return {}; }
}

const input = readInput();
const file = String((input.tool_input || {}).file_path || '');
const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
if (!file || !existsSync(file)) process.exit(0);

const has = (p) => existsSync(join(root, p));
const pkg = (() => { try { return readFileSync(join(root, 'package.json'), 'utf8'); } catch { return ''; } })();
const isWin = process.platform === 'win32';
const ext = extname(file).toLowerCase();

// [condition, command, args]
const FORMATTERS = [
  [/\.(js|jsx|ts|tsx|mjs|cjs|json|css|scss|html|md|astro|vue|svelte|ya?ml)$/.test(ext) && /"prettier"/.test(pkg),
    isWin ? 'npx.cmd' : 'npx', ['--no-install', 'prettier', '--write', file]],
  [ext === '.java' && has('pom.xml') && /spotless/.test(safeRead('pom.xml')),
    isWin ? 'mvn.cmd' : 'mvn', ['-q', 'spotless:apply', `-DspotlessFiles=${file.replace(/\\/g, '/')}`]],
  [ext === '.cs', 'dotnet', ['format', 'whitespace', '--include', file]],
  [ext === '.py' && (has('pyproject.toml') || has('ruff.toml')), 'ruff', ['format', file]],
  [ext === '.go', 'gofmt', ['-w', file]],
];

function safeRead(p) { try { return readFileSync(join(root, p), 'utf8'); } catch { return ''; } }

const match = FORMATTERS.find(([ok]) => ok);
if (!match) process.exit(0);

const [, cmd, args] = match;
const r = spawnSync(cmd, args, { cwd: root, encoding: 'utf8', timeout: 60_000, shell: isWin });
if (r.error || r.status !== 0) {
  // Report, but don't block: a missing formatter shouldn't stop the work.
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PostToolUse',
      additionalContext: `auto-format: "${cmd} ${args.join(' ')}" failed: ${(r.stderr || r.error?.message || '').slice(0, 300)}`,
    },
  }));
}
process.exit(0);
