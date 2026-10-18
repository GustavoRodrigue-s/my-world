import type {
  Article,
  ArticleCard,
  Category,
  StrapiListResponse,
  StrapiSingleResponse,
} from '@my-world/types'

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? ''

// ─── Base fetcher ──────────────────────────────────────────────────────────

interface FetchOptions {
  tags?: string[]
  revalidate?: number
}

async function strapiFetch<T>(
  path: string,
  params?: Record<string, string>,
  options: FetchOptions = {}
): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api${path}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: {
      tags: options.tags,
      revalidate: options.revalidate ?? 3600,
    },
  })

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText} — ${url.toString()}`)
  }

  return res.json() as Promise<T>
}

// ─── Articles ──────────────────────────────────────────────────────────────

const ARTICLE_CARD_FIELDS = {
  'fields[0]': 'title',
  'fields[1]': 'slug',
  'fields[2]': 'summary',
  'fields[3]': 'readingTime',
  'fields[4]': 'publishedAt',
  'populate[coverImage][fields][0]': 'url',
  'populate[coverImage][fields][1]': 'alternativeText',
  'populate[coverImage][fields][2]': 'width',
  'populate[coverImage][fields][3]': 'height',
  'populate[category][fields][0]': 'name',
  'populate[category][fields][1]': 'slug',
  'filters[status][$eq]': 'published',
}

export async function getLatestArticles(limit = 3): Promise<ArticleCard[]> {
  const data = await strapiFetch<StrapiListResponse<ArticleCard>>('/articles', {
    ...ARTICLE_CARD_FIELDS,
    'sort[0]': 'publishedAt:desc',
    'pagination[limit]': String(limit),
  }, { tags: ['articles'] })

  return data.data
}

export async function getAllArticles(page = 1, pageSize = 12): Promise<StrapiListResponse<ArticleCard>> {
  return strapiFetch<StrapiListResponse<ArticleCard>>('/articles', {
    ...ARTICLE_CARD_FIELDS,
    'sort[0]': 'publishedAt:desc',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
  }, { tags: ['articles'] })
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const data = await strapiFetch<StrapiListResponse<Article>>('/articles', {
    'filters[slug][$eq]': slug,
    'filters[status][$eq]': 'published',
    populate: '*',
  }, { tags: ['articles', `article-${slug}`] })

  return data.data[0] ?? null
}

export async function getArticlesByCategory(categorySlug: string, limit = 12): Promise<ArticleCard[]> {
  const data = await strapiFetch<StrapiListResponse<ArticleCard>>('/articles', {
    ...ARTICLE_CARD_FIELDS,
    'filters[category][slug][$eq]': categorySlug,
    'sort[0]': 'publishedAt:desc',
    'pagination[limit]': String(limit),
  }, { tags: ['articles', `category-${categorySlug}`] })

  return data.data
}

export async function getFeaturedArticle(): Promise<ArticleCard | null> {
  const data = await strapiFetch<StrapiListResponse<ArticleCard>>('/articles', {
    ...ARTICLE_CARD_FIELDS,
    'sort[0]': 'publishedAt:desc',
    'pagination[limit]': '1',
  }, { tags: ['articles'] })

  return data.data[0] ?? null
}

// Used by generateStaticParams to pre-render all article pages at build time
export async function getAllArticleSlugs(): Promise<string[]> {
  const data = await strapiFetch<StrapiListResponse<{ slug: string }>>('/articles', {
    'fields[0]': 'slug',
    'filters[status][$eq]': 'published',
    'pagination[limit]': '1000',
  }, { revalidate: 3600, tags: ['articles'] })

  return data.data.map((a) => a.slug)
}

// ─── Categories ────────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  const data = await strapiFetch<StrapiListResponse<Category>>('/categories', {
    'sort[0]': 'name:asc',
    'populate[articles][count]': 'true',
  }, { tags: ['categories'] })

  return data.data
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await strapiFetch<StrapiListResponse<Category>>('/categories', {
    'filters[slug][$eq]': slug,
  }, { tags: ['categories', `category-${slug}`] })

  return data.data[0] ?? null
}
