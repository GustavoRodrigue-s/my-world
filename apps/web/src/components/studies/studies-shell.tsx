import { SiteShell, WorldBar } from '@/components/ui'
import { identityFonts } from '@/lib/fonts'
import { STUDIES, studiesPath } from '@/lib/studies-content'
import { isUnderConstruction } from '@/lib/world'
import { ConstructionNotice } from './construction-notice'
import { StudiesFooter } from './studies-footer'
import { StudiesHeader } from './studies-header'

/**
 * Estudos — "tinta e lápis" (ADR 0015): the page of a book, ink for what is
 * finished, graphite for what is still in pencil. Plotted like the portfolio.
 */
export function StudiesShell({ children }: { children: React.ReactNode }) {
  const { shell } = STUDIES
  return (
    <SiteShell
      env="studies"
      lang="pt-BR"
      className={identityFonts}
      skipLabel={shell.skipLink}
      header={
        <>
          <WorldBar
            label={shell.worldBar.label}
            home={{ label: shell.worldBar.home, href: '/' }}
            crumbs={[{ label: STUDIES.name, href: studiesPath() }]}
          />
          {/* Only reachable here while closed if the viewer may see work in progress (lib/world.ts). */}
          {isUnderConstruction('studies') && <ConstructionNotice />}
          <StudiesHeader />
        </>
      }
      footer={<StudiesFooter />}
    >
      {children}
    </SiteShell>
  )
}
