---
title: "to-tickets"
type: skill
origin: community
step: prompt
stacks: ["all"]
summary: "Breaks a spec into small tickets you can build and test one at a time."
whenToUse: "After the spec, before you start coding, so each change stays small."
install:
  powershell: "npx skills add mattpocock/skills --skill to-tickets -a claude-code"
  bash: "npx skills add mattpocock/skills --skill to-tickets -a claude-code"
run: "/to-tickets"
source: "https://github.com/mattpocock/skills"
licence: "MIT"
related: ["to-spec","implementer","tdd"]
lastVerified: "2026-11-12"
---

## What it does
Splits the spec into thin slices that each work end to end, numbered in build order, with what each one depends on.

## Example
The overtime report becomes five tickets: an empty report page, the query for one employee, the totals, the export, the access check.

## Notes
- Older versions were called `to-issues`.
- Hand one ticket at a time to the [implementer](../implementer/) agent.
