import Link from 'next/link'
import { Heading, Mark, StatusTag, Text, buttonClasses, cx } from '@/components/ui'
import { CHAPEL } from '@/lib/chapel-content'
import { canEnter } from '@/lib/world'
import '@my-world/design-system/css/portfolio.css'
import '@my-world/ui/css/identity.css'

// Outside every environment, so it wears the master brand.
export default function NotFound() {
  return (
    <div data-env="portfolio" className="flex min-h-dvh items-center bg-surface px-gutter md:px-gutter-wide text-foreground">
      <main className="section-inner w-full py-20">
        <Mark size={48} className="text-foreground" />
        <Text family="mono" size="xs" color="primary" className="mt-8">
          ¶ 404 — fora de órbita
        </Text>
        <Heading as="h1" level="headline" className="mt-4 max-w-[18ch]">
          Esta página não existe.
        </Heading>
        <Text size="lg" color="muted" className="mt-5">
          Page not found.
        </Text>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className={cx(buttonClasses({ variant: 'ink', size: 'none' }), 'h-11 px-4 text-md')}>
            Mundo do Gustavo
          </Link>
          <Link href="/portfolio" className={cx(buttonClasses({ variant: 'line', size: 'none' }), 'h-11 px-4 text-md')}>
            Portfólio
          </Link>
          {canEnter('chapel') ? (
            <Link href="/chapel" className={cx(buttonClasses({ variant: 'line', size: 'none' }), 'h-11 px-4 text-md')}>
              {CHAPEL.name}
            </Link>
          ) : (
            // Still being built (lib/world.ts): the door is drawn, dashed, and closed.
            <span className="inline-flex h-11 items-center gap-2.5 rounded-xs border border-dashed border-border-strong px-4 font-sans text-md text-foreground-muted">
              {CHAPEL.name}
              <StatusTag tone="open">{CHAPEL.construction.status}</StatusTag>
            </span>
          )}
        </div>
      </main>
    </div>
  )
}
