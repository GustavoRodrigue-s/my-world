# 0025 — Type changes in whole steps at breakpoints, one step below production

- **Status:** accepted
- **Date:** 2026-10-30
- **Supersedes:** the `world.fluid` curves of [0013](0013-tokens-match-production-built-at-build-time.md)

## Context

Fluid sizes (`clamp` with `vw`) rendered fractions such as 84.48px, and the
line-height ratios gave 29.25px. Gustavo finds titles too large and wants no
broken values: a size either is a token or isn't used.

## Decision

- A role has fixed steps of the scale, one per breakpoint (`world.responsive`),
  taking production's size to the nearest step of the scale. Sizes in px, at base · md 768 · lg 1024 · xl 1280:

  | Role | Steps | Production |
  |---|---|---|
  | `display`, `display-serif` | 36 · 48 · 72 · 72 | 42 · 50.7 · 67.6 · 84.5 |
  | `headline`, `headline-serif` | 30 · 30 · 48 · 48 | 32 · 32.3 · 43 · 53.8 |
  | `title` | 20 · 20 · 24 · 24 | 22 · 22 · 22.5 · 28 |
  | `title-sm` | 18 | 19 |
  | `lead` | 18 · 18 · 18 · 20 | 18 · 18 · 18 · 20.5 |
  | `callout` | 18 · 20 · 30 · 30 | 18 · 23 · 30.7 · 34 |

- Production's 17px texts (section intros, the About paragraphs, spec-sheet leads,
  bylines, the résumé's role) are `base`, 16px. Long reading text in Estudos and the
  Capela stays at `lg`, 18px.
- `font.size.2xs` (10px, production's size) exists only for the header's subtitle.
- Line-height ratios stay the tokens; the rendered value is rounded to a whole
  pixel with CSS `round()`, and so is the emphasized word (1.08em).

## Why

The ratios were already close to production (1 against 0.96–1.02 on large titles,
1.625 against 1.6 on text), so only the rounding changes; the exception is `title`
(1.25 against 1.12), the nearer token above. Steps are simple to read in the
inspector and to reason about on any device.

## Alternatives considered

- **Keeping `vw`, rounding the size** — whole pixels, but values off the scale.

## Consequences

Between breakpoints a title holds its size instead of growing. `round()` needs
Chrome 125, Safari 15.4 or Firefox 118; an older browser falls back to its normal
line height. `build.mjs` writes the media queries into `tokens.css`.
