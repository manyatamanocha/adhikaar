import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @sparticuz/chromium ships a real Chromium binary; puppeteer-core loads it
  // by path at runtime rather than importing it as JS. Bundling either would
  // corrupt the binary, so both stay external -- Next.js requires this list
  // explicitly rather than inferring it from the packages themselves.
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],

  // ─── Why the line above is necessary but not sufficient ───
  //
  // serverExternalPackages stops Next bundling the package's JavaScript. It
  // does NOT copy the package's non-JS files into the deployed function,
  // and @sparticuz/chromium's entire payload is non-JS: bin/chromium.br is a
  // 66MB brotli archive opened by a path COMPUTED AT RUNTIME. Output file
  // tracing follows static imports, so nothing in the build can see that
  // file referenced anywhere, and it was silently left out of the bundle.
  //
  // The symptom was /api/export-email returning 502 in about a second on
  // production while working locally -- fast because there was no archive to
  // extract, and fine locally because dev uses a real installed Chrome
  // (localChromePath()) and never touches this package at all. Nothing in
  // the build log warned about it.
  //
  // Keep the glob pointed at bin/: swiftshader, fonts and the AL2023 shared
  // libraries live there too, and Chromium fails to start without them.
  outputFileTracingIncludes: {
    "/api/export-email": ["./node_modules/@sparticuz/chromium/bin/**"],
  },

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
