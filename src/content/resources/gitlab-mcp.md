---
title: "GitLab MCP"
type: mcp
origin: official
step: tool
stacks: ["all"]
summary: "GitLab's own MCP server: merge requests, issues, pipelines and code on your GitLab."
whenToUse: "Your code lives on GitLab, on gitlab.com or your own server."
install:
  powershell: "claude mcp add --transport http gitlab https://gitlab.com/api/v4/mcp\n# your own server: https://<your-gitlab>/api/v4/mcp\n# or: /plugin install gitlab@claude-plugins-official"
  bash: "claude mcp add --transport http gitlab https://gitlab.com/api/v4/mcp\n# your own server: https://<your-gitlab>/api/v4/mcp\n# or: /plugin install gitlab@claude-plugins-official"
run: "/mcp\n> using gitlab, list my open merge requests and their pipeline status"
source: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/gitlab"
related: ["github-mcp","mcp"]
lastVerified: "2026-11-12"
---

## What it does
Connects Claude to GitLab over HTTP. You sign in once with `/mcp`, then Claude can read and comment on merge requests, issues and pipelines.

## Example
```
> using gitlab, summarise why the last pipeline on payflow-hr failed
```

## Notes
- Self-managed GitLab needs a version that includes the MCP server. Ask your admin if `/api/v4/mcp` does not answer.
