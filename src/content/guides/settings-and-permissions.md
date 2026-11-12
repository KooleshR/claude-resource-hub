---
title: "settings.json and permissions"
summary: "Where Claude Code's settings live, and the allow, ask and deny rules that decide what it may run, read and edit. Unlike CLAUDE.md, these are enforced."
order: 3
minutes: 8
uses: ["permissions", "permission-modes", "hooks-command", "block-dangerous-commands"]
---

CLAUDE.md is advice: Claude reads it and usually follows it. `settings.json` is enforced: Claude Code checks it before every tool call, whatever Claude decides.

## 1. Which file
| File | Who it applies to | Commit it? |
|---|---|---|
| `.claude/settings.json` | Everyone on this project | Yes |
| `.claude/settings.local.json` | Only you, on this project | No (it is git-ignored) |
| `~/.claude/settings.json` | Only you, every project | n/a |

Put team rules in the first one, so a new developer on PayFlow HR gets them on their first `git pull`.

## 2. Allow, ask, deny
```json
{
  "permissions": {
    "allow": ["Bash(mvn -q test *)", "Bash(git status)", "Bash(git diff *)"],
    "ask":   ["Bash(git commit *)"],
    "deny":  ["Bash(git push --force *)", "Read(./.env)", "Read(./secrets/**)"]
  }
}
```
- **deny** is checked first, then **ask**, then **allow**. An allow rule can never undo a deny.
- `*` matches anything: `Bash(mvn -q test *)` allows `mvn -q test -Dtest=PayslipTest`.
- `Read(./secrets/**)` covers every file under that folder.

## 3. Windows: add PowerShell rules too
On Windows Claude may run commands through PowerShell instead of Bash. A `Bash(...)` rule does not cover that, so repeat the important ones:
```json
"deny": ["Bash(git push --force *)", "PowerShell(git push --force *)", "PowerShell(Remove-Item *)"]
```

## 4. Check what is active
```
/permissions
```
It lists every rule by file. Choosing "Yes, and don't ask again" on a prompt adds an allow rule here, so look through it now and then.

## 5. Where hooks fit
A rule matches the command text. A [hook](../safety-net/) is a script, so it can catch what a pattern can't, like `git push -f` written a different way or a password inside a file. Use both: rules first, hooks behind them.
