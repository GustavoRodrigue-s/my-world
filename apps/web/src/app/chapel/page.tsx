import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import {
  Byline,
  CrossPattee,
  EntryList,
  Emphasis,
  FeaturedEntry,
  Heading,
  Niche,
  OrnamentRule,
  PageIntro,
  RoseWindow,
  Section,
  SectionIntro,
  Text,
  TileGrid,
  buttonClasses,
  cx,
} from '@/components/ui'
import { CitationPlate, studyEntry } from '@/components/chapel'
import { CHAPEL, chapelPath } from '@/lib/chapel-content'
import { MOCK_ARTICLES, MOCK_CATEGORIES, MOCK_CITATIONS, MOCK_FEATURED_ARTICLE } from '@/lib/mock-data'
import { PORTRAIT_SRC } from '@/lib/portfolio-content'
import { formatDate, formatReadingTime } from '@/lib/utils'

export const metadata: Metadata = {
  title: { absolute: CHAPEL.meta.title },
  alternates: { canonical: chapelPath('') },
}

export default function ChapelHome() {
  const { home } = CHAPEL
  const featured = MOCK_FEATURED_ARTICLE
  const latest = MOCK_ARTICLES.filter((a) => a.slug !== featured.slug).slice(0, 3)

  return (
    <>
      <PageIntro
        labelledBy="chapel-title"
        ornament={<CrossPattee size={18} />}
        label={home.label}
        actions={
          <>
            <Link href={chapelPath('/articles')} className={cx(buttonClasses({ variant: 'rubric', size: 'none' }), 'h-12 px-5 text-base')}>
              {home.ctaStudies}
              <ArrowRight size={16} strokeWidth={1.6} aria-hidden />
            </Link>
            <Link href="#themes" className={cx(buttonClasses({ variant: 'quiet', size: 'none' }), 'text-base')}>
              {home.ctaThemes}
              <ArrowDown size={15} strokeWidth={1.6} aria-hidden />
            </Link>
          </>
        }
      >
        <Heading as="h1" id="chapel-title" level="display-serif" className="max-w-[15ch]">
          {home.statement.before} <Emphasis fit="serif">{home.statement.emphasis}</Emphasis>
          {home.statement.after}
        </Heading>
        <Text size="lead" color="muted" leading="relaxed" className="mt-7 max-w-[48ch]">
          {home.lead}
        </Text>
      </PageIntro>

      {/* The altar at the end of the nave: the picture rests veiled and shows its gold under the reader's hand. */}
      <Section aria-label={home.supper.label} className="pt-0 md:pt-0">
        <Niche
          ornament={<RoseWindow size={56} />}
          caption={
            <>
              <Text family="serif" size="lead" color="foreground" leading="normal" className="italic">
                {home.supper.verse}{' '}
                <Text as="span" family="mono" size="xs" color="muted" className="not-italic">
                  {home.supper.verseSource}
                </Text>
              </Text>
              <Text family="mono" size="xs" color="muted" className="mt-2">
                {home.supper.credit}
              </Text>
            </>
          }
        >
          <Image
            src="/chapel/last-supper.jpg"
            alt={home.supper.alt}
            width={850}
            height={733}
            sizes="(min-width: 680px) 546px, calc(88vw - 2.5rem)"
            className="block h-auto w-full"
          />
        </Niche>
      </Section>

      <Section bg="muted" aria-label={home.citations.label}>
        <CitationPlate quotes={MOCK_CITATIONS} labels={home.citations} />
      </Section>

      <Section id="latest" aria-labelledby="latest-title">
        <SectionIntro
          id="latest"
          title={home.latest.title}
          note={home.latest.note}
          action={
            <Link href={chapelPath('/articles')} className={cx(buttonClasses({ variant: 'quiet', size: 'none' }), 'text-base')}>
              {home.latest.all}
              <ArrowRight size={15} strokeWidth={1.6} aria-hidden />
            </Link>
          }
        />
        <FeaturedEntry
          shape="niche"
          id={featured.slug}
          label={home.latest.featured}
          title={featured.title}
          href={chapelPath('/articles', featured.slug)}
          lead={featured.summary}
          meta={[
            ...(featured.category ? [featured.category.name] : []),
            formatReadingTime(featured.readingTime),
            ...(featured.publishedAt ? [formatDate(featured.publishedAt)] : []),
          ]}
          action={
            <Link
              href={chapelPath('/articles', featured.slug)}
              className={cx(buttonClasses({ variant: 'rubric', size: 'none' }), 'h-11 px-4 text-md')}
            >
              {home.latest.read}
              <ArrowRight size={15} strokeWidth={1.5} aria-hidden />
            </Link>
          }
        />
        <div className="mt-6">
          <EntryList items={latest.map(studyEntry)} />
        </div>
      </Section>

      <Section id="themes" aria-labelledby="themes-title" className="scroll-mt-bar pt-0 md:pt-0">
        <OrnamentRule className="-mt-6 mb-16 md:-mt-12 md:mb-24" />
        <SectionIntro id="themes" title={home.themes.title} note={home.themes.note} />
        <TileGrid
          gilded
          topics={MOCK_CATEGORIES.map((c) => ({
            href: chapelPath('/categories', c.slug),
            name: c.name,
            description: c.description ?? undefined,
            count: c.articleCount ? CHAPEL.studyCount(c.articleCount) : undefined,
          }))}
        />
      </Section>

      <Section id="author" bg="muted" aria-labelledby="author-title">
        <div className="flex flex-col items-center text-center">
          <SectionIntro id="author" title={home.author.title} note={home.author.note} align="center" />
          <Byline
            plain
            frame="arch"
            centered
            name={CHAPEL.author}
            role={home.author.role}
            portrait={PORTRAIT_SRC ? { src: PORTRAIT_SRC, alt: `Retrato de ${CHAPEL.author}` } : undefined}
          />
          <Text size="lg" color="foreground" leading="relaxed" className="mt-8 max-w-[58ch]">
            {home.author.text}
          </Text>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            <Link href={chapelPath('/about')} className={cx(buttonClasses({ variant: 'ink', size: 'none' }), 'h-11 px-4 text-md')}>
              {home.author.more}
              <ArrowRight size={15} strokeWidth={1.5} aria-hidden />
            </Link>
            <Link href="/portfolio" className={cx(buttonClasses({ variant: 'quiet', size: 'none' }), 'text-md')}>
              {home.author.portfolio}
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden />
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
