---
title: "feature-dev"
type: plugin
origin: official
step: setup
stacks: ["all"]
summary: "A guided feature workflow with explorer, architect and reviewer agents."
whenToUse: "For a feature big enough to need a design step before code."
install:
  powershell: "/plugin install feature-dev@claude-plugins-official"
  bash: "/plugin install feature-dev@claude-plugins-official"
run: "/feature-dev add a leave balance screen for employees"
source: "https://github.com/anthropics/claude-plugins-official"
related: ["plugin","plan-mode"]
lastVerified: "2026-11-12"
---

## What it does
Walks through discovery, codebase exploration, questions, architecture, build and review, using its code-explorer, code-architect and code-reviewer agents.

## Example
```
/feature-dev add a leave balance screen for employees
```
It asks how leave accrues before it designs anything.

## Notes
- Slower than just asking, on purpose. Use it when the design matters.
