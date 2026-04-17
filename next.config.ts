import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this directory so Next.js doesn't
    // walk up into the parent repo and scan unrelated files.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
