import Link from 'next/link'
import { Mark, buttonClasses, cx } from '@/components/ui'
import { getContent, type Locale } from '@/lib/portfolio-content'
import { localePath } from '@/lib/portfolio-locale'
import { DayNightToggle } from './day-night-toggle'
import { LanguageSwitch } from './language-switch'

export function SiteHeader({ locale }: { locale: Locale }) {
  const { shell } = getContent(locale)
  return (
    <header className="sticky top-0 z-[var(--z-nav)] h-[var(--spacing-nav-h)] border-b border-border bg-surface/85 backdrop-blur-md print:hidden">
      <div className="section-inner flex h-full items-center justify-between gap-6 px-[var(--spacing-section-x)]">
        <Link href={localePath(locale, '/portfolio')} className="group flex items-center gap-3 text-foreground no-underline">
          {/* Hover: the satellite makes one full orbit. */}
          <Mark
            size={30}
            satelliteClassName="transition-transform duration-[900ms] ease-in-out group-hover:-rotate-[360deg]"
          />
          {/* Phones keep just the mark: the résumé, language and day/night controls need the room. */}
          <span className="sr-only flex-col leading-none sm:not-sr-only sm:flex">
            <span className="font-sans text-[16px] font-semibold tracking-[-0.02em]">Gustavo Rodrigues</span>
            <span className="mt-1 font-mono text-[10px] text-muted">{shell.brandSub}</span>
          </span>
        </Link>

        <nav aria-label={shell.navLabel} className="hidden lg:block">
          <ul className="flex list-none items-center gap-7">
            {shell.nav.map((s) => (
              <li key={s.id}>
                <Link
                  href={localePath(locale, `/portfolio#${s.id}`)}
                  className="font-sans text-[14px] text-muted no-underline transition-colors duration-[var(--transition-fast)] hover:text-foreground"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* Recruiter path: the résumé is one click away from every page. */}
          <Link href={localePath(locale, '/portfolio/resume')} className={cx(buttonClasses({ variant: 'line', size: 'none' }), 'h-9 px-3.5 text-[13px]')}>
            {shell.resume}
          </Link>
          <LanguageSwitch locale={locale} label={shell.language.label} switchTo={shell.language.switchTo} />
          <DayNightToggle labels={shell.dayNight} />
        </div>
      </div>
    </header>
  )
}
