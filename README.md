# My World

Gustavo Rodrigues Fabiano's personal world: the portfolio ("Mundo do Gustavo") and
the Capela, a personal library of studies on Catholic spirituality,
theology and philosophy.

## Structure

```
apps/
  web/          Next.js 15 frontend
  cms/          Strapi 5 headless CMS
packages/
  types/        Shared TypeScript types
  design-system/ CSS tokens + environment configs
  ui/           Shared primitive components
```

## Getting started

### 1. Prerequisites
- Node.js >= 20
- Docker + Docker Compose

### 2. Install dependencies
```bash
npm install
```

### 3. Start services (PostgreSQL + Strapi)
```bash
docker compose up -d
```

### 4. Configure environment variables
```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/cms/.env.example apps/cms/.env
```
Edit both files and fill in the required values.

### 5. Run the frontend
```bash
npm run dev
```

Frontend: http://localhost:3000  
Strapi admin: http://localhost:1337/admin

## Environments

| Environment | Routes | Theme source | Surface | Accent |
|-------------|--------|--------------|---------|--------|
| Catholic — Capela | `/chapel`, `/chapel/articles`, `/chapel/categories`, `/chapel/saints`, `/chapel/about` | `themes/chapel.ts` | limewash `#F4F1EA` / night `#141311` | rubric `#B5321C` / ember `#EE5C3F` |
| Portfolio — Mundo do Gustavo | `/portfolio`, `/portfolio/resume`, `/identity` | `themes/portfolio.ts` | paper `#EEEAE0` / night `#14120E` | rubric `#B5321C` / ember `#EE5C3F` |

The portfolio carries the personal identity (mark, palette, type, graphic devices);
its living brand guide is the `/identity` page.

Adding a new environment:
1. Add a theme in `packages/design-system/src/themes/{name}.ts`
2. Register it in `packages/ui/src/generate-themes.ts` (use `scope` if it should
   only apply while its pages are mounted) and run `npm run generate:themes`
3. Create `apps/web/src/app/({name})/layout.tsx` with `data-env="{name}"` and import
   the generated CSS

Brand assets (`apps/web/public/brand/*.svg`) are generated from the mark geometry:
`cd packages/ui && npm run generate:brand`.

## Naming conventions

- **Files:** `kebab-case` — `article-card.tsx`, `strapi-client.ts`
- **Routes / URLs:** English — `/articles`, `/categories`, `/about`
- **Code:** English (variables, functions, types, comments)
- **Content:** Portuguese (text visible to the user)

## Strapi content types

- `Article` — title, slug, summary, content, cover-image, reading-time, category, tags, references
- `Category` — name, slug, description, icon
- `Tag` — name, slug

## Revalidation

Strapi fires a webhook to `/api/revalidate` on publish/update/delete.
Next.js revalidates the affected pages using `revalidatePath` and `revalidateTag`.
