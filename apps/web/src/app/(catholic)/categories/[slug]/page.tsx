'use client'

import { useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { ArticleCard } from '@/components/catholic/article-card'
import { SearchModal } from '@/components/catholic/search-modal'
import { Heading, Text, Eyebrow } from '@/components/ui'
import { MOCK_ARTICLES, MOCK_CATEGORIES } from '@/lib/mock-data'

export default function CategoryPage() {
  const params = useParams<{ slug: string }>()
  const [searchOpen, setSearchOpen] = useState(false)

  const category = MOCK_CATEGORIES.find((c) => c.slug === params.slug)
  if (!category) return notFound()

  const articles = MOCK_ARTICLES.filter((a) => a.category?.slug === params.slug)

  return (
    <>
      <Nav onSearchOpen={() => setSearchOpen(true)} />
      <main>
        {/* Hero */}
        <div className="bg-primary px-[var(--spacing-section-x)] pt-[72px] pb-14">
          <div className="section-inner">
            <Eyebrow as="p" className="mb-3">
              {category.icon} {category.name}
            </Eyebrow>
            <Heading
              as="h1"
              level="display"
              color="on-dark"
              className="font-medium text-[clamp(32px,5vw,48px)] leading-[1.15] mb-3"
            >
              {category.name}
            </Heading>
            {category.description && (
              <Text color="on-dark-muted" weight="light" className="text-[15px]">
                {category.description}
              </Text>
            )}
          </div>
        </div>

        {/* Articles */}
        <div className="bg-surface px-[var(--spacing-section-x)] py-16">
          <div className="section-inner">
            {articles.length === 0 ? (
              <Text color="muted" className="text-center py-12">
                Nenhum estudo publicado nesta categoria ainda.
              </Text>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
