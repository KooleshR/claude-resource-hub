---
title: "ui-ux-reviewer"
type: agent
origin: ours
step: agent
stacks: ["react","angular","astro","jsf"]
summary: "A read-only UI/UX reviewer that screenshots the real page at three widths and proposes changes with before/after code."
whenToUse: "Before a release, or when a page feels cluttered and you cannot say why."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/ui-ux-reviewer.md -OutFile .claude/agents/ui-ux-reviewer.md"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/ui-ux-reviewer.md -o .claude/agents/ui-ux-reviewer.md"
run: "> use the ui-ux-reviewer agent on the payslip page"
related: ["frontend-design","web-design-guidelines","playwright-mcp"]
lastVerified: "2026-11-12"
---
## What it does
Reads your design tokens and the page, takes screenshots at phone, tablet and desktop width if a dev server and Playwright are available, and lists proposals by impact: the problem from a visitor's view, then the change as before and after code.

## Example
```
> use the ui-ux-reviewer agent on the payslip page
```
On the PayFlow payslip page it might report: "1. Net pay is the same size as every other number. Impact: High. A payroll clerk scans for one figure. Make it the largest text on the card."

## Notes
- It uses `memory: project`: once you approve a decision ("the accent stays green"), it remembers it and stops re-raising it.
- `model: opus` because design judgement benefits from it. Change it to `sonnet` to save cost.
- Adapted from the agent we use on our own portfolio site.
