import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Heading, Text } from '@/components/ui'

export function SectionHero() {
  return (
    <section className="bg-primary px-[var(--spacing-section-x)] pt-20 pb-[72px] text-center relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(176,141,87,0.05) 60px, rgba(176,141,87,0.05) 61px),
            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(176,141,87,0.05) 60px, rgba(176,141,87,0.05) 61px)
          `,
        }}
      />

      <div className="section-inner relative">

        {/* Eyebrow with decorative lines */}
        <div className="flex items-center justify-center gap-4 mb-7">
          <span className="inline-block w-12 h-px bg-accent opacity-40" />
          <span className="font-serif text-[13px] tracking-[0.22em] uppercase text-accent">
            Estudos Espirituais
          </span>
          <span className="inline-block w-12 h-px bg-accent opacity-40" />
        </div>

        {/* H1 */}
        <Heading
          as="h1"
          level="display"
          color="on-dark"
          className="font-light max-w-[640px] mx-auto mb-5 leading-[1.2] tracking-[0.01em]"
        >
          Conhecimento para ordenar a{' '}
          <em className="not-italic italic text-accent-hover">
            inteligência a Deus.
          </em>
        </Heading>

        {/* Subtitle */}
        <Text
          color="on-dark-muted"
          weight="light"
          leading="relaxed"
          className="text-[15px] tracking-[0.04em] max-w-[480px] mx-auto mb-10"
        >
          Uma biblioteca de estudos sobre espiritualidade católica, teologia e filosofia.
          Para quem busca profundidade, não superfície.
        </Text>

        {/* CTA */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-[10px] bg-transparent border border-accent text-accent-hover font-sans text-[12px] tracking-[0.14em] uppercase px-8 py-[14px] rounded-pill font-normal no-underline transition-[background,color] duration-200 hover:bg-accent hover:text-on-accent"
        >
          <BookOpen size={14} strokeWidth={1.5} />
          Explorar Estudos
        </Link>
      </div>
    </section>
  )
}
