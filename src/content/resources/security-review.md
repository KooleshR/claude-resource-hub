---
title: "/security-review"
type: command
origin: official
step: prompt
stacks: ["all"]
summary: "A security pass over the changes on your branch."
whenToUse: "On any change that touches login, input handling, file upload or SQL."
run: "/security-review"
source: "https://code.claude.com/docs/en/commands"
related: ["code-review","secret-guard"]
lastVerified: "2026-11-12"
---

## What it does
Looks for injection, broken auth, secrets in code and unsafe input handling in the branch diff.

## Example
On a new payslip export endpoint it flags an employee id taken from the query string without an ownership check.

## Notes
- Pair it with the [secret-guard](../secret-guard/) hook so secrets never get written in the first place.
