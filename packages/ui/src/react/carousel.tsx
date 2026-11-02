'use client'

import { Children, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MotionToggle } from './motion-toggle'

interface CarouselProps {
  /** Names the whole carousel for assistive technology. */
  label: string
  labels: {
    /** What it is called when announced ("carrossel"). */
    role: string
    previous: string
    next: string
    /** The word between two numbers: "2 de 3". */
    of: string
    /** The pause of its turning. */
    motion: { pause: string; play: string }
  }
  /** One child per slide. */
  children: React.ReactNode
  className?: string
}

const controlClasses =
  'inline-flex size-icon-3xl cursor-pointer items-center justify-center rounded-xs border border-border-strong text-foreground transition-colors duration-fast hover:border-foreground'

/**
 * Slides side by side that turn by themselves: the page's protagonist (rule 3
 * of the identity), so it has a pause and turning stops under the reader's
 * pointer or keyboard focus. A hairline is drawn in duration.turn and each time
 * it ends the next slide comes; everything about the time lives in CSS, so
 * reduced motion and print simply never turn. The scrolling is the browser's
 * own, snapped to each slide: a swipe or the buttons work the same, and it works
 * without JavaScript. Printed, the slides stack.
 */
export function Carousel({ label, labels, children, className }: CarouselProps) {
  const slides = Children.toArray(children)
  const track = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [running, setRunning] = useState(true)
  const [turns, setTurns] = useState(0)

  const go = (index: number) => {
    const el = track.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: el.clientWidth * ((index + slides.length) % slides.length), behavior: reduced ? 'auto' : 'smooth' })
  }

  const onScroll = () => {
    const el = track.current
    if (el) setCurrent(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <section
      aria-label={label}
      aria-roledescription={labels.role}
      data-carousel
      data-carousel-paused={running ? undefined : ''}
      className={className}
    >
      <div
        ref={track}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] print:block print:overflow-visible"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} ${labels.of} ${slides.length}`}
            className="w-full shrink-0 snap-start print:mb-6"
          >
            {slide}
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className="print:hidden">
          <div aria-hidden className="mt-4 h-px bg-border motion-reduce:hidden">
            {/* A new key starts the line over: on every slide, and after every turn even if the page couldn't scroll (hidden). */}
            <span
              key={`${current}-${turns}`}
              className="carousel-turn block h-px origin-left bg-primary"
              onAnimationEnd={() => {
                setTurns(turns + 1)
                go(current + 1)
              }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            {/* Announced only when the reader is the one turning it. */}
            <span aria-live={running ? 'off' : 'polite'} className="font-mono text-xs text-foreground-muted">
              {current + 1} {labels.of} {slides.length}
            </span>
            <div className="flex items-center gap-2">
              <MotionToggle
                running={running}
                onToggle={() => setRunning(!running)}
                labels={labels.motion}
                className="mr-2 motion-reduce:hidden"
              />
              <button type="button" aria-label={labels.previous} onClick={() => go(current - 1)} className={controlClasses}>
                <ChevronLeft className="size-icon-md" aria-hidden />
              </button>
              <button type="button" aria-label={labels.next} onClick={() => go(current + 1)} className={controlClasses}>
                <ChevronRight className="size-icon-md" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
