#!/usr/bin/env node
// Hook: secret-guard
// Event: PreToolUse   Matcher: Edit|Write|MultiEdit
// Blocks writes that would add something that looks like a secret (API keys, tokens,
// passwords, private keys). Only NEW lines are checked, so existing files don't trigger it.
// Put "pragma: allowlist secret" on a line to allow a deliberate test value.
// Exit 2 = block; stderr is shown to Claude. Node 18+, no dependencies.

import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

function readInput() {
  try { return JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { return {}; }
}

const KEY = '[\\w.-]*(?:password|passwd|pwd|secret|token|api[_-]?key|access[_-]?key|private[_-]?key)[\\w.-]*';
const PLACEHOLDER = /^([$<{%]|changeme$|example|placeholder|dummy|redacted|your[-_]|x{3,}|\*{3,})/i;
const ALLOW = 'pragma: allowlist secret';

const RULES = [
  { name: 'credential set to a literal', re: new RegExp(`${KEY}["']?\\s*[:=]\\s*["']([^"'\\s]{4,})["']`, 'i'), group: 1 },
  { name: 'credential as key=value', re: new RegExp(`${KEY}=([^\\s"',;)]{4,})`, 'i'), group: 1 },
  { name: 'AWS access key', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: 'GitHub token', re: /\b(gh[pousr]_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{22,})/ },
  { name: 'Anthropic API key', re: /\bsk-ant-[A-Za-z0-9_-]{20,}/ },
  { name: 'OpenAI-style key', re: /\bsk-(proj-)?[A-Za-z0-9]{20,}/ },
  { name: 'Slack token', re: /\bxox[abprs]-[A-Za-z0-9-]{10,}/ },
  { name: 'Google API key', re: /\bAIza[0-9A-Za-z_-]{35}/ },
  { name: 'private key', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { name: 'JSON Web Token', re: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\./ },
];

const mask = (s) => (s.length <= 4 ? '****' : s.slice(0, 2) + '*'.repeat(Math.min(s.length - 2, 12)));

const input = readInput();
const ti = input.tool_input || {};
const file = String(ti.file_path || '');
const written = [ti.content, ti.new_string, ...(ti.edits || []).map((e) => e && e.new_string)]
  .filter((t) => typeof t === 'string');

let existing = new Set();
try { existing = new Set(readFileSync(file, 'utf8').split(/\r?\n/).map((l) => l.trim())); } catch { /* new file */ }

const findings = [];
for (const line of written.flatMap((t) => t.split(/\r?\n/))) {
  const t = line.trim();
  if (!t || existing.has(t) || line.includes(ALLOW)) continue;
  for (const rule of RULES) {
    const m = line.match(rule.re);
    if (!m) continue;
    const value = m[rule.group || 0];
    if (rule.group && PLACEHOLDER.test(value)) continue;
    findings.push(`${rule.name}: ${t.replace(value, mask(value)).slice(0, 160)}`);
    break;
  }
}

if (findings.length) {
  process.stderr.write(
    `BLOCKED by secret-guard: ${basename(file) || 'this write'} would add what looks like a secret.\n` +
    findings.map((f) => `  - ${f}`).join('\n') + '\n' +
    'Read it from an environment variable (e.g. ${DB_PASSWORD}) instead. ' +
    `For a deliberate test value, add "${ALLOW}" in a comment on that line.\n`);
  process.exit(2);
}
process.exit(0);
