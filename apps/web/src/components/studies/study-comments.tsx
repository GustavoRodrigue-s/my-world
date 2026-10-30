import { CommentForm, CommentList, Heading, Text, cx } from '@/components/ui'
import { STUDIES } from '@/lib/studies-content'

/**
 * The comments area under a study (ADR 0016): shown on every study, closed
 * until it has a backend — an empty list and the form drawn in pencil. No
 * handler, no fetch: nothing is sent or stored.
 */
export function StudyComments({ className }: { className?: string }) {
  const t = STUDIES.commentsArea
  const closed = STUDIES.comments === 'closed'
  return (
    <section id="comments" aria-labelledby="comments-title" className={cx('scroll-mt-bar border-t border-border-strong pt-10', className)}>
      <Heading as="h2" id="comments-title" level="title">
        {t.title}
      </Heading>
      {closed && (
        <Text id="comments-closed" family="mono" size="sm" color="support" className="mt-3">
          {t.closed}
        </Text>
      )}
      <CommentList comments={[]} empty={t.empty} className="mt-8" />
      <CommentForm
        id="comment"
        labels={t.form}
        disabled={closed}
        reasonId={closed ? 'comments-closed' : undefined}
        className="mt-10 max-w-measure"
      />
    </section>
  )
}
