import { PortfolioHome } from '@/components/portfolio'
import { buildPortfolioPageMetadata } from '@/lib/generate-metadata'

export const metadata = buildPortfolioPageMetadata('en', 'portfolio')

export default function PortfolioPage() {
  return <PortfolioHome locale="en" />
}
