# PayFlow Admin (Angular): Claude instructions

HR admin console: employees, payroll runs, approvals.

## Commands
- Dev: `npm start` (http://localhost:4200)
- Test: `npm test` · Lint: `npm run lint`
- Build: `npm run build` → `dist/payflow-admin`
- Generate: `npx ng generate component features/payroll/run-list`

## Stack
Angular 20, standalone components, signals, new control flow (`@if`, `@for`), Angular Material, RxJS for HTTP only, Jest or Vitest (see `package.json`).

## Layout
`src/app/features/<feature>/` (routes, components, services), `src/app/shared/`, `src/app/core/` (interceptors, auth guard).

## Rules
- Standalone components only, `ChangeDetectionStrategy.OnPush`.
- State with signals (`signal`, `computed`); `toSignal()` for observables in templates.
- `inject()` instead of constructor parameters in new code.
- Typed reactive forms (`FormGroup<{...}>`). Validation messages via the shared `<app-field-error>`.
- HTTP only in `*.service.ts` files; components never call `HttpClient`.
- a11y: Material components keep their ARIA; use `cdkTrapFocus` for custom dialogs.

## Before you finish
`npm run lint && npm test -- --watch=false` must pass.

## Don't
- No `NgModule`s, no `any`, no `subscribe()` without cleanup (`takeUntilDestroyed`).
