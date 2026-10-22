import { SiteShell } from '@/components/ui'
import { CHAPEL } from '@/lib/chapel-content'
import { identityFonts } from '@/lib/fonts'
import { ChapelFooter } from './chapel-footer'
import { ChapelHeader } from './chapel-header'

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
      header={<ChapelHeader />}
      footer={<ChapelFooter />}
    >
      {children}
    </SiteShell>
  )
}
