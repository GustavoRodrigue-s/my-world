import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

// Called by Strapi webhook on content publish/update/delete
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { model, entry } = body

    if (model === 'article') {
      // Revalidate the specific article page
      if (entry?.slug) {
        revalidatePath(`/articles/${entry.slug}`)
      }
      // Revalidate lists
      revalidatePath('/articles')
      revalidatePath('/')
      revalidateTag('articles')
    }

    if (model === 'category') {
      revalidatePath('/categories')
      revalidateTag('categories')
    }

    return NextResponse.json({ revalidated: true, timestamp: Date.now() })
  } catch (error) {
    console.error('[revalidate] Error:', error)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
