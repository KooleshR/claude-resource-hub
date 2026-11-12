---
title: "Claude Agent SDK"
type: harness
origin: official
step: setup
stacks: ["node","python"]
summary: "The engine behind Claude Code as a library, to build your own agents in TypeScript or Python."
whenToUse: "You want the same loop, tools, permissions and hooks inside your own program."
install:
  powershell: "npm install @anthropic-ai/claude-agent-sdk\n# or\npip install claude-agent-sdk"
  bash: "npm install @anthropic-ai/claude-agent-sdk\n# or\npip install claude-agent-sdk"
run: "import { query } from '@anthropic-ai/claude-agent-sdk';\nfor await (const m of query({ prompt: 'summarise the last commit' })) console.log(m);"
source: "https://platform.claude.com/docs/en/agent-sdk/overview"
related: ["headless","github-actions"]
lastVerified: "2026-11-12"
---

## What it does
Gives you `query()`: send a prompt, get back the stream of messages and tool calls. You choose the tools, permissions, agents and hooks in code.

## Example
A nightly script that asks an agent to read new payroll import errors and open one ticket per kind of error.

## Notes
- For one-off scripts, `claude -p` ([headless](../headless/)) is often enough.
