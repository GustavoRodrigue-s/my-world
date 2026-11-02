import Link from 'next/link'
import { Text } from '@/components/ui'
import { BLOG, policyPath } from '@/lib/blog-content'

/** The writing policy in one line, with the way to read it (ADR 0033). */
export function PolicyNote({ className }: { className?: string }) {
  const { notice, read } = BLOG.policy
  return (
    <Text family="mono" size="xs" color="muted" leading="relaxed" className={className}>
      {notice}{' '}
      <Link href={policyPath()} className="ink-link text-primary no-underline">
        {read}
      </Link>
    </Text>
  )
}
