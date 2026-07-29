import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    qualities: [100, 75],
  },
  turbopack: {
    root: path.join(__dirname, "../"),
  },
};

export default nextConfig;
