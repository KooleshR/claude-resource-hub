# PayFlow Portal (React): Claude instructions

Employee self-service portal: payslips, leave requests, profile.

## Commands
- Install: `pnpm install`
- Dev: `pnpm dev` (http://localhost:5173)
- Type check: `pnpm typecheck` · Lint: `pnpm lint` · Test: `pnpm test` (Vitest)
- Build: `pnpm build`

## Stack
React 19, TypeScript (strict), Vite, React Router, TanStack Query, Tailwind CSS, Vitest + Testing Library, MSW for API mocks.

## Layout
- `src/features/<feature>/`: components, hooks, api, tests for one feature
- `src/components/ui/`: shared, presentational only
- `src/lib/api.ts`: the only place that calls `fetch`

## Rules
- Function components and hooks only. Props typed with `type`, not `interface`.
- Server data goes through TanStack Query. No `useEffect` for fetching.
- Accessible by default: semantic elements, labels on every input, visible focus.
- Currency and dates via `Intl` helpers in `src/lib/format.ts`.
- Tests query by role/label. New components get a test (use the `react-component` skill).

## Before you finish
`pnpm typecheck && pnpm lint && pnpm test` must pass.

## Don't
- No new dependencies without asking.
- Don't edit `src/lib/api.generated.ts`; it's generated from OpenAPI (`pnpm gen:api`).
