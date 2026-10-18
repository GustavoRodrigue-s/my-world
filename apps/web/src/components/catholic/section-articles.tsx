import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ArticleCard } from '@my-world/types'
import { Heading, Section, SectionHeader } from '@/components/ui'
import { ArticleCard as ArticleCardComponent } from './article-card'

interface Props {
  articles: ArticleCard[]
}

export function SectionArticles({ articles }: Props) {
  const viewAllLink = (
    <Link
      href="/articles"
      className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-accent no-underline"
    >
      Ver todos
      <ArrowRight size={12} strokeWidth={1.5} />
    </Link>
  )

  return (
    <Section bg="tan">
      <SectionHeader action={viewAllLink}>
        <Heading as="h2" level="h2">Últimos Estudos</Heading>
      </SectionHeader>

      {/* Grid: 3 cols desktop → 2 tablet → 1 mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.slice(0, 3).map((article) => (
          <ArticleCardComponent key={article.id} article={article} />
        ))}
      </div>
    </Section>
  )
}
