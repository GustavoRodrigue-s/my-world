import { SiteShell } from '@/components/ui'
import { CHAPEL } from '@/lib/chapel-content'
import { identityFonts } from '@/lib/fonts'
import { isUnderConstruction } from '@/lib/world'
import { ChapelFooter } from './chapel-footer'
import { ChapelHeader } from './chapel-header'
import { ConstructionNotice } from './construction-notice'

/**
 * Capela de Estudos — the shared identity in its flat dialect: limewash and
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
          {/* Only reachable here while closed if the viewer may see work in progress (lib/world.ts). */}
          {isUnderConstruction('chapel') && <ConstructionNotice />}
          <ChapelHeader />
        </>
      }
      footer={<ChapelFooter />}
    >
      {children}
    </SiteShell>
  )
}
