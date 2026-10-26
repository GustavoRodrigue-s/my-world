# 0006 — One world with spaces; the home is a map

- **Status:** accepted
- **Date:** 2026-10-18 (Capela moved to `/chapel`) · 2026-10-25 (the map)
- **Supersedes:** `/` redirecting to `/portfolio`; the 2025 biography home

## Context

The Capela lived at the root; then `/` redirected to the portfolio. More spaces
are coming (Projetos, Estudos). A "solar system" home (each space a planet) was
considered and dropped.

## Decision

It is **one world (one planet) with spaces**, like Fig. 1. `/` is the world's
home: an old sea chart ("carta do mundo") with every place drawn in its state,
the atlas below as the accessible navigation, and the diário de bordo. Every
environment wears a `WorldBar` back to it. Routes are English; the Capela lives
under `/chapel` (old root paths redirect).

## Why

The world metaphor already existed (Fig. 1: workshop and chapel on one planet);
a map shows every place and its state at once and gives each space a way home.

## Alternatives considered

- **Solar system** — implied separate worlds; Gustavo wants one.
- **Redirect to the portfolio** — hides the other spaces.
- **Biography home** — he keeps his personal life private.

## Consequences

New spaces get a place glyph, a trail and an atlas entry. Details:
[design-system/home-map.md](../../design-system/home-map.md), [product/spaces.md](../../product/spaces.md).
