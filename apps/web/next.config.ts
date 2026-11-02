import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  async redirects() {
    return [
      // The Capela moved under /chapel (2026-10-18). Temporary on purpose:
      // browsers cache permanent redirects, and these paths may be reused.
      { source: '/articles/:path*', destination: '/chapel/articles/:path*', permanent: false },
      { source: '/categories/:path*', destination: '/chapel/categories/:path*', permanent: false },
      { source: '/saints', destination: '/chapel/saints', permanent: false },
      { source: '/about', destination: '/chapel/about', permanent: false },
      // Estudos became the Blog (2026-11-02, ADR 0031).
      { source: '/studies/:path*', destination: '/blog/:path*', permanent: false },
    ]
  },
}

export default nextConfig
