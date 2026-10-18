import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Text } from '@/components/ui'
import { getContent } from '@/lib/portfolio-content'
import { localePath, type Locale } from '@/lib/portfolio-locale'
import { PrintButton } from './print-button'
import { ResumeSheet } from './resume-sheet'

/** /portfolio/resume and /en/portfolio/resume. */
export function ResumeView({ locale }: { locale: Locale }) {
  const { resume } = getContent(locale)
  return (
    <div className="px-[var(--spacing-section-x)] py-10 md:py-16 print:p-0">
      <div className="mx-auto mb-8 flex max-w-[860px] flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href={localePath(locale, '/portfolio')}
          className="inline-flex items-center gap-2 font-sans text-[14px] text-muted no-underline transition-colors hover:text-foreground"
        >
          <ArrowLeft size={15} strokeWidth={1.5} aria-hidden />
          {resume.back}
        </Link>
        <div className="flex items-center gap-4">
          <Text as="span" family="mono" size="sm" color="muted" className="hidden sm:inline">
            {resume.printNote}
          </Text>
          <PrintButton label={resume.print} />
        </div>
      </div>
      <ResumeSheet locale={locale} />
    </div>
  )
}
