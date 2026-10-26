# Portfolio — "Mundo do Gustavo"

The master brand's own environment: `/portfolio`, `/portfolio/resume`,
`/identity`, in Portuguese and English. Concept and rules: [identity.md](identity.md).

- **Two editions, Portuguese first.** English mirrors the routes under `/en`.
  Page files are one-liners passing `locale` to a shared view. Locale helpers
  and metadata: [architecture/overview.md → SEO](../architecture/overview.md#seo).
- **Copy and facts** in `lib/portfolio-content-pt.ts` / `-en.ts`
  ([product/content.md](../product/content.md)).
- **Fig. 1** — `components/portfolio/world-figure.tsx`: inline SVG animated with
  SMIL (no JS loop), pausable, pauses off-screen, still frame under reduced
  motion. The page's protagonist animation.
- **Portrait** (`PORTRAIT_SRC`): in the hero byline (first frame, `priority`,
  small so the H1 stays the LCP), in About, and in the Capela's author byline.
- **Résumé**: one A4 page, ink on white, no photo; `PrintButton`.
- **Statuses** map to `StatusTag` tones in
  `components/portfolio/artifact-status-tag.tsx`. Blueprint blue (`support`)
  only for work "na prancheta".
- **Footer**: the world's links (home, portfolio, résumé, identity), the other
  places (closed ones tagged "em construção" and not followable), contact.
