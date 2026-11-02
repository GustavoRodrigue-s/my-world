import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import '@my-world/design-system/css/blog.css'
import '@my-world/ui/css/identity.css'
import { Emphasis, Heading, PageIntro, SiteShell, StatusTag, Text, buttonClasses, cx } from '@/components/ui'
import { BlogScaffold } from '@/components/blog'
import { WorldFooter } from '@/components/world/world-footer'
import { BLOG } from '@/lib/blog-content'
import { identityFonts } from '@/lib/fonts'

// Served by the middleware at every /blog URL while the Blog is closed (lib/world.ts).
export const metadata: Metadata = {
  title: { absolute: BLOG.construction.meta.title },
  description: BLOG.construction.meta.description,
  robots: { index: false, follow: true },
  icons: { icon: '/brand/mark-seed.svg' },
}

export default function BlogUnderConstruction() {
  const { construction } = BLOG
  return (
    <SiteShell
      env="blog"
      lang="pt-BR"
      motion="still"
      className={identityFonts}
      skipLabel={BLOG.shell.skipLink}
      header={null}
      footer={<WorldFooter locale="pt" />}
    >
      <div className="flex min-h-dvh flex-col justify-center">
        <PageIntro
          labelledBy="construction-title"
          ornament={
            <div className="flex flex-col items-center gap-7">
              <BlogScaffold title={construction.drawing} />
              <StatusTag tone="open">{construction.status}</StatusTag>
            </div>
          }
          label={BLOG.name}
          actions={
            <Link href="/" className={cx(buttonClasses({ variant: 'rubric', size: 'none' }), 'h-12 px-5 text-base')}>
              {construction.back}
              <ArrowRight className="size-icon-md" aria-hidden />
            </Link>
          }
        >
          <Heading as="h1" id="construction-title" level="display" className="max-w-4xl">
            {construction.statement.before} <Emphasis>{construction.statement.emphasis}</Emphasis>
            {construction.statement.after}
          </Heading>
          <Text size="lead" color="muted" leading="relaxed" className="mt-7 max-w-3xl">
            {construction.lead}
          </Text>
        </PageIntro>
      </div>
    </SiteShell>
  )
}
