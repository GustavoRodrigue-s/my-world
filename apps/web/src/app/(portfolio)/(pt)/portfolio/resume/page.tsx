import { ResumeView } from '@/components/portfolio'
import { buildPortfolioPageMetadata } from '@/lib/generate-metadata'

export const metadata = buildPortfolioPageMetadata('pt', 'resume')

export default function ResumePage() {
  return <ResumeView locale="pt" />
}
