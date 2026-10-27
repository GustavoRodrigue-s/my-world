import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { Byline, CrossPattee, Eyebrow, Heading, OrnamentRule, PageIntro, Register, Text, buttonClasses, cx } from '@/components/ui'
import { PageBody, StudyBody } from '@/components/chapel'
import { CHAPEL, chapelPath } from '@/lib/chapel-content'
import { buildArticleJsonLd, buildArticleMetadata } from '@/lib/generate-metadata'
import { MOCK_ARTICLES, getMockArticle } from '@/lib/mock-data'
import { PORTRAIT_SRC } from '@/lib/portfolio-content'
import { formatDate, formatReadingTime } from '@/lib/utils'

export function generateStaticParams() {
  return MOCK_ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = getMockArticle(slug)
  return study ? buildArticleMetadata(study) : { title: CHAPEL.study.notFound }
}

export default async function StudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getMockArticle(slug)
  if (!study) notFound()
  const t = CHAPEL.study

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleJsonLd(study)) }} />
      <PageIntro
        labelledBy="study-title"
        ornament={<CrossPattee size={16} />}
        label={
          study.category ? (
            <Link href={chapelPath('/categories', study.category.slug)} className="ink-link text-primary no-underline">
              {study.category.name}
            </Link>
          ) : (
            t.label
          )
        }
        footer={
          <Text family="mono" size="xs" color="muted">
            {[study.publishedAt ? formatDate(study.publishedAt) : null, formatReadingTime(study.readingTime)].filter(Boolean).join(' · ')}
          </Text>
        }
      >
        <Heading as="h1" id="study-title" level="headline-serif" className="max-w-xl">
          {study.title}
        </Heading>
        <Text size="lead" color="muted" leading="relaxed" className="mt-6 max-w-5xl">
          {study.summary}
        </Text>
      </PageIntro>

      <PageBody narrow>
        <StudyBody content={study.content} />

        <OrnamentRule className="mt-16" />

        {study.tags.length > 0 && (
          <div className="mt-14 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <Eyebrow as="span">{t.tags}</Eyebrow>
            <Text as="span" family="mono" size="xs" color="muted">
              {study.tags.map((tag) => tag.name).join(' · ')}
            </Text>
          </div>
        )}

        {study.references.length > 0 && (
          <div className="mt-12">
            <Register title={t.references}>
              {study.references.map((ref, i) => (
                <li key={ref} className="flex gap-4 border-b border-border py-3">
                  <Text as="span" family="mono" size="xs" color="primary" className="pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </Text>
                  <Text as="span" size="base" color="foreground" leading="snug">
                    {ref}
                  </Text>
                </li>
              ))}
            </Register>
          </div>
        )}

        <div className="mt-14 rounded-xs bg-surface-muted p-6 md:p-8">
          <Byline
            plain
            frame="arch"
            name={CHAPEL.author}
            role={CHAPEL.home.author.role}
            portrait={PORTRAIT_SRC ? { src: PORTRAIT_SRC, alt: `Retrato de ${CHAPEL.author}` } : undefined}
          />
        </div>

        <Link href={chapelPath('/articles')} className={cx(buttonClasses({ variant: 'quiet', size: 'none' }), 'mt-12 text-base')}>
          <ArrowLeft size={15} strokeWidth={1.6} aria-hidden />
          {t.back}
        </Link>
      </PageBody>
    </article>
  )
}
