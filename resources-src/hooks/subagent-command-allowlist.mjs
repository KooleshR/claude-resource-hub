#!/usr/bin/env node
// Hook: subagent-command-allowlist
// Event: PreToolUse   Matcher: Bash|PowerShell   Wired in: a sub-agent's frontmatter `hooks:`
// Restricts what shell commands a specific sub-agent may run. A read-only reviewer, for example,
// should be able to run `git diff` and the tests, but never `git commit` or `npm install`.
//
// Usage (in .claude/agents/<agent>.md frontmatter):
//   hooks:
//     PreToolUse:
//       - matcher: "Bash|PowerShell"
//         hooks:
//           - type: command
//             command: node "${CLAUDE_PROJECT_DIR}/.claude/hooks/subagent-command-allowlist.mjs" reviewer
//
// Profiles are defined below; add your own. Exit 2 = block, stderr goes to the sub-agent.
// Node 18+, no dependencies.

import { readFileSync } from 'node:fs';

function readInput() {
  try { return JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { return {}; }
}

const READ_GIT = /^git\s+(status|diff|log|show|blame|rev-parse|branch\s+--show-current|ls-files)\b/;
const PROFILES = {
  // Reads code and history only.
  reviewer: [READ_GIT, /^(rg|grep|ls|dir|cat|type|Get-Content|Select-String|Get-ChildItem)\b/],
  // Reviewer + runs builds and tests, never changes git state or installs packages.
  tester: [READ_GIT,
    /^(mvnw?|gradlew?|\.\/gradlew)(\.cmd|\.bat)?\s+(-q\s+)?(test|verify|compile|test-compile)\b/,
    /^(npm|pnpm|yarn)\s+(run\s+)?(test|lint|build|typecheck)\b/, /^(npx\s+)?(vitest|jest|tsc|astro\s+check)\b/,
    /^(python\s+-m\s+)?pytest\b/, /^dotnet\s+(test|build)\b/],
};

const profile = process.argv[2] || 'reviewer';
const allowed = PROFILES[profile];
if (!allowed) { process.stderr.write(`subagent-command-allowlist: unknown profile "${profile}".\n`); process.exit(2); }

const command = String((readInput().tool_input || {}).command || '').trim();
if (!command) process.exit(0);

// Every part of a chained command must be allowed.
const parts = command.split(/\s*(?:&&|\|\||;|\|)\s*/).filter(Boolean);
const bad = parts.find((p) => !allowed.some((re) => re.test(p)));
if (bad) {
  process.stderr.write(`BLOCKED: the "${profile}" agent may not run "${bad.slice(0, 120)}". ` +
    'Allowed: read-only git and search commands' + (profile === 'tester' ? ', builds and tests.' : '.') +
    ' Report what you need and let the main session do it.\n');
  process.exit(2);
}
process.exit(0);
