import { Heart, MessageCircle } from 'lucide-react'
import { Button, Text, buttonClasses, cx } from '@/components/ui'
import { STUDIES } from '@/lib/studies-content'

/**
 * What a reader does at the end of a study (ADR 0019): like it, or go to the
 * comments. Likes are shown closed until they have a backend, the button in
 * pencil like the comments form; nothing is counted or stored.
 */
export function StudyActions({ comments, className }: { comments: boolean; className?: string }) {
  const t = STUDIES.study.actions
  const closed = STUDIES.likes === 'closed'
  return (
    <div className={cx('flex flex-wrap items-center gap-x-4 gap-y-3', className)}>
      <Button type="button" variant="line" size="sm" disabled={closed} aria-describedby={closed ? 'likes-closed' : undefined}>
        <Heart className="size-icon-sm" aria-hidden />
        {t.like}
      </Button>
      {comments && (
        <a href="#comments" className={buttonClasses({ variant: 'line', size: 'sm' })}>
          <MessageCircle className="size-icon-sm" aria-hidden />
          {t.toComments}
        </a>
      )}
      {closed && (
        <Text id="likes-closed" family="mono" size="xs" color="support">
          {t.likesClosed}
        </Text>
      )}
    </div>
  )
}
