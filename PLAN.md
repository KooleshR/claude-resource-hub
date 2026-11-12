# Claude Resource Hub — Plan

**Status:** Draft v1 for approval · 2026-11-12
**Decisions log:** `PLANNING-NOTES.md`

---

## 1. Goal

A deployed, animated website where a developer searches for a Claude Code resource
(e.g. "code review") and gets everything on one page: what it is, when to use it, how to
install it, the command to run it, an example, and where it comes from.

**Scope:** Claude Code only (terminal, VS Code, IntelliJ). Neutral branding, generic
content, so anyone can reuse it. All company examples become the fictional **PayFlow HR**
payroll system (JSF + Spring Boot, React dashboard, Oracle, Maven).

**Success criteria**
- Live URL on GitHub Pages
- 40 resources, each checked against its source and dated "last verified"
- Search finds any resource in under 2 keystrokes of its name (fuzzy, typo-tolerant)
- Awwwards-style home page (loader + scroll animation) that stays fast and readable
- Works on mobile, in light and dark mode, and with keyboard only
- "How this site was built" page documenting the skills/agents/hooks used

---

## 2. Content model

### 2.1 Resource types
| Type | Meaning |
|---|---|
| `command` | Built-in slash command or built-in skill (`/init`, `/code-review`) |
| `agent` | Sub-agent (built-in or our own `.claude/agents/*.md`) |
| `skill` | Skill folder with `SKILL.md` (official, community or our own) |
| `hook` | Script that runs automatically on a Claude Code event |
| `mcp` | MCP server connecting Claude Code to an external tool |
| `plugin` | Plugin / marketplace bundle |
| `harness` | Ways to run Claude Code outside the chat (headless, CI) |

### 2.2 Stacks (tags)
`java` · `jsf` · `spring` · `react` · `angular` · `astro` · `dotnet` · `python` · `node` · `sql` · `mobile` · `any`

### 2.3 Entry fields (one Markdown file per resource)
```yaml
title: Code Reviewer
slug: code-reviewer
type: agent                      # one of 2.1
origin: ours                     # official | community | ours
stacks: [any]
summary: One line shown on cards and in search.
whenToUse: [ "...", "..." ]
install:
  powershell: "..."
  bash: "..."
run: "Use the code-reviewer agent on my staged changes"
source: https://...              # repo / docs URL (for ours: link to file in this repo)
related: [bug-hunter, security-review]
lastVerified: 2026-11-12
claudeCodeVersion: "2.1.x"
```
Body (Markdown): **What it does → Example → Notes / gotchas**, plus the full file for
resources we wrote, so people can copy it.

---

## 3. Launch resources

> **Update 2026-11-12:** expanded from 40 to **137** after Phase 1. The full verified
> list is in `research/verified-resources.md` and replaces the original list below.
> The list below is kept for reference only.

### Original 40 (replaced)

`O` = official/built-in · `C` = community · `ours` = written for this site.
Every `O`/`C` entry is checked in Phase 1; anything that can't be checked gets replaced.

### A. Built-in commands & skills (8)
1. `/init`: generate CLAUDE.md (O)
2. `/code-review`: review a diff/PR at an effort level (O)
3. `/security-review`: security pass over changes (O)
4. `/simplify`: clean up changed code (O)
5. `/memory` + CLAUDE.md: project memory (O)
6. `/compact` & `/clear`: managing context (O)
7. `/permissions` & modes: allow/deny rules, plan/auto mode (O)
8. `/loop` & `/schedule`: recurring and scheduled tasks (O)

### B. Built-in agents (2)
9. Explore agent (O)
10. Plan agent (O)

### C. Official & community skills / plugins (5)
11. skill-creator (O)
12. frontend-design (O)
13. Document skills: pdf, docx, xlsx, pptx (O)
14. webapp-testing (Playwright-based) (O)
15. Plugin marketplaces & skills.sh: finding more (O/C)

### D. MCP servers (7)
16. Context7: up-to-date library docs (C)
17. GitHub MCP (O)
18. GitLab MCP (C/O, to verify)
19. Playwright MCP: browser testing (O)
20. Chrome DevTools MCP: debugging a running page (O)
21. Atlassian MCP: Jira / Confluence (O)
22. Sentry MCP: production errors (O)

### E. Our sub-agents (6): `ours`
23. code-reviewer: correctness, readability, conventions
24. bug-hunter: reproduce, isolate, root-cause, fix, regression test
25. test-writer: JUnit 5 / Jest / pytest, tests written first
26. codebase-architect: maps modules, proposes structure, writes ADRs
27. security-auditor: OWASP Top 10, secrets, dependency risks
28. refactor-planner: safe, step-by-step refactor plans

