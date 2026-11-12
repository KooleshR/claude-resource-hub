---
title: "codebase-architect"
type: agent
origin: ours
step: agent
stacks: ["all"]
summary: "Maps how a codebase is structured, finds structural problems and proposes a target design as an ADR."
whenToUse: "Joining a project, before a large feature, or \"how should we structure this?\"."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/codebase-architect.md -OutFile .claude/agents/codebase-architect.md"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/codebase-architect.md -o .claude/agents/codebase-architect.md"
run: "> use the codebase-architect agent: how is payroll organised?"
related: ["improve-codebase-architecture","feature-mapper","refactor-planner"]
lastVerified: "2026-11-12"
---
## What it does
Lists modules, layers and dependencies, finds cycles and leaks between layers, and writes a short Architecture Decision Record with the target design and the trade-offs.

## Example
```
> use the codebase-architect agent: how is payroll organised?
```

## Notes
- It has Write, but its prompt limits it to `docs/adr/`. That is advice, not enforcement. For a strictly read-only version, remove Write from its `tools:` line.
