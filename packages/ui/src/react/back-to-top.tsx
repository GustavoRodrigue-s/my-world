'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cx } from './utils'

interface BackToTopProps {
  label: string
  /** Id of the element that takes the focus back at the top (the shell's `<main>`). */
  targetId?: string
  className?: string
}

/**
 * A small floating button, bottom right, back to the top of a long page. It
 * shows up only after a screen's worth of scrolling (it moves by the reader's
 * hand); with reduced motion the jump is instant. The focus goes up too.
 */
export function BackToTop({ label, targetId = 'content', className }: BackToTopProps) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const update = () => setShown(window.scrollY > window.innerHeight)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  function toTop() {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' })
    document.getElementById(targetId)?.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={label}
      title={label}
      className={cx(
        'fixed right-gutter bottom-gutter z-sticky inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xs border border-border-strong bg-surface text-foreground md:right-gutter-wide md:bottom-gutter-wide print:hidden',
        'transition-[opacity,translate,visibility,border-color,color] duration-fast hover:border-foreground hover:text-primary',
        // Hidden, it is out of reach too (no focus, no clicks).
        shown ? 'visible opacity-100' : 'invisible opacity-0 motion-safe:translate-y-2',
        className
      )}
    >
      <ArrowUp className="size-icon-md" aria-hidden />
    </button>
  )
}
