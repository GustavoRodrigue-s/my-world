# 0011 — Design tokens in DTCG JSON, built with Style Dictionary

- **Status:** accepted — generated output no longer committed since [0013](0013-tokens-match-production-built-at-build-time.md)
- **Date:** 2026-10-26
- **Supersedes:** [0003](0003-themes-as-typed-sources.md)

## Context

Colors lived in TypeScript `ThemeContract` objects turned into CSS by a custom
script in `packages/ui`. Base tokens (radius, spacing, motion, z) were in three
places with conflicting values: an unused `base.ts`, the `:root` of `base.css`
and the overrides in `identity.css` (the only ones in effect). Gustavo wants the
design system usable later on any technology or platform, not only this web app.

## Decision

- The source of every token is **JSON in the DTCG 2025.10 format** in
  `packages/design-system/tokens/` (`base.json`, `portfolio.json`, `chapel.json`).
  Each theme has full `light` and `dark` color sets; night values that don't
  change alias the day value.
- **Style Dictionary 5** (`packages/design-system/build.mjs`) builds it into
  `generated/css/tokens.css` (base, on `:root`), `generated/css/<theme>.css`
  (scoped to `[data-env]`, day/night/print, via a custom format) and
  `generated/tokens.json` (resolved values for code). Another platform is another
  entry in `platforms`.
- Generated files are committed and never hand-edited; `pnpm tokens` rebuilds
  them, and `turbo build` rebuilds them before the web app.

## Why

DTCG is the vendor-neutral format (Style Dictionary, Tokens Studio / Figma,
other platforms read it); TypeScript is only readable by JavaScript tooling.
Style Dictionary is the standard transformer, so new outputs don't need custom
code. Consolidating the base tokens removes three conflicting copies.

## Alternatives considered

- **Keep the TS themes** — not portable beyond JS.
- **CSS as the source** (Tailwind v4 CSS-first) — removes the build step, but
  ties the tokens to the web.
- **JSON with our own script** — portable source, but every new platform would
  need hand-written output code.

## Consequences

- CSS can't import JSON, so the build step stays — it is the price of a
  portable source.
- Colors keep both `components` (what the spec reads) and `hex` (what a person
  edits); the build fails if they disagree.
- The TypeScript `ThemeContract` check is gone; a theme missing a token shows
  up as a missing color. The build output is the review point.
- Consumers: `apps/web` imports `@my-world/design-system/css/*.css`; the
  `/identity` palette and `generate:brand` read `tokens` from the package.
- Unused base tokens kept for now (e.g. `radius-md`…`2xl`, `z-*`): prune them
  when the legacy utilities in `globals.css` go.
