# PayFlow Notifications (Node): Claude instructions

Service that sends payslip-ready and leave-approval notifications (email and in-app).

## Commands
- Install: `npm ci`
- Dev: `npm run dev` · Build: `npm run build`
- Test: `npm test` (node:test or Vitest, see `package.json`) · Lint: `npm run lint`
- Type check: `npx tsc --noEmit`

## Stack
Node 22 LTS, TypeScript (ESM, strict), Fastify, Zod, Prisma (PostgreSQL), BullMQ (Redis), Pino logging.

## Layout
`src/routes/`, `src/services/`, `src/jobs/` (queue workers), `src/lib/`, `prisma/schema.prisma`, `test/`.

## Rules
- ESM imports with `.js` extensions in TS source (NodeNext resolution).
- Validate every request body and job payload with Zod.
- Workers are idempotent: a retried job must not send the same email twice (use the `notification_log` unique key).
- Config from `src/lib/config.ts` only (parsed from env with Zod); never read `process.env` elsewhere.
- Pino structured logs; never log email bodies or personal data.
- Schema changes: `npx prisma migrate dev --name <desc>`.

## Before you finish
`npx tsc --noEmit && npm run lint && npm test` must pass.

## Don't
- No `any`, no callbacks where `async`/`await` works, no new dependencies without asking.
