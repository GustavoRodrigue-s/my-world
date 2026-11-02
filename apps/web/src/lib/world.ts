// The world's spaces and the state each one is in. Changing a status here
// opens or closes a space everywhere: the middleware, links, the sitemap and
// the search all read it. A space that is still being built is not removed —
// it keeps its badge and visitors get its construction page instead.
// Edge-safe: imported by the middleware, so no Node APIs here.

/** open: anyone enters · building: exists, closed to the public · planned: on the drawing board, nothing to enter yet. */
export type SpaceStatus = 'open' | 'building' | 'planned'

export const SPACES = {
  portfolio: { paths: ['/portfolio', '/identity', '/en'], status: 'open' },
  chapel: { paths: ['/chapel'], status: 'building' },
  projects: { paths: [], status: 'planned' },
  blog: { paths: ['/blog'], status: 'building' },
} as const satisfies Record<string, { paths: readonly string[]; status: SpaceStatus }>

export type SpaceId = keyof typeof SPACES

/** Where a closed space is served from: `${CONSTRUCTION_BASE}/<space id>` (one page per space). */
export const CONSTRUCTION_BASE = '/under-construction'

/**
 * Who may enter a space that is still being built: local development and
 * Vercel preview deployments (behind Vercel Authentication) — never production.
 * SHOW_UNDER_CONSTRUCTION=true|false overrides that for a deployment; it is read
 * at build time by static pages, so set it for the build too.
 */
export function canSeeUnderConstruction(): boolean {
  const override = process.env.SHOW_UNDER_CONSTRUCTION
  if (override === 'true') return true
  if (override === 'false') return false
  return process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV === 'preview'
}

export function isUnderConstruction(id: SpaceId): boolean {
  return SPACES[id].status === 'building'
}

/** Whether the current viewer may enter the space (a planned one has nothing to enter yet). */
export function canEnter(id: SpaceId): boolean {
  const { status } = SPACES[id]
  if (status === 'planned') return false
  return status === 'open' || canSeeUnderConstruction()
}

/** The space a path belongs to, if it is closed to the current viewer. */
export function closedSpaceAt(pathname: string): SpaceId | null {
  for (const id of Object.keys(SPACES) as SpaceId[]) {
    const inside = SPACES[id].paths.some((p) => pathname === p || pathname.startsWith(`${p}/`))
    if (inside && !canEnter(id)) return id
  }
  return null
}
