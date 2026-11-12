---
title: "skill-creator"
type: skill
origin: official
step: prompt
stacks: ["all"]
summary: "Anthropic's skill for writing, testing and improving your own skills."
whenToUse: "You keep typing the same instructions and want them as a skill."
install:
  powershell: "npx skills add anthropics/skills --skill skill-creator -a claude-code\n# or: /plugin install skill-creator@claude-plugins-official"
  bash: "npx skills add anthropics/skills --skill skill-creator -a claude-code\n# or: /plugin install skill-creator@claude-plugins-official"
run: "> use skill-creator to make a skill for our pull request checklist"
source: "https://github.com/anthropics/skills"
related: ["skills","spring-boot-conventions"]
lastVerified: "2026-11-12"
---

## What it does
Interviews you about the task, writes the `SKILL.md` with a good description, then tests that Claude picks it up when it should.

## Example
```
> use skill-creator to make a skill that checks a new payroll report has an access check and a test
```

## Notes
- The description decides when the skill triggers. Let it test that.
