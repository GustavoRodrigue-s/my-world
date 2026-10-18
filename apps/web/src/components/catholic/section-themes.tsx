import type { Category } from '@my-world/types'
import { Heading, Section, SectionHeader } from '@/components/ui'
import { ThemeCard } from './theme-card'

interface Props {
  categories: Category[]
}

export function SectionThemes({ categories }: Props) {
  return (
    <Section bg="cream">
      <SectionHeader>
        <Heading as="h2" level="h2">Navegar por Tema</Heading>
      </SectionHeader>

      {/* Grid: 4 cols desktop → 2 tablet → 1 mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <ThemeCard
            key={cat.id}
            name={cat.name}
            description={cat.description ?? ''}
            icon={cat.icon ?? ''}
            slug={cat.slug}
            articleCount={cat.articleCount}
          />
        ))}
      </div>
    </Section>
  )
}
