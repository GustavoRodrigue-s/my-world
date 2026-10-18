import { Heading, Text, cx } from '@/components/ui'
import { getContent, type Era, type Locale } from '@/lib/portfolio-content'
import { Folio } from './folio'

function Node({ era, inked }: { era: Era; inked: boolean }) {
  if (era.current) {
    return (
      <span className="relative flex h-4 w-4 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-accent" />
        <span className="h-2 w-2 rounded-full bg-accent" />
      </span>
    )
  }
  const shape: Record<Era['kind'], string> = {
    study: 'h-2.5 w-2.5 rotate-45 border border-foreground bg-surface',
    work: 'h-3 w-3 rounded-full border border-foreground bg-surface',
    education: 'h-2.5 w-2.5 border border-foreground bg-foreground',
    now: 'h-3 w-3 rounded-full border border-dashed border-foreground bg-surface',
  }
  return <span className={cx(shape[era.kind], inked && 'plot-inked')} />
}

/**
 * Trajetória. Each entry is a station on one spine: solid for what happened,
 * dashed toward what's next. While scrolling, red ink follows a reading line
 * (68% down the viewport) down the solid part — stamping each past station on arrival — and stops at
 * today's (see "Trajetória" in identity.css). Without motion it's the plain plate.
 */
export function SectionJourney({ locale }: { locale: Locale }) {
  const { journey, copy } = getContent(locale)
  return (
    <Folio
      id="journey"
      index="02"
      label={copy.journey.label}
      note={copy.journey.note}
      title={copy.journey.title}
      intro={copy.journey.intro}
    >
      <ol className="list-none">
        {journey.map((era, i) => {
          const last = i === journey.length - 1
          const beforeNow = journey[i + 1]?.kind === 'now'
          // Stations already passed: they get inked; today's and the next one don't.
          const past = !era.current && era.kind !== 'now'
          return (
            <li
              key={`${era.period}-${era.title}`}
              className="plot-station group grid grid-cols-[24px_minmax(0,1fr)] gap-x-5 md:grid-cols-[150px_24px_minmax(0,1fr)] md:gap-x-6"
            >
              <Text
                family="mono"
                size="md"
                color={era.current ? 'accent' : 'muted'}
                className={cx('hidden pt-[3px] md:block', past && 'plot-ink-text')}
              >
                {era.period}
              </Text>

              <div className="relative flex justify-center">
                {!last && (
                  <span
                    aria-hidden
                    className={cx(
                      'absolute top-5 bottom-0 left-1/2 -translate-x-1/2 border-l',
                      beforeNow ? 'border-dashed border-border-strong' : 'border-border-strong'
                    )}
                  />
                )}
                {!last && !beforeNow && (
                  <span aria-hidden className="plot-ink absolute top-5 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-accent" />
                )}
                <span className="relative z-[1] mt-[5px] flex h-4 items-center transition-transform duration-200 motion-safe:group-hover:scale-125">
                  <Node era={era} inked={past} />
                  {past && (
                    <span
                      aria-hidden
                      className="plot-ripple absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
                    />
                  )}
                </span>
              </div>

              <div className={cx('plot-arrive pb-12', last && 'pb-0')}>
                <Text
                  family="mono"
                  size="sm"
                  color={era.current ? 'accent' : 'muted'}
                  className={cx('mb-2 md:hidden', past && 'plot-ink-text')}
                >
                  {era.period}
                </Text>
                <Heading as="h3" level="subtitle">
                  {era.title}
                </Heading>
                {(era.role || era.place) && (
                  <Text size="md" color="foreground" className="mt-1.5">
                    {[era.role, era.place].filter(Boolean).join(' · ')}
                  </Text>
                )}
                <Text size="base" color="muted" leading="relaxed" className="mt-3 max-w-[60ch]">
                  {era.text}
                </Text>
              </div>
            </li>
          )
        })}
      </ol>
    </Folio>
  )
}
