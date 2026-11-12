---
title: "security-auditor"
type: agent
origin: ours
step: agent
stacks: ["all"]
summary: "A read-only security review against the OWASP Top 10, with each finding at file:line."
whenToUse: "Before merging anything that touches logins, user input, uploads, payroll data or new libraries."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/security-auditor.md -OutFile .claude/agents/security-auditor.md\nNew-Item -ItemType Directory -Force .claude/hooks | Out-Null\nirm {files}/hooks/subagent-command-allowlist.mjs -OutFile .claude/hooks/subagent-command-allowlist.mjs"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/security-auditor.md -o .claude/agents/security-auditor.md\nmkdir -p .claude/hooks\ncurl -fsSL {files}/hooks/subagent-command-allowlist.mjs -o .claude/hooks/subagent-command-allowlist.mjs"
run: "> use the security-auditor agent on this branch"
related: ["security-review","security-guidance","code-reviewer"]
lastVerified: "2026-11-12"
---

## What it does
Checks access control, injection, sessions, secrets, sensitive data in logs, dependencies and configuration. Findings are ranked by severity.

## Example
It flags `/payslips/{id}`: any logged-in user can read anyone's payslip by changing the id. Fix: check the payslip's employee is the current user in the service, not only in the page.

## Notes
- Its hook only allows read-only commands, so it cannot change anything.
