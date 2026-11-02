import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata, Route } from 'next'
import { ArrowLeft } from 'lucide-react'
import type { PostMeta } from '@my-world/types'
import { BackToTop, Cover, EntryCards, Heading, PageIntro, Register, Text, buttonClasses, chipClasses, cx } from '@/components/ui'
import { FormatMark, PolicyNote, PostActions, PostByline, PostComments, PostOutline, postEntry } from '@/components/blog'
import { buildArticleJsonLd, buildArticleMetadata, type ArticleSeo } from '@/lib/generate-metadata'
import { getRelatedPosts, getPosts, getPost } from '@/lib/blog'
import { ALL_POSTS_ANCHOR, BLOG, blogPath } from '@/lib/blog-content'
import { formatDate, formatReadingTime } from '@/lib/utils'
import { WORLD } from '@/lib/world-content'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getPosts()).map((s) => ({ slug: s.slug }))
}

function seo(post: PostMeta): ArticleSeo {
  return {
    path: blogPath(post.slug),
    title: post.title,
    summary: post.summary,
    siteName: WORLD.name,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    tags: post.tags,
    section: BLOG.themes[post.theme].name,
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug)
  return post ? buildArticleMetadata(seo(post)) : { title: BLOG.post.notFound }
}

const inkLink = 'ink-link text-primary no-underline'

/**
 * One post, article or note, laid out like a magazine article (ADR 0019,
 * 0032): its picture, the opening with the signature, the text with its margin
 * (the format's gloss and the outline), then the end in order — references and the byline, subjects,
 * likes, comments, what to read next.
 */
export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug)
  if (!post) notFound()
  const t = BLOG.post
  const format = BLOG.formats[post.format]
  const visible = await getPosts()
  // A note passed to ink points to its article; the article points back.
  const maturedInto = visible.find((s) => s.slug === post.maturedInto)
  const grewFrom = visible.filter((s) => s.maturedInto === post.slug)
  const related = await getRelatedPosts(post)
  const dates = [
    formatDate(post.publishedAt),
    post.updatedAt && t.updated(formatDate(post.updatedAt)),
    formatReadingTime(post.readingTime),
  ].filter(Boolean)

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleJsonLd(seo(post))) }} />
      <div className="px-gutter md:px-gutter-wide pt-8 md:pt-12">
        <figure className="section-inner flex flex-col gap-3">
          <Cover src={post.cover?.src} alt={post.cover?.alt} ratio="wide" sizes="(min-width: 1180px) 1180px, 100vw" priority />
          {post.cover?.credit && (
            <Text as="figcaption" family="mono" size="xs" color="subtle">
              {post.cover.credit}
            </Text>
          )}
        </figure>
      </div>
      <PageIntro
        labelledBy="post-title"
        align="start"
        spacing="compact"
        label={
          <>
            <Link href={`${blogPath()}?theme=${post.theme}#${ALL_POSTS_ANCHOR}` as Route} className={inkLink}>
              {BLOG.themes[post.theme].name}
            </Link>
            <span aria-hidden> · </span>
            {format.name}
          </>
        }
        footer={<PostByline role={dates.join(' · ')} />}
      >
        <Heading as="h1" id="post-title" level="headline" className="max-w-4xl">
          {post.title}
        </Heading>
        <Text size="lead" color="muted" leading="relaxed" className="mt-6 max-w-3xl">
          {post.summary}
        </Text>
      </PageIntro>

      <div className="px-gutter md:px-gutter-wide pb-block md:pb-block-wide">
        <div className="section-inner grid gap-y-10 lg:grid-cols-[var(--size-width-2xs)_minmax(0,1fr)] lg:gap-x-16">
          {/* The margin: what the finish means. */}
          <aside className="self-start lg:sticky lg:top-[calc(var(--size-bar)+var(--space-10))]">
            <FormatMark format={post.format} className="mb-3" />
            <Text family="mono" size="xs" color={post.format === 'note' ? 'support' : 'muted'} leading="relaxed" className="max-w-3xs">
              {format.name} — {format.gloss}
            </Text>
            <PostOutline headings={post.headings} />
          </aside>

          <div className="flex min-w-0 flex-col gap-6">
            {maturedInto && (
              <Text family="mono" size="sm" color="support" className="max-w-measure rounded-xs border border-dashed border-support px-4 py-3">
                {t.maturedInto}{' '}
                <Link href={blogPath(maturedInto.slug)} className={inkLink}>
                  {maturedInto.title}
                </Link>
                .
              </Text>
            )}

            {post.content}

            <footer className="mt-10 flex flex-col gap-10 border-t border-border pt-10">
              {post.references.length > 0 && (
                <Register title={t.references}>
                  {post.references.map((ref, i) => (
                    <li key={ref} className="flex gap-4 border-b border-border py-3">
                      <Text as="span" family="mono" size="xs" color="primary" className="pt-1">
                        {String(i + 1).padStart(2, '0')}
                      </Text>
                      <Text as="span" color="foreground" leading="snug">
                        {ref}
                      </Text>
                    </li>
                  ))}
                </Register>
              )}
              {grewFrom.map((note) => (
                <Text key={note.slug} family="mono" size="sm" color="muted">
                  {t.grewFrom}{' '}
                  <Link href={blogPath(note.slug)} className={inkLink}>
                    {note.title}
                  </Link>
                  .
                </Text>
              ))}
              <PostByline role={t.byline} />
              <PolicyNote />
            </footer>

            {/* The subjects, as on Medium: each one opens the index filtered by it. */}
            {post.tags.length > 0 && (
              <ul aria-label={t.tags} className="mt-4 flex list-none flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Link href={`${blogPath()}?tag=${encodeURIComponent(tag)}#${ALL_POSTS_ANCHOR}` as Route} className={chipClasses()}>
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <PostActions comments={post.comments} />

            {post.comments && <PostComments className="mt-6" />}

            {related.length > 0 && (
              <section aria-labelledby="related-title" className="mt-12 border-t border-border-strong pt-10">
                <Heading as="h2" id="related-title" level="title" className="mb-8">
                  {t.related}
                </Heading>
                {/* The Blog's gold is `hidden`, as on the index (ADR 0015). */}
                <EntryCards items={related.map(postEntry)} gild="hidden" />
              </section>
            )}

            <Link href={blogPath()} className={cx(buttonClasses({ variant: 'quiet', size: 'none' }), 'mt-10 self-start text-base')}>
              <ArrowLeft className="size-icon-md" aria-hidden />
              {t.back}
            </Link>
          </div>
        </div>
      </div>
      <BackToTop label={t.backToTop} />
    </article>
  )
}
