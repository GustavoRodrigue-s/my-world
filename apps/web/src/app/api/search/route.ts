import { NextRequest, NextResponse } from 'next/server'
import type { SearchResult } from '@/components/ui'
import { getStudies } from '@/lib/studies'
import { STUDIES, studiesPath } from '@/lib/studies-content'
import { canEnter } from '@/lib/world'

// The world's search, one space at a time (ADR 0017): `?space=studies|chapel&q=…`.
// It answers only for a space the viewer may enter, so nothing leaks from a closed one.
const SPACES = ['studies', 'chapel'] as const
type SearchSpace = (typeof SPACES)[number]

const LIMIT = 8

// Case- and accent-insensitive: "oracao" finds "oração"
function normalize(text: string) {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

// Estudos: the MDX loader's index (title, summary, theme, tags) — only visible studies.
async function searchStudies(query: string): Promise<SearchResult[]> {
  const q = normalize(query)
  return (await getStudies())
    .filter((s) => [s.title, s.summary, STUDIES.themes[s.theme].name, ...s.tags].some((field) => normalize(field).includes(q)))
    .slice(0, LIMIT)
    .map((s) => ({
      href: studiesPath(s.slug),
      title: s.title,
      kicker: `${STUDIES.themes[s.theme].name} · ${STUDIES.formats[s.format].name}`,
    }))
}

type ChapelArticle = { slug: string; title: string; category?: { name: string } | null }

const chapelResult = (a: ChapelArticle): SearchResult => ({
  href: `/chapel/articles/${a.slug}`,
  title: a.title,
  kicker: a.category?.name,
})

// Dev fallback: search mock data when Strapi is not configured or unreachable
async function searchMockArticles(query: string): Promise<SearchResult[]> {
  const { MOCK_ARTICLES } = await import('@/lib/mock-data')
  const q = normalize(query)
  return MOCK_ARTICLES.filter((a) =>
    [a.title, a.summary, a.category?.name ?? ''].some((field) => normalize(field).includes(q))
  )
    .slice(0, LIMIT)
    .map(chapelResult)
}

// The Capela: proxied to Strapi — keeps the API token server-side only.
async function searchChapel(query: string): Promise<SearchResult[]> {
  const strapiUrl = process.env.STRAPI_URL
  const strapiToken = process.env.STRAPI_API_TOKEN
  if (!strapiUrl || !strapiToken) return searchMockArticles(query)

  try {
    const url = new URL(`${strapiUrl}/api/articles`)
    url.searchParams.set('filters[$or][0][title][$containsi]', query)
    url.searchParams.set('filters[$or][1][summary][$containsi]', query)
    url.searchParams.set('fields[0]', 'title')
    url.searchParams.set('fields[1]', 'slug')
    url.searchParams.set('fields[2]', 'summary')
    url.searchParams.set('populate[category][fields][0]', 'name')
    url.searchParams.set('pagination[limit]', String(LIMIT))
    url.searchParams.set('filters[status][$eq]', 'published')

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${strapiToken}` },
      next: { revalidate: 60 },
    })

    if (!res.ok) throw new Error(`Strapi error: ${res.status}`)

    const json = await res.json()
    return ((json.data ?? []) as ChapelArticle[]).map(chapelResult)
  } catch (error) {
    console.error('[search] Strapi unavailable, falling back to mock data:', error)
    return searchMockArticles(query)
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()
  const space = searchParams.get('space') as SearchSpace | null

  if (!query || query.length < 2 || !space || !SPACES.includes(space) || !canEnter(space)) {
    return NextResponse.json({ results: [] })
  }

  const results = space === 'studies' ? await searchStudies(query) : await searchChapel(query)
  return NextResponse.json({ results })
}
