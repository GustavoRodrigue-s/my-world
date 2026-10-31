# 0020 — The home speaks of the Capela only by parable

- **Status:** accepted
- **Date:** 2026-10-28
- **Supersedes:** —
- **Extended by:** [0022](0022-one-world-footer-and-treasure-everywhere.md)

## Context

The home already hid the faith in its drawing (the world's lines crossing at the
Capela, the cross at the East, the pier, the Southern Cross, the gold point on
hover), but its words named it plainly: "a Capela", "Um lugar para contemplar",
the meta description, the diário de bordo. Gustavo wants *pudor* — showing less
to show more: the place should draw curiosity, the way Jesus spoke in parables.

## Decision

- On the home, the Capela is **the field with a treasure hidden in it**
  (Mt 13,44, uncited): on the map "o Campo" · "tesouro escondido"; in the atlas
  "Tesouro escondido" with the parable as its text; in the meta description
  "um campo com um tesouro escondido".
- The word **"Capela"** is never visible on the home — atlas, map, logbook,
  footer, metadata. It appears once the reader is inside (`/chapel` and its
  under-construction page): finding the treasure is learning its name.
- The drawing loses its explicit cross: the building keeps the gable and the
  rose window with the gold heart. The X of a treasure map is the crossing of
  the world's meridian and equator, already drawn over it.
- The place stays visible and reachable (atlas, keyboard, screen reader):
  pudor is a veil, not a hiding place. Its verb, "o que eu acredito", stays —
  it answers the page's title without naming a religion.

## Why

A veil signals worth; an explanation flattens it. The parable says the place is
worth everything without saying what it is, and it belongs on a map. It also
keeps the home within the privacy rules ([0018](0018-personal-exposure-rules.md)):
faith hinted at, never told.

## Alternatives considered

- **The pearl of great price** — more intimate, but nothing ties it to a map.
- **The narrow gate** — speaks of entering, but sounds severe for a front door.
- **Hiding the place altogether** — breaks [0005](0005-spaces-under-construction.md)
  and accessibility; a riddle, not pudor.

## Consequences

- New text about the Capela that appears on the home (logbook lines included)
  speaks of the field, never of the Capela.
- The portfolio still names the Capela where it states facts; the parable is the
  home's voice only.
- Files: `lib/world-content.ts`, `lib/logbook.ts`,
  `components/world/place-glyph.tsx`.
