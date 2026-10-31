# 0005 — Unfinished spaces are badged and closed, never removed

- **Status:** accepted
- **Date:** 2026-10-25
- **Supersedes:** —

## Context

The Capela is being rethought and Gustavo isn't working on it now; he wants the
public blocked from it until a specific moment. Removing it would lose its place
in the world and its code.

## Decision

Each space has a status in `lib/world.ts`: `open`, `building` (exists, closed to
the public) or `planned` (on the drawing board, nothing to enter). A middleware
rewrites every page of a closed space to its own `/under-construction/<space>`
page (same URL, `noindex`). Everything pointing into it (footer links, 404,
search, sitemap) asks `canEnter()` / `isUnderConstruction()` and shows the badge
"em construção". The builder can still enter in `next dev` and on Vercel preview
deployments; `SHOW_UNDER_CONSTRUCTION` overrides.

## Why

Visitors see the world is growing; the work stays visible to its builder;
one switch opens or closes a space everywhere.

## Alternatives considered

- **Delete or unlink the space** — loses its place and history.
- **A feature-flag service** — overkill for one person.

## Consequences

Mechanics: [overview.md → Spaces under construction](../overview.md#spaces-under-construction).
The Capela was the first space closed (production only).
