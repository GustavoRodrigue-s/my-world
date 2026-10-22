'use client'

import { useState } from 'react'
import { Chip, EntryList, Text } from '@/components/ui'
import type { StudyEntry } from './study-entry'

interface StudyIndexProps {
  entries: StudyEntry[]
  categories: Array<{ slug: string; name: string }>
  labels: { filterLabel: string; all: string; empty: string }
}

/** Every study, with the themes as filter chips. */
export function StudyIndex({ entries, categories, labels }: StudyIndexProps) {
  const [active, setActive] = useState<string | null>(null)
  const shown = active ? entries.filter((e) => e.category === active) : entries

  return (
    <>
      <div role="group" aria-label={labels.filterLabel} className="mb-8 flex flex-wrap justify-center gap-2">
        <Chip variant="stone" pressed={active === null} onClick={() => setActive(null)}>
          {labels.all}
        </Chip>
        {categories.map((c) => (
          <Chip key={c.slug} variant="stone" pressed={active === c.slug} onClick={() => setActive(c.slug)}>
            {c.name}
          </Chip>
        ))}
      </div>
      {shown.length > 0 ? (
        <EntryList items={shown} />
      ) : (
        <Text size="lg" color="muted" className="py-10 text-center">
          {labels.empty}
        </Text>
      )}
    </>
  )
}
