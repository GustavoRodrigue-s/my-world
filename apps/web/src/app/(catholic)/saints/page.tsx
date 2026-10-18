'use client'

import { useState } from 'react'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { ArticleCard } from '@/components/catholic/article-card'
import { SearchModal } from '@/components/catholic/search-modal'
import { Heading, Text, Eyebrow } from '@/components/ui'
import { MOCK_ARTICLES } from '@/lib/mock-data'

const saintArticles = MOCK_ARTICLES.filter((a) => a.category?.slug === 'santos')

export default function SaintsPage() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <Nav onSearchOpen={() => setSearchOpen(true)} />
      <main>
        {/* Hero */}
        <div className="bg-primary px-[var(--spacing-section-x)] pt-[72px] pb-14">
          <div className="section-inner">
            <Eyebrow as="p" className="mb-3">Santos</Eyebrow>
            <Heading
              as="h1"
              level="display"
              color="on-dark"
              className="font-medium text-[clamp(32px,5vw,48px)] leading-[1.15] mb-3"
            >
              Vidas que apontam ao Céu
            </Heading>
            <Text color="on-dark-muted" weight="light" className="text-[15px]">
              Estudos sobre a vida e o pensamento dos santos da Igreja Católica.
            </Text>
          </div>
        </div>

        {/* Articles */}
        <div className="bg-surface px-[var(--spacing-section-x)] py-16">
          <div className="section-inner">
            {saintArticles.length === 0 ? (
              <Text color="muted" className="text-center py-12">
                Ainda não há estudos sobre Santos publicados.
              </Text>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {saintArticles.map((article) => (
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
