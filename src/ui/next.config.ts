import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add aliases for accessing parent directory modules
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/api": path.resolve(__dirname, "../types"),
      "@/utils": path.resolve(__dirname, "../utils"),
      "@/lib": path.resolve(__dirname, "../lib"),
      "@/ai": path.resolve(__dirname, "../ai"),
      "@/bot": path.resolve(__dirname, "../bot"),
      "@/global": path.resolve(__dirname, "../global"),
      "@/generated": path.resolve(__dirname, "../generated"),
    };

    return config;
  },
};

export default nextConfig;
