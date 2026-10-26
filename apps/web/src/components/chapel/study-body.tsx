import { Heading, Quote, Text, cx } from '@/components/ui'

/** *word* → <em>word</em>; everything else stays text. */
function inline(text: string) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? (
      <em key={i} className="italic">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    )
  )
}

/**
 * A study's text (the light markdown stored in `content`): paragraphs, `## `
 * subheadings, `> ` quotes ("text" — source) and *emphasis*. Quotes are set
 * in the voice face with the rubric rule; the first paragraph opens with an
 * illuminated initial (red on gold leaf).
 */
export function StudyBody({ content }: { content: string }) {
  const blocks = content
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean)
  const first = blocks.findIndex((b) => !b.startsWith('## ') && !b.startsWith('> '))

  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        if (block.startsWith('## ')) {
          return (
            <Heading key={i} as="h2" level="title-serif" className="mt-8">
              {block.slice(3)}
            </Heading>
          )
        }
        if (block.startsWith('> ')) {
          const [quote, source] = block.slice(2).split(/\s+—\s+/)
          return <Quote key={i} text={quote} source={source} className="my-2" />
        }
        return (
          <Text
            key={i}
            size="lg"
            color="foreground"
            leading="relaxed"
            className={cx(
              'max-w-[68ch]',
              // The illuminated initial: a rubric capital on a square of gold leaf, kept flat.
              i === first &&
                'first-letter:float-left first-letter:mt-[0.12em] first-letter:mr-3.5 first-letter:rounded-xs first-letter:border first-letter:border-support/60 first-letter:bg-support/12 first-letter:px-2.5 first-letter:pt-2 first-letter:pb-0.5 first-letter:font-serif first-letter:text-[4.2em] first-letter:leading-[0.8] first-letter:font-medium first-letter:text-primary'
            )}
          >
            {inline(block)}
          </Text>
        )
      })}
    </div>
  )
}
