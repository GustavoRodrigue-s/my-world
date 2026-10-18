import { IdentityView } from '@/components/identity'
import { buildPortfolioPageMetadata } from '@/lib/generate-metadata'

export const metadata = buildPortfolioPageMetadata('en', 'identity')

export default function IdentityPage() {
  return <IdentityView locale="en" />
}
