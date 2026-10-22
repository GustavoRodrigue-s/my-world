import { ArrowUpRight } from 'lucide-react'
import { Folio, Heading, SpecSheet, Text } from '@/components/ui'
import { getContent, type Locale } from '@/lib/portfolio-content'
import { ArtifactStatusTag } from './artifact-status-tag'

export function SectionArtifacts({ locale }: { locale: Locale }) {
  const { artifacts, prototypes, drawingBoard, copy } = getContent(locale)
  return (
    <Folio
      id="artifacts"
      index="03"
      label={copy.artifacts.label}
      note={copy.artifacts.note}
      title={copy.artifacts.title}
      intro={copy.artifacts.intro}
      bg="alt-2"
    >
      <div className="border-b border-border-strong">
        {/* Ficha técnica: what it is, what it does, what I did, what it's made of. */}
        {artifacts.map((a) => (
          <SpecSheet
            key={a.slug}
            id={a.slug}
            lit={a.status === 'production'}
            code={a.code}
            tag={<ArtifactStatusTag status={a.status} locale={locale} />}
            meta={[a.org, a.period, a.kind]}
            title={a.title}
            lead={a.what}
            details={[
              { label: copy.artifacts.labels.role, text: a.role },
              ...(a.note ? [{ label: copy.artifacts.labels.decision, text: a.note, marked: true }] : []),
            ]}
            footnote={a.confidential ? copy.artifacts.labels.confidential : undefined}
            features={{ label: copy.artifacts.labels.does, items: a.does }}
            stack={{ label: copy.artifacts.labels.stack, items: a.stack }}
          />
        ))}
      </div>

      <div className="mt-20 grid gap-14 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between gap-4">
            <Heading as="h3" level="item">
              {copy.artifacts.prototypesTitle}
            </Heading>
            <ArtifactStatusTag status="prototype" locale={locale} />
          </div>
          <Text size="md" color="muted" className="mt-2">
            {copy.artifacts.prototypes}
          </Text>
          <ul className="mt-6 list-none border-t border-border">
            {prototypes.map((p) => (
              <li key={p.title} className="group plot-rise grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 border-b border-border py-3.5">
                <Text as="span" family="mono" size="md" color="foreground" className="transition-colors duration-200 group-hover:text-accent">
                  {p.title}
                </Text>
                <span className="flex gap-3">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener"
                      className="group/link inline-flex items-center gap-0.5 font-mono text-[12px] text-muted no-underline transition-colors hover:text-accent"
                    >
                      {l.label}
                      <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden className="transition-transform duration-200 motion-safe:group-hover/link:-translate-y-0.5 motion-safe:group-hover/link:translate-x-0.5" />
                      <span className="sr-only"> — {p.title} {copy.artifacts.labels.onGithub}</span>
                    </a>
                  ))}
                </span>
                <Text as="span" size="md" color="muted" className="col-span-2">
                  {p.text}
                </Text>
              </li>
            ))}
          </ul>
        </div>

        <div className="self-start rounded-xs border border-dashed border-support-1 p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <Heading as="h3" level="item" className="text-support-1">
              {copy.artifacts.drawingBoardTitle}
            </Heading>
            <ArtifactStatusTag status="drawing-board" locale={locale} />
          </div>
          <Text size="md" color="muted" className="mt-2">
            {copy.artifacts.drawingBoard}
          </Text>
          <ol className="mt-6 list-none">
            {drawingBoard.map((d, i) => (
              <li key={d.title} className="plot-rise flex gap-4 border-t border-dashed border-border-strong py-4 first:border-t-0 first:pt-0">
                <Text as="span" family="mono" size="md" color="support">
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <div>
                  <Text size="base" weight="medium" color="foreground">
                    {d.title}
                  </Text>
                  <Text size="md" color="muted" className="mt-0.5">
                    {d.text}
                  </Text>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Folio>
  )
}
