import { SiteShell, WorldBar } from '@/components/ui'
import { WorldFooter } from '@/components/world/world-footer'
import { identityFonts } from '@/lib/fonts'
import { BLOG, blogPath } from '@/lib/blog-content'
import { isUnderConstruction } from '@/lib/world'
import { ConstructionNotice } from './construction-notice'
import { BlogHeader } from './blog-header'

/**
 * Blog — "tinta e lápis" (ADR 0015): the page of a book, ink for what is
 * finished, graphite for what is still in pencil. Plotted like the portfolio.
 */
export function BlogShell({ children }: { children: React.ReactNode }) {
  const { shell } = BLOG
  return (
    <SiteShell
      env="blog"
      lang="pt-BR"
      className={identityFonts}
      skipLabel={shell.skipLink}
      header={
        <>
          <WorldBar
            label={shell.worldBar.label}
            home={{ label: shell.worldBar.home, href: '/' }}
            crumbs={[{ label: BLOG.name, href: blogPath() }]}
          />
          {/* Only reachable here while closed if the viewer may see work in progress (lib/world.ts). */}
          {isUnderConstruction('blog') && <ConstructionNotice />}
          <BlogHeader />
        </>
      }
      footer={<WorldFooter locale="pt" />}
    >
      {children}
    </SiteShell>
  )
}
