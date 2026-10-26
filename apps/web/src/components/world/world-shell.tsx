import Link from 'next/link'
import { DayNightToggle, SiteFooter, SiteHeader, SiteShell, buttonClasses, cx, type FooterLink } from '@/components/ui'
import { identityFonts } from '@/lib/fonts'
import { IDENTITY } from '@/lib/portfolio-content'
import { SPACES, canEnter } from '@/lib/world'
import { PLACE_ORDER, WORLD } from '@/lib/world-content'

const MARK = { portfolio: 'satellite', projects: 'artifact', studies: 'seed', chapel: 'star' } as const

/**
 * The world's own frame: the master brand, no location, no personal line.
 * The résumé stays one click away for recruiters who land here.
 */
export function WorldShell({ children }: { children: React.ReactNode }) {
  const { shell, footer, places, atlas } = WORLD

  const placeLinks: FooterLink[] = PLACE_ORDER.map((id) => {
    const copy = places[id]
    const status = SPACES[id].status
    return {
      label: copy.name,
      href: 'href' in copy && copy.href ? copy.href : '/',
      mark: { variant: MARK[id] },
      tag: status === 'open' ? undefined : { tone: status === 'building' ? 'open' : 'draft', label: atlas.states[status] },
      disabled: !canEnter(id),
    }
  })

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
              <Link href="/portfolio/resume" className={cx(buttonClasses({ variant: 'line', size: 'none' }), 'h-9 px-3.5 text-[13px]')}>
                {shell.resume}
              </Link>
              <DayNightToggle labels={shell.dayNight} />
            </>
          }
        />
      }
      footer={
        <SiteFooter
          name={WORLD.name}
          text={footer.text}
          columns={[
            { title: footer.places, links: placeLinks },
            { title: footer.world, links: [{ label: footer.identity, href: '/identity' }] },
            {
              title: footer.contact,
              links: [
                { label: footer.email, href: `mailto:${IDENTITY.email}`, external: true },
                { label: 'LinkedIn', href: IDENTITY.linkedin, external: true, rel: 'me noopener' },
                { label: 'GitHub', href: IDENTITY.github, external: true, rel: 'me noopener' },
              ],
            },
          ]}
          notes={[`© ${new Date().getFullYear()} ${IDENTITY.name}`, footer.motto]}
        />
      }
    >
      {children}
    </SiteShell>
  )
}
