---
title: "test-runner"
type: agent
origin: ours
step: agent
stacks: ["all"]
summary: "Runs the test suite on a small, cheap model and reports only what passed and what failed."
whenToUse: "After a change, when you want the result without filling your session with test output."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/test-runner.md -OutFile .claude/agents/test-runner.md\nNew-Item -ItemType Directory -Force .claude/hooks | Out-Null\nirm {files}/hooks/subagent-command-allowlist.mjs -OutFile .claude/hooks/subagent-command-allowlist.mjs"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/test-runner.md -o .claude/agents/test-runner.md\nmkdir -p .claude/hooks\ncurl -fsSL {files}/hooks/subagent-command-allowlist.mjs -o .claude/hooks/subagent-command-allowlist.mjs"
run: "> use the test-runner agent"
related: ["implementer","test-writer","tests-before-stop"]
demo: "test-runner"
lastVerified: "2026-11-12"
---

## What it does
Finds the test command (from CLAUDE.md, or Maven, Gradle, npm, pytest, dotnet), runs it once and returns a short report. It runs on Haiku to keep cost low.

## Example
```
Tests: mvn -q test
Result: FAILED 1 of 212
1. PayslipCalculatorTest.netPay_roundsOnce: expected 1520.35 but was 1520.36
```

## Notes
- Its own hook only allows test and build commands, so it cannot edit or commit.
