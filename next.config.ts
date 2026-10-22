import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Our AGENTS.md is shared by every AI tool, so `next dev` must not rewrite it.
  agentRules: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
