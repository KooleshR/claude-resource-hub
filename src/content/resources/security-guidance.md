---
title: "security-guidance"
type: plugin
origin: official
step: post
stacks: ["all"]
summary: "Reviews the code Claude writes for security holes and has it fix them in the same session."
whenToUse: "Any project with user data, logins or payments. Install once and leave it on."
install:
  powershell: "# inside Claude Code\n/plugin install security-guidance@claude-plugins-official"
  bash: "# inside Claude Code\n/plugin install security-guidance@claude-plugins-official"
run: "# runs by itself while Claude edits\n/plugin disable security-guidance@claude-plugins-official"
source: "https://github.com/anthropics/claude-plugins-official/tree/main/plugins/security-guidance"
licence: "Apache-2.0"
related: ["security-review","security-auditor","secret-guard"]
featured: true
lastVerified: "2026-11-12"
---

## What it does
Three layers: quick pattern warnings on each edit, a review of the diff when Claude finishes a turn, and a deeper review on `git commit` that follows data across files (missing access checks, injection, unsafe file paths).

## Example
Claude adds an endpoint that returns any payslip by id. When the turn ends the plugin flags it: no check that the payslip belongs to the logged-in user. Claude adds the check before you read the answer.

## Notes
- Needs Python 3.8 or later on PATH and Claude Code 2.1.144 or later.
- It uses extra model calls, so it adds some cost.
