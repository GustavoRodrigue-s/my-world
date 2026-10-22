import { StatusTag, type StatusTone } from '@/components/ui'
import { getContent, type ArtifactStatus, type Locale } from '@/lib/portfolio-content'

const TONE: Record<ArtifactStatus, StatusTone> = {
  production: 'lit',
  building: 'open',
  prototype: 'plain',
  'drawing-board': 'draft',
}

/** An artifact's status in the shared <StatusTag> vocabulary. */
export function ArtifactStatusTag({ status, locale }: { status: ArtifactStatus; locale: Locale }) {
  return <StatusTag tone={TONE[status]}>{getContent(locale).statusLabel[status]}</StatusTag>
}
