'use client'

import Link from 'next/link'
import { Clock } from 'lucide-react'
import type { ArticleCard as ArticleCardType } from '@my-world/types'
import { Card, CardBody, Eyebrow, Heading, Text } from '@/components/ui'
import { formatDate } from '@/lib/utils'

/* ── Inline SVG icons matching the reference ────────────────────────────── */
function IconCross() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="rgba(176,141,87,0.4)" strokeWidth="1" />
      <path d="M24 12 L24 36 M14 22 L34 22" stroke="rgba(176,141,87,0.6)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconBook() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="14" y="10" width="20" height="28" rx="1" stroke="rgba(176,141,87,0.5)" strokeWidth="1.5" />
      <path d="M18 18 L30 18 M18 22 L30 22 M18 26 L24 26" stroke="rgba(176,141,87,0.4)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function IconCandle() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 10 L24 38 M16 18 L32 18" stroke="rgba(176,141,87,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="24" cy="10" r="3" stroke="rgba(176,141,87,0.5)" strokeWidth="1.5" />
    </svg>
  )
}

function IconGeneric() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="14" y="14" width="20" height="20" rx="2" stroke="rgba(176,141,87,0.4)" strokeWidth="1.5" />
      <path d="M24 18 L24 30 M18 24 L30 24" stroke="rgba(176,141,87,0.5)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

type BgIcon = { bg: string; Icon: () => React.ReactElement }

// Per-category gradient backgrounds — dynamic computed values, inline style is intentional
const CATEGORY_STYLE: Record<string, BgIcon> = {
  espiritualidade: { bg: 'linear-gradient(135deg, #12100C 0%, #1E1A14 100%)', Icon: IconCross },
  santos:          { bg: 'linear-gradient(135deg, #16201a 0%, #24332a 100%)',  Icon: IconBook },
  liturgia:        { bg: 'linear-gradient(135deg, #241a0c 0%, #3a2c14 100%)',  Icon: IconCandle },
  teologia:        { bg: 'linear-gradient(135deg, #1c140e 0%, #2e2216 100%)',  Icon: IconCross },
  filosofia:       { bg: 'linear-gradient(135deg, #16201a 0%, #24332a 100%)',  Icon: IconBook },
  'vida-moral':    { bg: 'linear-gradient(135deg, #12201c 0%, #1e332c 100%)',  Icon: IconGeneric },
}

interface Props {
  article: ArticleCardType
}

export function ArticleCard({ article }: Props) {
  const slug = article.category?.slug ?? ''
  const { bg, Icon } = CATEGORY_STYLE[slug] ?? { bg: 'linear-gradient(135deg, #12100C 0%, #1E1A14 100%)', Icon: IconGeneric }

  return (
    <Link href={`/articles/${article.slug}`} className="no-underline flex flex-col">
      <Card className="flex flex-col flex-1">
        {/* Image area — gradient bg is dynamic per category, inline style is intentional */}
        <div
          className="h-[140px] flex items-center justify-center overflow-hidden"
          style={{ background: bg }}
        >
          <Icon />
        </div>

        <CardBody>
          {article.category && (
            <Eyebrow className="mb-2">{article.category.name}</Eyebrow>
          )}

          <Heading
            as="h3"
            level="h3"
            color="primary"
            className="text-[19px] mb-[10px] leading-[1.3]"
          >
            {article.title}
          </Heading>

          <Text
            size="md"
            color="muted"
            weight="light"
            leading="relaxed"
            className="text-[13.5px] mb-4 flex-1"
          >
            {article.summary}
          </Text>

          {/* Meta */}
          <div className="flex items-center gap-3 font-sans text-[11.5px] text-subtle border-t border-border pt-3">
            <Clock size={13} strokeWidth={1.5} />
            <span>{article.readingTime} min</span>
            <span>·</span>
            {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
