# Estudos — ink and pencil

Why it looks like this: [ADR 0015](../architecture/adr/0015-studies-ink-and-pencil.md).
Content model: [ADR 0014](../architecture/adr/0014-studies-mdx-setup-and-content-model.md).
Comments: [ADR 0016](../architecture/adr/0016-studies-comments-shown-closed.md).
Search: [ADR 0017](../architecture/adr/0017-one-search-dialog.md).
Study page (Medium-like end, likes, back to top): [ADR 0019](../architecture/adr/0019-study-page-like-a-magazine-article.md).

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
  every disabled control (the closed comments form, the closed "Curtir").
- **Hidden gold** — `hidden` (the Capela's gold): the index kicker gilds on
  hover (`EntryList gild="hidden"`). Estudos' `support` is graphite, so the gold
  never comes from `support` here.
- **Protagonist** — the reading progress line under the header. Everything
  else moves by the reader's hand.

## Wiring

`app/studies/layout.tsx` loads `@my-world/design-system/css/studies.css` +
`identity.css` and renders `<StudiesShell>` (`components/studies/*`):
`WorldBar`, the `ConstructionNotice` while closed, the header (the `seed`
mark, `<SearchDialog>` on `/api/search?space=studies`, day/night) and
the world's footer ([ADR 0022](../architecture/adr/0022-one-world-footer-and-treasure-everywhere.md)).

## Pages

- **Index** (`/studies`): `PageIntro align="start"` (label with the count, the
  statement "Artigos e anotações sobre o que eu *aprendo*."), then
  `<StudyIndex>` — format chips (Tudo · Artigos · Anotações, with the marks) and
  theme chips, synced to `?format=&theme=`; an `EntryList` of every visible
  study, newest first; "Limpar filtros" when a filter leaves nothing.
- **Study** (`/studies/[slug]`), laid out like a Medium article (ADR 0019):
  `PageIntro align="start"` (theme link · format, literal title at
  `headline`, the summary, then `StudyByline`: portrait, name, dates and
  reading time); a two-column body like a `Folio` — the sticky margin (format
  mark and gloss) and the MDX text at `size.measure`. Then, in order:
  references (`Register`) and the note ↔ article links; the signature that
  closes the text (`StudyByline` with the byline line); the subjects as link
  chips (`chipClasses()`, to `/studies?tag=…`); `StudyActions` ("Curtir"
  closed in pencil, "Comentar" → `#comments`); `<StudyComments>` (empty
  `CommentList`, `CommentForm` closed in pencil); "Leia também" (an
  `EntryList` of up to three studies from `getRelatedStudies`); the way back.
  `BackToTop` floats bottom right once the reader has scrolled a screen.
- The index also takes `?tag=` (from a study's subject chips): a pressed chip
  "assunto: …" on its own row shows the filter and takes it off.
- **Construction page** (`/under-construction/studies`): the Biblioteca — the
  colonnade in ink, pediment and scaffolding in pencil, a seed at the apex.

## Writing a study

One MDX file in `apps/web/content/studies/<slug>.mdx` (the file name is the
URL). Front matter: `title`, `summary`, `format` (`article` | `note`), `theme`
(`tecnologia` | `economia` | `vida-espiritual` | `filosofia`), `status`
(`draft` | `published`), `publishedAt`, optional `updatedAt`, `tags`,
`references`, `maturedInto` (a note's article), `comments: false`. An article
ends with a section `## Conclusão` (convention, not checked). A wrong field
fails the build with the file's name. Drafts show only in development and
previews. Markdown maps to `@my-world/ui` (`mdx-components.tsx`), GitHub
flavour included (`remark-gfm`): tables, footnotes (labelled "Notas"),
strikethrough. By name, a study may use `<Quote text="…" source="…" />` and
`<Figure src="/studies/<slug>/…" alt="…" width="…" height="…" caption="…"
credit="…" wide />`. Props are plain text — next-mdx-remote v6 strips `{…}`
expressions, so `width={1200}` silently disappears.

**Figures** live in `public/studies/<slug>/`. A figure is a plate: it carries
its own background and does not follow day/night (draw diagrams on the
`folha` paper). Every image passes the publishing checklist in
[content.md](../product/content.md) — no EXIF, public-domain or own work.

`content/studies/design-tokens.mdx` is the example study (a draft) that uses
every element: read it before writing a new one.
