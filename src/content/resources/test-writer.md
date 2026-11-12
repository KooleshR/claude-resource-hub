---
title: "test-writer"
type: agent
origin: ours
step: agent
stacks: ["java","react","python","dotnet","node"]
summary: "Writes focused tests in the framework your project already uses."
whenToUse: "For new code without tests, test-first work, or a risky area with low coverage."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/test-writer.md -OutFile .claude/agents/test-writer.md"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/test-writer.md -o .claude/agents/test-writer.md"
run: "> use test-writer to cover PayslipCalculator"
related: ["code-reviewer","tests-before-stop"]
lastVerified: "2026-11-12"
---

## What it does
Copies the style of the tests next to the code (JUnit 5 + AssertJ, Jest, pytest, xUnit), lists the cases first, then writes and runs them.

## Example
For `PayslipCalculator` it lists: zero hours, overtime at the boundary, negative deduction rejected, rounding to two decimals. Then it writes them.

## Notes
- It never adds a new test framework to your project.
