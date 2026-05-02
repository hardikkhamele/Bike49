import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly set the Turbopack root to avoid Next.js inferring the wrong workspace root
  // (Vercel/Turbopack can pick up a parent lockfile in some CI environments).
  turbopack: {
    // Use an absolute path so CI environments (like Vercel) don't warn or pick a parent folder
    root: path.resolve(__dirname),
  },
  // keep strict mode on for better checks in deployment
  reactStrictMode: true,
};

export default nextConfig;
