---
title: "compile-check"
type: hook
origin: ours
step: post
stacks: ["java","react","angular","astro","node"]
summary: "Compiles after each edit and shows Claude the errors straight away."
whenToUse: "In typed projects (Java, TypeScript, Astro), so broken code never piles up."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/hooks | Out-Null\nirm {files}/hooks/compile-check.mjs -OutFile .claude/hooks/compile-check.mjs"
  bash: "mkdir -p .claude/hooks\ncurl -fsSL {files}/hooks/compile-check.mjs -o .claude/hooks/compile-check.mjs"
run: "// .claude/settings.json\n\"PostToolUse\": [{ \"matcher\": \"Edit|Write|MultiEdit\", \"hooks\": [{ \"type\": \"command\",\n  \"command\": \"node \\\"${CLAUDE_PROJECT_DIR}/.claude/hooks/compile-check.mjs\\\"\", \"timeout\": 300 }] }]"
related: ["tests-before-stop","block-dangerous-commands"]
lastVerified: "2026-11-12"
---

## What it does
Detects the build (Maven, Gradle, tsc, astro check) and compiles after Claude edits a source file. Errors go back to Claude, which fixes them in the next step.

## Example
Claude renames `getGross()` but misses a JSF bean. `mvn -q compile` fails and Claude fixes the bean before moving on.

## Notes
- Set a long timeout: a first Maven compile can be slow.
