---
title: "session-branch-check"
type: hook
origin: ours
step: start
stacks: ["all"]
summary: "When a session opens, tells you and Claude the branch, uncommitted changes and how far behind main you are."
whenToUse: "Team repos where branches drift behind main without anyone noticing."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/hooks | Out-Null\nirm {files}/hooks/session-branch-check.mjs -OutFile .claude/hooks/session-branch-check.mjs"
  bash: "mkdir -p .claude/hooks\ncurl -fsSL {files}/hooks/session-branch-check.mjs -o .claude/hooks/session-branch-check.mjs"
run: "// .claude/settings.json\n\"SessionStart\": [{ \"matcher\": \"startup|resume\", \"hooks\": [{ \"type\": \"command\",\n  \"command\": \"node \\\"${CLAUDE_PROJECT_DIR}/.claude/hooks/session-branch-check.mjs\\\"\" }] }]"
related: ["block-dangerous-commands","memory"]
lastVerified: "2026-11-12"
---

## What it does
Runs once when Claude Code starts. It reads git locally (no network) and adds a short line to the session, so Claude knows the state before it changes anything.

## Example
```
Git: on branch "feature/overtime", 2 uncommitted change(s).
Branch is 14 commit(s) behind origin/main: consider updating before starting work.
```

## Notes
- Set `BRANCH_CHECK_FETCH=1` to fetch first. It is off by default so start-up stays instant.
