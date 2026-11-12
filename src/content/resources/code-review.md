---
title: "/code-review"
type: command
origin: official
step: prompt
stacks: ["all"]
summary: "Reviews a diff, branch or PR for bugs, at the effort level you choose."
whenToUse: "Before you open a pull request, or on a teammate's PR."
run: "/code-review\n/code-review high --fix\n/code-review 42 --comment"
source: "https://code.claude.com/docs/en/commands"
related: ["code-reviewer","security-review"]
featured: true
lastVerified: "2026-11-12"
---

## What it does
Reads the change and reports bugs it can back up, ranked by severity. `--fix` applies the fixes, `--comment` posts them on the PR.

## Example
```
/code-review high
```
On a PayFlow branch it flags a payslip total computed with `double` and a missing null check on the employee's bank account.

## Notes
- Syntax: `/code-review [low…max|ultra] [--fix] [--comment] [--max-findings n] [target]`. `/review` is an alias.
- `ultra` runs a billed multi-agent review in the cloud.
