import type { MetadataRoute } from "next";

/**
 * `/admin` is also password-gated (lib/admin-auth.ts) and carries its own
 * `robots: { index: false }` metadata -- this is the third, belt-and-braces
 * layer: keep it out of crawl paths entirely, so it never even gets far
 * enough to notice the noindex tag.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/admin"],
    },
  };
}
