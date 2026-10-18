import { Heading, Mark, Text, cx } from '@/components/ui'
import { getContent, type Locale } from '@/lib/portfolio-content'
import { Folio } from './folio'

// Ring radii as % of the chart box. Distance from the core = how often I use it.
const RADII = [19, 32, 45]

// A 90° arc at the top of every ring is kept clear for the ring's caption.
const CAPTION_GAP = 90

function position(ring: number, i: number, count: number) {
  const from = -90 + CAPTION_GAP / 2
  const span = 360 - CAPTION_GAP
  const angle = ((from + (i * span) / (count - 1)) * Math.PI) / 180
  const r = RADII[ring]
  return { left: `${50 + r * Math.cos(angle)}%`, top: `${50 + r * Math.sin(angle)}%` }
}

const DOT = ['bg-accent', 'bg-foreground', 'border border-foreground']

/**
 * Carta orbital. One DOM for both layouts: on wide screens the lists are laid
 * out on concentric orbits (positions are computed, hence inline left/top);
 * on narrow screens the same lists simply stack.
 */
export function SectionTools({ locale }: { locale: Locale }) {
  const { toolOrbits, aiTools, copy } = getContent(locale)
  return (
    <Folio id="tools" index="04" label={copy.tools.label} note={copy.tools.note} title={copy.tools.title} intro={copy.tools.intro}>
      <div className="relative mx-auto w-full max-w-[640px] lg:aspect-square">
        <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 hidden h-full w-full lg:block">
          {RADII.map((r, i) => (
            <circle
              key={r}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              className="stroke-foreground"
              strokeWidth="0.18"
              strokeDasharray={i === 2 ? '0.6 1.2' : undefined}
              opacity={i === 2 ? 0.6 : 0.4}
            />
          ))}
        </svg>
        <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-foreground lg:block">
          <Mark size={64} title={copy.tools.core} />
        </div>

        <div className="flex flex-col gap-10 lg:block">
          {toolOrbits.map((orbit, ring) => (
            <div key={orbit.name}>
              <h3
                className="mb-4 lg:absolute lg:left-1/2 lg:mb-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bg-surface lg:px-2"
                style={{ top: `${50 - RADII[ring]}%` }}
              >
                <Text as="span" family="mono" size="sm" color={ring === 0 ? 'accent' : 'muted'}>
                  {orbit.caption} · {orbit.name}
                </Text>
              </h3>
              <ul className="flex list-none flex-wrap gap-x-5 gap-y-2.5 lg:absolute lg:inset-0 lg:block">
                {orbit.tools.map((tool, i) => (
                  <li
                    key={tool}
                    className="inline-flex items-center gap-2 whitespace-nowrap lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bg-surface lg:px-1.5 lg:py-0.5"
                    style={position(ring, i, orbit.tools.length)}
                  >
                    <span aria-hidden className={cx('h-[7px] w-[7px] shrink-0 rounded-full', DOT[ring])} />
                    <Text
                      as="span"
                      size="base"
                      weight={ring === 0 ? 'semibold' : 'normal'}
                      color={ring === 2 ? 'muted' : 'foreground'}
                    >
                      {tool}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* AI sits outside the chart: half of it is practice, not a tool you can place on an orbit. */}
      <div className="mt-16 grid gap-x-12 gap-y-6 border-t border-border-strong pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <Text family="mono" size="sm" color="accent">
            {copy.tools.aiLabel}
          </Text>
          <Heading as="h3" level="item" className="mt-2">
            {copy.tools.aiTitle}
          </Heading>
          <Text size="md" color="muted" leading="relaxed" className="mt-2 max-w-[40ch]">
            {copy.tools.aiText}
          </Text>
        </div>
        <ul className="flex list-none flex-wrap content-start gap-x-5 gap-y-2.5 md:pt-6">
          {aiTools.map((tool) => (
            <li key={tool} className="inline-flex items-center gap-2">
              <span aria-hidden className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent" />
              <Text as="span" size="base" color="foreground">
                {tool}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </Folio>
  )
}
