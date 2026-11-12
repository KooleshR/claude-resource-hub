---
title: "handoff"
type: skill
origin: community
step: prompt
stacks: ["all"]
summary: "Writes the current task to a handoff file so a fresh session can carry on."
whenToUse: "The context is filling up, or you stop for the day in the middle of a task."
install:
  powershell: "npx skills add mattpocock/skills --skill handoff -a claude-code"
  bash: "npx skills add mattpocock/skills --skill handoff -a claude-code"
run: "/handoff"
source: "https://github.com/mattpocock/skills"
licence: "MIT"
related: ["compact","clear","context"]
lastVerified: "2026-11-12"
---

## What it does
Summarises the goal, what is done, what is left, the files involved and the decisions made, into one document.

## Example
```
/handoff
/clear
> continue from handoff.md
```

## Notes
- Unlike `/compact`, you get a file you can read, edit and share.
