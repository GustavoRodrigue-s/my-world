# 0017 — One search dialog for the world, scoped per space

- **Status:** accepted
- **Date:** 2026-10-26
- **Supersedes:** —

## Context

The Capela has its own search (`components/chapel/chapel-search.tsx`: native
`<dialog>`, ⌘K, debounced `/api/search`). Estudos needs the same.

## Decision

- The dialog moves to `@my-world/ui` as `SearchDialog` (variants `line` for
  Estudos, `stone` for the Capela; labels and result links passed in).
- `/api/search` takes `?space=studies|chapel` and answers only for a space the
  viewer can enter (`canEnter()`). Estudos is searched from the MDX loader's
  index (title, summary, theme, tags), never Strapi.
- Search stays per space for now; a world-wide search can come later.
- It remains the one client-side `fetch` the rules allow.

## Why

One component, one behavior, one place to fix; the space scope keeps closed
spaces from leaking through search.

## Alternatives considered

- **A copy per space** — two dialogs drifting apart.
- **World-wide search now** — mixes spaces of different status before there is
  content to justify it.

## Consequences

`ChapelSearch` is replaced by `SearchDialog`; `/api/search` drops the Strapi
branch for Estudos. Recorded in `components.md` when it moves.
