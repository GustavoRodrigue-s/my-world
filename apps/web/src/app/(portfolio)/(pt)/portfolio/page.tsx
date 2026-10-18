import { PortfolioHome } from '@/components/portfolio'
import { buildPortfolioPageMetadata } from '@/lib/generate-metadata'

export const metadata = buildPortfolioPageMetadata('pt', 'portfolio')

export default function PortfolioPage() {
  return <PortfolioHome locale="pt" />
}
