'use client'

import { useState } from 'react'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { ThemeCard } from '@/components/catholic/theme-card'
import { SearchModal } from '@/components/catholic/search-modal'
import { Breadcrumb } from '@/components/catholic/breadcrumb'
import { Heading, Text } from '@/components/ui'
import { MOCK_CATEGORIES } from '@/lib/mock-data'

export default function CategoriesPage() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <Nav onSearchOpen={() => setSearchOpen(true)} />
      <main>
        {/* Hero */}
        <div className="bg-primary px-[var(--spacing-section-x)] pt-[72px] pb-14">
          <div className="section-inner">
            <div className="mb-5">
              <Breadcrumb dark items={[{ label: 'Categorias' }]} />
            </div>
            <Heading
              as="h1"
              level="display"
              color="on-dark"
              className="font-medium text-[clamp(32px,5vw,48px)] leading-[1.15] mb-3"
            >
              Explorar por Tema
            </Heading>
            <Text color="on-dark-muted" weight="light" className="text-[15px]">
              Escolha uma área e mergulhe nos estudos relacionados.
            </Text>
          </div>
        </div>

        {/* Grid */}
        <div className="bg-surface px-[var(--spacing-section-x)] py-16">
          <div className="section-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MOCK_CATEGORIES.map((cat) => (
                <ThemeCard
                  key={cat.id}
                  name={cat.name}
                  description={cat.description ?? ''}
                  icon={cat.icon ?? '✦'}
                  slug={cat.slug}
                  articleCount={cat.articleCount}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
