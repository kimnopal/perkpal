import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // remotePatterns: [new URL(process.env.NEXT_PUBLIC_IMAGE_URL || "")],
    remotePatterns: [
      {
        hostname: 'localhost',
        port: '1337',
        protocol: 'http',
        pathname: '/**'
      }
    ],
  }
};

export default nextConfig;
