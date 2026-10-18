import { IdentityView } from '@/components/identity'
import { buildPortfolioPageMetadata } from '@/lib/generate-metadata'

export const metadata = buildPortfolioPageMetadata('pt', 'identity')

export default function IdentityPage() {
  return <IdentityView locale="pt" />
}
