---
title: "JetBrains plugin"
type: harness
origin: official
step: setup
stacks: ["java","jsf","python","dotnet"]
summary: "Claude Code inside IntelliJ IDEA, PyCharm, Rider and other JetBrains IDEs, with diffs in the IDE viewer."
whenToUse: "You do your Java (or other) work in a JetBrains IDE."
install:
  powershell: "# 1. install the Claude Code CLI (see Claude Code CLI)\n# 2. Settings > Plugins > Marketplace > \"Claude Code\" > Install\n# 3. restart the IDE"
  bash: "# 1. install the Claude Code CLI (see Claude Code CLI)\n# 2. Settings > Plugins > Marketplace > \"Claude Code\" > Install\n# 3. restart the IDE"
run: "# in the IDE terminal, at the project root\nclaude"
source: "https://code.claude.com/docs/en/jetbrains"
related: ["claude-code-cli","vs-code"]
lastVerified: "2026-11-12"
---

## What it does
Connects the CLI to the IDE: proposed edits open in the IDE diff viewer, and Claude sees your current file, selection and IDE errors.

## Example
Run `claude` in IntelliJ's terminal in `payflow-hr`, ask for a change, and review it in the side-by-side diff.

## Notes
- If the IDE is not detected, run `/ide` inside Claude Code.
