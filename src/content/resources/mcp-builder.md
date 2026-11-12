---
title: "mcp-builder"
type: skill
origin: official
step: prompt
stacks: ["all"]
summary: "A guide for building your own MCP server to connect Claude to an internal system."
whenToUse: "No existing MCP server fits one of your internal tools."
install:
  powershell: "npx skills add anthropics/skills --skill mcp-builder -a claude-code"
  bash: "npx skills add anthropics/skills --skill mcp-builder -a claude-code"
run: "> help me build a read-only MCP server for our leave API"
source: "https://github.com/anthropics/skills"
related: ["github-mcp","gitlab-mcp","mcp"]
lastVerified: "2026-11-12"
---

## What it does
Walks Claude through designing the tools, writing the server (TypeScript or Python) and testing it.

## Example
```
> help me build a read-only MCP server that lists leave requests from our HR API
```

## Notes
- Start read-only. Let the server hold the credentials, never the prompt.
