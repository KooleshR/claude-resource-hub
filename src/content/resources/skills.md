---
title: "/skills"
type: command
origin: official
step: prompt
stacks: ["all"]
summary: "Lists the skills Claude can use, where each one comes from and what it costs in context."
whenToUse: "After installing a skill, to check it was picked up."
run: "/skills"
source: "https://code.claude.com/docs/en/skills"
related: ["skill-creator","plugin"]
lastVerified: "2026-11-12"
---

## What it does
Shows every skill from your user folder, the project and plugins. Type to filter, press `t` to sort by token count.

## Example
You ran `npx skills add ... --skill tdd`. `/skills` shows `tdd` under the project, so `/tdd` will work.

## Notes
- Project skills live in `.claude/skills/<name>/SKILL.md`, personal ones in `~/.claude/skills/`.
