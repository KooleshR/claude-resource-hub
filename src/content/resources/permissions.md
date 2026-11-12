---
title: "/permissions"
type: command
origin: official
step: setup
stacks: ["all"]
summary: "Shows and edits the allow, ask and deny rules for what Claude may run, read and edit."
whenToUse: "Before anything else on a project, and whenever you allow or block a command."
run: "/permissions\n\n// .claude/settings.json\n\"permissions\": {\n  \"deny\": [\"Bash(git push --force *)\", \"Read(./.env)\", \"Read(./secrets/**)\"],\n  \"allow\": [\"Bash(mvn -q test *)\"]\n}"
source: "https://code.claude.com/docs/en/permissions"
related: ["permission-modes","block-dangerous-commands","secret-guard"]
featured: true
lastVerified: "2026-11-12"
---

## What it does
Opens a dialog of rules by scope (user, project, local). Deny wins over ask, and ask wins over allow.

## Example
Block Claude from ever reading the payroll `.env` and from force-pushing, and stop it asking every time it runs the tests:
```
"deny": ["Bash(git push --force *)", "Read(./.env)"],
"allow": ["Bash(mvn -q test *)"]
```

## Notes
- On Windows Claude may use PowerShell, so add `PowerShell(...)` rules as well as `Bash(...)`.
- Rules are the first line of defence. Hooks catch what a pattern can't.
