'use client'

import { useEffect, useRef, useState } from 'react'
import { Quote, cx } from '@/components/ui'

interface Citation {
  text: string
  author: string
  source?: string
}

interface CitationPlateProps {
  quotes: Citation[]
  labels: { pause: string; play: string; next: string; label: string }
}

const INTERVAL = 7000

/**
 * The Capela's one protagonist animation: a lesson from the saints, centered
 * on its stone band, turning every few seconds. Always pausable; it also holds
 * still while hovered or focused, off-screen, in a hidden tab, and for anyone
 * who asks for less motion.
 */
export function CitationPlate({ quotes, labels }: CitationPlateProps) {
  const ref = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [onScreen, setOnScreen] = useState(true)
  const [held, setHeld] = useState(false)

  const running = !paused && !reduced && onScreen && !held

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting && !document.hidden))
    io.observe(el)
    const onVisibility = () => setOnScreen(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % quotes.length), INTERVAL)
    return () => clearInterval(timer)
  }, [running, quotes.length])

  const quote = quotes[index]
  const control =
    'inline-flex cursor-pointer items-center gap-2 rounded-xs px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors duration-[var(--transition-fast)] hover:text-accent'

  return (
    <figure
      ref={ref}
      aria-roledescription="carousel"
      aria-label={labels.label}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      className="mx-auto flex w-full max-w-[880px] flex-col items-center"
    >
      {/* Announce only when the reader changes it, never on the timer. */}
      <div aria-live={running ? 'off' : 'polite'} className="flex min-h-[13rem] w-full items-center justify-center md:min-h-[15rem]">
        <div key={index} className="animate-[gw-quote_420ms_ease-out_both]">
          <Quote size="display" text={`“${quote.text}”`} source={[quote.author, quote.source].filter(Boolean).join(' · ')} />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span aria-hidden className="flex gap-1.5">
          {quotes.map((q, i) => (
            <span key={q.text} className={cx('h-[5px] w-[5px] rounded-full', i === index ? 'bg-accent' : 'bg-border-strong')} />
          ))}
        </span>
        {!reduced && (
          <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} className={control}>
            <svg viewBox="0 0 10 10" width="9" height="9" aria-hidden className="fill-current">
              {paused ? <path d="M2 1l7 4-7 4z" /> : <path d="M1.5 1h2.4v8H1.5zM6.1 1h2.4v8H6.1z" />}
            </svg>
            {paused ? labels.play : labels.pause}
          </button>
        )}
        <button type="button" onClick={() => setIndex((i) => (i + 1) % quotes.length)} className={control}>
          {labels.next} →
        </button>
      </div>
    </figure>
  )
}
