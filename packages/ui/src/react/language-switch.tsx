'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'

export interface Language {
  code: string
  /** Shown in the switch: "PT", "EN". */
  short: string
  /** BCP 47 tag for hreflang/lang: "pt-BR", "en". */
  htmlLang: string
  /** Path prefix of this edition: '' for the default one, '/en' for English. */
  prefix: string
  /** Accessible name of the link that switches to it, written in that language. */
  switchTo: string
}

/** Same page in another edition: strip the current prefix, add the target one. */
function pathFor(pathname: string, from: Language, to: Language) {
  const bare = from.prefix && pathname.startsWith(from.prefix) ? pathname.slice(from.prefix.length) || '/' : pathname
  return `${to.prefix}${bare}`
}

/**
 * PT / EN. Lives in a layout, so it reads the pathname to point at the same
 * page in the other edition (/portfolio/resume ↔ /en/portfolio/resume).
 */
export function LanguageSwitch({ label, current, languages }: { label: string; current: string; languages: Language[] }) {
  const pathname = usePathname()
  const from = languages.find((l) => l.code === current) ?? languages[0]

  return (
    <nav aria-label={label} className="flex h-9 items-center gap-2 font-mono text-xs">
      {languages.map((l, i) => (
        <span key={l.code} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden className="text-foreground-subtle">
              /
            </span>
          )}
          {l.code === current ? (
            <span aria-current="true" className="text-foreground underline decoration-primary underline-offset-4">
              {l.short}
            </span>
          ) : (
            <Link
              href={pathFor(pathname, from, l) as Route}
              hrefLang={l.htmlLang}
              lang={l.htmlLang}
              aria-label={l.switchTo}
              title={l.switchTo}
              className="text-foreground-muted no-underline transition-colors duration-fast hover:text-foreground"
            >
              {l.short}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
