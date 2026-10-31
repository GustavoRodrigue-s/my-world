import type { Metadata } from 'next'
import '@my-world/design-system/css/portfolio.css'
import '@my-world/ui/css/identity.css'
import { WorldShell } from '@/components/world'
import { WORLD } from '@/lib/world-content'

// The world's home wears the master brand (the portfolio's palette) in its own frame.
export const metadata: Metadata = {
  title: { absolute: WORLD.meta.title },
  description: WORLD.meta.description,
  alternates: { canonical: '/' },
  openGraph: { siteName: WORLD.name, title: WORLD.meta.title, description: WORLD.meta.description, locale: 'pt_BR', type: 'website' },
  icons: { icon: '/brand/favicon.svg' },
}

export default function WorldLayout({ children }: { children: React.ReactNode }) {
  return <WorldShell>{children}</WorldShell>
}
