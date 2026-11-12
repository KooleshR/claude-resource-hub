---
title: "! and @"
type: command
origin: official
step: prompt
stacks: ["all"]
summary: "! runs a shell command yourself and shares the output. @ points Claude at a file."
whenToUse: "Running something Claude is not allowed to run, or giving it the exact file to look at."
run: "! mvn -q test\n> explain @src/main/java/com/payflow/PayslipCalculator.java"
source: "https://code.claude.com/docs/en/interactive-mode"
related: ["permissions","context"]
lastVerified: "2026-11-12"
---

## What it does
A line starting with `!` runs in your shell. The output goes into the session and Claude responds to it. `@` autocompletes a file path and adds that file to the message.

## Example
```
! mvn -q test
> the two failures above: fix them
```

## Notes
- `!` is handy for interactive logins Claude can't do, like `! gh auth login`.
