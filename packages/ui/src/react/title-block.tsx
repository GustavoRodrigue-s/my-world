import { cx } from './utils'

interface TitleBlockItem {
  label: string
  value: React.ReactNode
}

interface TitleBlockProps extends React.HTMLAttributes<HTMLDListElement> {
  items: TitleBlockItem[]
}

/**
 * Carimbo — the title block of a technical drawing. The identity's way of
 * stating plain facts (author, place, revision) as part of the composition.
 */
export function TitleBlock({ items, className, ...props }: TitleBlockProps) {
  return (
    <dl
      className={cx(
        'grid grid-cols-2 sm:grid-cols-3 lg:grid-flow-col lg:auto-cols-fr',
        'border-t border-l border-border-strong',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <div key={item.label} className="border-r border-b border-border-strong px-3 py-2.5 min-w-0">
          <dt className="font-mono text-2xs uppercase tracking-wider text-foreground-muted">{item.label}</dt>
          <dd className="font-mono text-sm leading-normal text-foreground mt-1 truncate">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
