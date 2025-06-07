import type { NextConfig } from "next";
import path from "path";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(path.resolve(__dirname, "../.."));

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, ".."),
      "~": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

export default nextConfig;
