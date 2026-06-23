import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for surfacing potential issues early
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },

  // Experimental features for Next.js 15
  experimental: {
    // Typesafe routes (App Router)
    typedRoutes: true,
  },
};

export default nextConfig;
