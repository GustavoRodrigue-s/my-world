# My World

Gustavo Rodrigues Fabiano's personal world — "Mundo do Gustavo": one world with
spaces, drawn as a map at `/`. The Portfólio (career, résumé, brand guide; PT +
EN) is open; the Capela is being built; Projetos and Estudos are planned.

Next.js 15 · TypeScript · Tailwind v4 · Turborepo + pnpm · Vercel.

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm dev        # http://localhost:3000
```

## Structure

```
apps/web/            Next.js app — every space
apps/cms/            Strapi 5 (legacy, not wired)
packages/ui/         @my-world/ui — the identity's components and CSS
packages/design-system/  themes (tokens) per environment
packages/types/      shared types
docs/                the project's documentation
```

## Documentation

Everything lives in [`docs/`](docs/README.md):
[spaces](docs/product/spaces.md) ·
[architecture](docs/architecture/overview.md) ·
[decisions](docs/architecture/adr/README.md) ·
[design system](docs/design-system/README.md) ·
[guides](docs/guides/local-dev.md) ·
[current handoff](docs/handoffs/current.md).

AI agents start at [`AGENTS.md`](AGENTS.md) (`CLAUDE.md` imports it).
