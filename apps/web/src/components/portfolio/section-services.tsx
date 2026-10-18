import { Heading, Text } from '@/components/ui'
import { getContent, type Locale } from '@/lib/portfolio-content'
import { Folio } from './folio'
import { ProcessIcon } from './process-icon'

const STAGE_KEYS = ['entrada', 'bancada', 'forja', 'orbita'] as const

export function SectionServices({ locale }: { locale: Locale }) {
  const { process, services, companies, copy } = getContent(locale)
  return (
    <Folio
      id="services"
      index="06"
      label={copy.services.label}
      note={copy.services.note}
      title={copy.services.title}
      intro={copy.services.intro}
      bg="alt-1"
    >
      {/* Da ideia à órbita — the workshop line, which is also how I work */}
      <Text family="mono" size="sm" color="muted" className="mb-4">
        {copy.services.line}
      </Text>
      <ol className="grid list-none border-t border-border-strong sm:grid-cols-2 lg:grid-cols-4">
        {process.map((stage, i) => (
          <li
            key={stage.name}
            className="border-b border-border-strong py-7 sm:px-6 sm:max-lg:odd:pl-0 sm:max-lg:even:border-l lg:border-b-0 lg:border-l lg:first:border-l-0 lg:first:pl-0"
          >
            <div className="flex items-start justify-between">
              <ProcessIcon stage={STAGE_KEYS[i]} />
              <Text as="span" family="mono" size="sm" color="accent">
                {String(i + 1).padStart(2, '0')}
              </Text>
            </div>
            <Heading as="h3" level="item" className="mt-5">
              {stage.name}
            </Heading>
            <Text size="md" color="muted" leading="relaxed" className="mt-2">
              {stage.text}
            </Text>
          </li>
        ))}
      </ol>

      <div className="mt-20 grid gap-10 md:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="border-t border-foreground pt-5">
            <Heading as="h3" level="item" className="max-w-[18ch]">
              {s.title}
            </Heading>
            <Text size="base" color="muted" leading="relaxed" className="mt-3">
              {s.text}
            </Text>
          </div>
        ))}
      </div>

      <div className="mt-20 border-t border-border-strong pt-6">
        <Text family="mono" size="sm" color="muted">
          {copy.services.companies}
        </Text>
        <ul className="mt-4 flex list-none flex-wrap items-baseline gap-x-3 gap-y-2">
          {companies.map((c, i) => (
            <li key={c} className="flex items-baseline gap-3">
              <Heading as="span" level="subtitle">
                {c}
              </Heading>
              {i < companies.length - 1 && (
                <span aria-hidden className="font-serif text-[24px] italic text-subtle">
                  /
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Folio>
  )
}
