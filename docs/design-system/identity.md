# Identity — "Mundo do Gustavo"

**Paper, ink and one red**: a small world drawn as a technical plate, with the
devices of an illuminated manuscript (¶ rubrics, hatching, registration marks,
title blocks, seals). Every environment wears it; the palette changes per
environment, the Capela speaks its flat dialect ([chapel.md](chapel.md)) and
The Blog writes in ink and pencil ([blog.md](blog.md)).

Concept (Fig. 1): ideas fall from the **Cruzeiro do Sul** (faith), become code
in the **workshop** (reason) and are launched into **orbit** as artifacts (the
work); the planet also has a **chapel**. Motto: *feito com capricho* (EN: *made
with **care***). Mark: the G-orbit — a G made of an orbit, with a core and a
satellite (variants include `star` for the Capela and `seed` for the Blog).

## Palettes

Source of truth: `packages/design-system/tokens/{portfolio,chapel,blog}.json` — the
values below are a copy for reading; if they differ, the JSON wins.

| Token | Portfolio day | Portfolio night | Capela day (cal) | Capela night (completas) | Blog day (folha) | Blog night (lamparina) |
|---|---|---|---|---|---|---|
| surface | `#EEEAE0` papel | `#14120E` | `#F4F1EA` cal | `#141311` | `#EFEDE7` folha | `#131416` |
| surface-muted | — | — | `#E7E2D8` pedra (the flat blocks) | `#1F1D19` | `#E3E0D8` | `#1B1C1F` |
| foreground | `#17150F` tinta | `#ECE6D9` | `#1C1A17` tinta | `#ECE7DE` | `#17171A` nanquim | `#E8E6E1` |
| primary (the brand) | `#B5321C` rubrica | `#EE5C3F` brasa | `#B5321C` rubrica | `#EE5C3F` brasa | `#B5321C` rubrica | `#EE5C3F` brasa |
| support | `#2E4A7D` cianotipia | `#8FA6D6` | `#7E5F28` ouro velho | `#D4AF6A` | `#5C6168` grafite | `#A3A8AF` |
| hidden | ouro (the Capela's gold) — only hidden in the world map | | — | | ouro (the Capela's gold) | |

- The **rubric red is the one primary color, everywhere** (rubrics, links, the
  emphasized word, the satellite, the Capela's star). Never a large fill — a
  button is fine.
- `support` is the environment's second voice, used sparingly: in the
  portfolio, blueprint blue **only** for work "na prancheta"; in the Capela, the
  **hidden gold** — fixed only in small details (illuminated initial, heart of the
  rose window, cross pattée), otherwise revealed by the reader's hand (fillets
  lighting up on hover/focus, the star turning gold as it orbits, the Last
  Supper's gold halos); in the Blog, **graphite** — pencil, for what is still in
  progress: the note's format mark and gloss, the "virou artigo" notice, the
  closed comments area (dashed outlines). Graphite is achromatic, so the one
  chromatic color stays the red; it is **never running text** (that is
  `foreground-muted`). Never a fill or a large area.
- `hidden` is the Capela's gold lent to other environments for one discreet
  detail: the home map's hidden places; the Blog's index kickers gilding on hover.

## Typography (`lib/fonts.ts`, applied by `<SiteShell>`)

- **Bricolage Grotesque** (`--font-sans`) — headings and text.
- **Cormorant Garamond italic** (`--font-serif`) — the voice: *the one word that
  matters* per statement via `<Emphasis>`, quotes and citations, closing verses.
- **IBM Plex Mono** (`--font-mono`) — annotations: rubrics, captions, specs, dates.
- `Heading` levels are the typography roles ([tokens.md](tokens.md)): `display`
  (page H1), `headline`, `title`, `title-sm`; the Capela uses the serif twins
  `display-serif`, `headline-serif`, `title-serif`, `title-sm-serif`
  (Cormorant upright) with `<Emphasis fit="serif">`.
- `Text`: `family="sans" | "mono" | "serif"`, `size` (`xs`–`2xl` of the type scale,
  or `lead`), `color`, `leading`, `weight`.

## Rules that must never be broken

1. **One chromatic color** (rubric/ember). `support` only in its
   environment's narrow role (above).
2. **One `<Emphasis>` word per statement.** Titles and content stay **literal**;
   the metaphor (órbita, oficina, artefato, prancheta, lição) lives in margins,
   captions, labels.
3. **One protagonist animation per page**, always pausable; reduced motion =
   still frame (portfolio: Fig. 1; Capela home: the quote plate; home: the chart's
   arrival drawing, then its story, a loop like Fig. 1; the Blog's index: the carousel; a post: the reading progress line). Everything else moves only by the reader's hand:
   - scroll "plotting" — CSS scroll timelines in `identity.css` (`.plot-rise`,
     `.plot-draw-x`, `.plot-orbit`, the timeline's `.plot-station` / `.plot-ink` /
     `.plot-inked` / `.plot-ripple` / `.plot-ink-text` / `.plot-arrive`,
     `.plot-progress` under the header); no JS frame loop, nothing loops, short
     ranges — Gustavo wants **snappy** motion;
   - hovers, 150–200 ms (`.ink-link`).

   Brand objects may make one longer gesture (satellite orbit, seal turn).
   Unsupported browsers, reduced motion and print get the page fully drawn.
   Don't put `.plot-*` on first-frame content (the H1 is the LCP) or on single
   cells of a `gap-px` grid (animate the grid). **The Capela is still**
   (`motion="still"`): no plotting, no progress line.
4. **Near-square corners** (`rounded-xs`), hairline rules, no shadows except a
   floating panel (`shadow-floating`). In the Capela, not even that: solid fills
   separate the parts, floating panels are flat (`surface-raised` + a hairline).
5. **Never hardcode a hex** in a component; brand SVGs come from
   the design system's build (`packages/design-system/generated/brand/*.svg`).
