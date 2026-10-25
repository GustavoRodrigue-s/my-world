import { NextRequest, NextResponse } from 'next/server'
import { canEnter } from '@/lib/world'

// Case- and accent-insensitive: "oracao" finds "oração"
function normalize(text: string) {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

// Dev fallback: search mock data when Strapi is not configured or unreachable
async function searchMockArticles(query: string) {
  const { MOCK_ARTICLES } = await import('@/lib/mock-data')
  const q = normalize(query)
  return MOCK_ARTICLES.filter((a) =>
    [a.title, a.summary, a.category?.name ?? ''].some((field) => normalize(field).includes(q))
  ).slice(0, 8)
}

// Proxy search queries to Strapi — keeps API token server-side only
// In Phase 2, replace the Strapi call with Meilisearch — no client changes needed
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  // The search only covers the Capela's studies: nothing leaks while it is closed.
  if (!query || query.trim().length < 2 || !canEnter('chapel')) {
    return NextResponse.json({ results: [] })
  }

  const strapiUrl = process.env.STRAPI_URL
  const strapiToken = process.env.STRAPI_API_TOKEN

  if (!strapiUrl || !strapiToken) {
    return NextResponse.json({ results: await searchMockArticles(query) })
  }

  try {
    const url = new URL(`${strapiUrl}/api/articles`)
    url.searchParams.set('filters[$or][0][title][$containsi]', query)
    url.searchParams.set('filters[$or][1][summary][$containsi]', query)
    url.searchParams.set('fields[0]', 'title')
    url.searchParams.set('fields[1]', 'slug')
    url.searchParams.set('fields[2]', 'summary')
    url.searchParams.set('populate[category][fields][0]', 'name')
    url.searchParams.set('pagination[limit]', '8')
    url.searchParams.set('filters[status][$eq]', 'published')

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${strapiToken}` },
      next: { revalidate: 60 },
    })

    if (!res.ok) throw new Error(`Strapi error: ${res.status}`)

    const json = await res.json()
    return NextResponse.json({ results: json.data ?? [] })
  } catch (error) {
    console.error('[search] Strapi unavailable, falling back to mock data:', error)
    return NextResponse.json({ results: await searchMockArticles(query) })
  }
}
