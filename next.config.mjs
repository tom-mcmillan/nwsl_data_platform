/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // Proxy documentation requests to GitHub Pages
  async rewrites() {
    return [
      // Proxy assets first (most specific routes)
      {
        source: '/docs/assets/:path*',
        destination: 'https://tom-mcmillan.github.io/nwsl_data/assets/:path*',
      },
      {
        source: '/docs/search/:path*',
        destination: 'https://tom-mcmillan.github.io/nwsl_data/search/:path*',
      },
      {
        source: '/docs/stylesheets/:path*',
        destination: 'https://tom-mcmillan.github.io/nwsl_data/stylesheets/:path*',
      },
      // Proxy docs root
      {
        source: '/docs',
        destination: 'https://tom-mcmillan.github.io/nwsl_data/',
      },
      // Proxy all other docs paths
      {
        source: '/docs/:path*',
        destination: 'https://tom-mcmillan.github.io/nwsl_data/:path*',
      },
    ];
  },
};

export default nextConfig;
