# Home — "carta do mundo" (`/`)

One world, one island; each place on it is a space
([ADR 0006](../architecture/adr/0006-home-is-a-map-of-spaces.md)). The home is
an old sea chart in the identity's engraving hand
(`components/world/world-map.tsx`), with the atlas below it as the real,
accessible navigation (the SVG is `aria-hidden`, its links out of the tab order).
Copy: `lib/world-content.ts`; logbook: `lib/logbook.ts`.

- **Places** (`components/world/place-glyph.tsx`, shared by map and atlas): a
  Antena → Portfólio, a Oficina → Projetos, a Biblioteca → Estudos, a Capela →
  Capela. Their state is drawn: ink (open), scaffolding (building), dashed
  blueprint in `support-1` (planned). Status comes from `lib/world.ts`.
- **Trails** lead from "você está aqui" (the harbor) to each place; hovering a
  place traces its trail (red if it can be entered).
- **Faith, hidden — never explained on the page:** the world's prime meridian
  and equator cross at the Capela; the compass rose marks the East with a cross;
  the Southern Cross points south with *lux in tenebris lucet* (Jo 1,5) faint
  under it; the harbor's pier is a cross; hovering the map reveals a gold point
  (`support-2`) at the crossing. Keep new hints this discreet.
- **Whose world:** the owner's portrait as a medallion in the opening (`Plate
  figureSize="narrow"`, `Portrait`), with his name and "cartógrafo deste mundo".
  No bio, no location or coordinates.
- **Motion:** drawn once on arrival (`identity.css` `.chart-trace` /
  `.chart-appear` / `.chart-beacon`), nothing loops; reduced motion and print get
  it already drawn. On phones the chart keeps its width and is dragged sideways
  (`MapViewport`, opens centered).
- **Shell:** `components/world/world-shell.tsx` — no `WorldBar` (this is home);
  the footer holds "Identidade visual".
