---
title: "spec-reviewer"
type: agent
origin: ours
step: agent
stacks: ["all"]
summary: "Reviews a change twice, kept apart: does it follow your Standards, and does it do what the ticket asked (and nothing more)?"
whenToUse: "After implementing a ticket, before the PR or MR. Give it the ticket or spec file."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/spec-reviewer.md -OutFile .claude/agents/spec-reviewer.md\nNew-Item -ItemType Directory -Force .claude/hooks | Out-Null\nirm {files}/hooks/subagent-command-allowlist.mjs -OutFile .claude/hooks/subagent-command-allowlist.mjs"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/spec-reviewer.md -o .claude/agents/spec-reviewer.md\nmkdir -p .claude/hooks\ncurl -fsSL {files}/hooks/subagent-command-allowlist.mjs -o .claude/hooks/subagent-command-allowlist.mjs"
run: "> use the spec-reviewer agent, ticket: .scratch/leave-carry-over/ticket-02.md"
related: ["code-reviewer","to-tickets","implementer"]
lastVerified: "2026-11-12"
---
## What it does
A normal review asks "is this code good?". This one also asks "is this the code the ticket asked for?". It reviews Standards first and writes it up, then goes through the ticket line by line: done, tested, or missing, and anything extra nobody asked for. Each finding is marked **hard** or **judgement call**.

## Example
```
> use the spec-reviewer agent, ticket: .scratch/leave-carry-over/ticket-02.md
```
```
## Spec
P1 [hard] Requirement 2 "carry over at most 5 days" · not tested
P2 [judgement call] Adds a CSV export the ticket did not ask for
Summary: 1 hard, 1 judgement call. Ready to merge: no
```

## Notes
- It reviews uncommitted work too: it diffs against the base, not just commits.
- Pairs with [to-tickets](../to-tickets/) and the [implementer](../implementer/): tickets in, code out, then this checks one against the other.
