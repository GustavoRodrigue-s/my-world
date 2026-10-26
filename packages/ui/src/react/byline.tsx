import { Portrait } from './portrait'
import { Text } from './text'
import { cx } from './utils'

interface BylineProps {
  name: string
  role: React.ReactNode
  portrait?: { src: string | null; alt: string; priority?: boolean }
  /** Just the photo, no orbit ring (Capela). */
  plain?: boolean
  /** With `plain`: a round photo or one in a round-arched niche. */
  frame?: 'circle' | 'arch'
  /** Center the signature (under a centered page opening). */
  centered?: boolean
  className?: string
}

/**
 * Face, name and role together — a signature. Kept small on purpose: next to
 * a page's statement it must never become the largest paint.
 */
export function Byline({ name, role, portrait, plain, frame = 'circle', centered, className }: BylineProps) {
  return (
    <div className={className}>
      <div className={cx('flex items-center gap-3 md:gap-4', centered && 'justify-center text-left')}>
        {portrait?.src &&
          (plain ? (
            <div className="w-12 shrink-0 md:w-14">
              <Portrait src={portrait.src} alt={portrait.alt} sizes="56px" priority={portrait.priority} ring={false} shape={frame} />
            </div>
          ) : (
            // The box carries the orbit ring's margin; pull it in so the ring lines up with the text edge.
            <div className="-my-3 -ml-3.5 w-24 shrink-0 md:-my-4 md:-ml-[18px] md:w-32">
              <Portrait src={portrait.src} alt={portrait.alt} sizes="(min-width: 768px) 70px, 52px" priority={portrait.priority} />
            </div>
          ))}
        <div className="min-w-0">
          <Text size="lg" weight="semibold" color="foreground" leading="normal">
            {name}
          </Text>
          <Text family="mono" size="sm" color="muted" className="mt-1">
            {role}
          </Text>
        </div>
      </div>
    </div>
  )
}
