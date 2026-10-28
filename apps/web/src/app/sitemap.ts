import type { MetadataRoute } from 'next'
import { MOCK_ARTICLES } from '@/lib/mock-data'
import { getStudies } from '@/lib/studies'
import { studiesPath } from '@/lib/studies-content'
import { LOCALES, LOCALE_META, localePath, type PortfolioPath } from '@/lib/portfolio-locale'
import { canEnter } from '@/lib/world'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const PORTFOLIO: Array<{ path: PortfolioPath } & Pick<MetadataRoute.Sitemap[number], 'changeFrequency' | 'priority'>> = [
  { path: '/portfolio', changeFrequency: 'monthly', priority: 1 },
  { path: '/portfolio/resume', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/identity', changeFrequency: 'yearly', priority: 0.4 },
]

// Capela (Portuguese only) — listed only while it is open (lib/world.ts).
function chapelEntries(): MetadataRoute.Sitemap {
  if (!canEnter('chapel')) return []
  return [
    { url: `${BASE_URL}/chapel`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/chapel/articles`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    ...MOCK_ARTICLES.map((a) => ({
      url: `${BASE_URL}/chapel/articles/${a.slug}`,
      lastModified: a.publishedAt ? new Date(a.publishedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${BASE_URL}/chapel/categories`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/chapel/saints`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/chapel/about`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]
}

// Estudos (Portuguese only) — listed only while it is open; drafts never are.
async function studiesEntries(): Promise<MetadataRoute.Sitemap> {
  if (!canEnter('studies')) return []
  const studies = (await getStudies()).filter((s) => s.status === 'published')
  return [
    { url: `${BASE_URL}${studiesPath()}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...studies.map((s) => ({
      url: `${BASE_URL}${studiesPath(s.slug)}`,
      lastModified: new Date(s.updatedAt ?? s.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: s.format === 'article' ? 0.7 : 0.5,
    })),
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    // The world's home: the map of every place.
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...(await studiesEntries()),
    ...chapelEntries(),
    // Portfolio — one entry per edition, each naming its counterpart.
    ...PORTFOLIO.flatMap(({ path, changeFrequency, priority }) =>
      LOCALES.map((locale) => ({
        url: `${BASE_URL}${localePath(locale, path)}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(LOCALES.map((l) => [LOCALE_META[l].htmlLang, `${BASE_URL}${localePath(l, path)}`])),
        },
      }))
    ),
  ]
}
