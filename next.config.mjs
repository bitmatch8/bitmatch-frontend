/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/mempool/:path*",
        destination: "https://mempool.space/api/v1/:path*",
      },
      {
        source: "/api/rune/:path*",
        destination: `${process.env.NEXT_PUBLIC_RUNE_URL}/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
