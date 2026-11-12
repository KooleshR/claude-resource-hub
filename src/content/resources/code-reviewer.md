---
title: "code-reviewer"
type: agent
origin: ours
step: agent
stacks: ["all"]
summary: "A read-only reviewer agent: correctness, tests and your conventions. It cannot edit files."
whenToUse: "When a change is done and you want a second pair of eyes before the PR."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/code-reviewer.md -OutFile .claude/agents/code-reviewer.md\nNew-Item -ItemType Directory -Force .claude/hooks | Out-Null\nirm {files}/hooks/subagent-command-allowlist.mjs -OutFile .claude/hooks/subagent-command-allowlist.mjs"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/code-reviewer.md -o .claude/agents/code-reviewer.md\nmkdir -p .claude/hooks\ncurl -fsSL {files}/hooks/subagent-command-allowlist.mjs -o .claude/hooks/subagent-command-allowlist.mjs"
run: "> use the code-reviewer agent on my changes"
related: ["code-review","test-writer","explore-agent"]
featured: true
start: 5
demo: "code-reviewer"
lastVerified: "2026-11-12"
---

## What it does
Reviews the working tree and branch against main. Its own hook only lets it run read-only git and search commands, so it cannot change anything.

## Example
```
> use the code-reviewer agent on my changes
```
On a PayFlow change it caught a net-pay total held in a `double`: "Use BigDecimal, rounding drifts by a cent on large runs."

## Notes
- The hook in its frontmatter only runs when the project folder is trusted. Accept the trust prompt the first time you open the project.
- On Windows Claude runs commands through PowerShell as well as Bash, so the allowlist checks both.
