import { Cormorant_Garamond, Inter } from 'next/font/google'

// Loaded by the root layout (every environment). Exported so an environment
// can re-declare a variable on its own wrapper, e.g. the portfolio re-applies
// `--font-serif` because a leftover catholic.css `:root` rule could shadow it.
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
})

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
})
