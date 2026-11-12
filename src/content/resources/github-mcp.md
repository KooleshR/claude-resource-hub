---
title: "GitHub MCP"
type: mcp
origin: official
step: tool
stacks: ["all"]
summary: "Read and write issues, pull requests and repos from the session."
whenToUse: "When work starts from an issue or ends in a PR and you want to stay in the terminal."
install:
  powershell: "/plugin install github@claude-plugins-official"
  bash: "/plugin install github@claude-plugins-official"
run: "> read issue 128 and plan the fix"
source: "https://github.com/github/github-mcp-server"
related: ["github-actions","code-review"]
lastVerified: "2026-11-12"
---

## What it does
Exposes GitHub as tools: list and read issues, comment, open PRs, search code.

## Example
```
> read issue 128 (payslip PDF shows the wrong month) and plan the fix
```

## Notes
- Needs a GitHub token. Give it the smallest scope that works.
