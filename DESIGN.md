# Claude Resource Hub: design

Status: **draft for discussion** (Phase 3). Method: the `awwwards` skill (juliobsz/skills @ add880b), its Phases 0–2. Nothing here is final until approved.

## 0. Brief
- **Subject:** a searchable reference of 137 Claude Code resources (commands, agents, skills, hooks, MCP, plugins, harnesses): what each does, how to install, how to run, an example.
- **Audience:** developers in the training cohort and beyond, any stack (Java/JSF, React, Angular, .NET, Python, Node…). Also trainers and reviewers judging the work.
- **The site's job:** get a developer from "what is a hook?" to "installed and working" in under two minutes. Second job: show craft (training assignment, Awwwards-style bar).
- **Scale of theatre:** mixed by decision (option d). Home page earns a short loader, one signature moment and smooth scroll. Reference pages are calm docs: same type, colour and hover system, no theatrics.
- **Constraints:** neutral branding (no Anthropic or company look, no clay/orange); GitHub Pages static; fonts self-hosted; `prefers-reduced-motion` fully designed; light **and** dark (it's a docs site people use all day, so both get designed).
- **Assumptions:** no photography; imagery is typographic and diagrammatic. Copy is written by us.

## 1. Concepts

| | A. The prompt (material) | B. The card catalogue (formal) | C. One session (process) |
|---|---|---|---|
| Idea | The site is a terminal: every resource is a command you can run | 137 resources filed like a library card index, one drawer per type | **Scroll is one Claude Code session. Each resource type lives at the moment it acts** |
| Anchor | Claude Code runs in a terminal; every entry has an install line | the site literally is a catalogue with 7 types | Claude Code's real lifecycle: SessionStart → prompt → tool calls → Stop (the hook events) |
| Layout rule | one column of "output" | drawers and index cards | a single **session line** runs down the page with event ticks; content hangs off it |
| Motion verb | type and return | file and pull | **fire on the event**: things snap in when the line reaches their event, like a hook firing |
| Signature | hero types the query, results print below | the type drawers slide out | a cursor travels the session line as you scroll; at each event the resources that act there light up (hooks at PreToolUse, MCP at the tool call, agents at SubagentStart…) |
| Screenshot | a prompt with printed results | an open drawer of cards | the lifecycle with "PreToolUse" lit and 8 hooks hanging from it |
| O / F / Fe / P | 3 / 4 / 5 / **4** | 3 / 3 / 4 / 3 | **4 / 5 / 4 / 2** |

**Pick C.** It is the only one that *teaches* (the lifecycle is the thing beginners don't get: when does a hook run vs. a skill vs. an agent?), and it can't be moved to another site. The swap test fails, which is good: it only works for Claude Code.
**Steal from A** for the hero search (a prompt-style input, the `/` key opens it) and for the 404: `PreToolUse: blocked (exit 2). This page doesn't exist.`

### Concept card
```
Idea:        Scroll is one Claude Code session; each kind of resource appears at the moment it acts.
Metaphor:    the agent loop and its hook events
Signature:   the session line: a scroll-driven cursor lights each event and the resources that act there
Emotion:     "oh, THAT's where it fits" — clarity, precision, calm confidence
Motion verb: fire on the event: a short snap (120–200 ms) with a tiny overshoot, then settle
Screenshot:  PreToolUse lit, its hooks fanned out, the cursor mid-line
```
Home order stays as decided (hero search → Start here → types → stacks → featured); the **types section becomes the session line**.

How the 7 types map to the session:
| Event on the line | Types that act there |
|---|---|
| Before: setup | plugins (install bundles), harness (CLI, IDE, headless, GitHub Action) |
| SessionStart | CLAUDE.md, modes, `session-branch-check` |
| UserPromptSubmit | commands (`/review`, `/rewind`…), skills chosen |
| SubagentStart | agents |
| PreToolUse | hooks that guard (block-dangerous, secret-guard) |
| Tool call | MCP servers (context7, github, playwright…) |
| PostToolUse | hooks that tidy (auto-format, compile-check) |
| Stop | tests-before-stop, notify |

## 2. Art direction: options to choose from

### Type (pick one)
| | Display | Text / UI | Code | Character |
|---|---|---|---|---|
| **T1 (recommended)** | Archivo, expanded width, 800 | Archivo normal width, 400/500 | Geist Mono | One family, two personalities. The width axis can *move* with the session line (events "widen" as they fire). Docs pages stay normal width and very readable |
| T2 | Switzer 600 | Switzer 400 | JetBrains Mono | Neutral Swiss, closest free to Neue Montreal. Quiet, very "tool" |
| T3 | Bricolage Grotesque 700 | Host Grotesk 400 | IBM Plex Mono | Expressive and warmer, more personality, less "docs" |

Mono is used **only for real commands and code**, never as decoration (an AI tell).

### Palette (pick one)
| | Ground | Ink | Muted | Accent (an event firing) | Dark mode ground / ink / accent |
|---|---|---|---|---|---|
| **P1 Signal (recommended)** | `#F2F3F5` cool paper | `#0D0F12` | `#596070` | `#2F4BFF` cobalt | `#0B0D10` / `#E6E8EC` / `#8C9BFF` |
| P2 Field | `#FFD84D` yellow field (home only), `#F7F7F4` docs | `#111111` | `#4F4F4F` | `#111111` ink (the field is the colour) | `#121212` / `#EDEDED` / `#FFD84D` |
| P3 Mono | `#FFFFFF` | `#000000` | `#5C5C5C` | none: weight and width carry the hierarchy | `#000000` / `#FFFFFF` / none |

Accent is used rarely: the lit event, focus ring, the active filter, selection colour.

### Grid, shape, motion
- 12 columns, gutter `clamp(16px, 2.2vw, 32px)`; content hangs from 3 lines: col 1 (session line), col 3 (text), col 8 (meta). Phone: 4 columns, line on the left edge.
- Radius: **0 on layout, 6 px on interactive controls** (inputs, buttons, chips).
- Eases: one family, `expo.out` for entrances, `power2.inOut` for the scroll cursor. Durations: small 180 ms, medium 420 ms, large 800 ms.
- Hover (primary targets): the label's inner span slides up one line and a new copy rolls in (letter roll); cards: the session-line tick for its type "fires" (accent dot snaps in). Utility links: underline draws.
- Idle state: the session cursor breathes (1 px pulse) at the last fired event; off under reduced motion.
- Loader: "SessionStart". A counter counts the real search index loading (`0 → 137 resources`), max 1.6 s, then the counter's line becomes the session line (continuous handoff). First visit only.
- Page transition: the session line extends across the screen and wipes to the next page (View Transitions in Astro).
- Reduced motion: no loader, no Lenis, no scrub; every event shown already lit; all content visible.

### Wireframes
```
HOME / HERO (poster)                       TYPES = SESSION LINE (sticky narrative)
┌──────────────────────────────────────┐   ┌───────┬──────────────────────────────┐
│ Claude Resource Hub        Browse  ◐ │   │   ○   │ Before · plugins, harness    │
│                                      │   │   │   │                              │
│ Every Claude Code                    │   │   ●───┼─ PreToolUse  ← lit           │
│ resource, at the                     │   │   │   │  block-dangerous · secret-…  │
│ moment it acts.                      │   │   │   │  8 hooks →                   │
│                                      │   │   ○   │ Tool call · MCP              │
│ ┌──────────────────────────────────┐ │   │   │   │                              │
│ │ /  search 137 resources…    ⌘K   │ │   │   ○   │ Stop                         │
│ └──────────────────────────────────┘ │   └───────┴──────────────────────────────┘
│ 137 resources · 7 types · 10 stacks  │
└──────────────────────────────────────┘

RESOURCE PAGE (docs, calm)
┌──────────┬────────────────────────────────┬───────────┐
│ ● hook   │ block-dangerous-commands       │ On this   │
│ filters  │ PreToolUse · ours · all stacks │ page      │
│ (sidebar)│ Blocks force-push, rm -rf…     │           │
│          │ [PowerShell | Bash]  install   │ Verified  │
│          │ $ copy …                  copy │ 2026-11   │
│          │ What it does / Example / Notes │           │
└──────────┴────────────────────────────────┴───────────┘
```

### Genericness test
"Would a generic model land here?" A generic docs hub = centred hero over a gradient, three feature cards, purple. Changed: no cards row (the session line replaces it), no gradient, left-hung poster type, cobalt only as the "firing" signal.

## 3. Open questions for the discussion
1. Concept C OK? (or A/B)
2. Type T1 / T2 / T3?
3. Palette P1 / P2 / P3?
4. Loader yes (first visit, ≤1.6 s) or no loader?