### F. Our skills (6): `ours`
29. codebase-design: architecture review & layering rules
30. pr-description: PR/MR description from the diff
31. spring-boot-conventions: Java/Spring/JSF project rules (PayFlow example)
32. react-component: component + test + story pattern
33. db-migration: Flyway/Liquibase migration with rollback (Oracle/SQL Server)
34. accessibility-audit: WCAG checks for React/Angular/Astro/JSF pages

### G. Our hooks (4): `ours`
35. block-dangerous-commands: refuses `git push --force`, `rm -rf`, `DROP TABLE` (PreToolUse)
36. auto-format: runs formatter after edits (PostToolUse; Prettier / Spotless / dotnet format / ruff)
37. tests-before-stop: runs tests before Claude finishes (Stop)
38. session-branch-check: warns if branch is behind main (SessionStart)

### H. Harnesses (2)
39. Headless mode: `claude -p` in scripts (O)
40. Claude Code GitHub Actions: review/fix PRs in CI (O)

**Also included (not counted as resources):** CLAUDE.md templates for Java/Spring/JSF,
React, Angular, Astro, .NET, Python, Node; a page that gives Angular, .NET, Python and
mobile developers their own entry point.

---

## 4. Site map

| Route | Content |
|---|---|
| `/` | Loader → hero + big search → Start here (3 steps) → Types grid → Browse by stack → Featured |
| `/resources` | All resources, filter by type / stack / origin, sort |
| `/resources/[slug]` | Resource detail (template in 2.3) with copy buttons, PS/Bash tabs, related |
| `/types/[type]` | Landing page per type, explaining it (e.g. "What is a hook?") + list |
| `/stacks/[stack]` | "Claude Code for Java developers" etc. + matching resources + CLAUDE.md template |
| `/guides/[slug]` | From the report: Install (Windows), First 30 minutes, How it works, Configuration, Dev workflow, Create your first hook/skill/agent |
| `/templates` | CLAUDE.md templates per stack |
| `/cheatsheet` | Command reference (report §6), searchable |
| `/glossary` | Report §8 |
| `/built-with` | How this site was built: skills, agents, hooks, prompts used |
| `/contribute` | How to add a resource (one Markdown file + PR) |

**Global:** search modal (`/` or `Ctrl+K`), theme toggle, "Ask AI" button (hidden until enabled).

---

## 5. Tech stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro 5** (static output) | Fast, content collections with schema validation |
| Content | Astro content collections + Zod schema | Build fails if an entry is missing a field |
| Styling | CSS custom properties + scoped Astro styles | Light/dark tokens, no heavy framework |
| Code blocks | Shiki (built into Astro) | Syntax highlighting, light/dark themes |
| Search | **Fuse.js** over a JSON index generated at build time | Instant, typo-tolerant, no server |
| Animation | **GSAP + ScrollTrigger**, **Lenis** smooth scroll | Awwwards-style reveals; respects `prefers-reduced-motion` |
| Fonts | Self-hosted via Fontsource (display + sans + mono), final pick in Phase 3 | No external requests, fast |
| Islands | Vanilla TS (React only if a component really needs it) | Smaller JS bundle |
| Hosting | **GitHub Pages** via GitHub Actions (`withastro/action`) | Free, personal account |
| AI (later) | "Ask" box → serverless proxy (Cloudflare Worker or Vercel function) → Claude API | GitHub Pages can't hold an API key; feature-flagged off |

---

## 6. Folder structure
```
claude-resource-hub/
├─ .claude/                 # agents, skills, hooks used to BUILD the site (shown on /built-with)
├─ .github/workflows/deploy.yml
├─ docs/                    # source report (not published)
├─ public/                  # favicon, images, downloadable resource files
├─ src/
│  ├─ content/
│  │  ├─ resources/         # 40 × .md
│  │  ├─ guides/            # from the report, made generic
│  │  └─ templates/         # CLAUDE.md per stack
│  ├─ content.config.ts     # Zod schemas
│  ├─ components/           # Card, SearchModal, CopyButton, Tabs, Loader, Hero...
│  ├─ layouts/              # BaseLayout, DocLayout
│  ├─ pages/                # routes from §4 + search-index.json.ts
│  ├─ scripts/              # animations, search, theme
│  └─ styles/               # tokens.css, global.css
├─ resources-src/           # real files for "ours" agents/skills/hooks (linked from entries)
├─ PLAN.md · PLANNING-NOTES.md · README.md
```

---

## 7. Phases

Each phase ends with a check-in: I show you the result, you approve before the next phase.

