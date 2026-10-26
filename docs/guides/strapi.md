# Strapi (legacy)

Strapi 5 in `apps/cms`, with PostgreSQL via `docker-compose.yml`. It is **not
wired**: pages read `lib/mock-data.ts`, and the decision is to move content to
MDX ([ADR 0007](../architecture/adr/0007-content-in-mdx.md)). Kept here until
it is removed.

```bash
docker compose up -d            # PostgreSQL + Strapi
cp apps/cms/.env.example apps/cms/.env
# http://localhost:1337/admin → Settings → API Tokens → STRAPI_API_TOKEN in apps/web/.env.local
```

Revalidation: Strapi fires a webhook to `/api/revalidate` on publish/update/delete;
Next.js revalidates the affected `/chapel/...` pages (`revalidatePath`, `revalidateTag`).

## Content types

**Article**

| Field | Type | Notes |
|---|---|---|
| title | Text (required) | |
| slug | UID (from title) | unique |
| summary | Text (long) | |
| content | Rich Text (Blocks) | |
| coverImage | Media (single) | optional — falls back to category color |
| readingTime | Number (integer) | minutes |
| status | Enumeration | draft, published, archived |
| category | Relation → Category | many-to-one |
| tags | Relation → Tag | many-to-many |
| references | JSON | array of strings |

**Category**: name (required), slug (UID from name), description (long text), icon (text).

**Tag**: name (required), slug (UID from name).

Permissions: Settings → Roles → Public: enable `find` and `findOne` for Article,
Category, Tag.

These fields are a useful starting point for the MDX front matter of Estudos.
