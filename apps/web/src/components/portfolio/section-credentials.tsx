import { Heading, Text } from '@/components/ui'
import { getContent, type Locale } from '@/lib/portfolio-content'
import { Folio } from './folio'

function Register({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="plot-rise">
      <Text family="mono" size="sm" color="muted" className="mb-3">
        {title}
      </Text>
      <ul className="list-none border-t border-border-strong">{children}</ul>
    </div>
  )
}

export function SectionCredentials({ locale }: { locale: Locale }) {
  const { education, certifications, languages, copy } = getContent(locale)
  return (
    <Folio id="credentials" index="05" label={copy.credentials.label} note={copy.credentials.note} title={copy.credentials.title}>
      <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[1.1fr_1.3fr_1fr]">
        <Register title={copy.credentials.education}>
          {education.map((e) => (
            <li key={e.title} className="border-b border-border py-4">
              <Heading as="h3" level="item">
                {e.title}
              </Heading>
              <Text size="md" color="muted" className="mt-1">
                {e.org}
              </Text>
              <Text family="mono" size="sm" color="muted" className="mt-2">
                {e.period}
              </Text>
            </li>
          ))}
        </Register>

        <Register title={copy.credentials.certifications}>
          {certifications.map((c, i) => (
            <li key={c} className="flex gap-4 border-b border-border py-3">
              <Text as="span" family="mono" size="sm" color="accent" className="pt-[3px]">
                {String(i + 1).padStart(2, '0')}
              </Text>
              <Text as="span" size="base" color="foreground" leading="snug">
                {c}
              </Text>
            </li>
          ))}
        </Register>

        <Register title={copy.credentials.languages}>
          {languages.map((l) => (
            <li key={l.name} className="border-b border-border py-3">
              <Text size="base" weight="medium" color="foreground">
                {l.name}
              </Text>
              <Text size="md" color="muted" className="mt-0.5">
                {l.level}
              </Text>
            </li>
          ))}
        </Register>
      </div>
    </Folio>
  )
}
