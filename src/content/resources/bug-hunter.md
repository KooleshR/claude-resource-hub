---
title: "bug-hunter"
type: agent
origin: ours
step: agent
stacks: ["all"]
summary: "Reproduces a bug with a failing test, finds the root cause, makes the smallest fix and keeps the test."
whenToUse: "A wrong result, an exception, or \"it worked yesterday\"."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/bug-hunter.md -OutFile .claude/agents/bug-hunter.md"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/bug-hunter.md -o .claude/agents/bug-hunter.md"
run: "> use the bug-hunter agent: net pay is 1 cent off for some employees"
related: ["diagnosing-bugs","test-writer","log-analyzer"]
lastVerified: "2026-11-12"
---
## What it does
Works like a careful developer: reproduce first with a failing test, then narrow down the cause, then the smallest fix. The test stays, so the bug cannot come back unnoticed.

## Example
```
> use the bug-hunter agent: net pay is 1 cent off for some employees
```
On PayFlow it would write a test with the failing employee's figures, trace the difference to a `double` in the tax step, and switch that step to `BigDecimal` with `HALF_UP`.

## Notes
- This agent can edit (it has Edit and Write). Use it on a branch.
- For a read-only diagnosis without changes, use [log-analyzer](../log-analyzer/) or the [diagnosing-bugs](../diagnosing-bugs/) skill.
