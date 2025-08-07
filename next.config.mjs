/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // Proxy documentation requests to GitHub Pages
  async rewrites() {
    return [
      // Proxy all /docs/ requests to GitHub Pages
      {
        source: '/docs',
        destination: 'https://tom-mcmillan.github.io/nwsl_data/',
      },
      {
        source: '/docs/:path*',
        destination: 'https://tom-mcmillan.github.io/nwsl_data/:path*',
      },
    ];
  },
};

export default nextConfig;
