---
title: "stack-tutor"
type: agent
origin: ours
step: agent
stacks: ["all"]
summary: "A patient teacher that explains how something in this project works, using your own code as the example."
whenToUse: "You are new to the stack, or you want to understand code before you change it."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/stack-tutor.md -OutFile .claude/agents/stack-tutor.md"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/stack-tutor.md -o .claude/agents/stack-tutor.md"
run: "> use the stack-tutor agent: why is PayslipBean session scoped?"
related: ["explore-agent","context7","codebase-architect"]
lastVerified: "2026-11-12"
---
## What it does
Gives the short answer first, then goes deeper with `file:line` examples from your project, and bridges from what you already know (for example JSF templates and Astro layouts). It ends with one thing to try next. It never edits files.

## Example
```
> use the stack-tutor agent: why is PayslipBean session scoped?
```

## Notes
- `tools: Read, Grep, Glob` only. Add the context7 MCP tools to its `tools:` line so it checks the current docs before answering.
- Adapted from an Astro tutor we use, made stack-neutral.
