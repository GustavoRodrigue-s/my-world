'use client'

import Link from 'next/link'
import { Flame, Star, Church, Brain, BookOpen, Heart } from 'lucide-react'
import { Heading, Text } from '@/components/ui'

type IconComponent = React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>

const CATEGORY_ICONS: Record<string, IconComponent> = {
  espiritualidade: Flame,
  santos:          Star,
  liturgia:        Church,
  teologia:        Brain,
  filosofia:       BookOpen,
  'vida-moral':    Heart,
}

interface Props {
  name: string
  description: string
  icon: string
  slug: string
  articleCount?: number
}

export function ThemeCard({ name, slug, articleCount }: Props) {
  const Icon = CATEGORY_ICONS[slug] ?? BookOpen

  return (
    <Link
      href={`/categories/${slug}`}
      className="group flex flex-col items-center p-7 px-4 text-center no-underline bg-surface border border-border rounded-card transition-all duration-[280ms] ease-out hover:bg-primary hover:border-primary hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(176,141,87,0.22)] cursor-pointer"
    >
      {/* Icon box */}
      <div className="w-10 h-10 flex items-center justify-center mb-[14px] border border-accent-border rounded-sm transition-all duration-[280ms] ease-out group-hover:border-on-primary/30 group-hover:scale-110">
        <Icon size={18} strokeWidth={1.5} className="text-accent group-hover:text-on-primary transition-colors duration-[280ms] ease-out" />
      </div>

      {/* Name */}
      <Heading
        as="p"
        level="h4"
        className="text-[15px] mb-1 transition-colors duration-[280ms] ease-out group-hover:text-on-primary"
      >
        {name}
      </Heading>

      {/* Count */}
      {articleCount !== undefined && (
        <Text
          as="span"
          size="sm"
          weight="light"
          color="subtle"
          className="text-[12px] transition-colors duration-[280ms] ease-out group-hover:text-on-primary-muted"
        >
          {articleCount} {articleCount === 1 ? 'estudo' : 'estudos'}
        </Text>
      )}
    </Link>
  )
}
