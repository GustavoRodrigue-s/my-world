# 0001 — Monorepo: Next.js app + shared packages with Turborepo and pnpm

- **Status:** accepted
- **Date:** 2025 (recorded 2026-10-26)
- **Supersedes:** —

## Context

One person builds several environments (portfolio, Capela, future spaces) that
share an identity, plus a CMS. Code and design must be reused without
publishing packages.

## Decision

A single repository: `apps/web` (Next.js App Router, TypeScript strict, Tailwind
v4) for every space, `apps/cms` (Strapi 5), and workspace packages
`@my-world/ui`, `@my-world/design-system`, `@my-world/types`. Turborepo runs the
tasks; pnpm workspaces link the packages.

## Why

One checkout holds everything an agent or a person needs; shared UI changes land
in one commit with the pages that use them.

## Alternatives considered

- **One repo per environment** — duplicated identity, drift between sites.
- **Separate Next.js apps per environment** — more deploys and config for no
  gain; route groups and scoped themes give the separation instead.

## Consequences

Every space is a route group in `apps/web`. Turbo cache keys must include env
vars that change the build (`SHOW_UNDER_CONSTRUCTION`, `VERCEL_ENV` in `turbo.json`).
