---
title: "/plugin"
type: command
origin: official
step: setup
stacks: ["all"]
summary: "Browse, install and disable plugins and marketplaces."
whenToUse: "Whenever an entry on this site says /plugin install."
run: "/plugin\n/plugin marketplace add anthropics/skills\n/plugin install feature-dev@claude-plugins-official"
source: "https://code.claude.com/docs/en/plugins"
related: ["feature-dev","context7"]
lastVerified: "2026-11-12"
---

## What it does
Opens the plugin manager. A plugin bundles commands, agents, skills, hooks and MCP servers you install in one step.

## Example
```
/plugin install feature-dev@claude-plugins-official
```

## Notes
- The official marketplace (`claude-plugins-official`) is available by default.
- Read what a third-party plugin's hooks run before you install it.
