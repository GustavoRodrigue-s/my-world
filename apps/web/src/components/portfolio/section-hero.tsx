import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Emphasis, Heading, Rubric, Text, TitleBlock, buttonClasses, cx } from '@/components/ui'
import { getContent, type Locale } from '@/lib/portfolio-content'
import { localePath } from '@/lib/portfolio-locale'
import { WorldFigure } from './world-figure'

export function SectionHero({ locale }: { locale: Locale }) {
  const { hero, profile } = getContent(locale)
  const { statement } = hero

  return (
    <section aria-labelledby="hero-title" className="px-[var(--spacing-section-x)] pt-10 pb-16 md:pt-14 md:pb-20">
      <div className="section-inner">
        <div className="flex items-baseline justify-between gap-6 border-b border-border pb-4">
          <Rubric index="00">{hero.rubric}</Rubric>
          <Text family="mono" size="sm" color="muted" className="hidden sm:block">
            {profile.coordinates}
          </Text>
        </div>

        <div className="grid items-center gap-x-12 gap-y-10 pt-10 md:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          {/* Text is the page's largest paint; the figure is decoration on top of it. */}
          <div>
            <Text family="mono" size="md" color="muted">
              {profile.name} — {hero.kicker}
            </Text>
            <Heading as="h1" id="hero-title" level="statement" className="mt-6 max-w-[13ch]">
              {statement.before} <Emphasis>{statement.emphasis}</Emphasis>
              {statement.after}
            </Heading>
            <Text size="xl" color="muted" leading="relaxed" className="mt-8 max-w-[46ch]">
              {hero.lead}
            </Text>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href={localePath(locale, '/portfolio/resume')} className={cx(buttonClasses({ variant: 'ink', size: 'none' }), 'h-12 px-5 text-[15px]')}>
                {hero.ctaResume}
                <ArrowRight size={16} strokeWidth={1.6} aria-hidden />
              </Link>
              <Link href="#artifacts" className={cx(buttonClasses({ variant: 'quiet', size: 'none' }), 'text-[15px]')}>
                {hero.ctaArtifacts}
                <ArrowDown size={15} strokeWidth={1.6} aria-hidden />
              </Link>
            </div>
          </div>

          <figure className="mx-auto w-full max-w-[560px]">
            <WorldFigure labels={hero.figure} />
            <figcaption className="mt-5 border-t border-border pt-4">
              <Text family="mono" size="sm" color="muted">
                {hero.caption}
              </Text>
              <ol className="mt-3 grid list-none gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {hero.legend.map((item) => (
                  <li key={item.n} className="flex gap-2.5">
                    <Text as="span" family="mono" size="md" color="accent">
                      {item.n}
                    </Text>
                    <Text as="span" size="md" color="muted" leading="snug">
                      <span className="text-foreground">{item.name}</span> — {item.text}
                    </Text>
                  </li>
                ))}
              </ol>
            </figcaption>
          </figure>
        </div>

        <TitleBlock
          className="mt-14 md:mt-20"
          items={[
            { label: hero.titleBlock.work, value: 'Mundo do Gustavo' },
            { label: hero.titleBlock.author, value: 'Gustavo R. Fabiano' },
            { label: hero.titleBlock.place, value: profile.city },
            { label: hero.titleBlock.coordinates, value: profile.coordinates },
            { label: hero.titleBlock.timezone, value: profile.timezone },
            { label: hero.titleBlock.revision, value: profile.revision },
          ]}
        />
      </div>
    </section>
  )
}
