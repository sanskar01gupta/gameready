import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.cloudflare.steamstatic.com",
      },
      {
        protocol: "https",
        hostname: "cdn2.unrealengine.com",
      },
      {
        protocol: "https",
        hostname: "media.rawg.io",
      },
    ],
    unoptimized: true, // Allow external images without optimization for game covers
  },
};

export default nextConfig;