### Phase 0: Plan ✅ (this document)
- [x] You approve PLAN.md (2026-11-12)
- [x] `git init` (branch `main`) + `.gitignore`
- [ ] Create `claude-resource-hub` repo on your GitHub (you create it or give the go-ahead)

### Phase 1 status ✅ (2026-11-12)
- [x] 137 resources listed and checked → `research/verified-resources.md`
- [ ] 2 partial entries (#96, #111) to check again before publishing

### Phase 1: Research & verify
- For each `O`/`C` resource: confirm it exists, get the exact install/run command from its official source, record URL + date
- Use: claude-code-guide agent, Context7, official docs/repos
- Replace anything that can't be checked
- **Done when:** a verified table of 19 external resources with sources

### Phase 2: Write our own resources ✅ (2026-11-12)
- [x] 10 agents (`resources-src/agents/`), 8 skills (`resources-src/skills/*/SKILL.md`), 8 hooks + `settings.example.json` (`resources-src/hooks/`, single Node `.mjs` per hook, works under PowerShell and Bash), 7 CLAUDE.md templates (`resources-src/claude-md/`)
- [x] Hooks: `node --test resources-src/hooks/hooks.test.mjs`, 7/7 pass; compile-check tested on a real Maven sample (exit 2 on broken, 0 on fixed)
- [x] Agents/skills: frontmatter validated + strict YAML parse (18/18); Claude Code 2.1.322 loads all 10 agents and the 7 model-invoked skills (`feature-pipeline` is `/`-only by design)
- [x] Live runs on the PayFlow sample: code-reviewer found the `double`-for-money bug and CLAUDE.md rule breaks; its allowlist hook blocked `mvn -q compile` (status 2); `build-and-package` auto-triggered from "package this project"
- **Gotcha for the site (put in hook/agent entry Notes):** agent-frontmatter hooks are **skipped in folders that haven't passed the trust dialog** (log: "Skipping frontmatter hooks … not trusted"). Open the project in Claude Code once and accept trust. Also: on Windows, allowlist both `Bash` and `PowerShell` tools.

### Phase 3: Design (in progress)
- [x] awwwards + jury skills (juliobsz/skills @ add880b, MIT) read in full and vetted, copied into `.claude/skills/` (pinned, `SOURCE.txt`)
- [x] Brief, 3 concepts, art-direction options → `DESIGN.md`; clickable mock-up → `design/mockup.html` (stack counts in it are placeholders)
- [ ] User picks concept / type / palette / loader → finalise DESIGN.md
- Search for and check an awwwards / design skill (skills.sh / marketplaces); check it before installing (source, what it runs). Fallback: official `frontend-design` skill
- Choose: font pairing (2–3 options), colour tokens (light + dark), loader, scroll motion
- **Mock-up of the home page + a resource detail page** for your approval
- **Done when:** you approve the look

### Phase 4: Build
1. Astro scaffold, tokens, base layout, theme toggle
2. Content schema + 137 entries (research/verified-resources.md) + guides (generic PayFlow) + templates
3. Resource list, filters, detail pages, type & stack pages
4. Search index + Ctrl+K modal
5. Home page with loader and GSAP/Lenis animation
6. Cheatsheet, glossary, built-with, contribute
- **Done when:** `npm run build` passes, all pages render locally

### Phase 5: AI "Ask" (feature-flagged)
- UI + client code ready, behind `PUBLIC_AI_ENABLED=false`
- Document how to deploy the proxy once an API key exists
- **Done when:** flag off = invisible; setup steps written

### Phase 6: Deploy
- GitHub Actions workflow → GitHub Pages; set `site`/`base` in `astro.config`
- Build check on every push (schema + link check)
- **Done when:** live URL works

### Phase 7: Test & hand over
- Browser test: desktop, mobile width, dark mode, keyboard, reduced motion
- Lighthouse (aim ≥ 90 performance / accessibility), broken-link check
- README + /contribute page
- **Done when:** checklist green, demo ready

---

## 8. Risks

| Risk | Mitigation |
|---|---|
| Commands change between Claude Code versions | `lastVerified` + `claudeCodeVersion` on every entry; quick re-check script |
| Unverified third-party skills/MCP servers are a security risk | Origin badge; "Before installing" checklist from the report on each community entry |
| Heavy animation hurts speed/accessibility | Animate only the home page; `prefers-reduced-motion` turns it off; Lighthouse budget |
| Public by default on GitHub Pages | Generic content only (PayFlow), no company data |
| AI needs a key and a server | Feature flag; proxy documented, not required for launch |

---

## 9. Next action
Approve this plan (or tell me what to change) → I start **Phase 0 close-out** (git init)
and **Phase 1** research.
