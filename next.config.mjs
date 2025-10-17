/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://az-api-iwn-hackathon-demo-b0exa5duacasdpc0.australiasoutheast-01.azurewebsites.net/:path*',
      },
    ]
  },
}

export default nextConfig
