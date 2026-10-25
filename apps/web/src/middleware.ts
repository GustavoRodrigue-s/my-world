import { NextResponse, type NextRequest } from 'next/server'
import { CONSTRUCTION_BASE, closedSpaceAt } from '@/lib/world'

// A space still being built (lib/world.ts) is answered by its construction page,
// under the same URL — nothing of the space itself leaves the server.
export function middleware(request: NextRequest) {
  const space = closedSpaceAt(request.nextUrl.pathname)
  if (!space) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `${CONSTRUCTION_BASE}/${space}`
  url.search = ''
  return NextResponse.rewrite(url, { headers: { 'X-Robots-Tag': 'noindex' } })
}

export const config = {
  // Pages only: not API routes, Next internals or files (anything with a dot, e.g. /chapel/last-supper.jpg).
  matcher: ['/((?!api/|_next/|.*\\.).*)'],
}
