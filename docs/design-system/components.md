# Components — `@my-world/ui`

Import via `@/components/ui` in the web app. Build every screen from these; add
to the library rather than styling raw HTML. Source: `packages/ui/src/react/`.

| Component | Use |
|---|---|
| `SiteShell` | An environment's frame: `data-env`, `lang`, fonts, skip link, header, footer; `motion="still"` turns plotting off |
| `WorldBar` | The thread back to the world: a thin strip over each environment's header — *Mundo do Gustavo / Portfólio / Currículo* (crumbs shown by path; `variant="stone"` = Capela). Every environment wears it; the home doesn't |
| `SiteHeader` | Mark + name (home link), `nav` slot, `actions` slot, reading-progress line; `surface="glass" \| "solid"`; `mark.reveal` = satellite turns support-colored as it orbits |
| `SectionNav` / `PageNav` | Header links to sections of one page (scroll-spy) / between pages (current page marked, phone menu via `<details>`; `variant="stone"` = flat) |
| `LanguageSwitch` · `DayNightToggle` | PT/EN by path prefix · day/night (client; `variant="line" \| "stone"`) |
| `SiteFooter` | Brand column, link columns (internal/external/marked, `tag` + `disabled` for closed spaces), notes, closing verse. |
| `Plate` | A page's opening plate: rubric bar, statement column, figure (`figureSize="half" \| "narrow"`), title block |
| `Folio` | A section: rubric + gloss in the margin, literal title, intro; `still` for a record with no motion |
| `Byline` · `Portrait` | Face + name + role (`plain`, `frame="circle" \| "arch"`, `centered`) · the photo at the core of the mark (`ring={false}`: just the photo, `shape="circle" \| "arch"`) |
| `Timeline` | Chronology with past/current/next stations and the ink-on-scroll |
| `SpecSheet` | Ficha técnica: seal, code, tag, meta, title (optional link), details, features, stack |
| `OrbitChart` | Up to three rings of items around the mark |
| `Register` | Mono-titled ruled list |
| `ProseLink` · `ProseList` (`ordered`) · `ProseQuote` · `ProseCode` · `ProseRule` · `ProsePre` · `ProseTable` · `ProseFigure` | Running text written in MDX (Estudos): link with the ink hairline, lists, a `>` quotation in the voice face, inline code, a hairline break, a code block (ink only, no syntax colors, scrolls inside), a table (hairlines, mono head, scrolls inside), a figure (`next/image` in a hairline frame, mono caption + `credit`, `wide` = the text column's width). Mapped in `components/studies/mdx-components.tsx` |
| `TextField` · `TextArea` | Form fields with a mono label above (and an optional `hint`, linked by `aria-describedby`). Near-square hairline that inks on hover; disabled = dashed `support` outline |
| `StrokeMark` | One short hand stroke for a piece of writing's finish: `finish="ink"` (solid, ink) or `"pencil"` (dashed, `support`). Decorative, always beside the format's name — Estudos' format mark (`components/studies/format-mark.tsx`) |
| `SearchDialog` | The world's one search (ADR 0017): header button + native `<dialog>`, ⌘K, debounced call to `endpoint` (`/api/search?space=…`, answers `SearchResult[]`: href, title, kicker). `variant="line"` (Estudos: sans titles, floating shadow) or `"stone"` (Capela: flat, serif titles) |
| `CommentList` · `CommentForm` | Readers' comments (`CommentEntry`: author, date, body), with an `empty` line · name / e-mail (`emailHint`) / comment form; `disabled` + `reasonId` closes it in a `<fieldset disabled>` that names why (Estudos, ADR 0016) |
| `StatusTag` · `Chip` / `chipClasses()` | State tag (`lit` / `open` / `plain` / `draft`) · filter toggle (`variant="line" \| "stone"`); `chipClasses()` styles a link as a chip (a study's subjects) |
| `MotionToggle` | The pause of a page's protagonist animation: small mono button with its state drawn (Fig. 1, the home's chart) |
| `Mark` (`variant`, `tone`, `size` from the icon scale) · `Rubric` · `Seal` (`size`) · `TitleBlock` · `Emphasis` (`fit`) · `Eyebrow` | Identity devices (`Eyebrow`: small red tracked label, the flat dialect's rubric) |
| `Heading` (`level` = typography role) · `Text` (`size` = type-scale step or `lead`) · `Button` / `buttonClasses()` (`ink` / `line` / `quiet`; flat: `rubric` solid red, `stone` solid stone; disabled = dashed outline in `support`, "still in pencil") · `Section` (`bg="surface" \| "muted" \| "raised"`) · `cx()` | Primitives |
| `PrintButton` | Print / save as PDF |
| `BackToTop` | Floating button bottom right (client): shows after one screen of scrolling, smooth scroll (instant with reduced motion), focus to `<main>`, hidden in print. Hairline, no shadow. Estudos' study page (ADR 0019) |
| **Flat dialect** | |
| `Niche` | Romanesque round-arched frame for a picture: gold fillet, ornament in the tympanum, caption; `veiled` = sepia at rest, true colors on hover (always in color on touch) |
| `RoseWindow` · `CrossPattee` (`size` from the icon scale) · `OrnamentRule` | Hairline rose window (12 lobes, gold heart, gilds inside a hovered group) · small gold cross · divider with the cross |
| `PageIntro` | Flat page opening: ornament, label, H1 + lead (children), actions, footer; `align="center" \| "start"` |
| `SectionIntro` | Serif section title, gloss (`note`), optional `action`; goes inside `<Section>` |
| `EntryList` | Flat list of `IndexEntry` (kicker + dates aside, serif title, summary; hairlines between rows). The kicker gilds on hover: `gild="support"` (Capela, default) or `"hidden"` (Estudos, whose `support` is graphite). An entry's `mark` (a `<StrokeMark>`) sits before its first meta line |
| `FeaturedEntry` | One entry on a stone panel: label, meta, serif title link, lead, action; `shape="niche"` = low arch + gold fillet |
| `TileGrid` | Flat stone tiles of `Topic`s (`on="stone"` when the band is already stone); `gilded` = a gold fillet lights up on hover |
| `Quote` | Quotation in the voice face: `size="display"` (centered, on a band) or `"body"` (rubric rule) |

## Adding a component

- File `packages/ui/src/react/<name>.tsx` (kebab-case), `cva()` for variants,
  `'use client'` only if it needs state/effects; export it from
  `packages/ui/src/react/index.ts`.
- Links take `href: string` and are cast to `Route` inside the library.
- Interactive pieces use accessible native elements (`<dialog>`, `<details>`,
  `<button aria-pressed>`) — no extra UI dependency.
- Add it to the table above in the same change.
