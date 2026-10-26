import { Heading } from './heading'
import { Rubric } from './rubric'
import { Section } from './section'
import { Text } from './text'

interface FolioProps {
  id: string
  index: string
  label: string
  /** Short marginal gloss under the rubric (mono). The metaphor lives here. */
  note?: string
  /** Literal title. */
  title: React.ReactNode
  intro?: React.ReactNode
  bg?: 'surface' | 'muted' | 'raised'
  children: React.ReactNode
}

/**
 * A folio is one section of a page, laid out like a manuscript page: the
 * rubric and a gloss live in the margin (sticky on wide screens), the text
 * block on the right. The rubric's rule is traced as the section arrives.
 */
export function Folio({ id, index, label, note, title, intro, bg = 'surface', children }: FolioProps) {
  return (
    <Section id={id} bg={bg} aria-labelledby={`${id}-title`} className="scroll-mt-bar border-t border-border">
      <div className="grid gap-y-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-x-16">
        <aside className="self-start lg:sticky lg:top-[calc(var(--size-bar)+var(--space-10))]">
          <Rubric index={index}>{label}</Rubric>
          <span aria-hidden className="plot-draw-x mt-3 block h-px w-10 bg-primary" />
          {note && (
            <Text family="mono" size="xs" color="muted" leading="relaxed" className="mt-3 max-w-[22ch]">
              {note}
            </Text>
          )}
        </aside>

        <div className="min-w-0">
          <Heading as="h2" id={`${id}-title`} level="headline" className="plot-rise max-w-[20ch]">
            {title}
          </Heading>
          {intro && (
            <Text size="lg" color="muted" leading="relaxed" className="plot-rise mt-5 max-w-[58ch]">
              {intro}
            </Text>
          )}
          <div className="mt-12 md:mt-16">{children}</div>
        </div>
      </div>
    </Section>
  )
}
