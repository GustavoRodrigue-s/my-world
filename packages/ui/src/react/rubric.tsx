import { cx } from './utils'

interface RubricProps extends React.HTMLAttributes<HTMLElement> {
  /** Section number, e.g. "02". Rendered after the pilcrow in the accent color. */
  index: string
  as?: 'p' | 'span' | 'div'
}

/**
 * The section marker. ¶ is the red pilcrow medieval rubricators painted to
 * open a paragraph — and the "show invisibles" mark of every code editor.
 */
export function Rubric({ index, as: Tag = 'p', className, children, ...props }: RubricProps) {
  return (
    <Tag className={cx('font-mono text-[12px] leading-none tracking-[0.02em] text-muted', className)} {...props}>
      <span className="text-accent">¶ {index}</span>
      {children && (
        <>
          <span aria-hidden className="mx-2 text-subtle">—</span>
          {children}
        </>
      )}
    </Tag>
  )
}
