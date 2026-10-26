import { StatusTag, Text } from '@/components/ui'
import { CHAPEL } from '@/lib/chapel-content'

/** Over the Capela while it is closed to the public but open to its builder (dev, previews). */
export function ConstructionNotice() {
  const { construction } = CHAPEL
  return (
    <div role="note" className="border-b border-border bg-surface-muted px-gutter md:px-gutter-wide py-2.5 print:hidden">
      <div className="section-inner flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center">
        <StatusTag tone="open">{construction.status}</StatusTag>
        <Text as="span" family="mono" size="xs" color="muted">
          {construction.preview}
        </Text>
      </div>
    </div>
  )
}
