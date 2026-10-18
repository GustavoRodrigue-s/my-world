import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Emphasis, Heading, Rubric, Section, Text, buttonClasses, cx } from '@/components/ui'
import { getContent, type Locale } from '@/lib/portfolio-content'
import { localePath } from '@/lib/portfolio-locale'

export function SectionContact({ locale }: { locale: Locale }) {
  const { contact, profile, copy } = getContent(locale)
  const { title } = contact
  return (
    <Section id="contact" aria-labelledby="contact-title" className="scroll-mt-[var(--spacing-nav-h)] border-t border-border">
      <div className="grid gap-y-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-x-16">
        <Rubric index="07">{copy.contact.label}</Rubric>
        <div>
          <Heading as="h2" id="contact-title" level="statement" className="plot-rise max-w-[16ch]">
            {title.before} <Emphasis>{title.emphasis}</Emphasis>
            {title.after}
          </Heading>
          <Text size="xl" color="muted" leading="relaxed" className="mt-6 max-w-[44ch]">
            {contact.text}
          </Text>

          <a
            href={`mailto:${profile.email}`}
            className="group mt-12 inline-flex max-w-full items-center gap-3 border-b border-foreground pb-2 font-sans text-[clamp(18px,3vw,34px)] font-medium tracking-[-0.02em] text-foreground no-underline transition-colors duration-[var(--transition-fast)] hover:border-accent hover:text-accent"
          >
            <span className="truncate">{profile.email}</span>
            <ArrowRight className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" size={26} strokeWidth={1.4} aria-hidden />
          </a>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={profile.linkedin} target="_blank" rel="me noopener" className={cx(buttonClasses({ variant: 'line', size: 'none' }), 'h-11 px-4 text-[14px]')}>
              LinkedIn
              <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
            </a>
            <a href={profile.github} target="_blank" rel="me noopener" className={cx(buttonClasses({ variant: 'line', size: 'none' }), 'h-11 px-4 text-[14px]')}>
              GitHub
              <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
            </a>
            <Link href={localePath(locale, '/portfolio/resume')} className={cx(buttonClasses({ variant: 'ink', size: 'none' }), 'h-11 px-4 text-[14px]')}>
              {copy.contact.resume}
              <ArrowRight size={15} strokeWidth={1.5} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
