---
title: "Shift+Tab modes"
type: command
origin: official
step: prompt
stacks: ["all"]
summary: "Cycles how much Claude may do without asking: default, accept edits, plan, auto."
whenToUse: "Plan mode before a big change. Accept-edits once you trust the plan. Auto only with rules and hooks in place."
run: "Shift+Tab   # Windows: Alt+M if Shift+Tab does nothing"
source: "https://code.claude.com/docs/en/permission-modes"
related: ["plan-mode","permissions","block-dangerous-commands"]
lastVerified: "2026-11-12"
---

## What it does
The mode shows under the prompt. **Default** asks before edits and commands. **Accept edits** applies file edits without asking. **Plan** reads and proposes, changes nothing. **Auto** decides for itself within your rules.

## Example
Shift+Tab to plan mode, ask for the overtime change, read the plan, then Shift+Tab to accept edits and say "go".

## Notes
- Set up [/permissions](../permissions/) deny rules and a guard hook before using auto mode.
