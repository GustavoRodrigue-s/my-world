# Content, voice and privacy

## Where copy lives

Every visible word lives in a content module, never hardcoded in a component:

| Module | Space |
|---|---|
| `lib/world-content.ts` (`WORLD`) | the home |
| `lib/logbook.ts` (`LOGBOOK`) | the diário de bordo — add a dated line with every change worth telling; the home shows the latest six |
| `lib/portfolio-content-pt.ts` · `-en.ts` (both `PortfolioCopy`), composed by `lib/portfolio-content.ts` (`getContent(locale)`, invariant facts in `IDENTITY`) | portfolio, résumé, `/identity` — a fact added in one locale must be added in the other |
| `lib/chapel-content.ts` (`CHAPEL`, `chapelPath()`) | the Capela |
| `lib/studies-content.ts` (`STUDIES`) | Estudos: shell, index and construction copy, theme and format names, the comments switch |
| `content/studies/*.mdx` | the studies themselves (front matter: [ADR 0014](../architecture/adr/0014-studies-mdx-setup-and-content-model.md)) |
| `lib/mock-data.ts` | the closed Capela's studies, categories and quotes |

`REVIEW` comments mark drafts Gustavo still has to confirm (today in
`chapel-content.ts`, `studies-content.ts`,
`content/studies/vida-interior.mdx`, `content/studies/design-tokens.mdx`). Don't remove the
marker without his confirmation.

## Language

Everything a reader sees is Portuguese (plus the portfolio's English edition);
code, routes, files, comments and these docs are English. Literal titles; the
metaphor (órbita, oficina, artefato, prancheta, lição) lives in margins,
captions and labels. One emphasized word per statement.

Names: the chapel space is just **"Capela"** — never "Capela de Estudos"
(renamed 2026-10-25). Estudos is never a "blog".

## Privacy — what may go on the site (and in these docs)

Gustavo keeps his personal life private. The world shares his **areas** (work,
projects, studies, faith) and may **state** who he is; it never **tells** his
life. Decided in [ADR 0018](../architecture/adr/0018-personal-exposure-rules.md).

**The line: identity yes, biography no.**

| Allowed | Never |
|---|---|
| Facts about his work: role, employers, education, stack, career dates | Family, friends, relationships, health, home, daily life outside work |
| Stating his faith ("sou católico", "cristão") in a word or a line, where it fits | Narrating it: childhood, conversion, struggles, feelings, how he prays, his parish or church habits — the site is not the place for those details |
| Professional habits ("estudo inglês técnico todo dia") | Personal routines, hobbies, schedules, where he is at a given time |
| The city (portfolio only), region and country | Coordinates finer than whole degrees, neighbourhood, addresses, places he goes to |
| Faith as the **subject** of a space (Capela, Estudos) | Faith as **his story** in that space: there, the author is a name and "um estudante, não um mestre" |

Per space:

- **Faith in the world's footer:** "Ad maiorem Dei gloriam" closes every page.
  References to faith, Catholicism and the spiritual life are welcome across the
  world; what stays out is his own story, and the name "Capela" outside the Capela.
- **Home:** no bio, no location, no coordinates. Faith only hinted at: in the
  drawing, and in words only by parable — the Capela is never named there (ADR 0020).
- **Portfólio and `/identity`:** city, employer, education; faith stated briefly
  (the Sobre paragraph), never developed. The Capela is not named: it is the
  hidden treasure, as on the home ([ADR 0022](../architecture/adr/0022-one-world-footer-and-treasure-everywhere.md)).
  Coordinates rounded to whole degrees (`IDENTITY.coordinates`, `23°S 51°W`);
  the JSON-LD address carries region and country only.
- **Capela, once open:** no veil. Its own pages say its name and speak of the
  faith, the Church and the spiritual life openly (ADR 0022).
- **Capela's construction page:** veiled, the "Tesouro escondido". While it isn't
  ready it doesn't say what it is: no "Capela", no cross in the drawing (ADR 0022).
- **Capela and Estudos:** about faith, not about Gustavo — no biography, no city.
  The Capela's future letter is an **invitation** to the reader, not a testimony.
- **Data from visitors** (comments, the Capela's candles): anonymous by default,
  nothing required, an LGPD notice before sending, deleted when no longer needed.
  Faith and health are sensitive data (LGPD art. 5º, II).

The footer's labels live in `lib/world-footer-content.ts`, one set per language.

Contact e-mail: `IDENTITY.email` in `lib/portfolio-content.ts`.

**How he is named.** "Engenheiro de Software e IA" is the title (header, hero,
metadata). The seniority, Fullstack Pleno, appears only in the résumé, the
portfolio's career and Sobre.

### Before publishing — checklist

Run it for every new or changed text, image or page, including drafts written
by an AI "in Gustavo's voice". A closed space is not private: Vercel preview
deployments open it (`canSeeUnderConstruction()`), so the checklist applies there too.

1. **Biography?** Does it tell something of his life (past, feelings, family,
   routine) instead of stating a fact? → rewrite or cut.
2. **Faith:** stated, not narrated, and only where the table allows?
3. **Location:** nothing finer than the city, and the city only in the portfolio?
   Count combinations too: city + employer + school + photo together say where he is.
4. **Third parties:** does it name or show someone else (colleague, client,
   family)? → only with that person's consent; never a client's data.
5. **Photos:** crop, uniform scale and tone only; metadata stripped (no EXIF/GPS);
   nobody else in the frame.
6. **SEO surfaces:** metadata, JSON-LD, OG images and the sitemap follow the same
   rules as the visible page — robots read them first.
7. **Consent:** anything personal that passes 1–6 still waits for Gustavo's
   explicit yes on the **exact text**; until then it keeps a `REVIEW` marker.
   An exception to this table needs a new decision here, not a one-off.

## Photos of Gustavo

Crop, uniform scale and tone only — **never reshape the face** (no warp,
liquify or geometry retouching). Keep the aspect ratio on every resize, check
the face after cropping, strip metadata before publishing. The portrait is
`apps/web/public/portfolio/portrait.jpg` (`PORTRAIT_SRC`).

## Images

Artworks must be public domain (e.g. Duccio's Last Supper,
`public/chapel/last-supper.jpg`). Studies' figures live in
`public/studies/<slug>/`: own diagrams and screenshots of this site, or
public-domain images, metadata stripped.
