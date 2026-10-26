# Capela — the flat dialect

The **current, closed** version of the Capela (see [product/spaces.md](../product/spaces.md)
and [ADR 0008](../architecture/adr/0008-chapel-becomes-contemplation.md) for
what it becomes). Why it looks like this: [ADR 0004](../architecture/adr/0004-chapel-flat-dialect.md).

**An old chapel with hidden gold.** Same fonts, radius, spacing and rubric red
as the portfolio; everything else is quieter — "cal e pedra": limewash page,
solid stone bands (plain `bg="alt-1"` fills — **no wall drawing**), ink and the
red (say the black, do the red), and the **ouro escondido** (`support-1`) that
shows only up close.

- Old-church details: Romanesque arches (`Niche`, the `shape="niche"` featured
  panel, arched portraits — **not** on the theme cards), a rose window, gold
  crosses pattée, the illuminated initial.
- Openings sit on a central axis (the nave) ending at the altar — Duccio's *Last
  Supper* (Maestà, 1308–11, public domain, `public/chapel/last-supper.jpg`);
  study text reads left-aligned.
- Titles in Cormorant upright, text and UI in Bricolage, Plex Mono only for
  dates, reading times and counts. Labels are `Eyebrow`s.
- **Not in the Capela:** ¶ numbered rubrics, `Plate` / `Folio`, `TitleBlock`,
  `SpecSheet` / `Seal`, numbered `IndexList` / `TopicGrid`, registration marks,
  hatching, the portrait's orbit ring, header blur, scroll plotting.

## Wiring

`app/chapel/layout.tsx` loads `themes/chapel.css` + `identity.css` and renders
`<ChapelShell>` (`components/chapel/*`, `motion="still"`): `WorldBar
variant="stone"`, the `ConstructionNotice` while closed, a solid header with the
red-star mark (gilds as it orbits on hover), `PageNav variant="stone"`, search
(`chapel-search.tsx`: native `<dialog>`, ⌘K, debounced `/api/search`, flat
panel) and day/night; footer with the themes and a link back to the world.

## Pages

- **Home:** centered `PageIntro` (gold cross, label *Fides quaerens
  intellectum*, the statement "Conhecimento para ordenar a *inteligência* a
  Deus.", a `rubric` button); the Last Supper in a veiled `Niche` with a
  `RoseWindow` and "Fazei isto em memória de mim" (Lc 22,19); a full-width plain
  stone `Section` with `CitationPlate` (the protagonist animation: rotates every
  7 s, pausable, holds on hover/focus/off-screen, still under reduced motion);
  studies (`SectionIntro` + `FeaturedEntry shape="niche"` + `EntryList`, kickers
  gild on hover); an `OrnamentRule`; themes (`TileGrid gilded`); author on a plain
  stone band (`Byline plain frame="arch" centered`).
- **Other pages:** server components, statically generated
  (`generateStaticParams` for studies and themes), each opened by a centered
  `PageIntro`.
- **Study:** light markdown rendered by `StudyBody` (`## ` serif subheads,
  `> "quote" — source` as `<Quote>`, `*emphasis*`, an illuminated initial — red
  Cormorant on gold leaf — on the first paragraph), then an `OrnamentRule`, tags,
  numbered references (`Register`), the author byline (arched portrait) on a
  stone panel.
- **Construction page:** `app/under-construction/chapel/` — a small chapel
  drawing with a dashed tower and scaffolding, Sl 127,1.
