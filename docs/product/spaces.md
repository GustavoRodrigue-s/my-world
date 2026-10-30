# The world and its spaces

The status of each space is code: `SPACES` in `apps/web/src/lib/world.ts`
(`open` · `building` · `planned`). This page describes what each space is for.

| Space | Verb | What it holds | Route | Status (2026-10-30) |
|---|---|---|---|---|
| **Home** — carta do mundo | — | the map of every place, the atlas, the diário de bordo | `/` | open (not in production yet) |
| **Portfólio** | present | career, résumé, services, contact; only **highlights** of projects; PT + EN | `/portfolio`, `/identity` | open |
| **Projetos** | make | tech, robotics and social projects in depth: video, images, links | `/projects` (planned) | planned |
| **Estudos** | think | articles and notes on technology, economy, spiritual life and philosophy | `/studies` | building (closed to the public; on `feat/studies`) |
| **Capela** | contemplate, pray | a place of contemplation: candles of intention, letters | `/chapel` | building (closed to the public) |

## Decisions that shape the spaces

- One world with spaces, the home is a map — [ADR 0006](../architecture/adr/0006-home-is-a-map-of-spaces.md).
- Unfinished spaces keep their place, badged "em construção" — [ADR 0005](../architecture/adr/0005-spaces-under-construction.md).
- Projetos is the source of truth for projects; Estudos keeps articles and notes
  together — [ADR 0009](../architecture/adr/0009-projects-and-studies.md).
- Content in MDX in the repo — [ADR 0007](../architecture/adr/0007-content-in-mdx.md).
- The Capela becomes a place of contemplation — [ADR 0008](../architecture/adr/0008-chapel-becomes-contemplation.md).

## Portfólio

Built. Two editions (PT first, EN mirrored under `/en`), one-page résumé, the
living brand guide at `/identity`. Details: [design-system/portfolio.md](../design-system/portfolio.md).

## Projetos (planned)

Each project page tells: what it is, what it does, what Gustavo did, what he
learned, which mistakes he made and with which tools — with cover, gallery,
video and links (repository, demo, press). Confidential projects appear only as
a spec sheet (`SpecSheet`). The portfolio shows highlights linking here.

Candidate content: the "Road to Frontend Pleno" projects still in Notion (Loja
Composable, Painel Kanban, Catálogo, Angular Kanban) and Aprendizado Adaptativo
(a multidisciplinary personal project, Notion) — move them when this space is built.

## Estudos (building — on `feat/studies`)

Never called "blog". Articles and notes live **together**: what separates them is
finish, not subject; a note can mature into an article. The index filters by
theme and by format (Tudo · Artigos · Anotações). Portuguese only for now.

- Routes: `/studies` (filters in the URL: `?theme=economia&format=note`) and
  `/studies/[slug]` for both formats.
- Themes, few and broad: Tecnologia · Economia · Vida espiritual · Filosofia;
  narrower subjects are tags. Content is MDX in `apps/web/content/studies`
  ([ADR 0014](../architecture/adr/0014-studies-mdx-setup-and-content-model.md)).
- Its own palette, **ink and pencil**: articles are ink, notes are pencil
  (graphite) ([ADR 0015](../architecture/adr/0015-studies-ink-and-pencil.md)).
- Every study ends with a comments area, shown and closed until it has a
  backend ([ADR 0016](../architecture/adr/0016-studies-comments-shown-closed.md)).
- Search: the world's one `SearchDialog`, scoped to the space
  ([ADR 0017](../architecture/adr/0017-one-search-dialog.md)).
- The Capela's written-out mock study is copied as a `draft` to build the
  screens; the others stay with the closed Capela.

## Capela (building)

Closed in production until Gustavo decides to resume it; he isn't working on it
now. The current, closed version is a study library in the flat dialect
([design-system/chapel.md](../design-system/chapel.md)). What it becomes when it
reopens: [chapel-contemplation.md](chapel-contemplation.md).

## Home — carta do mundo

The world's front door: an old sea chart with every place on it. Details:
[design-system/home-map.md](../design-system/home-map.md).

- Opening line: "Coisas boas precisam ser vistas. Este é o mapa delas."
  Title: the three verbs ("O que eu acredito, aprendo e construo").
- The owner's portrait in the map's cartouche — "cartógrafo" — but no bio,
  no location, no coordinates on the home (those stay in the portfolio).
- The Capela is spoken of only by parable — the treasure hidden in a field
  ([ADR 0020](../architecture/adr/0020-home-speaks-of-the-capela-by-parable.md)).
- "Identidade visual" belongs to the world (a footer link), not to a place.
- Footer only, no closing section. Portuguese only for now; English later.

## Open questions

- Whether the home closes with a short verse; a values/manifesto section later.
- The Capela script (scenes, music, the letter) and when it resumes.
- When Projetos starts, and its route name; when Estudos opens to the public.
