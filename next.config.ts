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
      // Two names for the metrics page. "/analytics" is what people reach for
      // when they are sent a link to "the analytics", and a shared link that
      // 404s is worse than a duplicate route. Not permanent: this is an alias
      // for convenience, not a rename, and /metrics stays the real page.
      { source: "/analytics", destination: "/metrics", permanent: false },
      { source: "/discovery", destination: "/", permanent: true },
      { source: "/discovery/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
