# Current handoff

Updated: 2026-11-02 · Branch: `feat/blog`

Only unfinished state. Decisions live in [ADRs](../architecture/adr/); the
product picture in [product/spaces.md](../product/spaces.md).

## Current state

- The rename of Estudos to the Blog (ADR 0031), its image-led layout (ADR 0032) and
  the writing policy (ADR 0033) are on `feat/blog`, pushed, not merged.
- The Blog's covers are gray plates until Gustavo brings pictures. The five
  `content/blog/exemplo-*.mdx` drafts exist only to see the layout: delete them
  when real posts exist.
- Under ADR 0033 no current draft can be published as it is: Gustavo writes them
  himself. He also rewrites the policy page, a draft from his words (`REVIEW`).
- `feat/world-home` is pushed with a Vercel preview, not merged. `master` and
  production are behind: production still shows exact coordinates and an old e-mail.
- The Blog and the Capela are built and closed (`building` in `lib/world.ts`).
- Run `pnpm build` once with no dev server up: the last changes passed type-check
  and the browser, not a production build.

## Open questions

- The Blog: keep the note format, or only articles? Needs an ADR either way.
- Home: close with a short verse? A values/manifesto section later?
- The Capela script (scenes, music, letter) and when it resumes.
- When Projetos starts; when the Blog opens to the public.
- `REVIEW` drafts remain only in the Capela and the Blog (`chapel-content.ts`,
  `blog-content.ts`, the posts' MDX); Gustavo will review them later. The rest
  was confirmed on 2026-10-30.
- Vercel Deployment Protection: Gustavo confirms it is on for previews, which open
  the closed spaces (ADR 0018).
- Loja Composable is finished but not on GitHub. When Gustavo pushes it, add it to
  `prototypes` or `artifacts` with its link.
- Blog's no-AI rule: does it allow help with spelling or revision? Not decided (ADR 0033).

## Next action

Gustavo runs the build and asks for the commit. Opening the Blog = the
first published posts and `blog` set to `open` in `lib/world.ts`.

## Disposable context

—
