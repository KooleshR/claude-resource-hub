---
title: "feature-scaffolder"
type: agent
origin: ours
step: agent
stacks: ["java","jsf","react","angular","dotnet"]
summary: "Creates the files for a new CRUD feature by copying your project's own patterns. Shows the file list first."
whenToUse: "You need a new screen or entity that looks like the ones you already have."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/agents | Out-Null\nirm {files}/agents/feature-scaffolder.md -OutFile .claude/agents/feature-scaffolder.md"
  bash: "mkdir -p .claude/agents\ncurl -fsSL {files}/agents/feature-scaffolder.md -o .claude/agents/feature-scaffolder.md"
run: "> use the feature-scaffolder agent: add a Public Holiday screen"
related: ["feature-mapper","implementer","spring-boot-conventions"]
lastVerified: "2026-11-12"
---
## What it does
Finds an existing feature like the one you want, copies its shape (entity, repository, service, controller or JSF bean, pages, tests, labels, config registrations), and lists every file it will create. It waits for your approval, then writes them.

## Example
```
> use the feature-scaffolder agent: add a Public Holiday screen
```

## Notes
- It copies your conventions, good and bad. Point it at your best feature as the model.
