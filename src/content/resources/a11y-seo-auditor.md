---
title: "a11y-seo-auditor"
type: agent
origin: ours
step: agent
stacks: ["react","angular","astro","jsf"]
summary: "Audits pages for accessibility (WCAG 2.2 AA) and basic SEO, in the source and in the running page."
whenToUse: "Before releasing UI changes, or after changes to layout, forms, colours or page metadata."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/a11y-seo-auditor.md -OutFile .claude/agents/a11y-seo-auditor.md"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/a11y-seo-auditor.md -o .claude/agents/a11y-seo-auditor.md"
run: "> use the a11y-seo-auditor agent on the leave request form"
related: ["web-design-guidelines","playwright-mcp","ui-ux-reviewer"]
lastVerified: "2026-11-12"
---
## What it does
Checks labels, headings, contrast, keyboard use, focus, alt text, titles and meta descriptions. With a browser MCP (Playwright or Chrome DevTools) it checks the running page too. It reports; it does not edit.

## Example
```
> use the a11y-seo-auditor agent on the leave request form
```
"The date field has no label, only a placeholder. Screen readers announce 'edit text'. Add `<label for="startDate">`."

## Notes
- An automated check finds maybe a third of real problems. Also try the page with only a keyboard.
