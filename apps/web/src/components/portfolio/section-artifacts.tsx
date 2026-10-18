import { ArrowUpRight } from 'lucide-react'
import { Heading, Seal, Text } from '@/components/ui'
import { getContent, type Artifact, type Locale, type PortfolioContent } from '@/lib/portfolio-content'
import { Folio } from './folio'
import { StatusTag } from './status-tag'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <Text family="mono" size="sm" color="muted" className="mb-2.5">
      {children}
    </Text>
  )
}

// Ficha técnica — every artifact is filed the same way: what it is, what it
// does, what I did, what it's made of.
function ArtifactSheet({ artifact, labels, locale }: { artifact: Artifact; labels: PortfolioContent['copy']['artifacts']['labels']; locale: Locale }) {
  return (
    <article
      aria-labelledby={`${artifact.slug}-title`}
      className="grid gap-x-10 gap-y-7 border-t border-border-strong py-10 md:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1.15fr)_minmax(0,1fr)]"
    >
      <div className="flex items-start gap-4 md:flex-col">
        <Seal seed={artifact.slug} size={56} lit={artifact.status === 'production'} />
        <div className="flex flex-col gap-2.5">
          <Text family="mono" size="md" color="accent">
            {artifact.code}
          </Text>
          <StatusTag status={artifact.status} locale={locale} className="self-start" />
          <Text family="mono" size="sm" color="muted" leading="relaxed">
            {artifact.org}
            <br />
            {artifact.period}
            <br />
            {artifact.kind}
          </Text>
        </div>
      </div>

      <div>
        <Heading as="h3" id={`${artifact.slug}-title`} level="subtitle">
          {artifact.title}
        </Heading>
        <Text size="lg" color="foreground" leading="relaxed" className="mt-3 max-w-[52ch]">
          {artifact.what}
        </Text>
        <div className="mt-6">
          <Label>{labels.role}</Label>
          <Text size="base" color="muted" leading="relaxed" className="max-w-[52ch]">
            {artifact.role}
          </Text>
        </div>
        {artifact.note && (
          <div className="mt-6 border-l-2 border-accent pl-4">
            <Label>{labels.decision}</Label>
            <Text size="base" color="muted" leading="relaxed" className="max-w-[52ch]">
              {artifact.note}
            </Text>
          </div>
        )}
        {artifact.confidential && (
          <Text family="mono" size="sm" color="muted" className="mt-6">
            {labels.confidential}
          </Text>
        )}
      </div>

      <div className="md:col-start-2 xl:col-start-auto">
        <Label>{labels.does}</Label>
        <ul className="list-none border-t border-border">
          {artifact.does.map((item) => (
            <li key={item} className="flex gap-3 border-b border-border py-2.5">
              <span aria-hidden className="mt-[9px] h-[5px] w-[5px] shrink-0 bg-foreground" />
              <Text as="span" size="base" color="foreground" leading="snug">
                {item}
              </Text>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Label>{labels.stack}</Label>
          <Text family="mono" size="md" color="foreground" leading="relaxed">
            {artifact.stack.join(' / ')}
          </Text>
        </div>
      </div>
    </article>
  )
}

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
        {artifacts.map((a) => (
          <ArtifactSheet key={a.slug} artifact={a} labels={copy.artifacts.labels} locale={locale} />
        ))}
      </div>

      <div className="mt-20 grid gap-14 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between gap-4">
            <Heading as="h3" level="item">
              {copy.artifacts.prototypesTitle}
            </Heading>
            <StatusTag status="prototype" locale={locale} />
          </div>
          <Text size="md" color="muted" className="mt-2">
            {copy.artifacts.prototypes}
          </Text>
          <ul className="mt-6 list-none border-t border-border">
            {prototypes.map((p) => (
              <li key={p.title} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 border-b border-border py-3.5">
                <Text as="span" family="mono" size="md" color="foreground">
                  {p.title}
                </Text>
                <span className="flex gap-3">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-0.5 font-mono text-[12px] text-muted no-underline transition-colors hover:text-accent"
                    >
                      {l.label}
                      <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden />
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
            <StatusTag status="drawing-board" locale={locale} />
          </div>
          <Text size="md" color="muted" className="mt-2">
            {copy.artifacts.drawingBoard}
          </Text>
          <ol className="mt-6 list-none">
            {drawingBoard.map((d, i) => (
              <li key={d.title} className="flex gap-4 border-t border-dashed border-border-strong py-4 first:border-t-0 first:pt-0">
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
