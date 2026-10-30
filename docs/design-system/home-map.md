# Home — "carta do mundo" (`/`)

One world, one island; each place on it is a space
([ADR 0006](../architecture/adr/0006-home-is-a-map-of-spaces.md)). The home is
an old sea chart in the identity's engraving hand
(`components/world/world-map.tsx`), with the atlas below it as the real,
accessible navigation (the SVG is `aria-hidden`, its links out of the tab order).
Copy: `lib/world-content.ts`; logbook: `lib/logbook.ts`.

- **Places** (`components/world/place-glyph.tsx`, shared by map and atlas): a
  Antena → Portfólio, a Oficina → Projetos, a Biblioteca → Estudos, o Campo →
  Capela (never named here, see below). Their state is drawn: ink (open), scaffolding (building), dashed
  blueprint in `support` (planned). Status comes from `lib/world.ts`.
- **Trails** lead from "você está aqui" (the harbor) to each place; hovering a
  place traces its trail (red if it can be entered).
- **Faith, hidden — never explained on the page:** the world's prime meridian
  and equator cross at the Capela; the compass rose marks the East with a cross;
  the Southern Cross points south with *lux in tenebris lucet* (Jo 1,5) faint
  under it; the harbor's pier is a cross; hovering the map reveals a gold point
  (`hidden`) at the crossing. Keep new hints this discreet.
- **The Capela, by parable** ([ADR 0020](../architecture/adr/0020-home-speaks-of-the-capela-by-parable.md)):
  on the home it is the field with a treasure hidden in it (Mt 13,44, uncited) —
  "o Campo" · "tesouro escondido" on the map, "Tesouro escondido" in the atlas.
  The word "Capela" never shows on the home (logbook and metadata included); the
  glyph has no cross, only the rose window with its gold heart; the treasure
  map's X is the crossing of the world's lines. It stays in the atlas and
  reachable — a veil, not a hiding place.
- **Diário de bordo** (`components/world/world-logbook.tsx`): a written record
  with no motion (`Folio still`), not a feed: the latest six entries gathered by day,
  the date in the margin behind a hairline, each occurrence with its place under it (the building's
  name, `a Biblioteca`, `o Campo`; `o mundo` for the world as a whole).
- **Whose world:** the owner's portrait is in the map's cartouche, the
  cartographer's medallion on an old chart, beside his name. It is out of the
  opening, so the title and the map hold the first view. Screen readers get his
  name from the figure's caption. No bio, no location or coordinates.
- **Motion:** drawn once on arrival (`identity.css` `.chart-trace` /
  `.chart-appear` / `.chart-beacon`), nothing loops; reduced motion and print get
  it already drawn. On phones the chart keeps its width and is dragged sideways
  (`MapViewport`, opens centered).
- **Shell:** `components/world/world-shell.tsx` — no `WorldBar` (this is home);
  the footer holds "Identidade visual".
