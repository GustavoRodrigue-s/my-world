# 0021 — Every interface value is a token; drawings keep their own geometry

- **Status:** accepted
- **Date:** 2026-10-29
- **Supersedes:** the "the map's arrival sequence stays in the drawing" part of [0013](0013-tokens-match-production-built-at-build-time.md)

## Context

After 0013 the code still had values outside the design system: icon sizes and
stroke weights as numbers (`size={15} strokeWidth={1.6}`, ~60 places), hover
transforms and photo tones in brackets (`scale-[1.06]`, `rotate-[24deg]`,
`grayscale-[90%] sepia-[45%]`), keyframe factors in identity.css, the map's
arrival delays in seconds, a print zoom, one `tracking-[0.12em]`. Gustavo:
every interface in every project takes its values from the design system,
never an absolute value like `px-[15px]`.

## Decision

- **New tokens** in `base.json`: `size.icon.*` (8 → 88px), `stroke.icon`,
  `transform.scale.*` and `transform.rotate.tilt`, `filter.grayscale.*` /
  `filter.sepia.*`, `opacity.strong`, `duration.stagger`. Values snapped to the
  scale (15px icons → 16, 34/36 → 32, 44 → 48; icon strokes 1.6/1.8 → 1.5).
- **Use:** icons by class (`size-icon-md`) or by the `size` prop of the brand's
  own drawings (`Mark`, `Seal`, `CrossPattee`, `RoseWindow`); lucide's stroke
  from one `.lucide` rule; tokens with no Tailwind namespace through the var
  (`scale-(--transform-scale-zoom)`); sequences as steps of `duration.stagger`.
- **Not tokens:** a drawing's own geometry inside its viewBox (coordinates,
  stroke widths, font size, the opacity of its parts — written as SVG
  attributes), proportions (`fr` ratios, `%` inside a drawn frame, aspect
  ratios), identities (0, 1, 100%, a full or half turn), keyword properties,
  and the printed page's `@page` margins (mm, the paper's own unit).

## Why

A value with no token can't change with the brand and drifts from its
neighbors (four icon sizes within 3px). A drawing is like an image file: its
inner numbers describe the picture, not the interface; tokenizing them would
add hundreds of tokens nobody chooses.

## Alternatives considered

- **A lint/check script** — rejected by Gustavo: the rule lives in the docs and
  in review, not in a generator.
- **Tokens for grid ratios** — rejected (2026-10-29): the `fr` proportions of
  a few layouts (1.05fr, 1.1fr, 1.35fr…) are relative, each tuned to its own
  composition; a scale would name values used once. They stay in the layout.

## Consequences

- Icons and marks may look 1–2px different where they snapped to the scale.
- `Mark`, `Seal`, `CrossPattee` and `RoseWindow` take `size="sm" | … | "6xl"`,
  no longer a number. `ICON_SIZE` / `IconSize` are exported by `@my-world/ui`.
- Files: `packages/design-system/tokens/base.json`, `build.mjs` (degrees),
  `packages/ui/src/css/base.css`, `identity.css`, the components above,
  `components/world/world-map.tsx`.
