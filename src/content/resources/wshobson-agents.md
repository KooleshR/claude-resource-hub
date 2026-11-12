---
title: "wshobson/agents"
type: agent
origin: community
step: agent
stacks: ["all"]
summary: "A large marketplace of agents, skills and multi-agent workflows, split into small plugins."
whenToUse: "You want to see how others wire several agents together."
install:
  powershell: "# inside Claude Code\n/plugin marketplace add wshobson/agents\n/plugin install python-development@claude-code-workflows"
  bash: "# inside Claude Code\n/plugin marketplace add wshobson/agents\n/plugin install python-development@claude-code-workflows"
run: "/plugin"
source: "https://github.com/wshobson/agents"
licence: "MIT"
related: ["voltagent-subagents","feature-dev"]
lastVerified: "2026-11-12"
---

## What it does
Each plugin is small and focused, so you load only the agents you use. Browse the list with `/plugin` after adding the marketplace.

## Example
```
/plugin marketplace add wshobson/agents
/plugin
```

## Notes
- Two or three agents you actually use beat fifty you don't.
