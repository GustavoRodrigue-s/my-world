import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { Emphasis, Heading, PageIntro, Text, buttonClasses, cx } from '@/components/ui'
import { BLOG, blogPath, policyPath } from '@/lib/blog-content'

export const metadata: Metadata = {
  title: BLOG.policy.title,
  description: BLOG.policy.lead,
  alternates: { canonical: policyPath() },
}

/** The rule every post of the Blog is written under (ADR 0033). */
export default function PolicyPage() {
  const { policy } = BLOG
  return (
    <>
      <PageIntro labelledBy="policy-title" align="start" label={`${BLOG.name} · ${policy.title}`}>
        <Heading as="h1" id="policy-title" level="headline" className="max-w-4xl">
          {policy.statement.before} <Emphasis>{policy.statement.emphasis}</Emphasis>
          {policy.statement.after}
        </Heading>
        <Text size="lead" color="muted" leading="relaxed" className="mt-6 max-w-3xl">
          {policy.lead}
        </Text>
      </PageIntro>
      <div className="px-gutter md:px-gutter-wide pb-block md:pb-block-wide">
        <div className="section-inner flex flex-col gap-6">
          <Heading as="h2" level="title" className="border-t border-border-strong pt-10">
            {policy.why.title}
          </Heading>
          {policy.why.text.map((paragraph) => (
            <Text key={paragraph} size="lg" color="foreground" leading="relaxed" className="max-w-measure">
              {paragraph}
            </Text>
          ))}
          <Link href={blogPath()} className={cx(buttonClasses({ variant: 'quiet', size: 'none' }), 'mt-6 self-start text-base')}>
            <ArrowLeft className="size-icon-md" aria-hidden />
            {BLOG.post.back}
          </Link>
        </div>
      </div>
    </>
  )
}
