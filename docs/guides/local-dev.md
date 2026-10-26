# Local development

Requirements: Node.js ≥ 20, pnpm (the version in `package.json` →
`packageManager`). Docker only for the legacy Strapi ([strapi.md](strapi.md)) —
the web app runs without it (pages read mock data).

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm dev                 # http://localhost:3000
```

## Commands

| Command | What |
|---|---|
| `pnpm dev` | every app in dev (turbo) |
| `pnpm build` | production build |
| `pnpm type-check` | `tsc --noEmit` in every package |
| `pnpm lint` | lint |
| `pnpm format` | prettier |
| `cd packages/ui && npm run generate:themes` | regenerate `css/themes/*.css` after changing a theme |
| `cd packages/ui && npm run generate:brand` | regenerate `apps/web/public/brand/*.svg` |

## `.env.local`

```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<from strapi admin, only if Strapi runs>
REVALIDATE_SECRET=any-random-string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=My World
# SHOW_UNDER_CONSTRUCTION=true|false   # override who can enter closed spaces
```

In `next dev`, closed spaces (the Capela) are open to you, with a notice;
set `SHOW_UNDER_CONSTRUCTION=false` to see what the public sees.

## For AI sessions

`.claude/launch.json` defines the dev server "web" for the preview tools. If
port 3000 is taken by Gustavo's own server, don't kill it — use it or another port.
