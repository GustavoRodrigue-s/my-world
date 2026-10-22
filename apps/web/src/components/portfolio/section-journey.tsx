import { Folio, Timeline, type TimelineEntry } from '@/components/ui'
import { getContent, type Era, type Locale } from '@/lib/portfolio-content'

const SHAPE: Record<Era['kind'], TimelineEntry['shape']> = {
  study: 'diamond',
  work: 'circle',
  education: 'square',
  now: 'circle',
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
      <Timeline
        entries={journey.map((era) => ({
          key: `${era.period}-${era.title}`,
          period: era.period,
          title: era.title,
          meta: [era.role, era.place].filter(Boolean).join(' · ') || undefined,
          text: era.text,
          state: era.current ? 'current' : era.kind === 'now' ? 'next' : 'past',
          shape: SHAPE[era.kind],
        }))}
      />
    </Folio>
  )
}
