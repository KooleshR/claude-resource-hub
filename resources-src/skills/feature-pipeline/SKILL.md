---
name: feature-pipeline
description: 'Delivers one feature or ticket end to end with sub-agents: plan (wait for approval) → implement test-first → code-reviewer → security-auditor → fix findings → full test run → PR description. Use when the user says "implement ticket X", "build this feature end to end" or invokes /feature-pipeline. Needs the code-reviewer, security-auditor and test-writer agents installed.'
disable-model-invocation: true
argument-hint: "<ticket id or feature description>"
---

# Feature pipeline

Feature: **$ARGUMENTS**

Run the stages in order. Show a one-line status after each stage. Stop and ask the user whenever a stage fails twice.

## Stage 1: Understand & plan (main session, plan only)
- Read the ticket/description, CLAUDE.md and the code involved.
- Write a plan: behaviour to add, files to change, tests to write, risks, out of scope.
- **Wait for the user's approval.** Don't edit anything before it.

## Stage 2: Tests first
Use the **test-writer** agent in TDD mode: write failing tests for the approved behaviour; confirm they fail for the right reason.

## Stage 3: Implement
Main session: smallest code that makes the tests pass, following CLAUDE.md conventions. Run the new tests, then the full suite.

## Stage 4: Review (in parallel)
Start **code-reviewer** and **security-auditor** at the same time on the branch diff.

## Stage 5: Fix
Fix every *Must fix* and *Critical/High* finding. For each *Should fix*, fix it or write one line on why not. Re-run the full test suite.

## Stage 6: Finish
- Final full build + tests must pass (show the command and summary).
- Use the **pr-description** skill to draft the PR/MR text.
- Summary table:

| Stage | Result |
|---|---|
| Plan | approved |
| Tests | 6 added, failing → passing |
| Review | 2 must-fix fixed, 1 should-fix deferred (reason) |
| Security | no high findings |
| Build | `mvn -q verify` ✔ |

Never commit or push unless the user asks.
