# 0015 — Estudos wears its own palette: ink and pencil

- **Status:** accepted
- **Date:** 2026-10-26
- **Supersedes:** —

## Context

Each environment has its own palette under one identity
([0002](0002-one-identity-palette-per-environment.md)). Estudos could borrow the
portfolio's (and read as a part of it) or the Capela's flat dialect (and look
sacred for economy or technology). Its one distinctive trait is that articles
and notes differ by **finish**, not subject ([0009](0009-projects-and-studies.md)).

## Decision

- Estudos is an environment of its own: `tokens/studies.json` (day and night),
  `data-env="studies"`, the `seed` mark.
- **Concept — ink and pencil:** an article is ink (finished), a note is pencil
  (a draft in the margin); a note that matures into an article is "passed to
  ink". The metaphor stays in margins and labels; titles stay literal.
- What stays: paper, ink and the one rubric red as `primary`, the three faces,
  near-square corners, hairlines, one `<Emphasis>` per statement, one
  protagonist animation per page. Estudos is not still: scroll plotting and
  hovers as in the portfolio. The protagonist on a study page is the reading
  progress line.
- **`support` = graphite** (new base colors `color.graphite` and
  `graphite-night`), in a narrow role: the note format mark, margin notes and
  pencil underlines, the comments area. **Never running text** (it must not be
  confused with `foreground-muted`). Graphite is achromatic, so the "one
  chromatic color" rule holds.
- `hidden` keeps the Capela's gold, as in the portfolio, for a discreet detail.
- Long reading: body in the sans face at `size.measure`, `leading-relaxed`;
  margin rubrics and glosses (as `Folio` does) carry the metaphor.

## Why

Pencil and ink turn the space's real rule (finish, not subject) into something
visible without a second chromatic color, and give Estudos a face that is
neither the portfolio's nor the Capela's.

## Alternatives considered

- **The portfolio's palette** — fastest, but Estudos would read as a portfolio
  section, and blueprint blue is reserved for "na prancheta".
- **The Capela's flat dialect** — reuses the most code, but pulls a sacred look
  onto every subject.

## Consequences

The palette values (neutrals and graphite) are proposed in the JSON and
validated by Gustavo in the browser, day and night, before the screens are
built. `identity.md` gets the Estudos column and the graphite role;
`design-system/studies.md` describes the environment; `/identity` shows it.
