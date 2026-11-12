---
title: "VS Code extension"
type: harness
origin: official
step: setup
stacks: ["all"]
summary: "Claude Code in a VS Code panel: inline diffs, @-mentions, plan review and several chats in tabs."
whenToUse: "You work in VS Code (or Cursor) and want to review changes as diffs."
install:
  powershell: "code --install-extension anthropic.claude-code\n# or: Extensions (Ctrl+Shift+X) > \"Claude Code\" by Anthropic"
  bash: "code --install-extension anthropic.claude-code\n# or: Extensions (Ctrl+Shift+X) > \"Claude Code\" by Anthropic"
run: "# click the Claude icon in the editor toolbar\n/ide   # from claude in an outside terminal"
source: "https://code.claude.com/docs/en/vs-code"
related: ["claude-code-cli","jetbrains"]
lastVerified: "2026-11-12"
---

## What it does
Opens Claude Code in a side panel. Changes appear as diffs you accept or reject, and Claude sees the file and selection you have open.

## Example
Select `calculateNet()` in the editor and ask "why does this round twice?". Claude gets the selection as context.

## Notes
- The same CLAUDE.md, skills, hooks and settings apply as in the terminal.
