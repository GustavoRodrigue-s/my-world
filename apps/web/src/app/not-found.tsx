import Link from 'next/link'
import { Heading, Mark, Text, buttonClasses, cx } from '@/components/ui'
import '@my-world/ui/css/themes/portfolio.css'
import '@my-world/ui/css/identity.css'

// Outside every environment, so it wears the master brand.
export default function NotFound() {
  return (
    <div data-env="portfolio" className="flex min-h-dvh items-center bg-surface px-[var(--spacing-section-x)] text-foreground">
      <main className="section-inner w-full py-20">
        <Mark size={48} className="text-foreground" />
        <Text family="mono" size="sm" color="accent" className="mt-8">
          ¶ 404 — fora de órbita
        </Text>
        <Heading as="h1" level="title" className="mt-4 max-w-[18ch]">
          Esta página não existe.
        </Heading>
        <Text size="lg" color="muted" className="mt-5">
          Page not found.
        </Text>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/portfolio" className={cx(buttonClasses({ variant: 'ink', size: 'none' }), 'h-11 px-4 text-[14px]')}>
            Mundo do Gustavo
          </Link>
          <Link href="/chapel" className={cx(buttonClasses({ variant: 'line', size: 'none' }), 'h-11 px-4 text-[14px]')}>
            Capela de Estudos
          </Link>
        </div>
      </main>
    </div>
  )
}
