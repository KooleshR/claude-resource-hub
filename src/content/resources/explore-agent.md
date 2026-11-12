---
title: "Explore"
type: agent
origin: official
step: agent
stacks: ["all"]
summary: "Built-in read-only agent that searches the codebase and reports back."
whenToUse: "When a question needs many files read but you only want the answer in your session."
run: "> use the Explore agent to find where overtime is calculated"
source: "https://code.claude.com/docs/en/sub-agents"
related: ["plan-mode","code-reviewer"]
lastVerified: "2026-11-12"
---

## What it does
Runs a search in its own context and hands back a summary, so your main session does not fill up with file contents.

## Example
```
> use the Explore agent to find every place that reads the tax table
```

## Notes
- Claude often picks it by itself for broad questions.
