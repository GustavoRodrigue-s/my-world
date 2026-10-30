import { cx } from '@/components/ui'
import { PORTRAIT_SRC } from '@/lib/portfolio-content'
import { SPACES, canEnter, type SpaceId } from '@/lib/world'
import { PLACE_ORDER, WORLD } from '@/lib/world-content'
import { PlaceGlyph } from './place-glyph'

/*
 * Carta do mundo — the home's map: one island, its places, the trails that
 * lead to them from where the visitor lands ("você está aqui").
 *
 * Drawn as an old sea chart in the identity's engraving hand: graduated
 * border, cartouche, ripple lines along the coast, mountains, a river, a lake,
 * a ship arriving, a compass rose, the edge of an unknown land.
 *
 * What is hidden, for whoever looks closely:
 *   - the world's prime meridian and its equator cross exactly at the Capela;
 *   - the compass rose marks the East with a cross (medieval charts did: the
 *     orient, where the sun rises — it is where the word "orientar" comes from);
 *   - the Southern Cross sits in the southern sea, its long arm pointing south,
 *     the way navigators find the pole; under it, very faint, Jo 1,5;
 *   - the harbor's pier is a post and a crossbar: you arrive at the foot of a cross;
 *   - hovering the map reveals a point of gold where the two lines cross.
 *
 * Purely decorative for assistive tech (aria-hidden, links out of the tab
 * order): the atlas below is the real, accessible navigation.
 * Motion: drawn once on arrival (identity.css .chart-*), hover traces a trail.
 */

// The arrival sequence: each part of the chart appears this many stagger
// steps (duration.stagger) after the page opens.
const arrive = (steps: number) => ({ animationDelay: `calc(${steps} * var(--duration-stagger))` })

const r1 = (n: number) => Math.round(n * 10) / 10

// The island's outline, clockwise: a few control points for the big shape.
// The bay at the bottom is the harbor.
const COAST: Array<[number, number]> = [
  [262, 128], [330, 104], [410, 96], [478, 108], [540, 92], [610, 98], [680, 116], [742, 152],
  [778, 206], [770, 262], [796, 316], [788, 384], [752, 440], [700, 478], [640, 510], [575, 532],
  [522, 540], [500, 532], [487, 516], [471, 508], [455, 516], [442, 532], [420, 548], [350, 546],
  [288, 520], [236, 478], [200, 420], [188, 358], [206, 300], [180, 246], [198, 186], [226, 150],
]
const CENTROID: [number, number] = [480, 330]
const HARBOR = { x: 471, y: 513 }

/** A point on the closed Catmull-Rom curve through COAST: segment i, parameter t. */
function curvePoint(i: number, t: number): [number, number] {
  const n = COAST.length
  const p0 = COAST[(i - 1 + n) % n]
  const p1 = COAST[i]
  const p2 = COAST[(i + 1) % n]
  const p3 = COAST[(i + 2) % n]
  const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
  const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
  const u = 1 - t
  const b = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t]
  return [b[0] * p1[0] + b[1] * c1[0] + b[2] * c2[0] + b[3] * p2[0], b[0] * p1[1] + b[1] * c1[1] + b[2] * c2[1] + b[3] * p2[1]]
}

// The engraved coast: the smooth outline sampled finely, then pushed in and out
// along its normal by a few layered waves — capes and coves, always the same.
// The harbor's bay is kept calm.
const SAMPLES_PER_SEGMENT = 9
const COAST_POINTS: Array<[number, number]> = (() => {
  const base: Array<[number, number]> = []
  for (let i = 0; i < COAST.length; i++) {
    for (let k = 0; k < SAMPLES_PER_SEGMENT; k++) base.push(curvePoint(i, k / SAMPLES_PER_SEGMENT))
  }
  const n = base.length
  return base.map(([x, y], i) => {
    const [ax, ay] = base[(i - 1 + n) % n]
    const [bx, by] = base[(i + 1) % n]
    const len = Math.hypot(bx - ax, by - ay) || 1
    const nx = (by - ay) / len
    const ny = -(bx - ax) / len
    const a = (i / n) * Math.PI * 2
    const noise = 5.5 * Math.sin(7 * a + 1.3) + 3.2 * Math.sin(17 * a + 0.4) + 1.9 * Math.sin(31 * a + 2.1) + 1.1 * Math.sin(57 * a + 0.9) + 0.6 * Math.sin(97 * a + 2.7)
    const calm = Math.min(1, Math.hypot(x - HARBOR.x, y - HARBOR.y) / 60)
    return [x + nx * noise * calm, y + ny * noise * calm]
  })
})()

