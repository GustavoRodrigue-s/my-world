import type { Metadata } from 'next'
import { cormorant, inter } from '@/lib/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    template: '%s | Capela de Estudos',
    default: 'Capela de Estudos',
  },
  description: 'Uma biblioteca de estudos sobre espiritualidade católica, teologia e filosofia.',
  openGraph: {
    siteName: 'Capela de Estudos',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Restores a stored day/night choice before first paint. Only environments
// whose generated theme has a dark block react to <html data-theme> (today:
// portfolio); the catholic environment is light-only and ignores it.
const THEME_INIT = `try{var t=localStorage.getItem('gustavo:theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
