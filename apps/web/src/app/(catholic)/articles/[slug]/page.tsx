'use client'

import { useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { ArticleBody } from '@/components/catholic/article-body'
import { SearchModal } from '@/components/catholic/search-modal'
import { MOCK_ARTICLES, MOCK_ARTICLE_FULL } from '@/lib/mock-data'

export default function ArticlePage() {
  const params = useParams<{ slug: string }>()
  const [searchOpen, setSearchOpen] = useState(false)

  // Use the full article if slug matches, otherwise build a minimal version from card data
  const article = (() => {
    if (params.slug === MOCK_ARTICLE_FULL.slug) return MOCK_ARTICLE_FULL
    const card = MOCK_ARTICLES.find((a) => a.slug === params.slug)
    if (!card) return null
    return {
      ...card,
      content: card.summary,
      tags: [],
      references: [],
      status: 'published' as const,
      createdAt: card.publishedAt ?? '',
      updatedAt: card.publishedAt ?? '',
    }
  })()

  if (!article) return notFound()

  return (
    <>
      <Nav onSearchOpen={() => setSearchOpen(true)} />
      <main>
        <ArticleBody article={article} />
      </main>
      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
