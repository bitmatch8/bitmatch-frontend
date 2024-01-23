/** @type {import('next').NextConfig} */
const prod = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  // output: 'standalone',
  compiler: {
    styledComponents: true,
  },
  images:{
    unoptimized:true
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://101.251.211.205:8066/:path*`
      },
    ]
  }
}

export default nextConfig
