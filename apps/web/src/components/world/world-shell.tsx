import Link from 'next/link'
import { DayNightToggle, SiteHeader, SiteShell, buttonClasses, cx } from '@/components/ui'
import { identityFonts } from '@/lib/fonts'
import { WORLD } from '@/lib/world-content'
import { WorldFooter } from './world-footer'

/**
 * The world's own frame: the master brand, no location, no personal line.
 * The résumé stays one click away for recruiters who land here.
 */
export function WorldShell({ children }: { children: React.ReactNode }) {
  const { shell } = WORLD

  return (
    <SiteShell
      env="portfolio"
      lang="pt-BR"
      className={identityFonts}
      skipLabel={shell.skipLink}
      header={
        <SiteHeader
          homeHref="/"
          name={WORLD.name}
          sub={shell.brandSub}
          actions={
            <>
              <Link href="/portfolio/resume" className={cx(buttonClasses({ variant: 'line', size: 'none' }), 'h-9 px-4 text-sm')}>
                {shell.resume}
              </Link>
              <DayNightToggle labels={shell.dayNight} />
            </>
          }
        />
      }
      footer={<WorldFooter locale="pt" />}
    >
      {children}
    </SiteShell>
  )
}
