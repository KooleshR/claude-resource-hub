---
title: "Headless mode"
type: harness
origin: official
step: setup
stacks: ["all"]
summary: "Run one prompt from a script and get the result back as text or JSON."
whenToUse: "In scripts, scheduled jobs and CI, where nobody is there to type."
run: "claude -p \"list the TODOs in src/main\" --output-format json"
source: "https://code.claude.com/docs/en/headless"
related: ["github-actions"]
featured: true
lastVerified: "2026-11-12"
---

## What it does
`-p` runs a single prompt and exits. `--output-format json` adds cost, session id and the result for your script to read.

## Example
```
claude -p "summarise the changes since the last tag for the PayFlow release notes" > notes.md
```

## Notes
- Allow the tools it needs up front (`--allowedTools`), because there is nobody to approve a prompt.
