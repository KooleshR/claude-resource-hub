---
title: "Before you install anything"
summary: "A skill, hook, agent or MCP server runs with your permissions, inside your project. Seven checks that take five minutes."
order: 4
minutes: 5
uses: ["skills", "plugin", "mcp", "permissions"]
---

Installing a skill feels like adding a document. It isn't always: a skill can include scripts, a hook runs on every tool call, and an MCP server can reach other systems with your credentials.

## The checklist
1. **Who publishes it?** Prefer official sources (Anthropic, the tool's own vendor) and maintainers you recognise. A high install count is not a security check.
2. **Read it.** Open the `SKILL.md`, the agent `.md`, or the hook script. If you can't follow what it does, don't install it.
3. **Look for scripts.** Any `.py`, `.js`, `.sh` or `.ps1` in the folder runs on your machine.
4. **Preview first.** List what is inside before installing:
   ```
   npx skills add owner/repo --list
   ```
5. **Try it on a copy.** A sandbox repo, never straight into a client project.
6. **Keep only what you use.** Every skill and plugin adds its name and description to Claude's context. Check with `/skills` and `/context`.
7. **Never give it secrets.** Tokens go in environment variables, not in files, settings or the chat.

## An example
Say a "payroll-report" skill from a listing site includes `scripts/export.py`. Reading it shows it sends the report to a web address you don't know. That is the moment to stop, even if the skill has thousands of installs.

## When Claude Code itself says no
In auto mode, Claude Code may refuse a command like `npx some-package` because it downloads and runs code nobody has checked. That is working as intended. Look the package up first (`npm view some-package`), and if you decide it is fine, run it yourself with `!` in front.
