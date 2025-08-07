/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // Proxy documentation requests to MCP server
  async rewrites() {
    const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'http://localhost:8000';
    
    return [
      // Proxy all /docs/ requests to MCP server
      {
        source: '/docs/:path*',
        destination: `${MCP_SERVER_URL}/docs/:path*`,
      },
    ];
  },
};

export default nextConfig;
