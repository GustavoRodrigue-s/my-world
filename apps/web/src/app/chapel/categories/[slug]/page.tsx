import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { CrossPattee, EntryList, Heading, PageIntro, Text, buttonClasses, cx } from '@/components/ui'
import { PageBody, studyEntry } from '@/components/chapel'
import { CHAPEL, chapelPath } from '@/lib/chapel-content'
import { MOCK_ARTICLES, MOCK_CATEGORIES } from '@/lib/mock-data'

const find = (slug: string) => MOCK_CATEGORIES.find((c) => c.slug === slug)

export function generateStaticParams() {
  return MOCK_CATEGORIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const category = find((await params).slug)
  if (!category) return { title: CHAPEL.study.notFound }
  return {
    title: category.name,
    description: category.description ?? undefined,
    alternates: { canonical: chapelPath('/categories', category.slug) },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const category = find((await params).slug)
  if (!category) notFound()
  const t = CHAPEL.categories
  const studies = MOCK_ARTICLES.filter((a) => a.category?.slug === category.slug)

  return (
    <>
      <PageIntro labelledBy="category-title"
        ornament={<CrossPattee size={16} />} label={`${t.labelOne} · ${CHAPEL.studyCount(studies.length)}`}>
        <Heading as="h1" id="category-title" level="display-serif" className="max-w-2xl">
          {category.name}
        </Heading>
        {category.description && (
          <Text size="lead" color="muted" leading="relaxed" className="mt-6 max-w-3xl">
            {category.description}
          </Text>
        )}
      </PageIntro>
      <PageBody>
        {studies.length > 0 ? (
          <EntryList items={studies.map(studyEntry)} />
        ) : (
          <Text size="lg" color="muted" className="py-10 text-center">
            {t.empty}
          </Text>
        )}
        <Link href={chapelPath('/categories')} className={cx(buttonClasses({ variant: 'quiet', size: 'none' }), 'mt-12 text-base')}>
          <ArrowLeft size={15} strokeWidth={1.6} aria-hidden />
          {t.back}
        </Link>
      </PageBody>
    </>
  )
}