/** The coast as a path, optionally scaled about the centroid (the ripple lines offshore). */
function coastPath(scale = 1) {
  return (
    COAST_POINTS.map(([x, y], i) => {
      const sx = CENTROID[0] + (x - CENTROID[0]) * scale
      const sy = CENTROID[1] + (y - CENTROID[1]) * scale
      return `${i === 0 ? 'M' : 'L'}${r1(sx)} ${r1(sy)}`
    }).join('') + 'Z'
  )
}

const COAST_D = coastPath()

/** A small rocky islet: a jagged ring around (x, y). */
function islet(x: number, y: number, r: number, seed: number) {
  const pts = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2
    const rr = r * (1 + 0.22 * Math.sin(3 * a + seed) + 0.12 * Math.sin(7 * a + seed * 2))
    return `${i === 0 ? 'M' : 'L'}${r1(x + rr * Math.cos(a))} ${r1(y + rr * 0.72 * Math.sin(a))}`
  })
  return `${pts.join('')}Z`
}

const ISLETS: Array<[number, number, number, number]> = [
  [150, 444, 10, 1.1],
  [172, 461, 5, 2.3],
  [826, 456, 8, 0.7],
  [728, 548, 6, 3.1],
  [298, 88, 6, 1.9],
]

// Where the world's two lines cross — the Capela stands on it.
const MERIDIAN = 500
const EQUATOR = 338

// Each place: where it stands, and the trail from the harbor to the foot of its label.
const PLACE_AT: Record<SpaceId, { x: number; y: number; trail: string }> = {
  portfolio: { x: 668, y: 250, trail: 'M478 509C610 492 702 400 672 302' },
  projects: { x: 300, y: 372, trail: 'M464 510C390 512 302 470 300 422' },
  studies: { x: 455, y: 222, trail: 'M467 505C420 448 390 342 452 270' },
  chapel: { x: MERIDIAN, y: EQUATOR, trail: 'M472 504C482 466 512 426 500 388' },
}

const RIVER = 'M594 190C622 242 640 300 700 326S760 344 792 350'

/** Sample a single cubic "M x y C ..." path (first segment) — used to find where a trail crosses the river. */
function cubicSamples(d: string, steps = 80): Array<[number, number]> {
  const n = d.match(/-?\d+(\.\d+)?/g)!.map(Number)
  const [x0, y0, x1, y1, x2, y2, x3, y3] = n
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps
    const u = 1 - t
    return [
      u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
      u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3,
    ]
  })
}

const VILLAGE: Array<[number, number, number]> = [
  [418, 494, -6], [432, 487, 4], [522, 492, 5], [536, 500, -3],
]

const WAVES: Array<[number, number]> = [
  [70, 160], [124, 206], [58, 262], [112, 318], [74, 382], [64, 446],
  [356, 56], [470, 48], [604, 58], [702, 70],
  [834, 306], [910, 338], [852, 396], [940, 410],
  [250, 586], [212, 560], [716, 566], [760, 590],
]

const MOUNTAINS: Array<[number, number, number]> = [
  [556, 178, 1], [584, 168, 1.35], [614, 182, 1], [736, 182, 0.9], [762, 200, 1.1],
  [232, 264, 1.1], [258, 250, 1.4], [222, 302, 0.9], [264, 290, 0.8],
]

const TREES: Array<[number, number]> = [
  [352, 462], [366, 471], [381, 458], [394, 474], [408, 462], [372, 487], [391, 491], [344, 483],
  [604, 441], [620, 453], [636, 439], [649, 457], [617, 471], [548, 256], [561, 268], [536, 271],
]

