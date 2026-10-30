import { SiteShell, WorldBar } from '@/components/ui'
import { CHAPEL, chapelPath } from '@/lib/chapel-content'
import { WorldFooter } from '@/components/world/world-footer'
import { identityFonts } from '@/lib/fonts'
import { isUnderConstruction } from '@/lib/world'
import { ChapelHeader } from './chapel-header'
import { ConstructionNotice } from './construction-notice'

/**
 * Capela — the shared identity in its flat dialect: limewash and
 * stone, ink and the rubric red. Still pages: only hovers and the quote plate move.
 */
export function ChapelShell({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell
      env="chapel"
      lang="pt-BR"
      motion="still"
      className={identityFonts}
      skipLabel={CHAPEL.shell.skipLink}
      header={
        <>
          <WorldBar
            variant="stone"
            label={CHAPEL.shell.worldBar.label}
            home={{ label: CHAPEL.shell.worldBar.home, href: '/' }}
            crumbs={[
              { label: CHAPEL.name, href: chapelPath('') },
              ...CHAPEL.shell.nav.filter((n) => n.path).map((n) => ({ label: n.label, href: chapelPath(n.path) })),
            ]}
          />
          {/* Only reachable here while closed if the viewer may see work in progress (lib/world.ts). */}
          {isUnderConstruction('chapel') && <ConstructionNotice />}
          <ChapelHeader />
        </>
      }
      footer={<WorldFooter locale="pt" insideChapel />}
    >
      {children}
    </SiteShell>
  )
}
