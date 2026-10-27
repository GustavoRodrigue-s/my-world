import { Heading } from './heading'
import { Text } from './text'
import { cx } from './utils'

/** past: already happened (gets inked) · current: today · next: what's coming (dashed). */
export type TimelineState = 'past' | 'current' | 'next'
export type TimelineShape = 'diamond' | 'circle' | 'square'

export interface TimelineEntry {
  key: string
  period: string
  title: string
  /** One line under the title (role · place…). */
  meta?: string
  text: string
  state: TimelineState
  /** Node for past entries: diamond (study), circle (work), square (milestone). */
  shape?: TimelineShape
}

const SHAPE: Record<TimelineShape, string> = {
  diamond: 'h-2.5 w-2.5 rotate-45 border border-foreground bg-surface',
  circle: 'h-3 w-3 rounded-full border border-foreground bg-surface',
  square: 'h-2.5 w-2.5 border border-foreground bg-foreground',
}

function Node({ entry }: { entry: TimelineEntry }) {
  if (entry.state === 'current') {
    return (
      <span className="relative flex h-4 w-4 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-primary" />
        <span className="h-2 w-2 rounded-full bg-primary" />
      </span>
    )
  }
  if (entry.state === 'next') return <span className="h-3 w-3 rounded-full border border-dashed border-foreground bg-surface" />
  return <span className={cx(SHAPE[entry.shape ?? 'circle'], 'plot-inked')} />
}

/**
 * A chronology drawn as one spine: solid for what happened, dashed toward
 * what's next. While scrolling, red ink follows the reading line down the
 * solid part — stamping each past station on arrival — and stops at today's
 * (see "Trajetória" in identity.css). Without motion it's the plain plate.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="list-none">
      {entries.map((entry, i) => {
        const last = i === entries.length - 1
        const towardNext = entries[i + 1]?.state === 'next'
        const past = entry.state === 'past'
        const current = entry.state === 'current'
        return (
          <li
            key={entry.key}
            className="plot-station group grid grid-cols-[var(--space-6)_minmax(0,1fr)] gap-x-5 md:grid-cols-[var(--size-width-3xs)_var(--space-6)_minmax(0,1fr)] md:gap-x-6"
          >
            <Text
              family="mono"
              size="sm"
              color={current ? 'primary' : 'muted'}
              className={cx('hidden pt-1 md:block', past && 'plot-ink-text')}
            >
              {entry.period}
            </Text>

            <div className="relative flex justify-center">
              {!last && (
                <span
                  aria-hidden
                  className={cx(
                    'absolute top-5 bottom-0 left-1/2 -translate-x-1/2 border-l',
                    towardNext ? 'border-dashed border-border-strong' : 'border-border-strong'
                  )}
                />
              )}
              {!last && past && !towardNext && (
                <span aria-hidden className="plot-ink absolute top-5 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-primary" />
              )}
              <span className="relative z-raised mt-1 flex h-4 items-center transition-transform duration-normal motion-safe:group-hover:scale-125">
                <Node entry={entry} />
                {past && (
                  <span
                    aria-hidden
                    className="plot-ripple absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary"
                  />
                )}
              </span>
            </div>

            <div className={cx('plot-arrive pb-12', last && 'pb-0')}>
              <Text
                family="mono"
                size="xs"
                color={current ? 'primary' : 'muted'}
                className={cx('mb-2 md:hidden', past && 'plot-ink-text')}
              >
                {entry.period}
              </Text>
              <Heading as="h3" level="title">
                {entry.title}
              </Heading>
              {entry.meta && (
                <Text size="sm" color="foreground" className="mt-1.5">
                  {entry.meta}
                </Text>
              )}
              <Text size="base" color="muted" leading="relaxed" className="mt-3 max-w-2xl">
                {entry.text}
              </Text>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
