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
| `SiteFooter` | Brand column, link columns (internal/external/marked, `tag` + `disabled` for closed spaces), notes, closing verse |
| `Plate` | A page's opening plate: rubric bar, statement column, figure (`figureSize="half" \| "narrow"`), title block |
| `Folio` | A section: rubric + gloss in the margin, literal title, intro |
| `Byline` · `Portrait` | Face + name + role (`plain`, `frame="circle" \| "arch"`, `centered`) · the photo at the core of the mark (`ring={false}`: just the photo, `shape="circle" \| "arch"`) |
| `Timeline` | Chronology with past/current/next stations and the ink-on-scroll |
| `SpecSheet` | Ficha técnica: seal, code, tag, meta, title (optional link), details, features, stack |
| `OrbitChart` | Up to three rings of items around the mark |
| `IndexList` | Numbered register of linked entries (title, summary, kicker, meta) |
| `TopicGrid` | Ruled grid of linked topics (name, description, count) |
| `Register` | Mono-titled ruled list |
| `StatusTag` · `Chip` | State tag (`lit` / `open` / `plain` / `draft`) · filter toggle (`variant="line" \| "stone"`) |
| `Mark` (`variant`, `tone`) · `Rubric` · `Seal` · `TitleBlock` · `Emphasis` (`fit`) · `Eyebrow` | Identity devices (`Eyebrow`: small red tracked label, the flat dialect's rubric) |
| `Heading` · `Text` · `Button` / `buttonClasses()` (`ink` / `line` / `quiet`; flat: `rubric` solid red, `stone` solid stone) · `Section` · `cx()` | Primitives |
| `PrintButton` | Print / save as PDF |
| **Flat dialect** | |
| `Niche` | Romanesque round-arched frame for a picture: gold fillet, ornament in the tympanum, caption; `veiled` = sepia at rest, true colors on hover (always in color on touch) |
| `RoseWindow` · `CrossPattee` · `OrnamentRule` | Hairline rose window (12 lobes, gold heart, gilds inside a hovered group) · small gold cross · divider with the cross |
| `PageIntro` | Flat page opening: ornament, label, H1 + lead (children), actions, footer; `align="center" \| "start"` |
| `SectionIntro` | Serif section title, gloss (`note`), optional `action`; goes inside `<Section>` |
| `EntryList` | Flat list of `IndexEntry` (kicker + dates aside, serif title, summary; hairlines between rows) |
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
