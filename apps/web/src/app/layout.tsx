import type { Metadata } from 'next'
import { identityFonts } from '@/lib/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  // Fallbacks only: each environment's layout sets its own title, description and site name.
  title: {
    template: '%s — Gustavo Rodrigues',
    default: 'Gustavo Rodrigues',
  },
  description: 'Gustavo Rodrigues Fabiano — engenheiro de software e IA. Portfólio, projetos e blog.',
  openGraph: {
    siteName: 'Gustavo Rodrigues',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Restores a stored day/night choice before first paint. Every environment's
// generated theme reacts to <html data-theme>; the choice is shared by all.
const THEME_INIT = `try{var t=localStorage.getItem('gustavo:theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={identityFonts} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
