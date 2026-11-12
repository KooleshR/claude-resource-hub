---
title: "git-guardrails-claude-code"
type: skill
origin: community
step: setup
stacks: ["all"]
summary: "Sets up hooks that block risky git commands such as push, reset --hard and clean."
whenToUse: "The first day on a repo, before you let Claude run git on its own."
install:
  powershell: "npx skills add mattpocock/skills --skill git-guardrails-claude-code -a claude-code"
  bash: "npx skills add mattpocock/skills --skill git-guardrails-claude-code -a claude-code"
run: "/git-guardrails-claude-code"
source: "https://github.com/mattpocock/skills"
licence: "MIT"
related: ["block-dangerous-commands","permissions"]
lastVerified: "2026-11-12"
---

## What it does
Writes a PreToolUse hook into your project settings that refuses the git commands you choose.

## Example
After setup, Claude tries `git reset --hard` and the hook blocks it with a message.

## Notes
- Our [block-dangerous-commands](../block-dangerous-commands/) hook does the same for git and also covers `rm -rf`, `DROP TABLE` and PowerShell. Pick one.
