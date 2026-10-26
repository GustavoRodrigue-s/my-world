'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import { Mark } from './mark'
import { cx } from './utils'

interface Crumb {
  label: string
  href: string
  /** Shown when the path is this href or below it (default: the href itself). */
  match?: string
}

interface WorldBarProps {
  /** Accessible name of the breadcrumb ("Você está em"). */
  label: string
  /** The world's home: the map. */
  home: { label: string; href: string; hrefLang?: string }
  /** Candidate crumbs, outermost first; only those the current path is inside are shown. */
  crumbs: Crumb[]
  /** `line` (default): hairline strip. `stone`: a flat stone strip (Capela). */
  variant?: 'line' | 'stone'
}

/**
 * The thread back to the world: a thin strip over an environment's header with
 * the way home — Mundo do Gustavo / Portfólio / Currículo. It scrolls away with
 * the page; the header stays.
 */
export function WorldBar({ label, home, crumbs, variant = 'line' }: WorldBarProps) {
  const pathname = usePathname()
  const inside = (c: Crumb) => {
    const m = c.match ?? c.href
    return pathname === m || pathname.startsWith(`${m}/`)
  }
  const shown = crumbs.filter(inside)

  return (
    <nav
      aria-label={label}
      className={cx(
        'border-b border-border print:hidden',
        variant === 'stone' ? 'bg-surface-alt-1' : 'bg-surface-alt-2'
      )}
    >
      <ol className="section-inner flex h-8 list-none px-[var(--spacing-section-x)] items-center gap-2 overflow-x-auto font-mono text-[11px] whitespace-nowrap text-muted">
        <li>
          <Link
            href={home.href as Route}
            hrefLang={home.hrefLang}
            className="ink-link group inline-flex items-center gap-1.5 text-foreground no-underline hover:text-accent"
          >
            <Mark size={14} satelliteClassName="transition-transform duration-[650ms] ease-in-out group-hover:-rotate-[360deg]" />
            {home.label}
          </Link>
        </li>
        {shown.map((c, i) => {
          const last = i === shown.length - 1
          return (
            <li key={c.href} className="inline-flex items-center gap-2">
              <span aria-hidden className="text-subtle">
                /
              </span>
              {last ? (
                <span aria-current="page" className="text-foreground">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href as Route} className="ink-link text-muted no-underline hover:text-foreground">
                  {c.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
