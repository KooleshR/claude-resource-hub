---
title: "content-guard"
type: agent
origin: ours
step: agent
stacks: ["all"]
summary: "Checks everything public for personal data, secrets, internal names and unconfirmed links before you push. PASS or FAIL."
whenToUse: "Before pushing a public repo or deploying a site, especially a portfolio or docs site."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/content-guard.md -OutFile .claude/agents/content-guard.md"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/content-guard.md -o .claude/agents/content-guard.md"
run: "> use the content-guard agent before I push"
related: ["secret-guard","security-auditor","block-dangerous-commands"]
lastVerified: "2026-11-12"
---
## What it does
Scans pages, data files, `public/`, the README and docs, including HTML comments and `alt` text, for phone numbers, addresses, secrets, client or employer names and unconfirmed profile links. It answers PASS or FAIL with `file:line` for each finding, and puts borderline cases on a separate "needs a human check" list.

## Example
```
> use the content-guard agent before I push
```
```
FAIL
- [Personal details] src/data/profile.ts:14 · "+00 5xxx xxxx" · phone numbers are not allowed on the site
Needs a human check
- src/pages/about.astro:22 · "Acme Ltd" · might be a client name
```

## Notes
- Add a "Content rules" section to CLAUDE.md and it checks against your rules, not just its defaults.
- `tools: Read, Grep, Glob` only: no shell, no editing. `model: haiku` keeps it cheap enough to run before every push.
- We built this site with the same kind of check, to keep it free of company data.
