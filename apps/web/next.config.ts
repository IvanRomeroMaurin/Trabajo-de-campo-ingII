import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/types"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
