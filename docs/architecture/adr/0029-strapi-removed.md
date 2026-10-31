# 0029 — Strapi is removed from the repository

- **Status:** accepted
- **Date:** 2026-10-30
- **Supersedes:** the legacy status of `apps/cms` left by [0007](0007-content-in-mdx.md)

## Context

Content moved to MDX (0007) and Estudos proved it. `apps/cms`, its client, types,
webhook and `docker-compose.yml` had no consumer; `pnpm dev` still started them.

## Decision

Remove `apps/cms`, `lib/strapi-client.ts`, `/api/revalidate`, the Strapi types and
env vars, the Strapi branch of `/api/search` and `docs/guides/strapi.md`. The Capela
reads `lib/mock-data.ts` until it gets its content in MDX.

## Why

Code nobody runs still has to be read, installed and updated.

## Consequences

The code stays in git history. Any content that lived only in a Strapi database is
not in this repository. Env vars left in Vercel (`STRAPI_*`, `REVALIDATE_SECRET`,
`NEXT_PUBLIC_SITE_NAME`) are no longer read.
