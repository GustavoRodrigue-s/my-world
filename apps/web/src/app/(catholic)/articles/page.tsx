'use client'

import { useState } from 'react'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { ArticleCard } from '@/components/catholic/article-card'
import { SearchModal } from '@/components/catholic/search-modal'
import { Breadcrumb } from '@/components/catholic/breadcrumb'
import { Heading, Text, cx } from '@/components/ui'
import { MOCK_ARTICLES, MOCK_CATEGORIES } from '@/lib/mock-data'

export default function ArticlesPage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? MOCK_ARTICLES.filter((a) => a.category?.slug === activeCategory)
    : MOCK_ARTICLES

  return (
    <>
      <Nav onSearchOpen={() => setSearchOpen(true)} />
      <main>
        {/* Page hero — navy */}
        <div className="bg-primary px-[var(--spacing-section-x)] pt-[72px] pb-14">
          <div className="section-inner">
            <div className="mb-5">
              <Breadcrumb dark items={[{ label: 'Estudos' }]} />
            </div>
            <Heading
              as="h1"
              level="display"
              color="on-dark"
              className="font-medium text-[clamp(32px,5vw,48px)] leading-[1.15] mb-3"
            >
              Todos os Estudos
            </Heading>
            <Text color="on-dark-muted" weight="light" className="text-[15px]">
              Reflexões e aprofundamentos sobre a fé católica.
            </Text>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mt-8">
              <button
                onClick={() => setActiveCategory(null)}
                className={cx(
                  'font-sans text-[12px] font-semibold tracking-[0.08em] uppercase px-5 py-2 rounded-pill border cursor-pointer transition-colors duration-[var(--transition-fast)]',
                  !activeCategory
                    ? 'bg-accent border-accent text-on-accent'
                    : 'bg-transparent border-on-primary/30 text-on-primary/65 hover:border-accent/60 hover:text-accent-hover'
                )}
              >
                Todos
              </button>
              {MOCK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug === activeCategory ? null : cat.slug)}
                  className={cx(
                    'font-sans text-[12px] font-semibold tracking-[0.08em] uppercase px-5 py-2 rounded-pill border cursor-pointer transition-colors duration-[var(--transition-fast)]',
                    activeCategory === cat.slug
                      ? 'bg-accent border-accent text-on-accent'
                      : 'bg-transparent border-on-primary/30 text-on-primary/65 hover:border-accent/60 hover:text-accent-hover'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles grid */}
        <div className="bg-surface px-[var(--spacing-section-x)] py-16">
          <div className="section-inner">
            {filtered.length === 0 ? (
              <Text color="muted" className="text-center py-12">
                Nenhum estudo encontrado nesta categoria.
              </Text>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((article) => (
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
