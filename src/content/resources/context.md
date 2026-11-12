---
title: "/context"
type: command
origin: official
step: prompt
stacks: ["all"]
summary: "Shows what is using the context window: files, tools, MCP servers, memory."
whenToUse: "When Claude gets slow or forgetful, to see what is taking the space."
run: "/context"
source: "https://code.claude.com/docs/en/commands"
related: ["compact"]
lastVerified: "2026-11-12"
---

## What it does
Draws the context window as a grid and lists each part with its token count.

## Example
You find three MCP servers you never use taking a large share. Turn them off with `/mcp`.

## Notes
- Big CLAUDE.md files and many MCP tools are the usual causes.
