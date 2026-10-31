import type { Metadata } from 'next'
import '@my-world/design-system/css/studies.css'
import '@my-world/ui/css/identity.css'
import { StudiesShell } from '@/components/studies'
import { STUDIES } from '@/lib/studies-content'

export const metadata: Metadata = {
  title: { template: `%s — ${STUDIES.name}`, default: STUDIES.meta.title },
  description: STUDIES.meta.description,
  openGraph: { siteName: STUDIES.name, locale: 'pt_BR', type: 'website' },
  icons: { icon: '/brand/mark-seed.svg' },
}

export default function StudiesLayout({ children }: { children: React.ReactNode }) {
  return <StudiesShell>{children}</StudiesShell>
}
