# Content, voice and privacy

## Where copy lives

Every visible word lives in a content module, never hardcoded in a component:

| Module | Space |
|---|---|
| `lib/world-content.ts` (`WORLD`) | the home |
| `lib/logbook.ts` (`LOGBOOK`) | the diário de bordo — add a dated line with every change worth telling; the home shows the latest six |
| `lib/portfolio-content-pt.ts` · `-en.ts` (both `PortfolioCopy`), composed by `lib/portfolio-content.ts` (`getContent(locale)`, invariant facts in `IDENTITY`) | portfolio, résumé, `/identity` — a fact added in one locale must be added in the other |
| `lib/chapel-content.ts` (`CHAPEL`, `chapelPath()`) | the Capela |
| `lib/mock-data.ts` | the Capela's studies, categories and quotes (until MDX) |

`REVIEW` comments mark drafts Gustavo still has to confirm (today in
`portfolio-content*.ts`, `chapel-content.ts`, `logbook.ts`). Don't remove the
marker without his confirmation.

## Language

Everything a reader sees is Portuguese (plus the portfolio's English edition);
code, routes, files, comments and these docs are English. Literal titles; the
metaphor (órbita, oficina, artefato, prancheta, lição) lives in margins,
captions and labels. One emphasized word per statement.

Names: the chapel space is just **"Capela"** — never "Capela de Estudos"
(renamed 2026-10-25). Estudos is never a "blog".

## Privacy — what never goes on the site (or in these docs)

Gustavo keeps his personal life private. The world shares his **areas** (work,
projects, studies, faith spaces), not his life: no hobbies, routines, friends,
church habits or self-descriptions. Faith and the person appear only in an
implied, discreet way (see the hidden details of the home map).

- The home shows no location and no coordinates (fine in the portfolio).
- Contact e-mail: `IDENTITY.email` in `lib/portfolio-content.ts`.

## Photos of Gustavo

Crop, uniform scale and tone only — **never reshape the face** (no warp,
liquify or geometry retouching). Keep the aspect ratio on every resize, check
the face after cropping, strip metadata before publishing. The portrait is
`apps/web/public/portfolio/portrait.jpg` (`PORTRAIT_SRC`).

## Images

Artworks must be public domain (e.g. Duccio's Last Supper,
`public/chapel/last-supper.jpg`).
