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
    <Tag className={cx('font-mono text-sm leading-none tracking-wide text-foreground-muted', className)} {...props}>
      <span className="text-primary">¶ {index}</span>
      {children && (
        <>
          <span aria-hidden className="mx-2 text-foreground-subtle">—</span>
          {children}
        </>
      )}
    </Tag>
  )
}
