'use client'

import { useState } from 'react'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { SectionHero } from '@/components/catholic/section-hero'
import { SectionCitations } from '@/components/catholic/section-citations'
import { SectionFeatured } from '@/components/catholic/section-featured'
import { SectionArticles } from '@/components/catholic/section-articles'
import { SectionThemes } from '@/components/catholic/section-themes'
import { SearchModal } from '@/components/catholic/search-modal'
import { MOCK_ARTICLES, MOCK_CATEGORIES, MOCK_FEATURED_ARTICLE } from '@/lib/mock-data'

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <Nav onSearchOpen={() => setSearchOpen(true)} />
      <main>
        <SectionHero />
        <SectionCitations />
        <SectionFeatured article={MOCK_FEATURED_ARTICLE} />
        <SectionArticles articles={MOCK_ARTICLES.slice(0, 3)} />
        <SectionThemes categories={MOCK_CATEGORIES} />
      </main>
      <Footer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
