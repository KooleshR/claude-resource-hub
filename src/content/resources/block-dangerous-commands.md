---
title: "block-dangerous-commands"
type: hook
origin: ours
step: pre
stacks: ["all"]
summary: "Stops force-push, rm -rf, DROP TABLE and similar commands before they run."
whenToUse: "In every project. It is the cheapest safety net there is."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/hooks | Out-Null\nirm {files}/hooks/block-dangerous-commands.mjs -OutFile .claude/hooks/block-dangerous-commands.mjs"
  bash: "mkdir -p .claude/hooks\ncurl -fsSL {files}/hooks/block-dangerous-commands.mjs -o .claude/hooks/block-dangerous-commands.mjs"
run: "// .claude/settings.json\n\"PreToolUse\": [{ \"matcher\": \"Bash|PowerShell\", \"hooks\": [{ \"type\": \"command\",\n  \"command\": \"node \\\"${CLAUDE_PROJECT_DIR}/.claude/hooks/block-dangerous-commands.mjs\\\"\" }] }]"
related: ["secret-guard","compile-check"]
featured: true
demo: "block-dangerous-commands"
lastVerified: "2026-11-12"
---

## What it does
Runs before every shell command. If the command matches a dangerous pattern it exits with code 2, which blocks it and tells Claude why.

## Example
Claude tries `git push --force origin main`. The hook blocks it with exit code 2: "BLOCKED (force push). Push normally, or ask the user to force-push themselves."

## Notes
- The matcher covers both `Bash` and `PowerShell`, because on Windows Claude uses either.
- The full settings example: [settings.example.json](../../files/hooks/settings.example.json).
