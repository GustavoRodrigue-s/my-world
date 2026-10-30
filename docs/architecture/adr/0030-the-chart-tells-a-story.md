# 0030 — The chart tells a story on a loop, in CSS, from tokens

- **Status:** accepted
- **Date:** 2026-10-30
- **Supersedes:** the home-map part of "nothing loops" in the identity's motion rule

## Context

The chart was drawn once on arrival and then stood still, while the portfolio's
Fig. 1 keeps telling its story. Gustavo wants the home to have the same life:
animations on or around the carta do mundo.

## Decision

- After arrival the chart runs one story on a loop of `duration.story`: the ship
  sails in (rocking), the satellite orbits the cartographer's medallion, a ring
  at the harbor, someone walks each trail in turn, a ring at each place, and the
  last trail, the field, ends in one glint of gold. Waves and the Southern Cross
  breathe on `duration.drift`.
- It is the home's protagonist: `MotionToggle` under the chart pauses all of it.
  Reduced motion, print and still environments get the drawn chart, with the ship
  standing on its route.
- It is written in CSS (`identity.css` `.chart-*`, `offset-path` for the routes),
  not SMIL like Fig. 1: durations, easings and scales then come from the tokens,
  and the map stays a Server Component. Only the fractions of the loop live in
  the drawing, as proportions (ADR 0021).

## Why

The story says what the home is: you arrive and walk to the places. The glint
keeps the parable (ADR 0020): it shows where without saying what.

## Alternatives considered

- **SMIL, like Fig. 1** — its `dur` attributes can't read tokens.
- **Only a hover or arrival gesture** — the chart would still stand still while
  being read, which is what Gustavo wanted changed.

## Consequences

- The gold point, once only for whoever hovered, now also shows for a moment each
  loop. The hover stays.
- New tokens: `duration.story`, `duration.drift`, `transform.rotate.sway`.
- Fig. 1's button became `MotionToggle`, shared. Fig. 1's SMIL durations remain
  literal.
- Files: `components/world/world-map.tsx`, `map-viewport.tsx`, `identity.css`.
