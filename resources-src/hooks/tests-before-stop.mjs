#!/usr/bin/env node
// Hook: tests-before-stop
// Event: Stop (and optionally SubagentStop)
// If source files were edited in this session and no full test run happened after the last
// edit, Claude is not allowed to finish yet: it is told which command to run.
// Reads the session transcript; detects Maven, Gradle, npm/pnpm/yarn, pytest, dotnet test.
// Never loops: if Claude was already blocked once (stop_hook_active), it lets it stop.
// Node 18+, no dependencies.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function readInput() {
  try { return JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { return {}; }
}

const SOURCE = /\.(java|kt|ts|tsx|js|jsx|py|cs|go)$/i;
const TEST_RUN = [
  /\bmvnw?(\.cmd)?\b.*(?<![\w.=-])(test|verify)(?![\w-])/,
  /\bgradlew?(\.bat)?\b.*\btest\b/,
  /\b(npm|pnpm|yarn)\s+(run\s+)?test\b/,
  /\b(npx\s+)?(vitest|jest)\b(?!.*\s-t\s)/,
  /\b(python\s+-m\s+)?pytest\b/,
  /\bdotnet\s+test\b/,
  /\bgo\s+test\b/,
];
const PARTIAL = /-Dtest=|-DskipTests|--testNamePattern|\s-k\s|--filter/;

const input = readInput();
if (input.stop_hook_active) process.exit(0);
const transcript = input.agent_transcript_path || input.transcript_path;
if (!transcript || !existsSync(transcript)) process.exit(0);

let lastEdit = null;
let tested = true;
for (const line of readFileSync(transcript, 'utf8').split(/\r?\n/)) {
  if (!line.trim()) continue;
  let entry; try { entry = JSON.parse(line); } catch { continue; }
  const content = entry?.message?.content;
  if (!Array.isArray(content)) continue;
  for (const use of content.filter((c) => c?.type === 'tool_use')) {
    const a = use.input || {};
    const target = String(a.file_path || '');
    if (/^(Edit|Write|MultiEdit)$/.test(use.name) && SOURCE.test(target)) { lastEdit = target; tested = false; }
    if (/^(Bash|PowerShell)$/.test(use.name)) {
      const cmd = String(a.command || '');
      if (TEST_RUN.some((re) => re.test(cmd)) && !PARTIAL.test(cmd)) tested = true;
    }
  }
}

if (lastEdit && !tested) {
  const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
  const has = (p) => existsSync(join(root, p));
  const suggest = has('pom.xml') ? 'mvn -q test' : has('build.gradle') || has('build.gradle.kts') ? 'gradle test'
    : has('package.json') ? 'npm test' : has('pyproject.toml') ? 'pytest' : 'the project test command';
  process.stdout.write(JSON.stringify({
    decision: 'block',
    reason: `Source changed (last: ${lastEdit}) but the full test suite hasn't run since. Run "${suggest}" and report the result before finishing.`,
  }));
}
process.exit(0);
