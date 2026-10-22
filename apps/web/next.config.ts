import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: process.env.STRAPI_HOST ?? '',
        pathname: '/uploads/**',
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
  async redirects() {
    return [
      // The site opens on the portfolio — Gustavo's master brand.
      { source: '/', destination: '/portfolio', permanent: false },
      // The Capela moved under /chapel (2026-10-18). Temporary on purpose:
      // browsers cache permanent redirects, and these paths may be reused.
      { source: '/articles/:path*', destination: '/chapel/articles/:path*', permanent: false },
      { source: '/categories/:path*', destination: '/chapel/categories/:path*', permanent: false },
      { source: '/saints', destination: '/chapel/saints', permanent: false },
      { source: '/about', destination: '/chapel/about', permanent: false },
    ]
  },
}

export default nextConfig
