import { Mark } from './mark'
import { Text } from './text'
import { cx } from './utils'

// Ring radii as % of the chart box. Distance from the core = how close to hand.
const RADII = [19, 32, 45]

// A 90° arc at the top of every ring is kept clear for the ring's caption.
const CAPTION_GAP = 90

function position(ring: number, i: number, count: number) {
  const from = -90 + CAPTION_GAP / 2
  const span = 360 - CAPTION_GAP
  const angle = ((from + (i * span) / Math.max(count - 1, 1)) * Math.PI) / 180
  const r = RADII[ring]
  return { left: `${50 + r * Math.cos(angle)}%`, top: `${50 + r * Math.sin(angle)}%` }
}

const DOT = ['bg-accent', 'bg-foreground', 'border border-foreground']

interface OrbitChartProps {
  /** Up to three rings, innermost first. */
  rings: Array<{ caption: string; items: string[] }>
  /** Accessible name of the mark at the core. */
  core: string
}

/**
 * Carta orbital. One DOM for both layouts: on wide screens the lists are laid
 * out on concentric orbits (positions are computed, hence inline left/top);
 * on narrow screens the same lists simply stack. Rings and items open out
 * from the core as the chart scrolls in (--orbit timeline).
 */
export function OrbitChart({ rings, core }: OrbitChartProps) {
  return (
    <div className="relative mx-auto w-full max-w-[640px] [view-timeline-name:--orbit] lg:aspect-square">
      <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 hidden h-full w-full lg:block">
        {RADII.slice(0, rings.length).map((r, i) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            data-ring={i}
            className="plot-orbit origin-[50px_50px] stroke-foreground [transform-box:view-box]"
            strokeWidth="0.18"
            strokeDasharray={i === 2 ? '0.6 1.2' : undefined}
            opacity={i === 2 ? 0.6 : 0.4}
          />
        ))}
      </svg>
      <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-foreground lg:block">
        <Mark size={64} title={core} />
      </div>

      <div className="flex flex-col gap-10 lg:block">
        {rings.map((orbit, ring) => (
          <div key={orbit.caption}>
            <h3
              data-ring={ring}
              className="plot-orbit mb-4 lg:absolute lg:left-1/2 lg:mb-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bg-surface lg:px-2"
              style={{ top: `${50 - RADII[ring]}%` }}
            >
              <Text as="span" family="mono" size="sm" color={ring === 0 ? 'accent' : 'muted'}>
                {orbit.caption}
              </Text>
            </h3>
            <ul className="flex list-none flex-wrap gap-x-5 gap-y-2.5 lg:absolute lg:inset-0 lg:block">
              {orbit.items.map((item, i) => (
                <li
                  key={item}
                  data-ring={ring}
                  className="plot-orbit group inline-flex items-center gap-2 whitespace-nowrap lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bg-surface lg:px-1.5 lg:py-0.5"
                  style={position(ring, i, orbit.items.length)}
                >
                  <span
                    aria-hidden
                    className={cx('h-[7px] w-[7px] shrink-0 rounded-full transition-transform duration-200 motion-safe:group-hover:scale-[1.6]', DOT[ring])}
                  />
                  <Text as="span" size="base" weight={ring === 0 ? 'semibold' : 'normal'} color={ring === 2 ? 'muted' : 'foreground'}>
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
