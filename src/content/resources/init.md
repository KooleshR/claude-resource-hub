---
title: "/init"
type: command
origin: official
step: start
stacks: ["all"]
summary: "Writes a starter CLAUDE.md by reading your project."
whenToUse: "The first time you open Claude Code in a project, so every later session knows the build, test and style rules."
run: "/init"
source: "https://code.claude.com/docs/en/memory"
related: ["claude-code-cli","memory"]
start: 2
lastVerified: "2026-11-12"
---

## What it does
Scans the repo (build files, folders, scripts) and writes `CLAUDE.md` at the root. Claude reads that file at the start of every session.

## Example
In PayFlow HR, `/init` picks up `mvn verify` as the test command and the `web → service → repository` layering. Edit the file afterwards: add the rules only your team knows, like "money is always BigDecimal".

## Notes
- Keep CLAUDE.md short. Long files cost context on every session.
- The [templates](../../templates/) page has a ready CLAUDE.md per stack.
