import Link from 'next/link'
import { DayNightToggle, LanguageSwitch, SectionNav, SiteHeader as Header, buttonClasses, cx } from '@/components/ui'
import { getContent, type Locale } from '@/lib/portfolio-content'
import { PORTFOLIO_LANGUAGES, localePath } from '@/lib/portfolio-locale'

export function SiteHeader({ locale }: { locale: Locale }) {
  const { shell, profile } = getContent(locale)
  return (
    <Header
      homeHref={localePath(locale, '/portfolio')}
      name={profile.shortName}
      sub={shell.brandSub}
      nav={
        <SectionNav
          label={shell.navLabel}
          items={shell.nav.map((s) => ({ ...s, href: localePath(locale, `/portfolio#${s.id}`) }))}
        />
      }
      actions={
        <>
          {/* Recruiter path: the résumé is one click away from every page. */}
          <Link href={localePath(locale, '/portfolio/resume')} className={cx(buttonClasses({ variant: 'line', size: 'none' }), 'h-9 px-4 text-sm')}>
            {shell.resume}
          </Link>
          <LanguageSwitch label={shell.language.label} current={locale} languages={PORTFOLIO_LANGUAGES} />
          <DayNightToggle labels={shell.dayNight} />
        </>
      }
    />
  )
}
