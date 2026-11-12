---
title: "/clear"
type: command
origin: official
step: prompt
stacks: ["all"]
summary: "Starts a new conversation with empty context."
whenToUse: "Between two unrelated tasks. Probably the most useful habit there is."
run: "/clear\n/clear overtime-report   # names the old one for /resume"
source: "https://code.claude.com/docs/en/commands"
related: ["compact","context","handoff"]
lastVerified: "2026-11-12"
---

## What it does
Drops the conversation. CLAUDE.md, skills and settings load again; the chat history does not.

## Example
Finished the overtime report, now fixing a login bug: `/clear` first, so the old files and decisions don't steer the new task.

## Notes
- Get it back with `/resume`.
- Want to keep a summary instead? Use `/compact`.
