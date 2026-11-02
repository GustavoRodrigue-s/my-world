import { NextRequest, NextResponse } from 'next/server'
import type { SearchResult } from '@/components/ui'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { getPosts } from '@/lib/blog'
import { BLOG, blogPath } from '@/lib/blog-content'
import { canEnter } from '@/lib/world'

// The world's search, one space at a time (ADR 0017): `?space=blog|chapel&q=…`.
// It answers only for a space the viewer may enter, so nothing leaks from a closed one.
const SPACES = ['blog', 'chapel'] as const
type SearchSpace = (typeof SPACES)[number]

const LIMIT = 8

// Case- and accent-insensitive: "oracao" finds "oração"
function normalize(text: string) {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

// Blog: the MDX loader's index (title, summary, theme, tags) — only visible posts.
async function searchBlog(query: string): Promise<SearchResult[]> {
  const q = normalize(query)
  return (await getPosts())
    .filter((s) => [s.title, s.summary, BLOG.themes[s.theme].name, ...s.tags].some((field) => normalize(field).includes(q)))
    .slice(0, LIMIT)
    .map((s) => ({
      href: blogPath(s.slug),
      title: s.title,
      kicker: `${BLOG.themes[s.theme].name} · ${BLOG.formats[s.format].name}`,
    }))
}

// The Capela: its mock studies, until it has real content.
function searchChapel(query: string): SearchResult[] {
  const q = normalize(query)
  return MOCK_ARTICLES.filter((a) => [a.title, a.summary, a.category?.name ?? ''].some((field) => normalize(field).includes(q)))
    .slice(0, LIMIT)
    .map((a) => ({ href: `/chapel/articles/${a.slug}`, title: a.title, kicker: a.category?.name }))
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()
  const space = searchParams.get('space') as SearchSpace | null

  if (!query || query.length < 2 || !space || !SPACES.includes(space) || !canEnter(space)) {
    return NextResponse.json({ results: [] })
  }

  const results = space === 'blog' ? await searchBlog(query) : searchChapel(query)
  return NextResponse.json({ results })
}
