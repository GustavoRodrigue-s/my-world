import type { Metadata } from 'next'
import type { Article } from '@my-world/types'
import { CHAPEL } from '@/lib/chapel-content'
import { getContent } from '@/lib/portfolio-content'
import { LOCALES, LOCALE_META, localePath, type Locale, type PortfolioPath } from '@/lib/portfolio-locale'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

/** What an article page tells search engines and link previews, wherever it lives. */
export interface ArticleSeo {
  /** The page's path, e.g. `/studies/vida-interior`. */
  path: string
  title: string
  summary: string
  siteName: string
  publishedAt?: string | null
  updatedAt?: string | null
  tags?: string[]
  /** The section it belongs to (a category, a theme). */
  section?: string
  image?: { url: string; width?: number; height?: number; alt?: string }
}

/** A Capela article as `ArticleSeo`. */
export function chapelArticleSeo(article: Article): ArticleSeo {
  return {
    path: `/chapel/articles/${article.slug}`,
    title: article.title,
    summary: article.summary,
    siteName: CHAPEL.name,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    tags: article.tags?.map((t) => t.name),
    section: article.category?.name,
  }
}

export function buildArticleMetadata(article: ArticleSeo): Metadata {
  const url = `${BASE_URL}${article.path}`
  const images = article.image
    ? [{ url: article.image.url, width: article.image.width, height: article.image.height, alt: article.image.alt ?? article.title }]
    : undefined

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.summary,
      url,
      siteName: article.siteName,
      locale: 'pt_BR',
      type: 'article',
      publishedTime: article.publishedAt ?? undefined,
      modifiedTime: article.updatedAt ?? undefined,
      images,
      tags: article.tags,
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title: article.title,
      description: article.summary,
      images: images?.map((i) => i.url),
    },
  }
}

// schema.org Article structured data — injected as JSON-LD in the page
export function buildArticleJsonLd(article: ArticleSeo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    url: `${BASE_URL}${article.path}`,
    datePublished: article.publishedAt ?? undefined,
    dateModified: article.updatedAt ?? article.publishedAt ?? undefined,
    author: {
      '@type': 'Person',
      name: 'Gustavo Rodrigues Fabiano',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: article.siteName,
      url: BASE_URL,
    },
    image: article.image?.url,
    articleSection: article.section,
    keywords: article.tags?.join(', ') || undefined,
  }
}

// schema.org Person structured data for the portfolio
export function buildPersonJsonLd(locale: Locale) {
  const { profile, toolOrbits, aiTools } = getContent(locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.shortName,
    jobTitle: profile.role,
    url: `${BASE_URL}${localePath(locale, '/portfolio')}`,
    email: `mailto:${profile.email}`,
    worksFor: { '@type': 'Organization', name: profile.company },
    address: { '@type': 'PostalAddress', addressRegion: 'PR', addressCountry: 'BR' },
    knowsAbout: [...toolOrbits.slice(0, 2).flatMap((o) => o.tools), ...aiTools],
    sameAs: [profile.linkedin, profile.github],
  }
}

// Portfolio environment metadata, per edition. Each page names its counterpart
// in the other language (hreflang); Portuguese is the x-default.
export function buildPortfolioLayoutMetadata(locale: Locale): Metadata {
  const { meta } = getContent(locale)
  return {
    title: { template: '%s — Gustavo Rodrigues', default: meta.defaultTitle },
    description: meta.description,
    openGraph: {
      siteName: 'Gustavo Rodrigues',
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_META[l].ogLocale),
      type: 'website',
    },
    icons: { icon: '/brand/favicon.svg' },
  }
}

const PORTFOLIO_PAGES = {
  portfolio: '/portfolio',
  resume: '/portfolio/resume',
  identity: '/identity',
} as const satisfies Record<string, PortfolioPath>

export function buildPortfolioPageMetadata(locale: Locale, page: keyof typeof PORTFOLIO_PAGES): Metadata {
  const { meta } = getContent(locale)
  const path = PORTFOLIO_PAGES[page]
  return {
    // The home carries the full name + role; inner pages use the layout's "%s — Gustavo Rodrigues".
    title: page === 'portfolio' ? { absolute: meta.portfolio.title } : meta[page].title,
    description: meta[page].description,
    alternates: {
      canonical: localePath(locale, path),
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [LOCALE_META[l].htmlLang, localePath(l, path)])),
        'x-default': localePath('pt', path),
      },
    },
  }
}
