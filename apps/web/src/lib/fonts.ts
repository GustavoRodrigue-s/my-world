import { Bricolage_Grotesque, Cormorant_Garamond, IBM_Plex_Mono } from 'next/font/google'

// The identity's three voices, shared by every environment. <SiteShell>
// re-declares them on its wrapper (via `identityFonts`) so they win over the
// fallback stacks a theme writes on :root.

// "Bricolage" is French for tinkering at the workbench — headings and text.
export const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  axes: ['opsz'],
})

// The one word that matters per statement (<Emphasis>), in the accent color.
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
})

// The annotation hand: captions, rubrics, specs.
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const identityFonts = `${bricolage.variable} ${cormorant.variable} ${plexMono.variable}`
