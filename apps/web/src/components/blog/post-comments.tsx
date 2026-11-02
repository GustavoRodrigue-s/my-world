import { CommentForm, CommentList, Heading, Text, cx } from '@/components/ui'
import { BLOG } from '@/lib/blog-content'

/**
 * The comments area under a post (ADR 0016): shown on every post, closed
 * until it has a backend — an empty list and the form drawn in pencil. No
 * handler, no fetch: nothing is sent or stored.
 */
export function PostComments({ className }: { className?: string }) {
  const t = BLOG.commentsArea
  const closed = BLOG.comments === 'closed'
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
