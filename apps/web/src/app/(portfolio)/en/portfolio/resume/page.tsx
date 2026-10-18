import { ResumeView } from '@/components/portfolio'
import { buildPortfolioPageMetadata } from '@/lib/generate-metadata'

export const metadata = buildPortfolioPageMetadata('en', 'resume')

export default function ResumePage() {
  return <ResumeView locale="en" />
}
