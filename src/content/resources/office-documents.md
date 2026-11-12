---
title: "docx / xlsx / pptx / pdf"
type: skill
origin: official
step: prompt
stacks: ["all"]
summary: "Anthropic's document skills: create and edit Word, Excel, PowerPoint and PDF files."
whenToUse: "You need a real report, spreadsheet or deck out of Claude Code."
install:
  powershell: "npx skills add anthropics/skills --skill docx -a claude-code\n# same for: xlsx, pptx, pdf"
  bash: "npx skills add anthropics/skills --skill docx -a claude-code\n# same for: xlsx, pptx, pdf"
run: "> make an Excel file of this month's overtime per department, with totals"
source: "https://github.com/anthropics/skills"
related: ["skill-creator"]
lastVerified: "2026-11-12"
---

## What it does
Each skill knows how to build its format properly: styles and tables in Word, formulas in Excel, layouts in PowerPoint, forms in PDF.

## Example
```
> make an Excel file of this month's overtime per department, with a totals row
```

## Notes
- These need Python and a few libraries. Claude installs what is missing and asks first.
