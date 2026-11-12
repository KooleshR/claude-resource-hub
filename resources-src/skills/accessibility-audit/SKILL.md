---
name: accessibility-audit
description: Step-by-step WCAG 2.2 AA accessibility check and fix guide for web UIs in React, Angular, Astro, JSF/PrimeFaces or plain HTML. Use when building or reviewing forms, navigation, modals, tables, colour themes, or when the user asks to make a page accessible. For a report-only audit across pages, use the a11y-seo-auditor agent.
---

# Accessibility audit & fix

Work through the page top to bottom. Fix as you go, with the smallest change.

## 1. Automated pass (catches ~30–40%)
If available: `npx @axe-core/cli <url>` (ask before installing), Lighthouse accessibility, `eslint-plugin-jsx-a11y` (React), `@angular-eslint/template` a11y rules, or a browser MCP running axe. Fix everything flagged first.

## 2. Manual checks (the rest)
| Check | How | Fix pattern |
|---|---|---|
| Keyboard | Tab through the whole page; Shift+Tab back | Native `<button>`/`<a href>`; `tabindex="0"` only on custom widgets; never `tabindex>0` |
| Focus visible | Every focused element visibly outlined | `:focus-visible { outline: 2px solid; outline-offset: 2px }`, never `outline: none` alone |
| Headings | One h1, logical order | Change tag, keep look with CSS |
| Labels | Click label → focuses input | `<label for>` / wrap input; framework label components |
| Errors | Error text appears and is announced | `aria-invalid="true"` + `aria-describedby` → error id; summary with links for long forms |
| Contrast | 4.5:1 text, 3:1 large text & UI | Adjust tokens, test both light and dark themes |
| Modals | Focus moves in, trapped, Esc closes, focus returns | Native `<dialog>` + `showModal()` or the UI library's dialog |
| Tables | Data tables have headers | `<th scope>`, `<caption>`; no tables for layout |
| Images | Purpose conveyed | `alt` text; `alt=""` for decoration; SVG `role="img"` + `<title>` |
| Motion | Respects user setting | `@media (prefers-reduced-motion: reduce)` disables non-essential animation |
| Zoom | 200% zoom / 320 px width without horizontal scroll | Fluid layout, `rem` units, no fixed heights on text |
| Language | Screen reader pronunciation | `<html lang="en">`; `lang` on foreign-language parts |

## 3. Framework notes
- **React:** `htmlFor`; fragments don't break lists; manage focus after route change.
- **Angular:** `cdkTrapFocus`, `LiveAnnouncer` from `@angular/cdk/a11y`.
- **Astro:** islands keep semantic HTML; `<Image alt>` is required.
- **JSF/PrimeFaces:** `h:outputLabel for`, `p:message for`, check generated ids with `prependId`.

## 4. Report
List what was fixed (file:line → WCAG criterion) and what needs a design decision (e.g. brand colour fails contrast).
