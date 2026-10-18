import { cx } from './utils'

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div'
}

export function Eyebrow({ as: Tag = 'p', className, ...props }: EyebrowProps) {
  return (
    <Tag
      className={cx(
        'font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-accent',
        className
      )}
      {...props}
    />
  )
}
