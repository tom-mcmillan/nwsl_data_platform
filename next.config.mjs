/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // Rewrite rules to serve MkDocs documentation from public/docs/
  async rewrites() {
    return [
      // Handle /docs root - serve index.html
      {
        source: '/docs',
        destination: '/docs/index.html'
      },
      // Handle /docs/ with trailing slash
      {
        source: '/docs/',
        destination: '/docs/index.html'
      },
      // Handle /docs/path - try directory index first
      {
        source: '/docs/:path+',
        destination: '/docs/:path/index.html'
      }
    ];
  },
};

export default nextConfig;
