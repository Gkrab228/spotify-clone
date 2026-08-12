import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(process.env.NEXT_PUBLIC_S3_BASE_URL+'/**')],
  }
};

export default nextConfig;
