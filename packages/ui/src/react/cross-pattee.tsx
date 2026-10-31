import { cx, ICON_SIZE, type IconSize } from './utils'

// Four arms, narrow at the heart and flared at the ends — the cross of old
// church doors and manuscript margins.
const PATH = 'M11 11 9.5 2h5L13 11l9-1.5v5L13 13l1.5 9h-5l1.5-9-9 1.5v-5Z'

interface CrossPatteeProps extends Omit<React.SVGProps<SVGSVGElement>, 'children'> {
  size?: IconSize
}

/** A small cross pattée in the hidden gold (support-1). Decorative. */
export function CrossPattee({ size = 'sm', className, ...props }: CrossPatteeProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cx('shrink-0 fill-support', ICON_SIZE[size], className)} {...props}>
      <path d={PATH} />
    </svg>
  )
}
