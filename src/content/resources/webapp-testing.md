---
title: "webapp-testing"
type: skill
origin: official
step: prompt
stacks: ["react","angular","astro","jsf","node"]
summary: "Tests your local web app in a real browser with Playwright: click, fill, screenshot, read the console."
whenToUse: "Checking a UI change actually works, not just that it compiles."
install:
  powershell: "npx skills add anthropics/skills --skill webapp-testing -a claude-code"
  bash: "npx skills add anthropics/skills --skill webapp-testing -a claude-code"
run: "> start the app and check the login and the new payslip page in a browser"
source: "https://github.com/anthropics/skills"
related: ["playwright-mcp","frontend-design"]
lastVerified: "2026-11-12"
---

## What it does
Writes and runs small Playwright scripts against your running app and reports what it saw.

## Example
```
> start the app and check that an employee can open last month's payslip
```

## Notes
- Needs Python and Playwright installed.
- For interactive clicking instead of scripts, use [Playwright MCP](../playwright-mcp/).
