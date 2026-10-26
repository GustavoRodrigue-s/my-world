import { Folio, Heading, OrbitChart, Text } from '@/components/ui'
import { getContent, type Locale } from '@/lib/portfolio-content'

export function SectionTools({ locale }: { locale: Locale }) {
  const { toolOrbits, aiTools, copy } = getContent(locale)
  return (
    <Folio id="tools" index="04" label={copy.tools.label} note={copy.tools.note} title={copy.tools.title} intro={copy.tools.intro}>
      {/* Carta orbital: the distance from the core shows how often each tool is in hand. */}
      <OrbitChart core={copy.tools.core} rings={toolOrbits.map((o) => ({ caption: `${o.caption} · ${o.name}`, items: o.tools }))} />

      {/* AI sits outside the chart: half of it is practice, not a tool you can place on an orbit. */}
      <div className="plot-rise mt-16 grid gap-x-12 gap-y-6 border-t border-border-strong pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <Text family="mono" size="xs" color="primary">
            {copy.tools.aiLabel}
          </Text>
          <Heading as="h3" level="title-sm" className="mt-2">
            {copy.tools.aiTitle}
          </Heading>
          <Text size="sm" color="muted" leading="relaxed" className="mt-2 max-w-[40ch]">
            {copy.tools.aiText}
          </Text>
        </div>
        <ul className="flex list-none flex-wrap content-start gap-x-5 gap-y-2.5 md:pt-6">
          {aiTools.map((tool) => (
            <li key={tool} className="inline-flex items-center gap-2">
              <span aria-hidden className="h-[7px] w-[7px] shrink-0 rounded-full bg-primary" />
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
