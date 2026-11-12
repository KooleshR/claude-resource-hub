---
title: "secret-guard"
type: hook
origin: ours
step: pre
stacks: ["all"]
summary: "Blocks edits that would write an API key, password or private key into a file."
whenToUse: "Any project with config files, which is all of them."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/hooks | Out-Null\nirm {files}/hooks/secret-guard.mjs -OutFile .claude/hooks/secret-guard.mjs"
  bash: "mkdir -p .claude/hooks\ncurl -fsSL {files}/hooks/secret-guard.mjs -o .claude/hooks/secret-guard.mjs"
run: "// .claude/settings.json\n\"PreToolUse\": [{ \"matcher\": \"Edit|Write|MultiEdit\", \"hooks\": [{ \"type\": \"command\",\n  \"command\": \"node \\\"${CLAUDE_PROJECT_DIR}/.claude/hooks/secret-guard.mjs\\\"\" }] }]"
related: ["block-dangerous-commands","security-review"]
demo: "secret-guard"
lastVerified: "2026-11-12"
---

## What it does
Checks the new content of every edit for secret patterns (cloud keys, private keys, a password with a real value) and blocks it with exit code 2.

## Example
Claude writes the payroll database password into `application.properties`. Blocked, with the hint to read it from an environment variable such as ${DB_PASSWORD}.

## Notes
- Placeholders like `${DB_PASSWORD}` are allowed.
