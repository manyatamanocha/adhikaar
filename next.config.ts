import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/recover", destination: "/", permanent: true },
      // Renamed 6 Sep 2026. "/confirm-details" read like a form asking the
      // reader to check their details; the page is actually a verdict --
      // "a court restriction needs to be resolved first". Old links, including
      // any a family already sent to a sibling, keep working. Next preserves
      // the query string, which is the whole claim state, across a redirect.
      { source: "/confirm-details", destination: "/needs-review", permanent: true },
      { source: "/discovery", destination: "/", permanent: true },
      { source: "/discovery/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
