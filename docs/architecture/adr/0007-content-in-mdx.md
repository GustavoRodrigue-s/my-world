# 0007 — Content in MDX in the repo instead of Strapi

- **Status:** accepted (not implemented)
- **Date:** 2026-10-25
- **Supersedes:** Strapi 5 as the content source (`apps/cms`)

## Context

Strapi was set up for the Capela's studies but never wired: pages read
`lib/mock-data.ts`. Gustavo is the only editor. Projetos and Estudos are coming.

## Decision

Content (projects, studies, notes) is **MDX in the repository**. No headless CMS.
When something needs a backend (the Capela's candles), use Next.js API routes on
Vercel plus a small database.

## Why

One editor doesn't need a CMS: MDX is versioned with the code, reviewable,
free to host, readable by agents, and removes Docker/Postgres/Strapi from the
stack.

## Alternatives considered

- **Strapi (current)** — a server, a database and tokens to maintain for one
  author.
- **A hosted CMS** — cost and lock-in for no editorial team.

## Consequences

Still to do: choose the MDX setup, move `lib/mock-data.ts` studies to MDX,
replace `strapi-client` and `/api/revalidate`, then retire `apps/cms` and
`docker-compose.yml`. Until then, [guides/strapi.md](../../guides/strapi.md)
documents the legacy setup.
