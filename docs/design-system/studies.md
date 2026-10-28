# Estudos — ink and pencil

Why it looks like this: [ADR 0015](../architecture/adr/0015-studies-ink-and-pencil.md).
Content model: [ADR 0014](../architecture/adr/0014-studies-mdx-setup-and-content-model.md).
Comments: [ADR 0016](../architecture/adr/0016-studies-comments-shown-closed.md).
Search: [ADR 0017](../architecture/adr/0017-one-search-dialog.md).

**The page of a book.** The portfolio's identity — paper, ink, the one rubric
red, the three faces, near-square corners, hairlines, scroll plotting — on a
page a shade cooler (`folha` by day, `lamparina` by night). What is particular
to Estudos is the **finish** of each study:

- an **article** is **ink** — finished;
- a **note** is **pencil** — an idea in progress, in graphite (`support`);
- a note that grows into an article is **passed to ink** (`maturedInto`).

The metaphor stays in margins, glosses and marks; titles stay literal.

## Devices

- **Format mark** — `<StrokeMark>` through `components/studies/format-mark.tsx`:
  one short hand stroke, solid ink for an article, dashed graphite for a note.
  Decorative, always beside the format's name: on the format chips, each index
  row (`IndexEntry.mark`) and the study's margin.
- **Gloss** — the margin note on a study: "passado a tinta: um estudo acabado" /
  "ainda a lápis: uma ideia em andamento" (`STUDIES.formats[f].gloss`).
- **Pencil outline** — dashed `support` border: the "virou artigo" notice, and
  every disabled control (fields and buttons of the closed comments form).
- **Hidden gold** — `hidden` (the Capela's gold): the index kicker gilds on
  hover (`EntryList gild="hidden"`). Estudos' `support` is graphite, so the gold
  never comes from `support` here.
- **Protagonist** — the reading progress line under the header. Everything
  else moves by the reader's hand.

## Wiring

`app/studies/layout.tsx` loads `@my-world/design-system/css/studies.css` +
`identity.css` and renders `<StudiesShell>` (`components/studies/*`):
`WorldBar`, the `ConstructionNotice` while closed, the header (the `seed`
mark, `<SearchDialog>` on `/api/search?space=studies`, day/night) and the
footer (the four themes, other landscapes: world, portfolio, Capela).

## Pages

- **Index** (`/studies`): `PageIntro align="start"` (label with the count, the
  statement "Artigos e anotações sobre o que eu *aprendo*."), then
  `<StudyIndex>` — format chips (Tudo · Artigos · Anotações, with the marks) and
  theme chips, synced to `?format=&theme=`; an `EntryList` of every visible
  study, newest first; "Limpar filtros" when a filter leaves nothing.
- **Study** (`/studies/[slug]`): `PageIntro align="start"` (theme link ·
  format, literal title at `headline`, the summary, dates and reading time);
  a two-column body like a `Folio` — the sticky margin (format mark and gloss,
  subjects) and the MDX text at `size.measure`; references (`Register`), the
  note ↔ article links, the byline; then `<StudyComments>` (empty
  `CommentList`, `CommentForm` closed in pencil) and the way back.
- **Construction page** (`/under-construction/studies`): the Biblioteca — the
  colonnade in ink, pediment and scaffolding in pencil, a seed at the apex.

## Writing a study

One MDX file in `apps/web/content/studies/<slug>.mdx` (the file name is the
URL). Front matter: `title`, `summary`, `format` (`article` | `note`), `theme`
(`tecnologia` | `economia` | `vida-espiritual` | `filosofia`), `status`
(`draft` | `published`), `publishedAt`, optional `updatedAt`, `tags`,
`references`, `maturedInto` (a note's article), `comments: false`. A wrong field
fails the build with the file's name. Drafts show only in development and
previews. Markdown maps to `@my-world/ui` (`mdx-components.tsx`); `<Quote
text="…" source="…" />` is available for a citation.
