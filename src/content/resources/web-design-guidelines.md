---
title: "web-design-guidelines"
type: skill
origin: community
step: prompt
stacks: ["react","angular","astro","jsf"]
summary: "Vercel's interface guidelines: accessibility, forms, focus states, performance."
whenToUse: "A last check on a page before it goes live."
install:
  powershell: "npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a claude-code"
  bash: "npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a claude-code"
run: "> review the payslip page against the web design guidelines"
source: "https://github.com/vercel-labs/agent-skills"
related: ["frontend-design","webapp-testing"]
lastVerified: "2026-11-12"
---

## What it does
Checks a page against a long list of concrete rules (labels on inputs, visible focus, no layout shift) and lists what fails, with `file:line`.

## Example
It finds the payslip month picker has no label and the download button is a `div`.

## Notes
- Pairs well with [frontend-design](../frontend-design/): one designs, this one checks.
