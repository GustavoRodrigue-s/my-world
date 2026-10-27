import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Emphasis, Heading, Rubric, Section, Text, buttonClasses, cx } from '@/components/ui'
import { getContent, type Locale } from '@/lib/portfolio-content'
import { localePath } from '@/lib/portfolio-locale'

export function SectionContact({ locale }: { locale: Locale }) {
  const { contact, profile, copy } = getContent(locale)
  const { title } = contact
  return (
    <Section id="contact" aria-labelledby="contact-title" className="scroll-mt-bar border-t border-border">
      <div className="grid gap-y-8 lg:grid-cols-[var(--size-width-2xs)_minmax(0,1fr)] lg:gap-x-16">
        <Rubric index="07">{copy.contact.label}</Rubric>
        <div>
          <Heading as="h2" id="contact-title" level="display" className="plot-rise max-w-6xl">
            {title.before} <Emphasis>{title.emphasis}</Emphasis>
            {title.after}
          </Heading>
          <Text size="lead" color="muted" leading="relaxed" className="mt-6 max-w-2xl">
            {contact.text}
          </Text>

          <a
            href={`mailto:${profile.email}`}
            className="group mt-12 inline-flex max-w-full items-center gap-3 border-b border-foreground pb-2 font-sans text-callout text-foreground no-underline transition-colors duration-fast hover:border-primary hover:text-primary"
          >
            <span className="truncate">{profile.email}</span>
            <ArrowRight className="shrink-0 transition-transform duration-normal group-hover:translate-x-1" size={26} strokeWidth={1.4} aria-hidden />
          </a>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={profile.linkedin} target="_blank" rel="me noopener" className={cx(buttonClasses({ variant: 'line', size: 'none' }), 'h-11 px-4 text-sm')}>
              LinkedIn
              <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
            </a>
            <a href={profile.github} target="_blank" rel="me noopener" className={cx(buttonClasses({ variant: 'line', size: 'none' }), 'h-11 px-4 text-sm')}>
              GitHub
              <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
            </a>
            <Link href={localePath(locale, '/portfolio/resume')} className={cx(buttonClasses({ variant: 'ink', size: 'none' }), 'h-11 px-4 text-sm')}>
              {copy.contact.resume}
              <ArrowRight size={15} strokeWidth={1.5} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
