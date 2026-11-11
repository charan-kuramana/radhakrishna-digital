import type { NextConfig } from 'next';

// Static export: every page is prerendered to plain HTML in /out and served by
// Cloudflare Pages. No Node server is needed.
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
