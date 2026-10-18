import { Emphasis, Heading, Text } from '@/components/ui'
import { PORTRAIT_SRC, getContent, type Locale } from '@/lib/portfolio-content'
import { Folio } from './folio'
import { Portrait } from './portrait'

const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi']

export function SectionAbout({ locale }: { locale: Locale }) {
  const { about, copy } = getContent(locale)
  return (
    <Folio
      id="about"
      index="01"
      label={copy.about.label}
      note={copy.about.note}
      title={
        <>
          {about.title.before} <Emphasis>{about.title.emphasis}</Emphasis>
        </>
      }
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <div className="flex max-w-[62ch] flex-col gap-5">
            {about.paragraphs.map((p, i) => (
              <Text key={i} size="lg" color={i === 0 ? 'foreground' : 'muted'} leading="relaxed">
                {p}
              </Text>
            ))}
          </div>

          <div className="mt-14">
            <Text family="mono" size="sm" color="muted">
              {about.principlesLabel}
            </Text>
            <ol className="mt-4 grid list-none border-t border-border sm:grid-cols-2">
              {about.principles.map((p, i) => (
                <li key={p.title} className="plot-rise flex gap-4 border-b border-border py-5 sm:odd:pr-6 sm:even:border-l sm:even:pl-6">
                  <Text as="span" family="mono" size="md" color="accent" className="w-6 shrink-0">
                    {ROMAN[i]}.
                  </Text>
                  <div>
                    <Heading as="h3" level="item">
                      {p.title}
                    </Heading>
                    <Text size="md" color="muted" leading="relaxed" className="mt-1.5">
                      {p.text}
                    </Text>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lg:pt-2">
          <Portrait src={PORTRAIT_SRC} alt={about.portraitAlt} className="mx-auto max-w-[340px]" />
          <dl className="mt-8 border-t border-border">
            {about.facts.map((f) => (
              <div key={f.label} className="flex items-baseline gap-3 border-b border-border py-3">
                <Text as="dt" family="mono" size="sm" color="muted" className="w-20 shrink-0">
                  {f.label}
                </Text>
                <Text as="dd" size="md" color="foreground">
                  {f.value}
                </Text>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Folio>
  )
}
