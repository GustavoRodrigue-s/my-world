import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import '@my-world/design-system/css/studies.css'
import '@my-world/ui/css/identity.css'
import { Emphasis, Heading, PageIntro, SiteShell, StatusTag, Text, buttonClasses, cx } from '@/components/ui'
import { StudiesScaffold } from '@/components/studies'
import { STUDIES } from '@/lib/studies-content'
import { identityFonts } from '@/lib/fonts'

// Served by the middleware at every /studies URL while Estudos is closed (lib/world.ts).
export const metadata: Metadata = {
  title: { absolute: STUDIES.construction.meta.title },
  description: STUDIES.construction.meta.description,
  robots: { index: false, follow: true },
  icons: { icon: '/brand/mark-seed.svg' },
}

export default function StudiesUnderConstruction() {
  const { construction } = STUDIES
  return (
    <SiteShell
      env="studies"
      lang="pt-BR"
      motion="still"
      className={identityFonts}
      skipLabel={STUDIES.shell.skipLink}
      header={null}
      footer={null}
    >
      <div className="flex min-h-dvh flex-col justify-center">
        <PageIntro
          labelledBy="construction-title"
          ornament={
            <div className="flex flex-col items-center gap-7">
              <StudiesScaffold title={construction.drawing} />
              <StatusTag tone="open">{construction.status}</StatusTag>
            </div>
          }
          label={STUDIES.name}
          actions={
            <Link href="/" className={cx(buttonClasses({ variant: 'rubric', size: 'none' }), 'h-12 px-5 text-base')}>
              {construction.back}
              <ArrowRight size={16} strokeWidth={1.6} aria-hidden />
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
