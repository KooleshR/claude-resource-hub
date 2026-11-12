# Claude Resource Hub — Planning Notes

Living record of decisions made while planning. Becomes `PLAN.md` once approved.

## Goal
An internal website for developers that gathers every Claude resource in one place
(skills, MCP servers, hooks, sub-agents, plugins, commands, harnesses). Searching a
resource (e.g. "code review") shows what it is, how to install it, the command to run
it, and an example. End result: a deployed, good-looking, animated website.

## Decisions so far

| # | Topic | Decision |
|---|---|---|
| 1 | Audience | Training cohort (demo of what was built) **and** SIL developers |
| 2 | Stacks covered | Java/Spring, JSF, React, Astro, Angular, .NET, Python, Node, SQL (SQL Server / Oracle), mobile |
| 3 | Claude products | **Claude Code only** (CLI + VS Code + IntelliJ). Optional short "Building with the Claude API" note |
| 4 | Contributors | Only the author for now; contribution flow is a later nice-to-have |
| 5 | Report examples | Make generic — fictional **"PayFlow HR"** payroll system (JSF + Spring Boot backend, React dashboard, Oracle DB, Maven) replaces company-specific content |
| 6 | Deliverable | Deployed website; design to be reviewed together; decisions kept in this file |
| 7 | Visibility / hosting | Author's **personal GitHub** account, public/private decided later. GitHub Pages sites are public even from a private repo (Pages on a private repo needs GitHub Pro) → all content must stay generic, no company data |
| 11 | Design | **Mix**: bold editorial awwwards-style home (big type, scroll animation, loader) + clean, readable docs-style reference pages |
| 12 | Branding | **Neutral** "Claude Resource Hub", no SIL branding (reusable by any company) |
| 13 | Launch size | **~40 resources**, each verified with an example; expand later on request |
| 14 | Entry template | What it does · When to use · Install (copy button) · How to run · Example · Source link · Tags (type + stack) |
| 15 | Home page | Layered: hero with big search → "Start here" path → resource types grid → browse by stack → featured resources |
| 8 | AI search | No API key yet → ship smart (fuzzy) search first; AI "Ask" built behind a switch, off by default |
| 9 | Source control | GitHub |
| 10 | Framework | Astro |

## Open questions
- None. Round 3 answered: PowerShell + Bash tabs ✅ · "last verified" dates ✅ · "How this site was built" page ✅ · name "Claude Resource Hub" / repo `claude-resource-hub` ✅
- Full plan written to `PLAN.md`, waiting for approval

## Phases (draft)
0. Plan → `PLAN.md`
1. Research & verify real resources (every install command checked against its source)
2. Author generic resources (agents, skills, hooks, CLAUDE.md templates)
3. Design (find/check awwwards-style skill, fonts, colours, loader, scroll animation, mock-up)
4. Build (Astro, content collection, search, filters, detail pages, guides, cheat sheet)
5. AI search (behind feature flag)
6. Deploy (repo, CI, internal hosting)
7. Test & handover ("How to add a resource" page)

## Source material
- `docs/claude-code-technical-guide.md` (+ images) — basis for Guides, Cheat sheet, Glossary
