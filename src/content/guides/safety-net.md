---
title: "A safety net of hooks"
summary: "Four small hooks that stop dangerous commands, keep secrets out of files, compile after every edit and make sure the tests ran. Ten minutes to set up."
order: 2
minutes: 10
uses: ["block-dangerous-commands", "secret-guard", "compile-check", "tests-before-stop"]
---

A hook is a script Claude Code runs at a fixed moment in the session. It reads a JSON event on standard input. If it exits with **code 2**, the action is blocked and its message goes back to Claude, which then changes course.

## 1. Download the four hooks
PowerShell:
```
New-Item -ItemType Directory -Force .claude/hooks | Out-Null
foreach ($h in 'block-dangerous-commands','secret-guard','compile-check','tests-before-stop') {
  irm "{files}/hooks/$h.mjs" -OutFile ".claude/hooks/$h.mjs"
}
```
Bash:
```
mkdir -p .claude/hooks
for h in block-dangerous-commands secret-guard compile-check tests-before-stop; do
  curl -fsSL "{files}/hooks/$h.mjs" -o ".claude/hooks/$h.mjs"
done
```
They need Node 18 or later, nothing else.

## 2. Register them
Copy the `hooks` block from [settings.example.json]({files}/hooks/settings.example.json) into `.claude/settings.json`. Keep the parts you want. The matchers say which tool each hook watches:

| Hook | Event | Matcher |
|---|---|---|
| block-dangerous-commands | PreToolUse | `Bash\|PowerShell` |
| secret-guard | PreToolUse | `Edit\|Write\|MultiEdit` |
| compile-check | PostToolUse | `Edit\|Write\|MultiEdit` |
| tests-before-stop | Stop | none |

On Windows Claude can run commands through PowerShell as well as Bash, so a command guard must match both.

## 3. Check they load
Restart Claude Code and run `/hooks`. You should see all four. Then try it:
```
> run git push --force origin main
```
The hook blocks it and Claude explains why.

## 4. Commit the folder
`.claude/hooks/` and `.claude/settings.json` go in git, so the whole team gets the same safety net. Personal tweaks go in `.claude/settings.local.json`, which stays out of git.
