import Link from 'next/link'
import type { Route } from 'next'
import { Mark, type MarkVariant } from './mark'
import { cx } from './utils'

interface SiteHeaderProps {
  homeHref: string
  name: string
  /** Mono line under the name. */
  sub: string
  /** `reveal`: the satellite takes the support color while it orbits on hover (the Capela's hidden gold). */
  mark?: { variant?: MarkVariant; tone?: 'accent' | 'support'; reveal?: boolean }
  /** Usually <SectionNav> or <PageNav>. */
  nav?: React.ReactNode
  /** Right side: résumé link, search, <LanguageSwitch>, <DayNightToggle>… */
  actions?: React.ReactNode
  /** `glass` (default): translucent over the page, blurred. `solid`: a flat band of the surface color. */
  surface?: 'glass' | 'solid'
}

/**
 * The environment's header: the mark and name (home link), the navigation,
 * the actions — and the reading progress traced along the bottom edge.
 */
export function SiteHeader({ homeHref, name, sub, mark, nav, actions, surface = 'glass' }: SiteHeaderProps) {
  return (
    <header
      className={cx(
        'sticky top-0 z-[var(--z-nav)] h-[var(--spacing-nav-h)] border-b border-border print:hidden',
        surface === 'glass' ? 'bg-surface/85 backdrop-blur-md' : 'bg-surface'
      )}
    >
      <span aria-hidden className="plot-progress absolute inset-x-0 -bottom-px h-[2px] bg-accent" />
      <div className="section-inner flex h-full items-center justify-between gap-6 px-[var(--spacing-section-x)]">
        <Link href={homeHref as Route} className="group flex items-center gap-3 text-foreground no-underline">
          {/* Hover: the satellite makes one full orbit. */}
          <Mark
            size={30}
            variant={mark?.variant}
            tone={mark?.tone}
            satelliteClassName={cx(
              'transition-[transform,fill] duration-[650ms] ease-in-out group-hover:-rotate-[360deg]',
              mark?.reveal && 'group-hover:fill-support-1'
            )}
          />
          {/* Phones keep just the mark: the actions need the room. */}
          <span className="sr-only flex-col leading-none sm:not-sr-only sm:flex">
            <span className="font-sans text-[16px] font-semibold tracking-[-0.02em]">{name}</span>
            <span className="mt-1 font-mono text-[10px] text-muted">{sub}</span>
          </span>
        </Link>

        {nav}

        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </header>
  )
}
