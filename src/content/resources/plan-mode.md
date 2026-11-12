---
title: "Plan mode"
type: harness
origin: official
step: start
stacks: ["all"]
summary: "Claude reads and plans but changes nothing until you approve the plan."
whenToUse: "Before any change that touches more than one file, or when you are new to the codebase."
run: "Shift+Tab (until it shows plan mode)\n/plan\nclaude --permission-mode plan"
source: "https://code.claude.com/docs/en/permission-modes"
related: ["explore-agent","rewind"]
featured: true
start: 3
lastVerified: "2026-11-12"
---

## What it does
In plan mode Claude can only read and search. It ends with a plan you accept, edit or reject. Nothing is written before that.

## Example
```
claude --permission-mode plan
> add an overtime rate field to the employee form and use it in the payslip
```
You get the list of files it would touch and the order, then approve.

## Notes
- Shift+Tab cycles the permission modes in a running session.
