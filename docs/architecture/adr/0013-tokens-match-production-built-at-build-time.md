# 0013 — Recommended token values on a 16px base; everything generated is built at build time

- **Status:** accepted
- **Date:** 2026-10-26
- **Supersedes:** `palette.json`, the scale values and the 16px rem base of [0012](0012-agnostic-token-taxonomy.md); the "output is committed" part of [0011](0011-dtcg-tokens-with-style-dictionary.md)

## Context

0012 consolidated the hand-written sizes onto shorter scales and moved the
site's rem base from 15px to the browser's 16px. The result looked different
from production (buttons, spacing, padding, some type), which Gustavo did not
want: moving to tokens must not change the interface. The brand SVGs were
still made by a stray script in `packages/ui` (`generate-brand.ts`), apart from
the design system's build, and the generated files were committed.

## Decision

- **Type follows the recommended scale, body at 16px.** First the tokens copied
  production exactly (13 sizes from 10px to 28px, odd line heights and
  tracking); Gustavo then chose the market-standard values: sizes 12, 14, 16,
  18, 20, 24, 30, 36, 48, 60, 72, 96px; line heights 1, 1.25, 1.375, 1.5,
  1.625, 2 (plus 0.8 for a drop cap); tracking −0.05 to 0.1em. Typography roles
  point at those steps (display 48→96px, headline 36→60px, title 24→30px…).
- **rem base 16px, spacing on a 4px grid.** Production's `html { font-size: 15px }`
  made every rem value a repeating decimal (10px = 0.6667rem) and turned
  Tailwind's spacing into 3.75px steps that nobody designed. `<html>` now has
  no font size (1rem = the reader's browser setting, 16px by default), px ÷ 16
  gives clean rem (12px = 0.75rem), and `space.N` = N × 4px (8px the main
  step). Spacing grew ~6.7% (15px → 16px), accepted by Gustavo.
- **Letter spacing without `em`** (DTCG dimensions only allow px and rem): the
  scale is `number` tokens, a fraction of the font size, which the web build
  writes as em; a typography role's `letterSpacing` is px at its fontSize,
  which the web build divides by fontSize to get em (so it scales with a fluid
  size).
- **Fluid roles** keep production's curve: `world.fluid` = `{ min, viewport }`,
  built as `clamp(min, viewport·vw, fontSize)`.
- **Every interface value is a token**, used through Tailwind utilities. Widths
  that were in `ch` (the width of the "0" glyph, so a block followed its own
  font size) became `size.width.*` in px, steps of 8px, measured from what they
  rendered; small offsets snapped to the 4px grid; the dialog overlay, drop
  cap, arches, focus ring and the map's motion got tokens too. A drawing's own
  SVG coordinates and the map's arrival sequence stay in the drawing.
- **Shared colors live in `base.json`** (`color.rubric`, `color.ember`…), which
  the themes extend; the separate `palette.json` of 0012 is gone. Only the
  themes' roles reach CSS.
- **The design system builds everything generated**, at build time:
  `generated/css/*`, `generated/tokens.json` and `generated/brand/*.svg` (the
  mark's geometry moved to `packages/design-system/src/mark.ts`; `<Mark>`
  imports it). The web app copies the SVGs into `public/brand` before `dev` and
  `build` (`apps/web/scripts/copy-brand.mjs`). None of it is committed
  (`.gitignore`); Turborepo runs the design system's `build` before the web
  app's `dev`, `build` and `type-check`.

## Why

A migration that changes the look is two changes at once, and the visual one
was never asked for. Generated files in git drift from their sources and make
reviews noisy; building them every time keeps one source.

## Consequences

- The interface looks larger than production: body text 16px (was 15), titles
  up to 96px (was 88), labels at least 12px (were 10–11). Checked in the
  browser on desktop and phone.
- One intended difference: hovers now animate (150 ms). Production used
  `duration-[var(--transition-fast)]`, an invalid duration, so its hovers were
  instant.
- A fresh clone needs `pnpm build` / `pnpm dev` / `pnpm tokens` (or any turbo
  task) before the app runs; the editor shows `tokens.json` missing until then.
