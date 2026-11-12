---
title: "/memory"
type: command
origin: official
step: start
stacks: ["all"]
summary: "Opens your CLAUDE.md files for editing and toggles auto memory."
whenToUse: "When Claude keeps forgetting a project rule and you want it written down for good."
run: "/memory"
source: "https://code.claude.com/docs/en/memory"
related: ["init"]
lastVerified: "2026-11-12"
---

## What it does
Lists the memory files Claude loaded (user, project, folder) and opens the one you pick in your editor.

## Example
```
/memory
```
Pick the project file and add: "Payroll amounts use BigDecimal with scale 2, never double."

## Notes
- Project CLAUDE.md goes in git so the whole team shares it.
