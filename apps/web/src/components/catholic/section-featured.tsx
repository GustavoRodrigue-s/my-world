import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ArticleCard } from '@my-world/types'
import { Heading, Text, Eyebrow, Section, SectionHeader } from '@/components/ui'
import { formatReadingTime } from '@/lib/utils'

interface Props {
  article: ArticleCard
}

export function SectionFeatured({ article }: Props) {
  return (
    <Section bg="white">
      <SectionHeader>
        <Heading as="h2" level="h2">Estudo em Destaque</Heading>
      </SectionHeader>

      {/* Navy card */}
      <Link
        href={`/articles/${article.slug}`}
        className="no-underline block group"
      >
        <div className="bg-primary border border-border rounded-2xl p-12 grid grid-cols-[1fr_auto] gap-10 items-center transition-[border-color] duration-200 group-hover:border-border-strong">

          {/* Content */}
          <div>
            <Eyebrow className="mb-4">
              {article.category ? article.category.name : 'Espiritualidade'} · {formatReadingTime(article.readingTime)}
            </Eyebrow>

            <Heading
              as="h3"
              level="h1"
              color="on-dark"
              className="font-light text-[clamp(24px,3vw,36px)] leading-[1.25] mb-4"
            >
              {article.title}
            </Heading>

            <Text
              color="on-dark-muted"
              weight="light"
              leading="relaxed"
              className="text-[14px] mb-7 max-w-[460px]"
            >
              {article.summary}
            </Text>

            <span className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.14em] uppercase text-accent-hover border-b border-accent-border pb-0.5 font-semibold">
              Ler o estudo
              <ArrowRight size={12} strokeWidth={1.5} />
            </span>
          </div>

          {/* Decorative † — dynamic repeating pattern, inline style intentional */}
          <div aria-hidden className="select-none">
            <span className="font-serif italic text-[120px] leading-none tracking-[-4px] text-accent/8">
              †
            </span>
          </div>
        </div>
      </Link>
    </Section>
  )
}
