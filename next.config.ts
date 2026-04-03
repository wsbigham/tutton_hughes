import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3imlwtjjinwvd.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
