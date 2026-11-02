import type { Metadata } from 'next'
import { Carousel, EntryCards, Emphasis, Heading, PageIntro, Text } from '@/components/ui'
import { PolicyNote, PostIndex, PostSlide, postEntry } from '@/components/blog'
import { getPosts } from '@/lib/blog'
import { BLOG, blogPath } from '@/lib/blog-content'

export const metadata: Metadata = {
  description: BLOG.meta.description,
  alternates: { canonical: blogPath() },
}

/**
 * The index, led by pictures (ADR 0032): the newest articles in the carousel,
 * the next ones as highlights, then every post with the filters. Only articles
 * are put forward: a note is still in pencil.
 */
export default async function BlogPage() {
  const { index } = BLOG
  const posts = await getPosts()
  const articles = posts.filter((post) => post.format === 'article')
  const slides = articles.slice(0, 3)
  const highlights = articles.slice(3, 6)
  return (
    <>
      {slides.length > 0 && (
        <div className="px-gutter md:px-gutter-wide pt-8 md:pt-12">
          <div className="section-inner">
            <Carousel label={index.carousel.label} labels={index.carousel}>
              {slides.map((post, i) => (
                <PostSlide key={post.slug} post={post} first={i === 0} />
              ))}
            </Carousel>
          </div>
        </div>
      )}

      <PageIntro labelledBy="blog-title" align="start" spacing="compact" label={`${BLOG.name} · ${index.count(posts.length)}`}>
        <Heading as="h1" id="blog-title" level="headline" className="max-w-4xl">
          {index.statement.before} <Emphasis>{index.statement.emphasis}</Emphasis>
          {index.statement.after}
        </Heading>
        <Text size="lead" color="muted" leading="relaxed" className="mt-6 max-w-3xl">
          {index.lead}
        </Text>
        <PolicyNote className="mt-6" />
      </PageIntro>

      {highlights.length > 0 && (
        <section aria-labelledby="highlights-title" className="px-gutter md:px-gutter-wide pb-16">
          <div className="section-inner border-t border-border-strong pt-10">
            <Heading as="h2" id="highlights-title" level="title" className="mb-8">
              {index.highlights}
            </Heading>
            <EntryCards items={highlights.map(postEntry)} gild="hidden" />
          </div>
        </section>
      )}

      <section id={index.allAnchor} aria-labelledby="all-title" className="px-gutter md:px-gutter-wide pb-block md:pb-block-wide scroll-mt-bar">
        <div className="section-inner border-t border-border-strong pt-10">
          <Heading as="h2" id="all-title" level="title" className="mb-8">
            {index.all}
          </Heading>
          {posts.length > 0 ? (
            <PostIndex entries={posts.map(postEntry)} />
          ) : (
            <Text size="lg" color="muted" className="py-10">
              {index.empty}
            </Text>
          )}
        </div>
      </section>
    </>
  )
}
