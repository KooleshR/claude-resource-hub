---
title: "refactor-planner"
type: agent
origin: ours
step: agent
stacks: ["all"]
summary: "Plans a refactor in small steps where every step keeps the build and the tests green. Does not edit code."
whenToUse: "Code is hard to change: a huge class, copy-paste, a tangled legacy module."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/refactor-planner.md -OutFile .claude/agents/refactor-planner.md"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/refactor-planner.md -o .claude/agents/refactor-planner.md"
run: "> use the refactor-planner agent on PayrollService"
related: ["improve-codebase-architecture","implementer","tdd"]
lastVerified: "2026-11-12"
---
## What it does
Reads the code and its tests, then writes a numbered plan: each step small, safe on its own, and checked by running the tests. Missing tests come first in the plan.

## Example
```
> use the refactor-planner agent on PayrollService
```
"1. Add characterisation tests for `calculate()` (no tests today). 2. Extract `TaxCalculator` (moves 180 lines). 3. Extract `AllowanceCalculator`. 4. …"

## Notes
- Hand one step at a time to the [implementer](../implementer/), not the whole plan.
