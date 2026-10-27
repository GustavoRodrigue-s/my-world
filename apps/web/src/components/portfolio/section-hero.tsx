import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Byline, Emphasis, Heading, Plate, Text, TitleBlock, buttonClasses, cx } from '@/components/ui'
import { PORTRAIT_SRC, getContent, type Locale } from '@/lib/portfolio-content'
import { localePath } from '@/lib/portfolio-locale'
import { WorldFigure } from './world-figure'

export function SectionHero({ locale }: { locale: Locale }) {
  const { hero, profile, about } = getContent(locale)
  const { statement } = hero

  return (
    <Plate
      labelledBy="hero-title"
      rubric={hero.rubric}
      corner={profile.coordinates}
      figure={
        <figure className="mx-auto w-full max-w-2xl">
          <WorldFigure labels={hero.figure} />
          <figcaption className="mt-5 border-t border-border pt-4">
            <Text family="mono" size="xs" color="muted">
              {hero.caption}
            </Text>
            <ol className="mt-3 grid list-none gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {hero.legend.map((item) => (
                <li key={item.n} className="flex gap-2.5">
                  <Text as="span" family="mono" size="sm" color="primary">
                    {item.n}
                  </Text>
                  <Text as="span" size="sm" color="muted" leading="snug">
                    <span className="text-foreground">{item.name}</span> — {item.text}
                  </Text>
                </li>
              ))}
            </ol>
          </figcaption>
        </figure>
      }
      footer={
        <TitleBlock
          items={[
            { label: hero.titleBlock.work, value: 'Mundo do Gustavo' },
            { label: hero.titleBlock.author, value: 'Gustavo R. Fabiano' },
            { label: hero.titleBlock.place, value: profile.city },
            { label: hero.titleBlock.coordinates, value: profile.coordinates },
            { label: hero.titleBlock.timezone, value: profile.timezone },
            { label: hero.titleBlock.revision, value: profile.revision },
          ]}
        />
      }
    >
      {/* Face, name and role in the first frame; small, so the H1 stays the largest paint. */}
      <Byline
        name={profile.name}
        role={hero.kicker}
        portrait={PORTRAIT_SRC ? { src: PORTRAIT_SRC, alt: about.portraitAlt, priority: true } : undefined}
      />
      <Heading as="h1" id="hero-title" level="display" className="mt-7 max-w-5xl">
        {statement.before} <Emphasis>{statement.emphasis}</Emphasis>
        {statement.after}
      </Heading>
      <Text size="lead" color="muted" leading="relaxed" className="mt-6 max-w-3xl">
        {hero.lead}
      </Text>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Link href={localePath(locale, '/portfolio/resume')} className={cx(buttonClasses({ variant: 'ink', size: 'none' }), 'h-12 px-5 text-base')}>
          {hero.ctaResume}
          <ArrowRight size={16} strokeWidth={1.6} aria-hidden />
        </Link>
        <Link href="#artifacts" className={cx(buttonClasses({ variant: 'quiet', size: 'none' }), 'text-base')}>
          {hero.ctaArtifacts}
          <ArrowDown size={15} strokeWidth={1.6} aria-hidden />
        </Link>
      </div>
    </Plate>
  )
}
