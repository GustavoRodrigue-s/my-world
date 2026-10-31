# Deploy

Hosted on **Vercel**, from GitHub: the default branch `master` deploys to
production; every other pushed branch gets a **preview** deployment.

- Previews are behind Vercel Authentication and show closed spaces (Estudos, the Capela)
  with the construction notice — the way to review work in progress.
- Production never shows closed spaces; they are served by their
  `/under-construction/<space>` page with `noindex`.
- `SHOW_UNDER_CONSTRUCTION=true|false` set in a Vercel environment overrides
  that for its deployments. Static pages read it at **build** time, so set it for
  the build too (it's in `turbo.json` → `env` so the cache splits on it).
- Env var to set in Vercel: `NEXT_PUBLIC_SITE_URL`.

Flow used so far: work on a branch, push for a preview, Gustavo validates, merge
to `master`. Commit, push and merge only when Gustavo asks.
