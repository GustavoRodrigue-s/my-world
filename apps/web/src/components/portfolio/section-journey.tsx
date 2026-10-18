import { Heading, Text, cx } from '@/components/ui'
import { getContent, type Era, type Locale } from '@/lib/portfolio-content'
import { Folio } from './folio'

function Node({ era }: { era: Era }) {
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
  return <span className={shape[era.kind]} />
}

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
          return (
            <li key={`${era.period}-${era.title}`} className="grid grid-cols-[24px_minmax(0,1fr)] gap-x-5 md:grid-cols-[150px_24px_minmax(0,1fr)] md:gap-x-6">
              <Text family="mono" size="md" color={era.current ? 'accent' : 'muted'} className="hidden pt-[3px] md:block">
                {era.period}
              </Text>

              {/* Spine: solid for what happened, dashed toward what's next */}
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
                <span className="relative z-[1] mt-[5px] flex h-4 items-center">
                  <Node era={era} />
                </span>
              </div>

              <div className={cx('pb-12', last && 'pb-0')}>
                <Text family="mono" size="sm" color={era.current ? 'accent' : 'muted'} className="mb-2 md:hidden">
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
