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
        'sticky top-0 z-sticky h-bar border-b border-border print:hidden',
        surface === 'glass' ? 'bg-surface/85 backdrop-blur-md' : 'bg-surface'
      )}
    >
      <span aria-hidden className="plot-progress absolute inset-x-0 -bottom-px h-0.5 bg-primary" />
      <div className="section-inner flex h-full items-center justify-between gap-6 px-gutter md:px-gutter-wide">
        <Link href={homeHref as Route} className="group flex items-center gap-3 text-foreground no-underline">
          {/* Hover: the satellite makes one full orbit. */}
          <Mark
            size={30}
            variant={mark?.variant}
            tone={mark?.tone}
            satelliteClassName={cx(
              'transition-[transform,fill] duration-gesture ease-in-out group-hover:-rotate-[360deg]',
              mark?.reveal && 'group-hover:fill-support'
            )}
          />
          {/* Phones keep just the mark: the actions need the room. */}
          <span className="sr-only flex-col leading-none sm:not-sr-only sm:flex">
            <span className="font-sans text-base font-semibold tracking-tight">{name}</span>
            <span className="mt-1 font-mono text-xs text-foreground-muted">{sub}</span>
          </span>
        </Link>

        {nav}

        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </header>
  )
}
