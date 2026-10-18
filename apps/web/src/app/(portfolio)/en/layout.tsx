import { PortfolioShell } from '@/components/portfolio'
import { buildPortfolioLayoutMetadata } from '@/lib/generate-metadata'

export const metadata = buildPortfolioLayoutMetadata('en')

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PortfolioShell locale="en">{children}</PortfolioShell>
}
