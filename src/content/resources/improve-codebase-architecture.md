---
title: "improve-codebase-architecture"
type: skill
origin: community
step: prompt
stacks: ["all"]
summary: "Looks for structural improvements: deeper modules, clearer boundaries, less duplication."
whenToUse: "After a few features, when the code starts to feel tangled."
install:
  powershell: "npx skills add mattpocock/skills --skill improve-codebase-architecture -a claude-code"
  bash: "npx skills add mattpocock/skills --skill improve-codebase-architecture -a claude-code"
run: "/improve-codebase-architecture"
source: "https://github.com/mattpocock/skills"
licence: "MIT"
related: ["plan-mode","code-reviewer"]
lastVerified: "2026-11-12"
---

## What it does
Reads a module and proposes changes to its shape, not its style: what to merge, what to hide behind one interface, what to split.

## Example
In PayFlow HR it suggests putting the three tax-band lookups behind one `TaxTable` so the payslip code stops knowing where rates come from.

## Notes
- Read the proposal in [plan mode](../plan-mode/) before letting it edit.
