---
title: "tdd-guard"
type: hook
origin: community
step: pre
stacks: ["java","react","angular","node","python","dotnet"]
summary: "Blocks implementation code that is written without a failing test first."
whenToUse: "Your team wants test-first enforced, not just asked for."
install:
  powershell: "# inside Claude Code\n/plugin marketplace add nizos/tdd-guard\n/plugin install tdd-guard@tdd-guard\n/tdd-guard:setup"
  bash: "# inside Claude Code\n/plugin marketplace add nizos/tdd-guard\n/plugin install tdd-guard@tdd-guard\n/tdd-guard:setup"
run: "# runs by itself on every edit"
source: "https://github.com/nizos/tdd-guard"
licence: "MIT"
related: ["tdd","tests-before-stop"]
lastVerified: "2026-11-12"
---

## What it does
Watches edits. If Claude writes production code while no test is failing for it, the edit is blocked and Claude is told to write the test first.

## Example
Claude starts editing `OvertimeCalculator` before any test. Blocked. It writes `overtime_isZero_under40Hours()`, sees it fail, and then the edit goes through.

## Notes
- The setup step adds a test reporter for your framework. Try it on a small repo first.
