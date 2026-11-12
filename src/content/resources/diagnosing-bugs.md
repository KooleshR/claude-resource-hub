---
title: "diagnosing-bugs"
type: skill
origin: community
step: prompt
stacks: ["all"]
summary: "Step-by-step debugging: reproduce, narrow down, test a guess, fix, add a regression test."
whenToUse: "A bug you do not understand yet, or a test that fails only sometimes."
install:
  powershell: "npx skills add mattpocock/skills --skill diagnosing-bugs -a claude-code"
  bash: "npx skills add mattpocock/skills --skill diagnosing-bugs -a claude-code"
run: "/diagnosing-bugs the payslip total is off by one cent for some employees"
source: "https://github.com/mattpocock/skills"
licence: "MIT"
related: ["tdd","rewind"]
lastVerified: "2026-11-12"
---

## What it does
Stops Claude from guessing. It first reproduces the bug, then makes the failing case as small as possible, then tests one hypothesis at a time.

## Example
"Off by one cent for some employees" narrows down to employees with two part-time contracts, where each part was rounded before adding. The fix rounds once, and a regression test pins it.

## Notes
- Older versions were called `diagnose`.
