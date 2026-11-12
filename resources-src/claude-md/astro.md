# PayFlow Docs site (Astro): Claude instructions

Public documentation and marketing site. Static output.

## Commands
- Dev: `npm run dev` (http://localhost:4321)
- Check: `npx astro check`
- Build: `npm run build` → `dist/` · Preview: `npm run preview`

## Stack
Astro 5, content collections (`src/content.config.ts`), MDX, Tailwind CSS, TypeScript strict. Islands only where interaction is needed (`client:visible` by default).

## Layout
`src/pages/` (routes), `src/layouts/`, `src/components/`, `src/content/docs/**.mdx`, `public/` (static files, no processing).

## Rules
- Ship zero JS unless a component needs it. Prefer `.astro` components over framework islands.
- Every content entry must pass the collection schema; add fields to the schema first.
- Images through `astro:assets` `<Image>` with `alt` (empty only for decoration).
- Internal links use `import.meta.env.BASE_URL`, not hard-coded `/`.
- Respect `prefers-reduced-motion` for any animation.
- Use the `accessibility-audit` skill for new pages.

## Before you finish
`npx astro check && npm run build` must pass with no warnings.

## Don't
- Don't edit `dist/` or `.astro/`. Don't add a framework integration without asking.
