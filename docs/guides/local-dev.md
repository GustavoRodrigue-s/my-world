# Local development

Requirements: Node.js ≥ 20, pnpm (the version in `package.json` →
`packageManager`).

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
| `pnpm tokens` | rebuild the design system's output (CSS, `tokens.json`, brand SVGs) by hand; `dev` and `build` already do it |

## `.env.local`

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# SHOW_UNDER_CONSTRUCTION=true|false   # override who can enter closed spaces
```

In `next dev`, closed spaces (Estudos, the Capela) are open to you, with a notice;
set `SHOW_UNDER_CONSTRUCTION=false` to see what the public sees.

## For AI sessions

`.claude/launch.json` defines the dev server "web" for the preview tools. If
port 3000 is taken by Gustavo's own server, don't kill it — use it. Never run
`pnpm build` while a dev server is up: both write to `.next` and it breaks.
