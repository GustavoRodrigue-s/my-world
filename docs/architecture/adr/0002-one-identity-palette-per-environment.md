# 0002 — One personal identity for the whole world, a palette per environment

- **Status:** accepted
- **Date:** 2026-10-16 (identity) · 2026-10-18 (worn by every environment)
- **Supersedes:** the Capela's original navy/gold chrome with Inter and rounded cards

## Context

Gustavo asked for "something very characteristic and mine — avoid generic design
patterns — that I'll use as my visual identity for everything". Each environment
used to have its own look.

## Decision

One identity, "Mundo do Gustavo": the G-orbit mark, paper + ink + one rubric red
(ember at night), Bricolage Grotesque + Cormorant Garamond italic (one
emphasized word) + IBM Plex Mono, and the devices of a technical plate /
illuminated manuscript. Every environment wears it through `@my-world/ui`;
only the palette (and, for the Capela, the dialect — [0004](0004-chapel-flat-dialect.md))
changes per environment. The portfolio components were extracted into the library.

## Why

One ownable identity across portfolio, résumé, Capela and future spaces, while
each place keeps its own mood. Recruiters still reach the CV in one click.

## Alternatives considered

- **A separate design per environment** — what existed before; no shared
  identity, duplicated components.

## Consequences

Build every screen from `@my-world/ui`; add to the library rather than styling
raw HTML. The identity rules in [design-system/identity.md](../../design-system/identity.md)
apply everywhere. The old Capela designs must not be reintroduced.
