---
title: "/hooks"
type: command
origin: official
step: setup
stacks: ["all"]
summary: "Shows which hooks are configured for each event."
whenToUse: "After adding a hook, to check Claude Code actually loaded it."
run: "/hooks"
source: "https://code.claude.com/docs/en/hooks"
related: ["block-dangerous-commands","compile-check"]
lastVerified: "2026-11-12"
---

## What it does
Lists every event (PreToolUse, PostToolUse, Stop and so on) with the hooks attached and the file they come from.

## Example
You added [block-dangerous-commands](../block-dangerous-commands/). `/hooks` shows it under PreToolUse. Then test it: ask Claude to run `git push --force`. It should be blocked.

## Notes
- Edit hooks in `.claude/settings.json` and run `/hooks` again to check.
