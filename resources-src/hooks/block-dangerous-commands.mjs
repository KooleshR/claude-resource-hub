#!/usr/bin/env node
// Hook: block-dangerous-commands
// Event: PreToolUse   Matcher: Bash|PowerShell
// Refuses shell commands that destroy work or data before they run.
// Exit 2 = block the call; the message on stderr is shown to Claude so it can pick a safer route.
//
// Covered: force pushes, hard resets, git clean, deleting branches, recursive deletes of
// root/home/project-wide paths, DROP/TRUNCATE, DELETE without WHERE, disk formatting.
// Add your own patterns to RULES. Node 18+, no dependencies.

import { readFileSync } from 'node:fs';

function readInput() {
  try { return JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { return {}; }
}

const RULES = [
  { name: 'force push', re: /\bgit\s+push\b[^\n;&|]*\s(--force\S*|-f\b)/i,
    hint: 'Push normally, or ask the user to force-push themselves.' },
  { name: 'hard reset', re: /\bgit\s+reset\s+[^\n;&|]*--hard\b/i,
    hint: 'Use "git stash" or "git restore <file>" for a targeted undo.' },
  { name: 'git clean', re: /\bgit\s+clean\s+[^\n;&|]*-[a-z]*f/i,
    hint: 'List files with "git clean -n" and ask before deleting.' },
  { name: 'delete branch', re: /\bgit\s+branch\s+[^\n;&|]*-D\b/,
    hint: 'Use "git branch -d" (safe delete) or ask the user.' },
  { name: 'recursive delete of a broad path',
    re: /\b(rm\s+-[a-z]*r[a-z]*f?|rm\s+-[a-z]*f[a-z]*r|Remove-Item\b[^\n;|]*-Recurse)[^\n;&|]*\s(\/|~\/?|\$HOME\/?|\$env:USERPROFILE\\?|C:\\?|\.|\*|\.\/\*)(\s|$|["'])/i,
    hint: 'Delete specific files or folders by name instead.' },
  // SQL rules skip git commands, so a commit message saying "drop table" is fine.
  { name: 'DROP / TRUNCATE', sql: true, re: /\b(DROP\s+(TABLE|DATABASE|SCHEMA|USER)|TRUNCATE\s+TABLE)\b/i,
    hint: 'Write a migration with a rollback and let the user run it.' },
  { name: 'DELETE without WHERE', sql: true, re: /\bDELETE\s+FROM\s+[\w."[\]]+\s*(;|"|'|$)/im,
    hint: 'Add a WHERE clause, or ask the user.' },
  { name: 'disk format', re: /\b(mkfs(\.\w+)?|Format-Volume|format\s+[a-z]:)/i,
    hint: 'Never format disks from an agent session.' },
];

const input = readInput();
const command = String((input.tool_input || {}).command || '');
if (!command) process.exit(0);

const isGit = /^\s*git\s/.test(command);
const hit = RULES.find((r) => !(r.sql && isGit) && r.re.test(command));
if (hit) {
  process.stderr.write(
    `BLOCKED by block-dangerous-commands (${hit.name}).\n` +
    `Command: ${command.slice(0, 200)}\n` +
    `${hit.hint}\n`);
  process.exit(2);
}
process.exit(0);
