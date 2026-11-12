---
title: "to-spec"
type: skill
origin: community
step: prompt
stacks: ["all"]
summary: "Turns the conversation into a written spec once the requirements are agreed."
whenToUse: "Right after grill-me, to freeze what you agreed in a file before any code."
install:
  powershell: "npx skills add mattpocock/skills --skill to-spec -a claude-code"
  bash: "npx skills add mattpocock/skills --skill to-spec -a claude-code"
run: "/to-spec"
source: "https://github.com/mattpocock/skills"
licence: "MIT"
related: ["grill-me","to-tickets","tdd"]
lastVerified: "2026-11-12"
---

## What it does
Writes a spec from the current session: the goal, the rules, what is out of scope, and the places to test (service tests, controller tests, end-to-end).

## Example
After grilling a "monthly overtime report" feature for PayFlow HR, `/to-spec` writes `spec.md` with the rounding rule, who may see the report, and the test list.

## Notes
- Older versions of this skill were called `to-prd`.
