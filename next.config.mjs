/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  async rewrites() {
    return [
      // Handle /docs root - serve index.html
      {
        source: '/docs',
        destination: '/docs/index.html',
      },
      // Handle /docs/ - serve index.html  
      {
        source: '/docs/',
        destination: '/docs/index.html',
      },
      // Handle static assets first (CSS, JS, images) - serve as-is
      {
        source: '/docs/assets/:path*',
        destination: '/docs/assets/:path*',
      },
      // Handle search functionality
      {
        source: '/docs/search/:path*',
        destination: '/docs/search/:path*',
      },
      // Handle subdirectories with trailing slash - serve their index.html
      {
        source: '/docs/:path*/',
        destination: '/docs/:path*/index.html',
      },
      // Handle subdirectories without trailing slash - serve their index.html
      {
        source: '/docs/:path+',
        destination: '/docs/:path*/index.html',
      },
    ];
  },
};

export default nextConfig;
