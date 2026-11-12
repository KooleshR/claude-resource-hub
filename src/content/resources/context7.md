---
title: "context7"
type: mcp
origin: community
step: tool
stacks: ["all"]
summary: "Gives Claude current docs for the libraries you use, instead of what it remembers."
whenToUse: "When Claude writes code for an old version of a library, or for a fast-moving one (Astro, Next, Angular)."
install:
  powershell: "/plugin install context7@claude-plugins-official"
  bash: "/plugin install context7@claude-plugins-official"
run: "> how do I configure a content collection in Astro? use context7"
source: "https://github.com/upstash/context7"
related: ["plugin","playwright-mcp"]
featured: true
lastVerified: "2026-11-12"
---

## What it does
An MCP server with two tools: find a library, then fetch the docs for a question. Claude calls them before it answers.

## Example
```
> add Spring Boot 3 problem-details error handling. use context7
```

## Notes
- Without the plugin: `claude mcp add --transport http context7 https://mcp.context7.com/mcp`.
