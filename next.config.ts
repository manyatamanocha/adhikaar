import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/recover", destination: "/", permanent: true },
      { source: "/discovery", destination: "/", permanent: true },
      { source: "/discovery/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