// Where the trail to the Antena crosses the river: a little bridge.
const BRIDGE = (() => {
  const trail = cubicSamples(PLACE_AT.portfolio.trail)
  const river = cubicSamples(RIVER)
  let best = { d: Infinity, x: 0, y: 0, a: 0 }
  trail.forEach(([x, y], i) => {
    river.forEach(([rx, ry]) => {
      const d = Math.hypot(x - rx, y - ry)
      if (d < best.d) {
        const [nx, ny] = trail[Math.min(i + 1, trail.length - 1)]
        best = { d, x: (x + rx) / 2, y: (y + ry) / 2, a: (Math.atan2(ny - y, nx - x) * 180) / Math.PI }
      }
    })
  })
  return { x: r1(best.x), y: r1(best.y), a: r1(best.a) }
})()

/** Rhumb lines: the faint compass lines of old portolan charts, radiating from the rose. */
function RhumbLines({ x, y }: { x: number; y: number }) {
  const d = Array.from({ length: 16 }, (_, i) => {
    const a = (i * 22.5 * Math.PI) / 180
    return `M${x} ${y}L${r1(x + 1300 * Math.sin(a))} ${r1(y - 1300 * Math.cos(a))}`
  }).join('')
  return <path d={d} clipPath="url(#chart-inner)" className="stroke-foreground" strokeWidth="0.6" opacity="0.24" />
}

function House({ x, y, tilt }: { x: number; y: number; tilt: number }) {
  return (
    <path
      transform={`rotate(${tilt} ${x} ${y})`}
      d={`M${x - 4} ${y}V${y - 5}H${x + 4}V${y}ZM${x - 5} ${y - 5}L${x} ${y - 9}L${x + 5} ${y - 5}`}
      className="fill-surface-raised stroke-foreground"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
  )
}

function Mountain({ x, y, s }: { x: number; y: number; s: number }) {
  const w = 14 * s
  const h = 20 * s
  return (
    <g>
      <path d={`M${r1(x - w)} ${y}L${x} ${r1(y - h)}L${r1(x + w)} ${y}`} className="fill-surface-raised stroke-foreground" strokeWidth="1" strokeLinejoin="round" />
      {/* Engraved shade on the eastern face */}
      <path
        d={[0.3, 0.5, 0.7].map((t) => `M${r1(x + w * t * 0.5)} ${r1(y - h * (1 - t * 0.5))}L${r1(x + w * t)} ${y}`).join('')}
        className="stroke-foreground"
        strokeWidth="0.7"
        opacity="0.55"
      />
    </g>
  )
}

