---
title: "awesome-claude-code-subagents"
type: agent
origin: community
step: agent
stacks: ["all"]
summary: "A community collection of 100+ ready-made agents, grouped into plugins by area."
whenToUse: "You need a starting point for an agent role you have not written yet."
install:
  powershell: "claude plugin marketplace add VoltAgent/awesome-claude-code-subagents\nclaude plugin install voltagent-lang"
  bash: "claude plugin marketplace add VoltAgent/awesome-claude-code-subagents\nclaude plugin install voltagent-lang"
run: "> use the java-architect agent to review the module layout"
source: "https://github.com/VoltAgent/awesome-claude-code-subagents"
licence: "MIT"
related: ["wshobson-agents","code-reviewer"]
lastVerified: "2026-11-12"
---

## What it does
Each plugin installs a group of agents: languages, infrastructure, quality, data and more. You can also copy one `.md` file into `.claude/agents/`.

## Example
```
claude plugin install voltagent-lang
> use the java-architect agent to review the module layout
```

## Notes
- Check each agent's `tools:` line before using it. Remove tools it does not need.
