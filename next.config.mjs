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
      // Handle subdirectories with trailing slash - serve their index.html
      {
        source: '/docs/:path*/',
        destination: '/docs/:path*/index.html',
      },
      // Handle all other docs files as-is (CSS, JS, images, etc.)
      {
        source: '/docs/:path*',
        destination: '/docs/:path*',
      },
    ];
  },
};

export default nextConfig;
