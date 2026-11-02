import type { Metadata } from 'next'
import '@my-world/design-system/css/blog.css'
import '@my-world/ui/css/identity.css'
import { BlogShell } from '@/components/blog'
import { BLOG } from '@/lib/blog-content'

export const metadata: Metadata = {
  title: { template: `%s — ${BLOG.name}`, default: BLOG.meta.title },
  description: BLOG.meta.description,
  openGraph: { siteName: BLOG.name, locale: 'pt_BR', type: 'website' },
  icons: { icon: '/brand/mark-seed.svg' },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <BlogShell>{children}</BlogShell>
}
