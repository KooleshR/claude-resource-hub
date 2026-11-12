---
title: "GitHub Actions"
type: harness
origin: official
step: setup
stacks: ["all"]
summary: "Claude in your CI: mention @claude on a PR or issue and it answers or opens a PR."
whenToUse: "When you want reviews or small fixes to happen on GitHub, not on a laptop."
install:
  powershell: "/install-github-app"
  bash: "/install-github-app"
run: "# .github/workflows/claude.yml\n- uses: anthropics/claude-code-action@v1\n  with:\n    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}"
source: "https://code.claude.com/docs/en/github-actions"
related: ["headless","code-review"]
lastVerified: "2026-11-12"
---

## What it does
`/install-github-app` installs the app and writes the workflow. After that, a comment like "@claude fix the failing payslip test" on a PR starts a run.

## Example
On a PayFlow PR: "@claude add a test for the 13th-month bonus edge case".

## Notes
- The API key lives in repository secrets, never in the workflow file.
