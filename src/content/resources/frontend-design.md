---
title: "frontend-design"
type: skill
origin: official
step: prompt
stacks: ["react","angular","astro","jsf"]
summary: "Pushes Claude toward a clear, deliberate UI instead of generic default styling."
whenToUse: "Building or restyling any page or screen."
install:
  powershell: "npx skills add anthropics/skills --skill frontend-design -a claude-code\n# or as a plugin, inside Claude Code:\n# /plugin install frontend-design@claude-plugins-official"
  bash: "npx skills add anthropics/skills --skill frontend-design -a claude-code\n# or as a plugin, inside Claude Code:\n# /plugin install frontend-design@claude-plugins-official"
run: "> redesign the payslip page: clear headings, totals stand out, works on a phone"
source: "https://github.com/anthropics/skills"
related: ["web-design-guidelines","webapp-testing"]
lastVerified: "2026-11-12"
---

## What it does
Gives Claude design rules to follow: pick a direction, use type and spacing with intent, avoid the usual template look.

## Example
```
> redesign the payslip page: clear headings, totals stand out, works on a phone. Don't change the logic.
```

## Notes
- Say "don't change the logic" so it stays a visual change.
