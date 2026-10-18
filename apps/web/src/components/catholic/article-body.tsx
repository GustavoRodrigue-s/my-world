import type { Article } from '@my-world/types'
import { formatDate, formatReadingTime } from '@/lib/utils'
import { Eyebrow, Heading, Text, Badge } from '@/components/ui'
import { Breadcrumb } from './breadcrumb'

interface Props {
  article: Article
}

export function ArticleBody({ article }: Props) {
  const blocks = article.content
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean)

  return (
    <article>
      {/* Hero — navy bg */}
      <div className="bg-primary px-[var(--spacing-section-x)] pt-[72px] pb-16">
        <div className="article-inner">
          <div className="mb-6">
            <Breadcrumb
              dark
              items={[
                { label: 'Estudos', href: '/articles' },
                { label: article.title },
              ]}
            />
          </div>

          {article.category && (
            <Eyebrow className="mb-4">{article.category.name}</Eyebrow>
          )}

          <Heading
            as="h1"
            level="h1"
            color="on-dark"
            className="text-[clamp(28px,4vw,44px)] font-medium leading-[1.2] mb-5"
          >
            {article.title}
          </Heading>

          <Text
            color="on-dark-muted"
            weight="light"
            leading="relaxed"
            className="text-[15px] mb-6"
          >
            {article.summary}
          </Text>

          <div className="flex items-center gap-3 font-sans text-[12px] text-on-primary-muted">
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-on-accent font-bold text-[10px]">
              GR
            </div>
            <span>Gustavo R. Fabiano</span>
            <span>·</span>
            {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
            <span>·</span>
            <span>{formatReadingTime(article.readingTime)}</span>
          </div>
        </div>
      </div>

      {/* Body — white bg */}
      <div className="bg-surface px-[var(--spacing-section-x)] pt-14 pb-20">
        <div className="article-inner flex flex-col gap-5">
          {blocks.map((block, i) => {
            if (block.startsWith('## ')) {
              return (
                <Heading key={i} as="h2" level="h3" className="text-[24px] font-medium mt-4 leading-[1.25]">
                  {block.slice(3)}
                </Heading>
              )
            }
            if (block.startsWith('> ')) {
              return (
                <blockquote
                  key={i}
                  className="bg-surface-alt-1 border-l-[3px] border-accent-border rounded-md px-6 py-5 font-serif italic text-[17px] text-muted leading-[1.6]"
                >
                  {block.slice(2)}
                </blockquote>
              )
            }

            const parts = block.split(/(\*[^*]+\*)/)
            return (
              <p key={i} className="font-sans text-[17px] font-light text-foreground leading-[1.85]">
                {parts.map((part, j) =>
                  part.startsWith('*') && part.endsWith('*')
                    ? <em key={j}>{part.slice(1, -1)}</em>
                    : part
                )}
              </p>
            )
          })}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="article-inner mt-12 pt-8 border-t border-border flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag.id}>{tag.name}</Badge>
            ))}
          </div>
        )}

        {/* References */}
        {article.references && article.references.length > 0 && (
          <div className="article-inner mt-10">
            <Eyebrow className="mb-3 text-subtle">Referências</Eyebrow>
            <ul className="pl-4 flex flex-col gap-1.5 list-disc">
              {article.references.map((ref, i) => (
                <li key={i}>
                  <Text as="span" size="md" weight="light" color="muted" className="text-[13px]">
                    {ref}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}
