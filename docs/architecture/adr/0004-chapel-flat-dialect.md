# 0004 — The Capela speaks a flat dialect with hidden gold

- **Status:** accepted
- **Date:** 2026-10-19
- **Supersedes:** the Capela as a vellum-and-gold technical plate (2026-10-18)

## Context

Wearing the full technical-plate identity, the Capela felt like a technical
drawing, not a chapel. Gustavo asked for something "more authentic, minimalist,
only lightly following" the portfolio, then for more soul: "details of older
churches, stones, gold" and the Last Supper.

## Decision

A **flat dialect** keeping only the same fonts, radius, spacing and rubric red:
palette "cal e pedra" (limewash page, solid stone bands; night "completas"), ink
and red, Cormorant upright for titles, centered openings, still pages
(`motion="still"`). Gold returns as `support-1` — the **ouro escondido**: fixed
only in small details, otherwise revealed on hover. Old-church details:
Romanesque arches (`Niche`, the niche featured panel, arched portraits), a rose
window, crosses pattée, an illuminated initial, Duccio's Last Supper veiled in
sepia until hovered. New flat components live in `@my-world/ui`.

## Why

A quiet chapel that is still recognizably part of the same world.

## Alternatives considered (rejected by Gustavo — don't propose again)

- **Any wall drawing on the stone bands**: hairline joints, a lively brick
  texture, a bevelled fortress wall, a simple joint wall. Bands are plain fills.
- **Arches on the theme cards** — they stay rectangular with a gold fillet.
- **Black and red only, without gold** — tried first; gold came back hidden.

## Consequences

Not in the Capela: ¶ numbered rubrics, `Plate`/`Folio`, `TitleBlock`,
`SpecSheet`/`Seal`, numbered `IndexList`/`TopicGrid`, registration marks,
hatching, the portrait's orbit ring, header blur, scroll plotting.
Details: [design-system/chapel.md](../../design-system/chapel.md).
