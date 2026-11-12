---
title: "/model"
type: command
origin: official
step: prompt
stacks: ["all"]
summary: "Switches the model and effort level during a session."
whenToUse: "Hard design questions on the biggest model, routine edits on a smaller, cheaper one."
run: "/model\n/model haiku"
source: "https://code.claude.com/docs/en/model-config"
related: ["test-runner","context"]
lastVerified: "2026-11-12"
---

## What it does
Opens a picker. Left and right arrows change the effort level on models that support it. The choice is saved as your default.

## Example
Plan the tax-band redesign on Opus, then `/model sonnet` for the edits.

## Notes
- Press `s` on a row to switch for this session only.
- Agents can set their own model, like [test-runner](../test-runner/) on Haiku.
