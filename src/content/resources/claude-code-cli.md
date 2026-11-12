---
title: "Claude Code CLI"
type: harness
origin: official
step: setup
stacks: ["all"]
summary: "The terminal app itself. Everything else on this site runs inside it."
whenToUse: "First. Install once per machine, then run claude inside any project folder."
install:
  powershell: "irm https://claude.ai/install.ps1 | iex"
  bash: "curl -fsSL https://claude.ai/install.sh | bash"
run: "cd payflow-hr\nclaude"
source: "https://code.claude.com/docs/en/setup"
related: ["init","plan-mode"]
start: 1
lastVerified: "2026-11-12"
---

## What it does
Claude Code reads your project, edits files and runs commands in your terminal, asking before anything risky. Sign in on the first run.

## Example
```
cd payflow-hr
claude
> explain how a payslip is calculated in this project
```

## Notes
- Check the install any time with `/doctor`.
- On Windows the PowerShell line installs it without WSL.
