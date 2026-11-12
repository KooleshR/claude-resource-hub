---
title: "feature-mapper"
type: agent
origin: ours
step: agent
stacks: ["java","jsf","dotnet","node"]
summary: "Give it a screen, label, table or error. It returns every file involved, page to database, with line numbers."
whenToUse: "Before changing or fixing something in a large codebase you don't know well."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/feature-mapper.md -OutFile .claude/agents/feature-mapper.md\nNew-Item -ItemType Directory -Force .claude/hooks | Out-Null\nirm {files}/hooks/subagent-command-allowlist.mjs -OutFile .claude/hooks/subagent-command-allowlist.mjs"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/feature-mapper.md -o .claude/agents/feature-mapper.md\nmkdir -p .claude/hooks\ncurl -fsSL {files}/hooks/subagent-command-allowlist.mjs -o .claude/hooks/subagent-command-allowlist.mjs"
run: "> use the feature-mapper agent: the \"Approve leave\" button"
related: ["explore-agent","implementer","improve-codebase-architecture"]
lastVerified: "2026-11-12"
---
## What it does
Follows the chain both ways: page → controller or JSF bean → service → repository → entity → table, then who else calls the same methods. It returns a short map with `file:line`, the labels and reports involved, and nothing else: no fixes, no plans.

## Example
```
> use the feature-mapper agent: the "Approve leave" button
```
```
Page:        src/main/webapp/pages/leave/requests.xhtml · approve, reject
Controller:  leave/web/LeaveRequestBean.java:88 · approve()
Service:     leave/service/LeaveService.java:41 · approve(id, approver)
Repository:  leave/repository/LeaveRepository.java · findPendingByManager
Entity:      leave/domain/LeaveRequest.java · LEAVE_REQUEST
Also used by: LeaveApprovalJob.java:30 (nightly auto-approve)
```

## Notes
- That "Also used by" line is the one that saves you: change `approve()` and the nightly job changes too.
- `model: haiku`: mapping is search work, not deep reasoning, so it is fast and cheap.
- Adapted from an agent we use on a large Java/JSF codebase, made generic.
