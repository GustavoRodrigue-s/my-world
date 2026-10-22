import type { Metadata } from 'next'
import '@my-world/ui/css/themes/chapel.css'
import '@my-world/ui/css/identity.css'
import { ChapelShell } from '@/components/chapel'
import { CHAPEL } from '@/lib/chapel-content'

export const metadata: Metadata = {
  title: { template: `%s — ${CHAPEL.name}`, default: CHAPEL.meta.title },
  description: CHAPEL.meta.description,
  openGraph: { siteName: CHAPEL.name, locale: 'pt_BR', type: 'website' },
  icons: { icon: '/brand/mark-star.svg' },
}

export default function ChapelLayout({ children }: { children: React.ReactNode }) {
  return <ChapelShell>{children}</ChapelShell>
}
