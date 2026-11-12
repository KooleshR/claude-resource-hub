---
title: "spring-boot-conventions"
type: skill
origin: ours
step: prompt
stacks: ["java","jsf"]
summary: "Spring Boot rules Claude follows when it writes or reviews Java: layers, transactions, DTOs, JPA."
whenToUse: "In any Spring or Spring + JSF project, so generated code matches what a senior reviewer expects."
install:
  powershell: "New-Item -ItemType Directory -Force .claude/skills/spring-boot-conventions | Out-Null\nirm {files}/skills/spring-boot-conventions/SKILL.md -OutFile .claude/skills/spring-boot-conventions/SKILL.md"
  bash: "mkdir -p .claude/skills/spring-boot-conventions\ncurl -fsSL {files}/skills/spring-boot-conventions/SKILL.md -o .claude/skills/spring-boot-conventions/SKILL.md"
run: "> add a service to approve leave requests\n/spring-boot-conventions"
related: ["code-reviewer","test-writer"]
lastVerified: "2026-11-12"
---

## What it does
Loads by itself when Claude works on Spring code. Covers `web → service → repository → entity`, `@Transactional` on services, DTOs at the edge, BigDecimal for money and constructor injection.

## Example
Ask for a leave approval service and you get a `LeaveApprovalService` with a read-only transaction default, a DTO and a slice test, not a controller calling the repository.

## Notes
- Your CLAUDE.md wins when it disagrees.
