import { CrossPattee } from './cross-pattee'
import { cx } from './utils'

/** A section divider: two hairlines and a gold cross pattée between them. Decorative. */
export function OrnamentRule({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cx('flex items-center justify-center gap-5', className)}>
      <span className="h-px w-16 bg-border-strong md:w-24" />
      <CrossPattee size={13} />
      <span className="h-px w-16 bg-border-strong md:w-24" />
    </div>
  )
}
