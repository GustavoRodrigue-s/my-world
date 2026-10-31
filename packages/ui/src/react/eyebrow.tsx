import { cx } from './utils'

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div'
}

export function Eyebrow({ as: Tag = 'p', className, ...props }: EyebrowProps) {
  return (
    <Tag
      className={cx(
        'font-sans text-xs font-bold uppercase tracking-widest text-primary',
        className
      )}
      {...props}
    />
  )
}
