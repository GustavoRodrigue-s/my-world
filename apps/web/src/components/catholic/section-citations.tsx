'use client'

import { useState, useEffect } from 'react'
import { MOCK_CITATIONS } from '@/lib/mock-data'

export function SectionCitations() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent((c) => (c + 1) % MOCK_CITATIONS.length)
        setVisible(true)
      }, 400)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const { text, author, source } = MOCK_CITATIONS[current]

  return (
    <section className="bg-surface-alt-1 border-t border-b border-accent-border px-[var(--spacing-section-x)] py-10 text-center">
      <div
        className="max-w-[580px] mx-auto transition-opacity duration-[400ms] ease-in-out"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <p className="font-serif text-[22px] italic font-normal text-foreground leading-[1.5] mb-4">
          "{text}"
        </p>
        <p className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-accent">
          — {author}{source ? `, ${source.toUpperCase()}` : ''}
        </p>
      </div>
    </section>
  )
}
