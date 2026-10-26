# 0003 — Themes are typed sources that generate scoped CSS

- **Status:** accepted
- **Date:** 2026-10-18 (recorded 2026-10-26)
- **Supersedes:** —

## Context

Several environments with day/night palettes share one app; after a client-side
navigation two themes can be loaded at once. Hand-written CSS variables, docs
and TS constants would drift apart.

## Decision

Tokens are data: `ThemeContract` objects in `packages/design-system/src/themes/`
(`brand` + `light` / `dark`). `packages/ui/src/generate-themes.ts` generates
`packages/ui/src/css/themes/<env>.css`, scoped to `:root:has([data-env="<env>"])`.
Components use Tailwind token utilities only — never a hex. Brand SVGs are
generated too (`npm run generate:brand`).

## Why

One source per value; the generated CSS, the `/identity` swatches and the
components can't disagree. Scoping avoids clashes between environments.

## Alternatives considered

- **DTCG JSON + Style Dictionary** — interoperable, but the only consumer is
  this web app; a typed TS object gives the same single source with less tooling.
- **Hand-written CSS per theme** — drifts.

## Consequences

Generated CSS is never hand-edited. A new token goes into `ThemeContract`, the
themes, and `base.css` (`@theme inline`) to reach Tailwind.
