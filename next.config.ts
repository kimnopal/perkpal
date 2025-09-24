import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:1337"),
      // {
      //   protocol: new URL(process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:1337").protocol.slice(0, -1) as "http" | "https",
      //   hostname: new URL(process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:1337").hostname,
      //   port: new URL(process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:1337").port || "",
      //   pathname: "/**",
      // },
    ],
    // Alternative static configuration:
    // remotePatterns: [
    //   {
    //     hostname: 'localhost',
    //     port: '1337',
    //     protocol: 'http',
    //     pathname: '/**'
    //   }
    // ],
  },
};

export default nextConfig;