function Tree({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x} ${y}V${y - 3}M${x - 4.5} ${y - 3}L${x} ${y - 13}L${x + 4.5} ${y - 3}Z`}
      className="fill-surface-raised stroke-foreground"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
  )
}

function star(x: number, y: number, o: number) {
  const i = o * 0.26
  return `M${x} ${y - o}L${r1(x + i)} ${r1(y - i)}L${x + o} ${y}L${r1(x + i)} ${r1(y + i)}L${x} ${y + o}L${r1(x - i)} ${r1(y + i)}L${x - o} ${y}L${r1(x - i)} ${r1(y - i)}Z`
}

/** Old-chart border: two rules with a graduated band of alternating ink between them. */
function Neatline() {
  const segs: string[] = []
  for (let x = 22, k = 0; x < 978; x += 40, k++) {
    if (k % 2 === 0) segs.push(`M${x} 10h${Math.min(40, 978 - x)}v12h${-Math.min(40, 978 - x)}Z`, `M${x} 618h${Math.min(40, 978 - x)}v12h${-Math.min(40, 978 - x)}Z`)
  }
  for (let y = 22, k = 0; y < 618; y += 40, k++) {
    if (k % 2 === 1) segs.push(`M10 ${y}v${Math.min(40, 618 - y)}h12v${-Math.min(40, 618 - y)}Z`, `M978 ${y}v${Math.min(40, 618 - y)}h12v${-Math.min(40, 618 - y)}Z`)
  }
  return (
    <g className="stroke-foreground">
      <rect x="10" y="10" width="980" height="620" fill="none" strokeWidth="1.2" />
      <rect x="22" y="22" width="956" height="596" fill="none" strokeWidth="0.7" />
      <path d={segs.join('')} className="fill-foreground" strokeWidth="0" opacity="0.8" />
      <path d="M10 10h12v12H10ZM978 10h12v12h-12ZM10 618h12v12H10ZM978 618h12v12h-12Z" className="fill-foreground" strokeWidth="0" />
    </g>
  )
}

function CompassRose({ x, y }: { x: number; y: number }) {
  const R = 52
  const ticks = Array.from({ length: 32 }, (_, i) => {
    const a = (i * 11.25 * Math.PI) / 180
    const inner = i % 4 === 0 ? R - 8 : R - 4
    return `M${r1(x + inner * Math.sin(a))} ${r1(y - inner * Math.cos(a))}L${r1(x + R * Math.sin(a))} ${r1(y - R * Math.cos(a))}`
  }).join('')
  return (
    <g className="stroke-foreground">
      <circle cx={x} cy={y} r={R} fill="none" strokeWidth="1" />
      <circle cx={x} cy={y} r={R - 8} fill="none" strokeWidth="0.6" opacity="0.6" />
      <path d={ticks} strokeWidth="0.7" />
      {[45, 135, 225, 315].map((a) => (
        <g key={a} transform={`translate(${x} ${y}) rotate(${a})`}>
          <path d="M0 0L-4.5 -5L0 -36Z" className="fill-foreground" strokeWidth="0.6" />
          <path d="M0 0L4.5 -5L0 -36Z" className="fill-surface" strokeWidth="0.6" />
        </g>
      ))}
      {[0, 90, 180, 270].map((a) => (
        <g key={a} transform={`translate(${x} ${y}) rotate(${a})`}>
          <path d="M0 0L-7 -7L0 -60Z" className="fill-foreground" strokeWidth="0.8" />
          <path d="M0 0L7 -7L0 -60Z" className="fill-surface" strokeWidth="0.8" />
        </g>
      ))}
      <circle cx={x} cy={y} r="3" className="fill-surface" strokeWidth="1" />
      <text x={x} y={y - R - 12} textAnchor="middle" className="fill-foreground stroke-none font-serif text-xl italic">
        {WORLD.map.north}
      </text>
      {/* The East, marked with a cross — the orient. */}
      <path d={`M${x + R + 15} ${y - 9}V${y + 9}M${x + R + 9.5} ${y - 4}H${x + R + 20.5}`} strokeWidth="1.3" strokeLinecap="round" />
    </g>
  )
}

const CRUX = {
  gacrux: [884, 452, 5],
  mimosa: [856, 489, 5.5],
  delta: [912, 480, 4],
  epsilon: [902, 510, 2.8],
  acrux: [889, 534, 6.5],
} as const

function SouthernCross() {
  const { gacrux, mimosa, delta, acrux } = CRUX
  return (
    <g>
      <path
        d={`M${gacrux[0]} ${gacrux[1]}L${acrux[0]} ${acrux[1]}M${mimosa[0]} ${mimosa[1]}L${delta[0]} ${delta[1]}`}
        className="stroke-foreground"
        strokeWidth="0.7"
        strokeDasharray="2 4"
        opacity="0.55"
      />
      {/* The long arm, prolonged: the way to the south */}
      <path d={`M${acrux[0] + 0.4} ${acrux[1] + 10}L${acrux[0] + 2.4} 584`} className="stroke-foreground" strokeWidth="0.7" strokeDasharray="1 4" opacity="0.6" />
      <circle cx={acrux[0] + 2.6} cy="589" r="3" fill="none" className="stroke-foreground" strokeWidth="0.8" />
      {Object.entries(CRUX).map(([name, [x, y, o]]) => (
        <path key={name} d={star(x, y, o)} className="fill-foreground" />
      ))}
      <text x="886" y="609" textAnchor="middle" className="fill-foreground-muted font-serif text-xs italic" opacity="0.7">
        {WORLD.map.inscription}
      </text>
    </g>
  )
}

function Cartouche() {
  return (
    <g>
      <rect x="36" y="36" width="304" height="82" className="fill-surface stroke-foreground" strokeWidth="1" />
      <rect x="40" y="40" width="296" height="74" fill="none" className="stroke-foreground" strokeWidth="0.5" />
      {/* Old atlases carried the cartographer's portrait in a medallion. */}
      {PORTRAIT_SRC && (
        <>
          <image
            href={PORTRAIT_SRC}
            x="50"
            y="49"
            width="56"
            height="56"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#chart-portrait)"
            className="grayscale-(--filter-grayscale-subtle)"
          />
          <circle cx="78" cy="77" r="28" fill="none" className="stroke-foreground" strokeWidth="1" />
        </>
      )}
      <text x="222" y="72" textAnchor="middle" className="fill-foreground font-serif text-2xl italic">
        {WORLD.map.cartouche}
      </text>
      <text x="222" y="90" textAnchor="middle" className="fill-foreground-muted font-mono text-xs">
        {WORLD.map.plate}
      </text>
      <text x="222" y="104" textAnchor="middle" className="fill-foreground-muted font-mono text-xs">
        {WORLD.map.author}
      </text>
    </g>
  )
}

function Legend() {
  const { legend } = WORLD.map
  const rows = [
    { label: legend.open, icon: <rect x="-4" y="-4" width="8" height="8" className="fill-foreground" /> },
    {
      label: legend.building,
      icon: <path d="M-4 4V-5M4 4V-5M-6 -2H6M-6 2H6" className="stroke-foreground" strokeWidth="1" fill="none" />,
    },
    { label: legend.planned, icon: <rect x="-4" y="-4" width="8" height="8" fill="none" className="stroke-support" strokeWidth="1" strokeDasharray="2 1.5" /> },
    { label: legend.trail, icon: <path d="M-8 0H8" className="stroke-foreground" strokeWidth="1" strokeDasharray="3 3" /> },
    { label: legend.here, icon: <circle r="3.5" className="fill-primary" /> },
  ]
  return (
    <g>
      <rect x="36" y="472" width="168" height="134" className="fill-surface stroke-foreground" strokeWidth="0.8" />
      <text x="50" y="492" className="fill-foreground-muted font-mono text-xs uppercase tracking-widest">
        {legend.title}
      </text>
      {rows.map((row, i) => (
        <g key={row.label} transform={`translate(58 ${512 + i * 20})`}>
          {row.icon}
          <text x="16" y="3.5" className="fill-foreground font-mono text-xs">
            {row.label}
          </text>
        </g>
      ))}
    </g>
  )
}

function Ship({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} className="stroke-foreground" strokeWidth="1" strokeLinejoin="round">
      <path d="M-16 -1H16L11 6H-11Z" className="fill-surface-raised" />
      <path d="M0 -1V-28" />
      <path d="M1.5 -26L13 -9H1.5Z" className="fill-surface-raised" />
      <path d="M-1.5 -23L-11 -9H-1.5Z" className="fill-surface-raised" />
      <path d="M0 -28L7 -30L0 -32" className="fill-primary stroke-primary" strokeWidth="0.8" />
      <path d="M-20 9q4 -3 8 0t8 0M6 9q4 -3 8 0t8 0" fill="none" strokeWidth="0.7" opacity="0.6" />
    </g>
  )
}

export function WorldMap() {
  const { map, places, atlas } = WORLD
  const statusLabel = (id: SpaceId) => atlas.states[SPACES[id].status]

  return (
    <svg
      viewBox="0 0 1000 640"
      aria-hidden
      focusable="false"
      className="group/map block h-auto w-full min-w-5xl select-none md:min-w-0"
    >
      <defs>
        <clipPath id="chart-inner">
          <rect x="22" y="22" width="956" height="596" />
        </clipPath>
        <clipPath id="chart-portrait">
          <circle cx="78" cy="77" r="28" />
        </clipPath>
      </defs>
      <Neatline />
      <RhumbLines x={893} y={214} />

      {/* Faint graticule over the sea */}
      <g className="stroke-foreground" strokeWidth="0.6" strokeDasharray="1 5" opacity="0.22">
        {[140, 260, 380, 620, 740, 860].map((x) => (
          <path key={`m${x}`} d={`M${x} 22V618`} />
        ))}
        {[98, 218, 458, 578].map((y) => (
          <path key={`p${y}`} d={`M22 ${y}H978`} />
        ))}
      </g>

      {/* The sea: wave marks and ripple lines along the coast */}
      <g className="chart-appear stroke-foreground" style={arrive(4)} strokeWidth="0.8" fill="none" opacity="0.45">
        {WAVES.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x} ${y}q4 -4 8 0t8 0`} />
        ))}
      </g>
      {[
        [1.03, 0.5],
        [1.065, 0.32],
        [1.11, 0.18],
      ].map(([scale, opacity], i) => (
        <path
          key={scale}
          d={coastPath(scale)}
          pathLength={1}
          fill="none"
          className="chart-trace stroke-foreground"
          style={arrive(5 + i * 2)}
          strokeWidth="0.7"
          opacity={opacity}
        />
      ))}

      {/* Terra incognita: the edge of a land not drawn yet */}
      <g className="chart-appear" style={arrive(14)}>
        <path d="M978 132C950 124 930 100 902 100S850 78 838 50S826 28 822 22" fill="none" className="stroke-foreground" strokeWidth="0.9" strokeDasharray="4 4" />
        <text x="968" y="50" textAnchor="end" className="fill-foreground font-serif text-lg italic">
          {map.incognita}
        </text>
        <text x="968" y="65" textAnchor="end" className="fill-foreground-muted font-mono text-xs">
          {map.incognitaNote}
        </text>
      </g>

      {/* The island and its islets */}
      <path d={COAST_D} className="fill-surface-raised" />
      <g className="chart-appear" style={arrive(10)}>
        {ISLETS.map(([x, y, r, seed]) => (
          <path key={`${x}-${y}`} d={islet(x, y, r, seed)} className="fill-surface-raised stroke-foreground" strokeWidth="0.9" />
        ))}
      </g>

      <g className="chart-appear" style={arrive(12)}>
        {/* Lake */}
        <ellipse cx="372" cy="258" rx="27" ry="13" className="fill-surface stroke-foreground" strokeWidth="0.9" />
        <path d="M356 256q4 -2.5 8 0t8 0M368 262q4 -2.5 8 0t8 0" fill="none" className="stroke-foreground" strokeWidth="0.6" opacity="0.6" />
        {/* River, from the mountains to the eastern sea */}
        <path d={RIVER} fill="none" className="stroke-foreground" strokeWidth="1.1" />
        <path d="M598 198C626 248 646 304 702 330S762 348 792 354" fill="none" className="stroke-foreground" strokeWidth="0.5" opacity="0.5" />
        {MOUNTAINS.map(([x, y, s]) => (
          <Mountain key={`${x}-${y}`} x={x} y={y} s={s} />
        ))}
        {TREES.map(([x, y]) => (
          <Tree key={`${x}-${y}`} x={x} y={y} />
        ))}
        {VILLAGE.map(([x, y, tilt]) => (
          <House key={`${x}-${y}`} x={x} y={y} tilt={tilt} />
        ))}
      </g>

      {/* The world's two lines, crossing at the Capela */}
      <g className="chart-appear stroke-foreground" style={arrive(16)} strokeWidth="0.7" opacity="0.32">
        <path d={`M${MERIDIAN} 22V618`} />
        <path d={`M22 ${EQUATOR}H978`} />
      </g>
      <g className="chart-appear fill-foreground-muted font-mono text-xs" style={arrive(16)}>
        <text x={MERIDIAN + 5} y="36">
          0°
        </text>
        <text x="28" y={EQUATOR - 5}>
          0°
        </text>
      </g>

      {/* The coast, inked last */}
      <path d={COAST_D} pathLength={1} fill="none" className="chart-trace stroke-foreground" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Trails from the harbor */}
      <g className="chart-appear" style={arrive(19)} fill="none">
        {PLACE_ORDER.map((id) => (
          <path key={id} d={PLACE_AT[id].trail} className="stroke-foreground" strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
        ))}
      </g>

      {/* The bridge where the Antena's trail crosses the river */}
      <g className="chart-appear" style={arrive(19)} transform={`translate(${BRIDGE.x} ${BRIDGE.y}) rotate(${BRIDGE.a})`}>
        <rect x="-8" y="-4.5" width="16" height="9" className="fill-surface-raised" />
        <path d="M-8 -4.5H8M-8 4.5H8M-8 -4.5L-10.5 -7M8 -4.5L10.5 -7M-8 4.5L-10.5 7M8 4.5L10.5 7" className="stroke-foreground" strokeWidth="0.9" fill="none" />
      </g>

      {/* Arrival: the ship and its route into the harbor */}
      <g className="chart-appear" style={arrive(17)}>
        <path d="M790 616C730 606 664 602 614 592S516 566 482 540" fill="none" className="stroke-foreground" strokeWidth="0.8" strokeDasharray="2 5" opacity="0.6" />
        <Ship x={632} y={594} />
        {/* The pier — a single post and crossbar: whoever arrives lands at the foot of a cross. */}
        <path d={`M${HARBOR.x} ${HARBOR.y + 6}V${HARBOR.y + 26}M${HARBOR.x - 5} ${HARBOR.y + 12}H${HARBOR.x + 5}`} className="stroke-foreground" strokeWidth="1.1" strokeLinecap="round" />
      </g>

      {/* The places */}
      {PLACE_ORDER.map((id, i) => {
        const at = PLACE_AT[id]
        const status = SPACES[id].status
        const copy = places[id]
        const open = canEnter(id)
        const href = 'href' in copy ? copy.href : undefined
        const inner = (
          <>
            {/* Hit area: the whole place, label included */}
            <rect x={at.x - 46} y={at.y - 82} width="96" height="136" fill="transparent" />
            <path
              d={at.trail}
              pathLength={1}
              fill="none"
              strokeWidth="1.8"
              className={cx(
                'transition-[stroke-dashoffset] duration-slowest ease-out [stroke-dasharray:1] [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0]',
                open ? 'stroke-primary' : 'stroke-foreground'
              )}
              opacity={open ? 1 : 0.55}
            />
            <g transform={`translate(${at.x} ${at.y})`}>
              <PlaceGlyph space={id} status={status} />
            </g>
            <text
              x={at.x}
              y={at.y + 27}
              textAnchor="middle"
              paintOrder="stroke"
              strokeWidth={5}
              strokeLinejoin="round"
              className={cx(
                'font-serif text-2xl italic transition-colors duration-normal stroke-surface-raised',
                status === 'planned' ? 'fill-support' : 'fill-foreground',
                open && 'group-hover:fill-primary'
              )}
            >
              {copy.place}
            </text>
            <text x={at.x} y={at.y + 42} textAnchor="middle" paintOrder="stroke" strokeWidth={4} strokeLinejoin="round" className={cx('font-mono text-xs stroke-surface-raised', status === 'planned' ? 'fill-support' : 'fill-foreground-muted')}>
              {copy.name.toLowerCase()} · {statusLabel(id)}
            </text>
          </>
        )
        const delay = arrive(20 + i * 1.5)
        return open && href ? (
          <a key={id} href={href} tabIndex={-1} className="chart-appear group cursor-pointer" style={delay}>
            {inner}
          </a>
        ) : (
          <g key={id} className="chart-appear group" style={delay}>
            {inner}
          </g>
        )
      })}

      {/* Você está aqui */}
      <g>
        <circle cx={HARBOR.x} cy={HARBOR.y} r="5.5" className="fill-primary" />
        <circle cx={HARBOR.x} cy={HARBOR.y} r="10" fill="none" className="stroke-primary" strokeWidth="0.9" />
        <circle cx={HARBOR.x} cy={HARBOR.y} r="10" fill="none" className="chart-beacon stroke-primary" strokeWidth="1.2" />
        <path d={`M${HARBOR.x - 8} ${HARBOR.y + 8}L${HARBOR.x - 20} 556`} className="stroke-primary" strokeWidth="0.8" />
        <text x={HARBOR.x - 22} y="568" textAnchor="end" className="fill-primary font-mono text-xs">
          {map.youAreHere}
        </text>
      </g>

      {/* Instruments of the chart */}
      <g className="chart-appear" style={arrive(6)}>
        <Cartouche />
        <CompassRose x={893} y={214} />
        <SouthernCross />
        <Legend />
        {/* Scale bar */}
        <g className="stroke-foreground" strokeWidth="0.8">
          <rect x="296" y="590" width="112" height="5" fill="none" />
          <path d="M296 590h28v5h-28ZM352 590h28v5h-28Z" className="fill-foreground" />
          <text x="352" y="609" textAnchor="middle" className="fill-foreground-muted stroke-none font-mono text-xs">
            {map.scale}
          </text>
        </g>
      </g>

      {/* Hidden: a point of gold where the world's lines cross, for whoever looks closely */}
      <g className="pointer-events-none opacity-0 transition-opacity duration-slowest group-hover/map:opacity-100">
        <circle cx={MERIDIAN} cy={EQUATOR} r="11" className="fill-hidden" opacity="0.18" />
        <path d={star(MERIDIAN, EQUATOR, 6)} className="fill-hidden" />
      </g>
    </svg>
  )
}
