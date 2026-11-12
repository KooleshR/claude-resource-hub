#!/usr/bin/env node
// Hook: compile-check
// Event: PostToolUse   Matcher: Edit|Write|MultiEdit
// After Claude edits source code, compiles / type-checks the project and sends errors straight
// back to Claude so it fixes them before moving on.
//   .java          -> mvn -q compile (or test-compile for src/test) / gradle compileJava
//   .ts/.tsx       -> npx tsc --noEmit (if tsconfig.json exists)
//   .astro         -> npx astro check
//   .cs            -> dotnet build --nologo -v q
// Exit 2 = errors are shown to Claude (the edit already happened; Claude is asked to fix it).
// Node 18+, no dependencies.

import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { spawnSync } from 'node:child_process';

function readInput() {
  try { return JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { return {}; }
}

const input = readInput();
const file = String((input.tool_input || {}).file_path || '').replace(/\\/g, '/');
const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const has = (p) => existsSync(join(root, p));
const isWin = process.platform === 'win32';
const ext = extname(file).toLowerCase();
const bin = (name) => (isWin ? `${name}.cmd` : name);

let check = null;
if (ext === '.java' && has('pom.xml')) {
  check = [bin(has('mvnw') ? 'mvnw' : 'mvn'), ['-q', file.includes('/src/test/') ? 'test-compile' : 'compile']];
} else if (ext === '.java' && (has('build.gradle') || has('build.gradle.kts'))) {
  check = [has('gradlew') ? (isWin ? 'gradlew.bat' : './gradlew') : 'gradle', ['-q', 'compileJava']];
} else if (['.ts', '.tsx'].includes(ext) && has('tsconfig.json')) {
  check = [bin('npx'), ['--no-install', 'tsc', '--noEmit', '--pretty', 'false']];
} else if (ext === '.astro') {
  check = [bin('npx'), ['--no-install', 'astro', 'check']];
} else if (ext === '.cs') {
  check = ['dotnet', ['build', '--nologo', '-v', 'q']];
}
if (!check) process.exit(0);

const [cmd, args] = check;
const r = spawnSync(cmd, args, { cwd: root, encoding: 'utf8', timeout: 280_000, shell: isWin });
if (r.error) process.exit(0); // tool not installed: stay quiet rather than nag
if (r.status !== 0) {
  const out = `${r.stdout || ''}\n${r.stderr || ''}`.trim().split(/\r?\n/)
    .filter((l) => /error|ERROR|\.java:|\.tsx?\(|\.astro:|\.cs\(/.test(l))
    .filter((l) => !/^\[ERROR\]\s*(->|To see|Re-run|For more|\[Help|$)/.test(l.trim()))
    .filter((l, i, all) => all.indexOf(l) === i).slice(0, 25).join('\n');
  process.stderr.write(`compile-check: "${cmd} ${args.join(' ')}" failed after editing ${file}.\n${out || 'See build output.'}\nFix these errors before continuing.\n`);
  process.exit(2);
}
process.exit(0);
