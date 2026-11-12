---
title: "log-analyzer"
type: agent
origin: ours
step: agent
stacks: ["java","jsf","node","dotnet","python"]
summary: "Paste a stack trace or give a log path. It finds the exact line in your code, the likely cause and the fix."
whenToUse: "You have an exception or a log full of errors and need to know where to look."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/log-analyzer.md -OutFile .claude/agents/log-analyzer.md"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/log-analyzer.md -o .claude/agents/log-analyzer.md"
run: "> use the log-analyzer agent on logs/payflow.log"
related: ["bug-hunter","diagnosing-bugs","feature-mapper"]
lastVerified: "2026-11-12"
---
## What it does
Reads the trace, skips the framework frames (Tomcat, Spring, Hibernate, JSF, Node, .NET, Python), finds the first frame in your own code, opens that file and explains the likely cause and the fix. Read-only.

## Example
```
> use the log-analyzer agent on logs/payflow.log
```
"`LazyInitializationException` at `PayslipBean.java:57`: the page reads `employee.allowances` after the transaction closed. Fetch it in the service query (`JOIN FETCH`) instead."

## Notes
- Remove passwords and personal data from a log before you paste it.
