// The mark's geometry: brand data, like the tokens. The <Mark> component, the
// identity page's construction drawing and the brand SVGs (built by build.mjs)
// all draw from these numbers. Plain TypeScript with erasable types only, so
// Node can run it directly in the build.

/**
 * The G-orbit monogram. An open orbit draws the G; the crossbar points to the
 * core (the world, the self); a satellite rides in the G's mouth — the work
 * leaving the world. Each landscape swaps only the satellite:
 *   satellite → the portfolio, star → the chapel, artifact → the projects, seed → the studies.
 *
 * Geometry is exported so construction drawings (identity page, favicons,
 * OG images) are built from the same numbers instead of being re-traced.
 */
export const MARK_GEOMETRY = {
  box: 48,
  cx: 24,
  cy: 24,
  r: 17,
  stroke: 3.2,
  /** Orbit runs counter-clockwise from gapStart (upper right) round to gapEnd (3 o'clock). */
  gapStart: -40,
  gapEnd: 0,
  barEnd: 31.5,
  core: 4.4,
  satelliteAngle: -20,
  satellite: 2.7,
} as const

const g = MARK_GEOMETRY
const rad = (deg: number) => (deg * Math.PI) / 180
const round = (n: number) => Math.round(n * 100) / 100

export function markPoint(angle: number, radius: number = g.r) {
  return { x: round(g.cx + radius * Math.cos(rad(angle))), y: round(g.cy + radius * Math.sin(rad(angle))) }
}

const start = markPoint(g.gapStart)
const end = markPoint(g.gapEnd)
const sat = markPoint(g.satelliteAngle)

export const MARK_ORBIT_PATH = `M${start.x} ${start.y} A${g.r} ${g.r} 0 1 0 ${end.x} ${end.y} H${g.barEnd}`

export type MarkVariant = 'satellite' | 'star' | 'artifact' | 'seed'

export function markSatellitePath(variant: MarkVariant): string {
  const { x, y } = sat
  if (variant === 'star') {
    const o = 4.4
    const i = 1.15
    return `M${x} ${round(y - o)}L${round(x + i)} ${round(y - i)}L${round(x + o)} ${y}L${round(x + i)} ${round(y + i)}L${x} ${round(y + o)}L${round(x - i)} ${round(y + i)}L${round(x - o)} ${y}L${round(x - i)} ${round(y - i)}Z`
  }
  if (variant === 'seed') {
    // An almond (the vesica of old sacred art): what one plants by studying.
    const o = 4.6
    const r = 5.6
    return `M${x} ${round(y - o)}A${r} ${r} 0 0 1 ${x} ${round(y + o)}A${r} ${r} 0 0 1 ${x} ${round(y - o)}Z`
  }
  if (variant === 'artifact') {
    const h = 2.5
    return `M${round(x - h)} ${round(y - h)}h${h * 2}v${h * 2}h${-h * 2}Z`
  }
  const r = g.satellite
  return `M${round(x - r)} ${y}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`
}
