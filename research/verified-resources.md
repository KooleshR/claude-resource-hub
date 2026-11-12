# Phase 1 — Verified Resource Catalogue

**Checked:** 2026-11-12 · Claude Code 2.1.x

**Verification key**
- **L**: confirmed in the local copy of the official marketplace (`anthropics/claude-plugins-official`, `anthropics/skills`)
- **D**: confirmed in the official Claude Code docs (code.claude.com/docs)
- **R**: confirmed in the resource's own GitHub README
- **U**: used and working in the author's training projects (skills-lock.json / `.claude/`)
- **P**: partial. Repo seen, install command only from mirror listings, so check again before publishing
- **ours**: written for this site in Phase 2 and tested there

**Install patterns used below**
- Official plugin: `/plugin install <name>@claude-plugins-official`
- Anthropic skills marketplace: `/plugin marketplace add anthropics/skills`, then `/plugin install <name>@anthropic-agent-skills`
- skills CLI: `npx skills add <owner/repo> --skill <name> -a claude-code` (`--list` shows what's in a repo before you install)

---

## A. Built-in slash commands (24): D
| # | Resource | Command | Purpose |
|---|---|---|---|
| 1 | init | `/init` | Generate a starter CLAUDE.md |
| 2 | code-review | `/code-review [low…max\|ultra] [--fix] [--comment] [--max-findings n] [target]` | Bug review of a diff, branch or PR (`/review` is an alias) |
| 3 | security-review | `/security-review` | Security pass over the branch diff |
| 4 | simplify | `/simplify [target]` | Clean up changed code (reuse, efficiency). Doesn't look for bugs |
| 5 | memory | `/memory` | Edit CLAUDE.md, toggle auto memory |
| 6 | compact | `/compact [instructions]` | Summarise context to free space |
| 7 | clear | `/clear` (aliases `/reset`, `/new`) | Start a fresh context |
| 8 | context | `/context [all]` | See what's using the context window |
| 9 | rewind | `/rewind` or Esc Esc | Go back to a checkpoint (code and/or conversation) |
| 10 | resume | `/resume [session]` / `claude --continue` | Continue an earlier session |
| 11 | permissions | `/permissions` | Allow/deny rules |
| 12 | mcp | `/mcp [reconnect\|enable\|disable]` | Manage MCP servers |
| 13 | plugin | `/plugin [subcommand]` | Browse, install and disable plugins and marketplaces |
| 14 | hooks | `/hooks` | View configured hooks |
| 15 | loop | `/loop [interval] [prompt]` | Repeat a task on an interval |
| 16 | schedule | `/schedule [description]` | Scheduled cloud agents |
| 17 | batch | `/batch <instruction>` | Split big changes into parallel worktree units |
| 18 | fewer-permission-prompts | `/fewer-permission-prompts` | Build an allowlist from your history |
| 19 | doctor | `/doctor` | Check the installation |
| 20 | add-dir | `/add-dir <path>` | Give Claude access to another folder |
| 21 | statusline | `/statusline` | Custom status bar |
| 22 | output-style | `/output-style [style]` | Explanatory / Learning / Concise… |
| 23 | install-github-app | `/install-github-app` | Set up Claude in GitHub Actions |
| 24 | ide | `/ide` | Connect to VS Code / IntelliJ |

*(`/model`, `/config`, `/usage`, `/export` go in the cheat sheet only.)*

## B. Built-in agents (3): D
25 Explore (read-only search) · 26 Plan (read-only planning) · 27 general-purpose

## C. Modes & harnesses (6): D
| # | Resource | How |
|---|---|---|
| 28 | Plan mode | Shift+Tab, `/plan`, `claude --permission-mode plan` |
| 29 | Auto mode | `claude --permission-mode auto` (not allowed in project settings) |
| 30 | Worktrees | `claude --worktree <name>` / `-w` → `.claude/worktrees/<name>` |
| 31 | Headless | `claude -p "…" --output-format json` |
| 32 | GitHub Actions | `uses: anthropics/claude-code-action@v1` |
| 33 | Agent SDK | `claude-agent-sdk` (Python) · `@anthropic-ai/claude-agent-sdk` (TS) |

## D. Official Anthropic plugins (16): L
| # | Plugin | Contains | Purpose |
|---|---|---|---|
| 34 | code-review | command | Multi-agent PR review with confidence scores |
| 35 | feature-dev | `/feature-dev` + code-explorer, code-architect, code-reviewer agents | Guided feature workflow |
| 36 | pr-review-toolkit | `/review-pr` + 6 agents (silent-failure-hunter, type-design-analyzer, pr-test-analyzer…) | Specialised PR review |
| 37 | commit-commands | `/commit`, `/commit-push-pr`, `/clean_gone` | Git workflow |
| 38 | code-simplifier | agent | Refine code without changing behaviour |
| 39 | hookify | `/hookify` + rules | Make hooks from plain English. **Needs Python** |
| 40 | security-guidance | hooks | Security warnings on edits. **Needs Python** |
| 41 | claude-md-management | `/revise-claude-md` + skill | Audit and improve CLAUDE.md |
| 42 | claude-code-setup | skill | Recommends hooks/skills/MCP for your codebase |
| 43 | frontend-design | skill | Distinctive, production-grade UI |
| 44 | skill-creator | skill | Create and test your own skills |
| 45 | ralph-loop | loop | Iterative self-referential dev loop |
| 46 | mcp-server-dev | skills | Build your own MCP server |
| 47 | plugin-dev | 7 skills | Build plugins (hooks, MCP, commands) |
| 48 | session-report | command | HTML report of token/cache/agent usage |
| 49 | explanatory / learning output style | output style | Learning while you code |

## E. Anthropic skills marketplace (5): L, U
50 document-skills (pdf, docx, xlsx, pptx) · 51 webapp-testing (Playwright, U in portfolio) · 52 mcp-builder · 53 web-artifacts-builder · 54 claude-api

## F. Code intelligence (LSP) plugins (5): L, D. The language server must be installed separately
55 jdtls-lsp (Java) · 56 typescript-lsp · 57 pyright-lsp (Python) · 58 csharp-lsp (.NET) · 59 kotlin-lsp

## G. MCP / integration plugins (17): L
| # | Plugin | Stack / use |
|---|---|---|
| 60 | context7 | Up-to-date library docs (U, installed) |
| 61 | github | Issues, PRs, repos |
| 62 | gitlab | MRs, pipelines, issues |
| 63 | playwright | Browser automation & E2E |
| 64 | chrome-devtools-mcp | Debug and profile a live page |
| 65 | atlassian | Jira & Confluence |
| 66 | linear | Issue tracking |
| 67 | sentry | Production errors |
| 68 | figma | Design → code |
| 69 | oracledb | Oracle DB queries |
| 70 | mongodb | MongoDB |
| 71 | prisma | Postgres + migrations |
| 72 | terraform | IaC |
| 73 | microsoft-docs | .NET / Azure docs |
| 74 | serena | Semantic code navigation & refactoring |
| 75 | semgrep | Security scanning while coding |
| 76 | sonarqube | Quality gate in the loop |

## H. Workflow skills, community (14)
| # | Resource | Source | Install | Ver. |
|---|---|---|---|---|
| 77 | grill-me | mattpocock/skills | `npx skills add mattpocock/skills --skill grill-me -a claude-code` | R, U |
| 78 | grill-with-docs | mattpocock/skills | `--skill grill-with-docs` | U |
| 79 | tdd | mattpocock/skills | `--skill tdd` | U |
| 80 | diagnosing-bugs | mattpocock/skills | `--skill diagnosing-bugs` | U |
| 81 | codebase-design | mattpocock/skills | `--skill codebase-design` | U |
| 82 | domain-modeling | mattpocock/skills | `--skill domain-modeling` | U |
| 83 | to-spec + to-tickets | mattpocock/skills | `--skill to-spec` / `--skill to-tickets` (need `setup-matt-pocock-skills` first) | U |
| 84 | git-guardrails-claude-code | mattpocock/skills | `--skill git-guardrails-claude-code` | U |
| 85 | superpowers | obra/superpowers | `/plugin install superpowers@claude-plugins-official` (adds a SessionStart hook) | L, R |
| 86 | trailofbits security skills | trailofbits/skills | `/plugin marketplace add trailofbits/skills` | R |
| 87 | web-quality-skills | addyosmani/web-quality-skills | `npx skills add addyosmani/web-quality-skills` | R, U |
| 88 | skills CLI (skills.sh) | vercel-labs/skills | `npx skills find <q>` · `add` · `list` · `update` · `remove` | R |
| 89 | autoskills | midudev/autoskills | `npx autoskills --dry-run` → `-a claude-code`. **Node 22.6+, CC BY-NC (not for commercial use)** | R |
| 90 | awesome-claude-code | hesreallyhim/awesome-claude-code | link only | R |

## I. Stack-specific skills (18)
| # | Stack | Resource | Install | Ver. |
|---|---|---|---|---|
| 91 | Java / Spring | developer-kit (java, typescript, python, devops plugins) | `/plugin marketplace add giuseppe-trisciuoglio/developer-kit` | R, U (has scripts) |
| 92 | Spring Boot | java-springboot | `npx skills add https://github.com/github/awesome-copilot --skill java-springboot` | R |
| 93 | React / Next | vercel-labs/agent-skills (react-best-practices, composition-patterns, web-design-guidelines…) | `npx skills add vercel-labs/agent-skills` | R |
| 94 | Next.js | next.js official skills | `npx skills add vercel/next.js --skill next-cache-components-optimizer` | R |
| 95 | Angular | angular/skills (official) | `npx skills add https://github.com/angular/skills` | R |
| 96 | Astro | astrolicious astro | `npx skills add https://github.com/astrolicious/agent-skills --skill astro` | **P** |
| 97 | Tailwind | tailwind-css-patterns (developer-kit) | via skills CLI | U |
| 98 | .NET / C# | dotnet/skills (official, 16 plugins) | `/plugin marketplace add dotnet/skills` | R |
| 99 | Python / FastAPI | fastapi (official) | `npx skills add fastapi/fastapi --skill fastapi -a claude-code` | R |
| 100 | SQL / Postgres | supabase postgres-best-practices | `npx skills add supabase/agent-skills --skill supabase-postgres-best-practices` | R |
| 101 | React Native | expo | `/plugin install expo@claude-plugins-official` | L, R |
| 102 | Flutter | dart-flutter (official) | `claude plugin marketplace add flutter/agent-plugins` → `claude plugin install dart-flutter@dart-flutter` | R |
| 103 | Android | android/skills (official) | `/plugin marketplace add android/skills` → `/plugin install android-skills@android-skills` | R |
| 104 | Kotlin / Compose | chrisbanes/skills | `npx skills add chrisbanes/skills` | R |
| 105 | DevOps | cc-devops-skills (Docker, K8s, Helm, CI) | `/plugin marketplace add akin-ozer/cc-devops-skills` | R (runs scripts) |
| 106 | Terraform | hashicorp/agent-skills (official) | `npx skills add hashicorp/agent-skills` | R |
| 107 | Full stack | jeffallan/claude-skills (67 skills) | `/plugin marketplace add jeffallan/claude-skills` | R |
| 108 | Web perf | modern-web-guidance | `/plugin install modern-web-guidance@claude-plugins-official` | L |

## J. Design & motion (3)
| # | Resource | Install | Ver. | Note |
|---|---|---|---|---|
| 109 | awwwards + jury (juliobsz/skills) | `npx skills add juliobsz/skills -g -a claude-code` | R | **Runs Node scripts + installs Playwright, uses a lot of tokens.** Candidate for building this site |
| 110 | gsap-skills (official GreenSock, 8 skills) | `npx skills add https://github.com/greensock/gsap-skills` | R | No scripts. Covers ScrollTrigger |
| 111 | MengTo/Skills (awwwards, GSAP+Lenis motion) | none published | **P** | Some skills include scripts |

## K. Our own (written in Phase 2, generic "PayFlow HR" examples)
**Agents (10)**: 112 code-reviewer · 113 bug-hunter · 114 test-writer · 115 codebase-architect · 116 security-auditor · 117 refactor-planner · 118 log-analyzer (stack traces → cause) · 119 feature-scaffolder (CRUD in project style) · 120 a11y-seo-auditor · 121 stack-tutor (explains concepts while you work)

**Skills (8)**: 122 pr-description · 123 spring-boot-conventions · 124 jsf-page-review (beans, bundle keys, EL) · 125 react-component · 126 db-migration (Flyway/Liquibase, Oracle/SQL Server) · 127 accessibility-audit · 128 build-and-package (Maven/Gradle/npm/dotnet) · 129 feature-pipeline (implementer → reviewer → security → tester)

**Hooks (8)**: 130 block-dangerous-commands · 131 secret-guard · 132 auto-format · 133 compile-check (javac/tsc/astro check) · 134 tests-before-stop · 135 session-branch-check · 136 desktop-notify (Windows toast) · 137 subagent-command-allowlist

**Templates (not counted):** CLAUDE.md for Java/Spring/JSF, React, Angular, Astro, .NET, Python, Node

---

## Totals
| Group | Count |
|---|---|
| Built-in (A–C) | 33 |
| Official plugins & skills (D–G) | 43 |
| Community (H–J) | 35 |
| Ours (K) | 26 |
| **Total** | **137** |

## Excluded (and why)
- devmartinese/awwwards-animations-skill: install command contains a `YOUR_USERNAME` placeholder
- analogjs/angular-skills: deprecated, Angular says to use angular/skills
- vercel-labs/next-skills: moved to vercel/next.js
- eng0ai gsap-awwwards-website, community Lenis skills: only seen on mirror sites
- tponscr-debug/claude-skill-awwwards: 2 commits, less complete than juliobsz

## To re-check before publishing
- #96, #111 (marked P)
- MCP plugins (#60–76): also record the `claude mcp add` alternative for each from its README
- Third-party star counts and licences: show only the licence, not stars (stars go stale)
