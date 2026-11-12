---
name: pr-description
description: 'Writes a clear pull request / merge request title and description from the branch diff and commits: what changed, why, how to test, risks and screenshots checklist. Use when the user asks to "write the PR/MR description", "summarise my changes for review", or before opening a PR/MR.'
---

# PR / MR description

## 1. Gather
```bash
git branch --show-current
git log --oneline <base>..HEAD          # base: origin/main, origin/master or origin/develop
git diff --stat <base>...HEAD
git diff <base>...HEAD
```
Also look for a ticket id in the branch name or commits (`PAY-123`, `#45`) and for a PR template (`.github/pull_request_template.md`, `.gitlab/merge_request_templates/*.md`). **If a template exists, fill that instead of the format below.**

## 2. Write
**Title:** `<type>(<area>): <what, in imperative>`, max ~70 chars, e.g. `feat(payslip): add overtime line to monthly payslip`. Types: feat, fix, refactor, perf, test, docs, chore, build, ci.

**Body:**
```markdown
## What
- <user-visible change 1>
- <change 2>

## Why
<problem or ticket, 1–3 sentences>. Closes PAY-123.

## How
<approach and the key decision, only if not obvious from the diff>

## How to test
1. <step>
2. <expected result>

## Risk & rollout
- DB migration: yes/no (<file>), reversible: yes/no
- Config / env var changes: <list or none>
- Breaking API changes: <list or none>

## Screenshots
<before / after for UI changes, or "n/a">
```

## Rules
- Describe behaviour, not a file-by-file diff list.
- Mention anything a reviewer could miss: migrations, feature flags, new dependencies, removed endpoints.
- Don't invent test steps you can't infer; mark them `TODO` for the author.
- Show the result to the user; only create the PR/MR (`gh pr create` / `glab mr create`) if they ask.
