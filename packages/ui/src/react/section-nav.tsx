'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Route } from 'next'

interface SectionNavProps {
  label: string
  items: Array<{ label: string; href: string; id: string }>
}

/**
 * Header links to the sections of one long page. The link of the section
 * crossing the reading line (40% down the viewport) is marked as current;
 * sections without a link mark none. For links between pages, use <PageNav>.
 */
export function SectionNav({ label, items }: SectionNavProps) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    if (!sections.some((s) => items.some((i) => i.id === s.id))) return

    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let current: string | null = null
      for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s.id
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [items])

  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex list-none items-center gap-7">
        {items.map((s) => (
          <li key={s.id}>
            <Link
              href={s.href as Route}
              aria-current={active === s.id ? 'location' : undefined}
              className="ink-link pb-1 font-sans text-[14px] text-muted no-underline hover:text-foreground aria-[current]:text-foreground"
            >
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
