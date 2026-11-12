---
title: "Playwright MCP"
type: mcp
origin: official
step: tool
stacks: ["react","angular","astro","jsf"]
summary: "Lets Claude open a real browser, click through your app and read the page."
whenToUse: "To check a UI change actually works, or to write an end-to-end test from a real run."
install:
  powershell: "/plugin install playwright@claude-plugins-official"
  bash: "/plugin install playwright@claude-plugins-official"
run: "> open localhost:8080, log in as the test HR user and check the payslip page"
source: "https://github.com/microsoft/playwright-mcp"
related: ["context7"]
lastVerified: "2026-11-12"
---

## What it does
Drives Chromium through the accessibility tree: navigate, click, type, read, screenshot.

## Example
```
> open http://localhost:8080/payslips, filter by March and tell me if the totals match the table
```

## Notes
- Without the plugin: `claude mcp add playwright npx @playwright/mcp@latest`.
