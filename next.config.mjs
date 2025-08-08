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
      // IMPORTANT: Handle asset paths that MkDocs generates as relative
      // When MkDocs generates "assets/...", browser requests "/assets/..." from /docs page
      // We need to redirect those to "/docs/assets/..."
      {
        source: '/assets/:path*',
        destination: '/docs/assets/:path*',
        has: [
          {
            type: 'header',
            key: 'referer',
            value: '.*\\/docs.*'
          }
        ]
      },
      {
        source: '/stylesheets/:path*',
        destination: '/docs/stylesheets/:path*',
        has: [
          {
            type: 'header',
            key: 'referer',
            value: '.*\\/docs.*'
          }
        ]
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
