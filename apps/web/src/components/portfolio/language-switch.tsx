'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LOCALES, LOCALE_META, switchLocalePath, type Locale } from '@/lib/portfolio-locale'

/**
 * PT / EN. Lives in the layout, so it reads the pathname to point at the same
 * page in the other language (/portfolio/resume ↔ /en/portfolio/resume).
 */
export function LanguageSwitch({ locale, label, switchTo }: { locale: Locale; label: string; switchTo: string }) {
  const pathname = usePathname()

  return (
    <nav aria-label={label} className="flex h-9 items-center gap-1.5 font-mono text-[12px]">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden className="text-subtle">
              /
            </span>
          )}
          {l === locale ? (
            <span aria-current="true" className="text-foreground underline decoration-accent underline-offset-4">
              {LOCALE_META[l].short}
            </span>
          ) : (
            <Link
              href={switchLocalePath(pathname, l)}
              hrefLang={LOCALE_META[l].htmlLang}
              lang={LOCALE_META[l].htmlLang}
              aria-label={switchTo}
              title={switchTo}
              className="text-muted no-underline transition-colors duration-[var(--transition-fast)] hover:text-foreground"
            >
              {LOCALE_META[l].short}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
