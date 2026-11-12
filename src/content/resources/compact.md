---
title: "/compact"
type: command
origin: official
step: prompt
stacks: ["all"]
summary: "Summarises the conversation so far to free up context."
whenToUse: "In a long session when /context shows the window filling up and you still need the history."
run: "/compact\n/compact keep the failing tests and the plan"
source: "https://code.claude.com/docs/en/commands"
related: ["context","rewind"]
lastVerified: "2026-11-12"
---

## What it does
Replaces the conversation with a summary. Add instructions to say what must survive.

## Example
```
/compact keep the list of failing payslip tests and the agreed plan
```

## Notes
- Starting a new task? `/clear` is cleaner than compacting.
