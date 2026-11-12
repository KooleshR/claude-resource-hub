---
title: "Your first hour with Claude Code"
summary: "Install it, give it your project's rules, plan a change, build it and get it reviewed. One small PayFlow HR feature, start to finish."
order: 1
minutes: 15
uses: ["claude-code-cli", "init", "plan-mode", "rewind", "code-reviewer", "code-review"]
---

The task: PayFlow HR needs an **overtime rate** field on the employee form, used when the payslip is calculated.

## 1. Install and open the project
```
irm https://claude.ai/install.ps1 | iex
cd payflow-hr
claude
```
On macOS or Linux use `curl -fsSL https://claude.ai/install.sh | bash`. Accept the trust prompt for the folder: project hooks and agent hooks only run in trusted folders.

## 2. Give it the rules
```
/init
```
Open the new `CLAUDE.md` and add what only your team knows:
```
- Money is BigDecimal, scale 2, HALF_UP. Never double.
- Run `mvn verify` before saying a change is done.
- JSF beans call one service method each. No repositories in beans.
```

## 3. Plan before you build
Press **Shift+Tab** until the footer shows plan mode, then:
```
> add an overtimeRate field to Employee, show it on the employee form,
  and use it in PayslipCalculator for hours over 45 a week
```
Claude reads the entity, the form, the bean and the calculator, then shows a plan. Ask questions, change the plan, and approve it when it is right.

## 4. Build, and undo if needed
Claude edits the files and runs the build. If it goes the wrong way, press **Esc Esc** and rewind to the prompt before the edit. Your files go back with it.

## 5. Review before the PR
```
> use the code-reviewer agent on my changes
/code-review high
```
The agent checks your conventions, `/code-review` hunts bugs. Fix what they find, then commit.

## What you used
Every step above has its own page with install and run commands, listed below.
