import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata, Route } from 'next'
import { ArrowLeft } from 'lucide-react'
import type { StudyMeta } from '@my-world/types'
import { BackToTop, EntryList, Heading, PageIntro, Register, Text, buttonClasses, chipClasses, cx } from '@/components/ui'
import { FormatMark, StudyActions, StudyByline, StudyComments, studyEntry } from '@/components/studies'
import { buildArticleJsonLd, buildArticleMetadata, type ArticleSeo } from '@/lib/generate-metadata'
import { getRelatedStudies, getStudies, getStudy } from '@/lib/studies'
import { STUDIES, studiesPath } from '@/lib/studies-content'
import { formatDate, formatReadingTime } from '@/lib/utils'
import { WORLD } from '@/lib/world-content'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getStudies()).map((s) => ({ slug: s.slug }))
}

function seo(study: StudyMeta): ArticleSeo {
  return {
    path: studiesPath(study.slug),
    title: study.title,
    summary: study.summary,
    siteName: WORLD.name,
    publishedAt: study.publishedAt,
    updatedAt: study.updatedAt,
    tags: study.tags,
    section: STUDIES.themes[study.theme].name,
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = await getStudy((await params).slug)
  return study ? buildArticleMetadata(seo(study)) : { title: STUDIES.study.notFound }
}

const inkLink = 'ink-link text-primary no-underline'

/**
 * One study, article or note, laid out like a magazine article (ADR 0019):
 * the opening with the signature, the text with its margin (the format's
 * gloss), then the end in order — references and the byline, subjects,
 * likes, comments, what to read next.
 */
export default async function StudyPage({ params }: Props) {
  const study = await getStudy((await params).slug)
  if (!study) notFound()
  const t = STUDIES.study
  const format = STUDIES.formats[study.format]
  const visible = await getStudies()
  // A note passed to ink points to its article; the article points back.
  const maturedInto = visible.find((s) => s.slug === study.maturedInto)
  const grewFrom = visible.filter((s) => s.maturedInto === study.slug)
  const related = await getRelatedStudies(study)
  const dates = [
    formatDate(study.publishedAt),
    study.updatedAt && t.updated(formatDate(study.updatedAt)),
    formatReadingTime(study.readingTime),
  ].filter(Boolean)

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleJsonLd(seo(study))) }} />
      <PageIntro
        labelledBy="study-title"
        align="start"
        label={
          <>
            <Link href={`${studiesPath()}?theme=${study.theme}` as Route} className={inkLink}>
              {STUDIES.themes[study.theme].name}
            </Link>
            <span aria-hidden> · </span>
            {format.name}
          </>
        }
        footer={<StudyByline role={dates.join(' · ')} />}
      >
        <Heading as="h1" id="study-title" level="headline" className="max-w-4xl">
          {study.title}
        </Heading>
        <Text size="lead" color="muted" leading="relaxed" className="mt-6 max-w-3xl">
          {study.summary}
        </Text>
      </PageIntro>

      <div className="px-gutter md:px-gutter-wide pb-block md:pb-block-wide">
        <div className="section-inner grid gap-y-10 lg:grid-cols-[var(--size-width-2xs)_minmax(0,1fr)] lg:gap-x-16">
          {/* The margin: what the finish means. */}
          <aside className="self-start lg:sticky lg:top-[calc(var(--size-bar)+var(--space-10))]">
            <FormatMark format={study.format} className="mb-3" />
            <Text family="mono" size="xs" color={study.format === 'note' ? 'support' : 'muted'} leading="relaxed" className="max-w-3xs">
              {format.name} — {format.gloss}
            </Text>
          </aside>

          <div className="flex min-w-0 flex-col gap-6">
            {maturedInto && (
              <Text family="mono" size="sm" color="support" className="max-w-measure rounded-xs border border-dashed border-support px-4 py-3">
                {t.maturedInto}{' '}
                <Link href={studiesPath(maturedInto.slug)} className={inkLink}>
                  {maturedInto.title}
                </Link>
                .
              </Text>
            )}

            {study.content}

            <footer className="mt-10 flex flex-col gap-10 border-t border-border pt-10">
              {study.references.length > 0 && (
                <Register title={t.references}>
                  {study.references.map((ref, i) => (
                    <li key={ref} className="flex gap-4 border-b border-border py-3">
                      <Text as="span" family="mono" size="xs" color="primary" className="pt-1">
                        {String(i + 1).padStart(2, '0')}
                      </Text>
                      <Text as="span" color="foreground" leading="snug">
                        {ref}
                      </Text>
                    </li>
                  ))}
                </Register>
              )}
              {grewFrom.map((note) => (
                <Text key={note.slug} family="mono" size="sm" color="muted">
                  {t.grewFrom}{' '}
                  <Link href={studiesPath(note.slug)} className={inkLink}>
                    {note.title}
                  </Link>
                  .
                </Text>
              ))}
              <StudyByline role={t.byline} />
            </footer>

            {/* The subjects, as on Medium: each one opens the index filtered by it. */}
            {study.tags.length > 0 && (
              <ul aria-label={t.tags} className="mt-4 flex list-none flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <li key={tag}>
                    <Link href={`${studiesPath()}?tag=${encodeURIComponent(tag)}` as Route} className={chipClasses()}>
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <StudyActions comments={study.comments} />

            {study.comments && <StudyComments className="mt-6" />}

            {related.length > 0 && (
              <section aria-labelledby="related-title" className="mt-12 border-t border-border-strong pt-10">
                <Heading as="h2" id="related-title" level="title">
                  {t.related}
                </Heading>
                {/* Estudos' gold is `hidden`, as on the index (ADR 0015). */}
                <EntryList items={related.map(studyEntry)} gild="hidden" />
              </section>
            )}

            <Link href={studiesPath()} className={cx(buttonClasses({ variant: 'quiet', size: 'none' }), 'mt-10 self-start text-base')}>
              <ArrowLeft className="size-icon-md" aria-hidden />
              {t.back}
            </Link>
          </div>
        </div>
      </div>
      <BackToTop label={t.backToTop} />
    </article>
  )
}
