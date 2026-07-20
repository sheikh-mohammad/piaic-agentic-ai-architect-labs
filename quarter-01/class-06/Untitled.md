# Project: my-app

## Stack

Next.js 14, TypeScript, Postgres, Drizzle ORM.

## Commands

- `npm run dev`: start local server
- `npm test`: run vitest
- `npm run db:migrate`: apply migrations

## Critical rules

- Never edit files in `src/generated/`. They're rebuilt by codegen.
- All API routes use the auth middleware in `src/lib/auth.ts`.

## External references

When you encounter @docs/conventions.md or @docs/db-schema.md, load them
on a need-to-know basis with the read tool. Do not preemptively load all
references; only load what's relevant to the current task.
