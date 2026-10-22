import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Byline, CrossPattee, Emphasis, Heading, OrnamentRule, PageIntro, Quote, Section, Text, buttonClasses, cx } from '@/components/ui'
import { PageBody } from '@/components/chapel'
import { CHAPEL, chapelPath } from '@/lib/chapel-content'
import { PORTRAIT_SRC } from '@/lib/portfolio-content'

export const metadata: Metadata = {
  title: 'Sobre',
  description: CHAPEL.about.sections[0].paragraphs[0],
  alternates: { canonical: chapelPath('/about') },
}

export default function AboutPage() {
  const t = CHAPEL.about
  return (
    <>
      <PageIntro
        labelledBy="about-title"
        ornament={<CrossPattee size={16} />}
        label={t.label}
        footer={
          <Byline
            plain
            frame="arch"
            centered
            name={CHAPEL.author}
            role={CHAPEL.home.author.role}
            portrait={PORTRAIT_SRC ? { src: PORTRAIT_SRC, alt: `Retrato de ${CHAPEL.author}`, priority: true } : undefined}
          />
        }
      >
        <Heading as="h1" id="about-title" level="serif-statement" className="max-w-[14ch]">
          {t.statement.before} <Emphasis fit="serif">{t.statement.emphasis}</Emphasis>
          {t.statement.after}
        </Heading>
      </PageIntro>

      <PageBody narrow>
        <div className="flex flex-col gap-6">
          {t.sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-6">
              {section.title && (
                <Heading as="h2" level="serif-subtitle" className="mt-8">
                  {section.title}
                </Heading>
              )}
              {section.paragraphs.map((p) => (
                <Text key={p} size="lg" color="foreground" leading="relaxed" className="max-w-[68ch]">
                  {p}
                </Text>
              ))}
            </div>
          ))}
          <OrnamentRule className="my-8" />
          <Text size="lg" color="foreground" leading="relaxed" className="max-w-[68ch]">
            {t.thread.before} <em className="font-serif text-[1.15em] text-accent italic">{t.thread.motto}</em> {t.thread.after}
          </Text>
        </div>
      </PageBody>

      <Section bg="alt-1" aria-label={t.quote.source}>
        <Quote size="display" text={`“${t.quote.text}”`} source={t.quote.source} />
        <div className="mt-12 flex justify-center">
          <Link href={chapelPath('/articles')} className={cx(buttonClasses({ variant: 'rubric', size: 'none' }), 'h-12 px-5 text-[15px]')}>
            {t.cta}
            <ArrowRight size={16} strokeWidth={1.6} aria-hidden />
          </Link>
        </div>
      </Section>
    </>
  )
}
