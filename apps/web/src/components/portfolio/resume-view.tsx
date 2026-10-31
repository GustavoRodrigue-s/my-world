import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PrintButton, Text } from '@/components/ui'
import { getContent } from '@/lib/portfolio-content'
import { localePath, type Locale } from '@/lib/portfolio-locale'
import { ResumeSheet } from './resume-sheet'

/** /portfolio/resume and /en/portfolio/resume. */
export function ResumeView({ locale }: { locale: Locale }) {
  const { resume } = getContent(locale)
  return (
    <div className="px-gutter md:px-gutter-wide py-10 md:py-16 print:p-0">
      <div className="mx-auto mb-8 flex max-w-6xl flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href={localePath(locale, '/portfolio')}
          className="inline-flex items-center gap-2 font-sans text-sm text-foreground-muted no-underline transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-icon-md" aria-hidden />
          {resume.back}
        </Link>
        <div className="flex items-center gap-4">
          <Text as="span" family="mono" size="xs" color="muted" className="hidden sm:inline">
            {resume.printNote}
          </Text>
          <PrintButton label={resume.print} />
        </div>
      </div>
      <ResumeSheet locale={locale} />
    </div>
  )
}
