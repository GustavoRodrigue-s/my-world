# Docs

The project's memory. Everything a person or an AI session needs to continue the
work lives here, versioned with the code. Chat transcripts, AI memory and Notion
are **not** sources: if a decision only exists there, it doesn't exist yet.

`AGENTS.md` (root) is the short, always-loaded entry point; it links here.

## Map

| Folder | Answers | Update when |
|---|---|---|
| [product/](product/) | What is this world, what are its spaces, what is planned? | a space changes purpose, status or plan |
| [architecture/overview.md](architecture/overview.md) | How does the system work today? | the structure changes (routes, packages, data, gating) |
| [architecture/adr/](architecture/adr/) | Why did we choose X over Y? | a decision is made or superseded |
| [design-system/](design-system/) | How does the identity look and behave? Which component do I use? | a visual rule, palette, dialect or component changes |
| [guides/](guides/) | How do I run, deploy or configure X? | a command or a setup step changes |
| [handoffs/current.md](handoffs/current.md) | Where did the last session stop? What is open? | at the end of every session that leaves work unfinished |

Other sources of truth that are **code**, not prose — docs point to them instead
of copying values:

- Theme tokens: `packages/design-system/src/themes/{portfolio,chapel}.ts`
- Spaces and their status: `apps/web/src/lib/world.ts`
- Visible copy: `apps/web/src/lib/*-content*.ts`
- Public changelog (diário de bordo): `apps/web/src/lib/logbook.ts`
- The living brand guide: the `/identity` page

When docs and code disagree about **behavior**, the code wins and the doc is
fixed. When they disagree about **intent**, the accepted ADR wins until a new
ADR supersedes it.

## How to document (the promotion step)

At the end of a session, sort what was learned:

| Kind | Goes to |
|---|---|
| A decision (we chose X, because…) | a new ADR in `architecture/adr/`, or a new one that supersedes an old one |
| A rule every session must follow | `AGENTS.md` (only if it's short and always relevant) or the matching doc |
| How a part works now | the matching doc in `product/`, `architecture/` or `design-system/` |
| How to run / deploy / configure | `guides/` |
| Unfinished state, open questions, next step | `handoffs/current.md` only |
| A change worth telling visitors | a line in `logbook.ts` |
| Debug output, discarded hypotheses | nowhere |

Don't duplicate: one fact, one place; elsewhere, link to it. Never write
personal details about Gustavo here (see [product/content.md](product/content.md)).
