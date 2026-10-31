# 0028 — Half steps, loose opacities and stray radii are gone from the interface

- **Status:** accepted
- **Date:** 2026-10-30
- **Supersedes:** —

## Context

An audit against [0021](0021-every-interface-value-is-a-token.md) found values that
passed as tokens but weren't: Tailwind's half steps (`gap-2.5`, 10px, off the 4px
grid), `bg-surface/85`, `backdrop-blur-md`, `rounded-full`, `rotate-12`, `rotate-45`,
`0.01ms`, and spacing steps with no entry in `space`.

## Decision

- Half steps go up to the next step of the grid; 2px rails use
  `border.width.strong`, small dots `size.icon.*`.
- New tokens: `space.7/9/11/28/36/52/60/96`, `opacity.wash` and `opacity.edge`,
  `filter.blur.glass`, `transform.rotate.diamond`, `duration.instant`. A translucent
  color is a named one (`surface-glass`, `support-edge`, `support-wash`).
- Tracking stays on its scale: `display` keeps −0.05em rather than production's
  −0.042em, which has no token.
- The emphasized word stays `font.scale.emphasis` × its title, in whole pixels (78,
  52, 39…): a token-driven optical correction, deliberately off the size scale.

## Why

The rule only holds if a reader of the code can't find a value outside it.

## Consequences

Small visual shifts of 1–4px in gaps and paddings. Allowed exceptions are still those
of 0021: drawings' own geometry, `fr` and `%` proportions, identities, computed styles.
