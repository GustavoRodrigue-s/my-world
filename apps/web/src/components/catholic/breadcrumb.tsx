'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cx } from '@/components/ui'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
  /** Whether the breadcrumb is on a dark (navy) background */
  dark?: boolean
}

export function Breadcrumb({ items, dark = false }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: process.env.NEXT_PUBLIC_SITE_URL ?? '' },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}${item.href}` } : {}),
      })),
    ],
  }

  const linkClass = cx(
    'font-sans text-[11.5px] tracking-[0.02em] no-underline transition-colors duration-[var(--transition-fast)]',
    dark
      ? 'text-on-primary/55 hover:text-accent-hover'
      : 'text-subtle hover:text-accent'
  )

  const activeClass = cx(
    'font-sans text-[11.5px] tracking-[0.02em]',
    dark ? 'text-on-primary/90' : 'text-muted'
  )

  const chevronClass = cx(
    'opacity-60',
    dark ? 'text-on-primary/55' : 'text-subtle'
  )

  const homeClass = cx(
    'flex items-center transition-colors duration-[var(--transition-fast)]',
    dark
      ? 'text-on-primary/55 hover:text-accent-hover'
      : 'text-subtle hover:text-accent'
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Localização"
        className="flex items-center gap-1 flex-wrap"
      >
        <Link href="/" aria-label="Início" className={homeClass}>
          <Home size={12} strokeWidth={1.5} />
        </Link>

        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight size={12} strokeWidth={1.5} className={chevronClass} />
              {item.href && !isLast ? (
                <Link href={item.href as never} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <span className={activeClass}>
                  {item.label}
                </span>
              )}
            </span>
          )
        })}
      </nav>
    </>
  )
}
