# Blog — ink and pencil

Why it looks like this: [ADR 0015](../architecture/adr/0015-studies-ink-and-pencil.md).
Content model: [ADR 0014](../architecture/adr/0014-studies-mdx-setup-and-content-model.md).
Comments: [ADR 0016](../architecture/adr/0016-studies-comments-shown-closed.md).
Search: [ADR 0017](../architecture/adr/0017-one-search-dialog.md).
Post page (Medium-like end, likes, back to top): [ADR 0019](../architecture/adr/0019-study-page-like-a-magazine-article.md).
Pictures (covers, carousel, cards): [ADR 0032](../architecture/adr/0032-the-blog-is-led-by-pictures.md).

**The page of a book.** The portfolio's identity — paper, ink, the one rubric
red, the three faces, near-square corners, hairlines, scroll plotting — on a
page a shade cooler (`folha` by day, `lamparina` by night). What is particular
to the Blog is the **finish** of each post:

- an **article** is **ink** — finished;
- a **note** is **pencil** — an idea in progress, in graphite (`support`);
- a note that grows into an article is **passed to ink** (`maturedInto`).

The metaphor stays in margins, glosses and marks; titles stay literal.

## Devices

- **Format mark** — `<StrokeMark>` through `components/blog/format-mark.tsx`:
  one short hand stroke, solid ink for an article, dashed graphite for a note.
  Decorative, always beside the format's name: on the format chips, each index
  row (`IndexEntry.mark`) and the post's margin.
- **Gloss** — the margin note on a post: "passado a tinta: um texto acabado" /
  "ainda a lápis: uma ideia em andamento" (`BLOG.formats[f].gloss`).
- **Pencil outline** — dashed `support` border: the "virou artigo" notice, and
  every disabled control (the closed comments form, the closed "Curtir").
- **Hidden gold** — `hidden` (the Capela's gold): the index kicker gilds on
  hover (`EntryList gild="hidden"`). The Blog's `support` is graphite, so the gold
  never comes from `support` here.
- **Cover** — `<Cover>`: the picture of a piece of writing, near-square with a
  hairline, cropped to its frame (`ratio`: `wide`, `cover`, `thumb`). With no
  file, an empty gray plate holds the place.
- **Protagonist** — on the index, the carousel: it turns every `duration.turn`, a
  rubric hairline drawing the wait, with a pause, and waits under the pointer and
  the keyboard's focus. On a post, the reading progress line. Everything else moves
  by the reader's hand.

## Wiring

`app/blog/layout.tsx` loads `@my-world/design-system/css/blog.css` +
`identity.css` and renders `<BlogShell>` (`components/blog/*`):
`WorldBar`, the `ConstructionNotice` while closed, the header (the `seed`
mark, `<SearchDialog>` on `/api/search?space=blog`, day/night) and
the world's footer ([ADR 0022](../architecture/adr/0022-one-world-footer-and-treasure-everywhere.md)).

## Pages

- **Index** (`/blog`), led by pictures (ADR 0032): `<Carousel>` of the three
  newest articles (`PostSlide`: the cover with the title on a paper label, below
  it under `lg`); `PageIntro align="start" spacing="compact"` (label with the
  count, the statement "Artigos e anotações sobre o que eu *aprendo*." at
  `headline`); "Destaques", the next three articles as `EntryCards`; "Todos os
  textos" (`#textos`, where filtered links land): `<PostIndex>` — format chips (Tudo · Artigos · Anotações, with the marks) and
  theme chips, synced to `?format=&theme=`; an `EntryList` with thumbnails of every
  visible post, newest first; "Limpar filtros" when a filter leaves nothing.
- **Post** (`/blog/[slug]`), laid out like a Medium article (ADR 0019): the
  cover (`ratio="wide"`, with its credit); `PageIntro align="start"
  spacing="compact"` (theme link · format, literal title at
  `headline`, the summary, then `PostByline`: portrait, name, dates and
  reading time); a two-column body like a `Folio` — the sticky margin (format
  mark, gloss and, on wide screens, `PostOutline`: the `##` sections) and the MDX text at `size.measure`. Then, in order:
  references (`Register`) and the note ↔ article links; the signature that
  closes the text (`PostByline` with the byline line); the subjects as link
  chips (`chipClasses()`, to `/blog?tag=…`); `PostActions` ("Curtir"
  closed in pencil, "Comentar" → `#comments`); `<PostComments>` (empty
  `CommentList`, `CommentForm` closed in pencil); "Leia também" (
  `EntryCards` of up to three posts from `getRelatedPosts`); the way back.
  `BackToTop` floats bottom right once the reader has scrolled a screen.
- The index also takes `?tag=` (from a post's subject chips): a pressed chip
  "assunto: …" on its own row shows the filter and takes it off.
- **Construction page** (`/under-construction/blog`): the Biblioteca — the
  colonnade in ink, pediment and scaffolding in pencil, a seed at the apex.

- **Writing policy** (`/blog/policy`): the rule that every text is written without
  AI (ADR 0033); `PolicyNote` links to it from the index and at the end of a post.

## Writing a post

Only Gustavo writes the text ([ADR 0033](../architecture/adr/0033-blog-texts-are-written-without-ai.md)).

One MDX file in `apps/web/content/blog/<slug>.mdx` (the file name is the
URL). Front matter: `title`, `summary`, `format` (`article` | `note`), `theme`
(`tecnologia` | `economia` | `vida-espiritual` | `filosofia`), `status`
(`draft` | `published`), `publishedAt`, optional `cover` + `coverAlt` (+
`coverCredit`), `updatedAt`, `tags`,
`references`, `maturedInto` (a note's article), `comments: false`. An article
ends with a section `## Conclusão` (convention, not checked). A wrong field
fails the build with the file's name. Drafts show only in development and
previews. Markdown maps to `@my-world/ui` (`mdx-components.tsx`), GitHub
flavour included (`remark-gfm`): tables, footnotes (labelled "Notas"),
strikethrough. By name, a post may use `<Quote text="…" source="…" />` and
`<Figure src="/blog/<slug>/…" alt="…" width="…" height="…" caption="…"
credit="…" wide />`. Props are plain text — next-mdx-remote v6 strips `{…}`
expressions, so `width={1200}` silently disappears.

**Covers and figures** live in `public/blog/<slug>/`. An article gets a cover
before it is published; the gray plate is for building. A figure is a plate: it carries
its own background and does not follow day/night (draw diagrams on the
`folha` paper). Every image passes the publishing checklist in
[content.md](../product/content.md) — no EXIF, public-domain or own work.

`content/blog/design-tokens.mdx` is the example post (a draft) that uses
every element: read it before writing a new one.
