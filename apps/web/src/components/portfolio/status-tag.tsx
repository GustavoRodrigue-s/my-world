import { cx } from '@/components/ui'
import { getContent, type ArtifactStatus, type Locale } from '@/lib/portfolio-content'

const DOT: Record<ArtifactStatus, string> = {
  production: 'bg-accent',
  building: 'border border-accent',
  prototype: 'border border-foreground',
  'drawing-board': 'border border-dashed border-support-1',
}

export function StatusTag({ status, locale, className }: { status: ArtifactStatus; locale: Locale; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-xs border border-border-strong px-2 py-[3px] font-mono text-[11px] leading-none',
        status === 'drawing-board' ? 'text-support-1' : 'text-foreground',
        className
      )}
    >
      <span aria-hidden className={cx('h-[7px] w-[7px] rounded-full', DOT[status])} />
      {getContent(locale).statusLabel[status]}
    </span>
  )
}
