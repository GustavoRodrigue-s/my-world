import { cx } from './utils'

interface SiteShellProps {
  /** Environment name: selects the theme (themes/<env>.css) and scopes identity.css. */
  env: string
  /** The edition's language (the root <html> is shared by every environment). */
  lang: string
  /** Font variable classes (next/font) for this environment. */
  className?: string
  /**
   * `plotted` (default): the page is drawn as you scroll (identity.css .plot-*).
   * `still`: everything is shown already drawn — only hovers and the page's
   * one protagonist animation move.
   */
  motion?: 'plotted' | 'still'
  skipLabel: string
  header: React.ReactNode
  footer: React.ReactNode
  children: React.ReactNode
}

/**
 * The frame every environment wears. Theme vars apply through
 * `:root:has([data-env="<env>"])`; font variables are re-declared on this
 * wrapper so they win over any value inherited from another environment.
 */
export function SiteShell({ env, lang, className, motion = 'plotted', skipLabel, header, footer, children }: SiteShellProps) {
  return (
    <div data-env={env} data-motion={motion} lang={lang} className={cx('flex min-h-dvh flex-col bg-surface font-sans text-foreground', className)}>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-top focus:bg-foreground focus:px-4 focus:py-2 focus:text-surface"
      >
        {skipLabel}
      </a>
      {header}
      <main id="content" className="flex-1">
        {children}
      </main>
      {footer}
    </div>
  )
}
