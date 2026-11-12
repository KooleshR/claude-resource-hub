---
title: "implementer"
type: agent
origin: ours
step: agent
stacks: ["all"]
summary: "Builds one ticket test-first in your project's style, after you approve its plan."
whenToUse: "You have small tickets (from to-tickets or your tracker) and want each one done the same way."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/implementer.md -OutFile .claude/agents/implementer.md"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/implementer.md -o .claude/agents/implementer.md"
run: "> use the implementer agent on ticket 03-overtime-totals.md"
related: ["to-tickets","test-runner","code-reviewer"]
demo: "implementer"
lastVerified: "2026-11-12"
---

## What it does
Reads the ticket and similar code, shows a plan (tests first, files to change, what is out of scope) and waits. After approval it works in red-green loops and reports the suite result.

## Example
```
Plan: 03 overtime totals
Tests first:
- totals_sumOvertimePerDepartment
- totals_ignoreCancelledShifts
Files to change:
- OvertimeReportService.java: add totals
```

## Notes
- It never says "done" without the test suite result.
