import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import '@my-world/design-system/css/chapel.css'
import '@my-world/ui/css/identity.css'
import { Emphasis, Heading, PageIntro, SiteShell, StatusTag, Text, buttonClasses, cx } from '@/components/ui'
import { ChapelScaffold } from '@/components/chapel'
import { CHAPEL } from '@/lib/chapel-content'
import { identityFonts } from '@/lib/fonts'

// Served by the middleware at every /chapel URL while the Capela is closed (lib/world.ts).
export const metadata: Metadata = {
  title: { absolute: CHAPEL.construction.meta.title },
  description: CHAPEL.construction.meta.description,
  robots: { index: false, follow: true },
  icons: { icon: '/brand/mark-star.svg' },
}

export default function ChapelUnderConstruction() {
  const { construction } = CHAPEL
  return (
    <SiteShell
      env="chapel"
      lang="pt-BR"
      motion="still"
      className={identityFonts}
      skipLabel={CHAPEL.shell.skipLink}
      header={null}
      footer={null}
    >
      <div className="flex min-h-dvh flex-col justify-center">
        <PageIntro
          labelledBy="construction-title"
          ornament={
            <div className="flex flex-col items-center gap-7">
              <ChapelScaffold title={construction.drawing} className="text-foreground" />
              <StatusTag tone="open">{construction.status}</StatusTag>
            </div>
          }
          label={CHAPEL.name}
          actions={
            <Link href="/" className={cx(buttonClasses({ variant: 'rubric', size: 'none' }), 'h-12 px-5 text-base')}>
              {construction.back}
              <ArrowRight size={16} strokeWidth={1.6} aria-hidden />
            </Link>
          }
          footer={
            <Text family="serif" size="lead" color="foreground" leading="normal" className="max-w-[34ch] italic">
              {construction.verse.text}{' '}
              <Text as="span" family="mono" size="xs" color="muted" className="not-italic">
                {construction.verse.source}
              </Text>
            </Text>
          }
        >
          <Heading as="h1" id="construction-title" level="display-serif" className="max-w-[18ch]">
            {construction.statement.before} <Emphasis fit="serif">{construction.statement.emphasis}</Emphasis>
            {construction.statement.after}
          </Heading>
          <Text size="lead" color="muted" leading="relaxed" className="mt-7 max-w-[46ch]">
            {construction.lead}
          </Text>
        </PageIntro>
      </div>
    </SiteShell>
  )
}
