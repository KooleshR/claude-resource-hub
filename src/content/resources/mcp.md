---
title: "/mcp"
type: command
origin: official
step: tool
stacks: ["all"]
summary: "Checks MCP server connections and signs you in. claude mcp adds, lists and removes them."
whenToUse: "Connecting a new MCP server, or when one stops answering."
run: "/mcp\n/mcp reconnect all\n\n# in a terminal\nclaude mcp list\nclaude mcp remove <name>"
source: "https://code.claude.com/docs/en/mcp"
related: ["context7","github-mcp","gitlab-mcp"]
lastVerified: "2026-11-12"
---

## What it does
Lists servers with their status (connected, failed, needs sign-in) and handles OAuth logins.

## Example
GitLab shows "needs authentication". Pick it in `/mcp`, sign in in the browser, and it turns green.

## Notes
- Scopes: `local` (you, this project), `project` (`.mcp.json`, shared with the team), `user` (you, every project).
