---
title: "tdd"
type: skill
origin: community
step: prompt
stacks: ["all"]
summary: "Red, green, refactor: one failing test, the code to pass it, then tidy up."
whenToUse: "Building any ticket or bug fix where the behaviour matters."
install:
  powershell: "npx skills add mattpocock/skills --skill tdd -a claude-code"
  bash: "npx skills add mattpocock/skills --skill tdd -a claude-code"
run: "/tdd implement ticket 03: overtime above 40 hours is paid at 1.5x"
source: "https://github.com/mattpocock/skills"
licence: "MIT"
related: ["to-tickets","test-writer","tdd-guard"]
featured: true
lastVerified: "2026-11-12"
---

## What it does
Keeps Claude in a strict loop: write one test, watch it fail, write the smallest code that passes, refactor, repeat.

## Example
```
/tdd overtime above 40 hours is paid at 1.5x
```
The first test, `overtimeRate_appliesAbove40Hours()`, fails. Claude adds the rule, the test passes, and it moves to the 40-hour boundary.

## Notes
- Want it enforced, not just asked for? Add [tdd-guard](../tdd-guard/).
