---
title: "tests-before-stop"
type: hook
origin: ours
step: stop
stacks: ["all"]
summary: "Sends Claude back to run the tests if it tries to finish after changing code."
whenToUse: "When \"done\" should always mean \"tests pass\"."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/hooks | Out-Null\nirm {files}/hooks/tests-before-stop.mjs -OutFile .claude/hooks/tests-before-stop.mjs"
  bash: "mkdir -p .claude/hooks\ncurl -fsSL {files}/hooks/tests-before-stop.mjs -o .claude/hooks/tests-before-stop.mjs"
run: "// .claude/settings.json\n\"Stop\": [{ \"hooks\": [{ \"type\": \"command\",\n  \"command\": \"node \\\"${CLAUDE_PROJECT_DIR}/.claude/hooks/tests-before-stop.mjs\\\"\" }] }]"
related: ["compile-check","test-writer"]
lastVerified: "2026-11-12"
---

## What it does
On Stop, checks whether source files changed since the last test run. If they did, it blocks the stop and tells Claude to run the tests.

## Example
Claude says "done" after editing `TaxBandService`. The hook answers: "Source changed but the full test suite hasn't run since. Run mvn test and report the result." Claude runs them and reports the result.

## Notes
- It lets the stop through the second time, so Claude never loops.
