import type { Metadata } from 'next'
import type { Article } from '@my-world/types'
import { getContent } from '@/lib/portfolio-content'
import { LOCALES, LOCALE_META, localePath, type Locale, type PortfolioPath } from '@/lib/portfolio-locale'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Capela de Estudos'
const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337'

// Resolves Strapi relative image URLs to absolute
function resolveImageUrl(url: string): string {
  if (url.startsWith('http')) return url
  return `${STRAPI_URL}${url}`
}

export function buildArticleMetadata(article: Article): Metadata {
  const ogImage = article.coverImage
    ? resolveImageUrl(article.coverImage.url)
    : `${BASE_URL}/og-default.png`

  const publishedTime = article.publishedAt ?? undefined

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: `${BASE_URL}/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `${BASE_URL}/articles/${article.slug}`,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      type: 'article',
      publishedTime,
      images: [
        {
          url: ogImage,
          width: article.coverImage?.width ?? 1200,
          height: article.coverImage?.height ?? 630,
          alt: article.coverImage?.alternativeText ?? article.title,
        },
      ],
      tags: article.tags?.map((t) => t.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images: [ogImage],
    },
  }
}

// schema.org Article structured data — injected as JSON-LD in the page
export function buildArticleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    url: `${BASE_URL}/articles/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: 'Gustavo Rodrigues Fabiano',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    image: article.coverImage ? resolveImageUrl(article.coverImage.url) : undefined,
    articleSection: article.category?.name,
    keywords: article.tags?.map((t) => t.name).join(', '),
  }
}

// schema.org Person structured data for the portfolio
export function buildPersonJsonLd(locale: Locale) {
  const { profile, toolOrbits, education } = getContent(locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.shortName,
    jobTitle: profile.role,
    url: `${BASE_URL}${localePath(locale, '/portfolio')}`,
    email: `mailto:${profile.email}`,
    worksFor: { '@type': 'Organization', name: profile.company },
    alumniOf: { '@type': 'CollegeOrUniversity', name: education[0].org },
    address: { '@type': 'PostalAddress', addressLocality: 'Londrina', addressRegion: 'PR', addressCountry: 'BR' },
    knowsAbout: toolOrbits.slice(0, 2).flatMap((o) => o.tools),
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
