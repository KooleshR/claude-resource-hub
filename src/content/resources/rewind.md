---
title: "/rewind"
type: command
origin: official
step: tool
stacks: ["all"]
summary: "Go back to an earlier checkpoint: the code, the conversation, or both."
whenToUse: "When Claude went the wrong way and you want to undo its edits without touching git."
run: "/rewind\nEsc Esc"
source: "https://code.claude.com/docs/en/checkpointing"
related: ["plan-mode","compact"]
start: 4
lastVerified: "2026-11-12"
---

## What it does
Claude Code saves a checkpoint before each of your prompts. Rewind restores the files it edited and, if you want, the conversation too.

## Example
Claude refactored `PayslipService` and broke three tests. Press Esc twice, pick the prompt before the refactor, choose to restore code and conversation.

## Notes
- Checkpoints cover Claude's own file edits, not changes made by shell commands (a database migration stays applied).
- It does not replace git commits.
