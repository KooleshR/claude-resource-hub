---
title: "grill-me"
type: skill
origin: community
step: prompt
stacks: ["all"]
summary: "Claude interviews you about a plan until every open question is answered."
whenToUse: "Before you build something you have only half thought through."
install:
  powershell: "npx skills add mattpocock/skills --skill grill-me -a claude-code"
  bash: "npx skills add mattpocock/skills --skill grill-me -a claude-code"
run: "/grill-me I want to add shift allowances to payroll"
source: "https://github.com/mattpocock/skills"
licence: "MIT"
related: ["plan-mode","feature-dev"]
featured: true
lastVerified: "2026-11-12"
---

## What it does
Asks one question at a time, walking down the decision tree, and suggests an answer for each.

## Example
```
/grill-me I want to add shift allowances to payroll
```
"Are allowances taxed like base pay? Recommended: yes, unless your tax rules say otherwise."

## Notes
- `npx skills add mattpocock/skills --list` shows the other skills in the repo.
