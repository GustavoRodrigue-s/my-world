'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cx } from './utils'

interface PageNavProps {
  label: string
  /** Name of the phone menu's button. */
  menuLabel?: string
  /** `exact`: current only on that very path (an environment's home); otherwise also on its sub-pages. */
  items: Array<{ label: string; href: string; exact?: boolean }>
  /** Phone menu: `line` (default) hairline button and a floating card; `stone` a flat stone button and a flat panel (Capela). */
  variant?: 'line' | 'stone'
}

/**
 * Header links between the pages of an environment; the current page's link
 * is marked. Wide screens get the inline list; phones a native <details>
 * menu (keyboard and screen readers for free), closed again after navigating.
 */
export function PageNav({ label, menuLabel = 'Menu', items, variant = 'line' }: PageNavProps) {
  const stone = variant === 'stone'
  const pathname = usePathname()
  const menuRef = useRef<HTMLDetailsElement>(null)
  const isCurrent = (href: string, exact?: boolean) => pathname === href || (!exact && pathname.startsWith(`${href}/`))

  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false
  }, [pathname])

  const link = (item: PageNavProps['items'][number], className: string) => (
    <Link
      href={item.href as Route}
      aria-current={isCurrent(item.href, item.exact) ? 'page' : undefined}
      className={className}
    >
      {item.label}
    </Link>
  )

  return (
    <>
      <nav aria-label={label} className="hidden lg:block">
        <ul className="flex list-none items-center gap-7">
          {items.map((item) => (
            <li key={item.href}>
              {link(item, 'ink-link pb-1 font-sans text-[14px] text-muted no-underline hover:text-foreground aria-[current]:text-foreground')}
            </li>
          ))}
        </ul>
      </nav>

      <details ref={menuRef} className="relative ml-auto lg:hidden">
        <summary
          aria-label={menuLabel}
          className={cx(
            'inline-flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-xs border text-foreground transition-colors duration-[var(--transition-fast)] hover:border-foreground [&::-webkit-details-marker]:hidden',
            stone ? 'border-transparent bg-surface-alt-1' : 'border-border-strong'
          )}
        >
          <Menu size={16} strokeWidth={1.6} aria-hidden />
        </summary>
        <nav
          aria-label={label}
          className={cx(
            'absolute top-full right-0 mt-3 w-60 rounded-xs border p-2',
            stone ? 'border-border bg-surface-alt-2' : 'border-border-strong bg-surface shadow-card'
          )}
        >
          <ul className="flex list-none flex-col">
            {items.map((item) => (
              <li key={item.href}>
                {link(
                  item,
                  'block rounded-xs px-3 py-2.5 font-sans text-[15px] text-foreground no-underline transition-colors hover:bg-surface-alt-1 aria-[current]:text-accent'
                )}
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </>
  )
}
