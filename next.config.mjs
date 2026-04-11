import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

// Optional base path — set NEXT_PUBLIC_BASE_PATH env var when deploying to a
// GitHub Pages subdirectory (e.g. /immigrant-guide).
// Leave empty for Vercel, Netlify, or a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate a fully static site — host on GitHub Pages, Netlify,
  // Cloudflare Pages, Vercel, or any CDN. No server required at runtime.
  output: 'export',

  // Base path for subdirectory hosting (e.g. GitHub Pages without custom domain).
  basePath,
  assetPrefix: basePath,

  // Required for static export: use standard <img> tags for images.
  images: {
    unoptimized: true,
  },

  // Trailing slashes produce index.html files that work on all static hosts.
  trailingSlash: true,

  // Enforce strict TypeScript at build time.
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default withNextIntl(nextConfig)
