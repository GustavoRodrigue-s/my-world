import { cx } from './utils'

interface NicheProps {
  /** The picture (a next/image), set below the arch's springing line. */
  children: React.ReactNode
  /** Drawn in the tympanum, over the picture (e.g. a <RoseWindow>). */
  ornament?: React.ReactNode
  caption?: React.ReactNode
  /**
   * The picture rests veiled (muted, sepia) and shows its true colors — its
   * gold — under the reader's hand: the hidden gold. Touch screens, with no
   * hover, always see it in color.
   */
  veiled?: boolean
  className?: string
}

/**
 * Nicho — a Romanesque niche in the stone: a round-arched frame with a gilded
 * fillet, an ornament in the tympanum and the picture inside, like a panel set
 * into an old church wall.
 */
export function Niche({ children, ornament, caption, veiled = true, className }: NicheProps) {
  return (
    <figure className={cx('group/niche mx-auto w-full max-w-[620px]', className)}>
      {/* 28% top padding (of the width) keeps the picture's corners inside the semicircle. */}
      <div className="relative rounded-t-full bg-surface-alt-1 px-[6%] pt-[28%] pb-[6%]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[2.5%] rounded-t-full border border-support-1 opacity-35 transition-opacity duration-500 ease-out group-hover/niche:opacity-100"
        />
        {ornament && (
          <div aria-hidden className="absolute inset-x-0 top-0 flex aspect-[100/28] items-center justify-center pt-[3%]">
            {ornament}
          </div>
        )}
        <div
          className={cx(
            'relative overflow-hidden rounded-xs',
            veiled &&
              'grayscale-[90%] sepia-[45%] transition-[filter] duration-700 ease-out group-hover/niche:grayscale-0 group-hover/niche:sepia-0 [@media(hover:none)]:grayscale-0 [@media(hover:none)]:sepia-0'
          )}
        >
          {children}
        </div>
      </div>
      {caption && <figcaption className="mt-6 text-center">{caption}</figcaption>}
    </figure>
  )
}
