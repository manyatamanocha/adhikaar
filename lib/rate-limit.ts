/**
 * One in-memory sliding-window rate limiter, shared by every public route
 * that needs one.
 *
 * Extracted 9 Sep 2026 from two hand-rolled copies (/api/saathi and
 * /api/export-email) that had drifted apart in their comments while doing
 * exactly the same thing, and now also used by /api/events.
 *
 * ─── What this is honestly worth ───
 *
 * The state is a Map in one server instance's memory. On Vercel that means
 * it resets on redeploy AND is not shared across instances, so a limit of N
 * per window is really "N per window, per instance a caller happens to
 * land on." Under concurrency the effective ceiling is some multiple of N.
 *
 * That is worth having anyway -- it turns casual abuse into something that
 * needs deliberate effort -- but it is NOT a security boundary, and nothing
 * that matters should be built on it being exact. Move to a shared store
 * (Redis/Upstash) before relying on it under real load.
 */

export type RateLimiter = (key: string, now?: number) => boolean;

/**
 * Returns a function that reports whether `key` has exhausted its allowance,
 * recording the call when it has not.
 *
 * `now` is injectable so the window can be tested without waiting on a real
 * clock; production callers pass nothing.
 */
export function createRateLimiter(limit: number, windowMs: number): RateLimiter {
  const hits = new Map<string, number[]>();

  return function isRateLimited(key: string, now: number = Date.now()): boolean {
    const fresh = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

    if (fresh.length >= limit) {
      // Write the pruned list back even on rejection, so a key that stops
      // being hit does not keep its expired timestamps forever.
      hits.set(key, fresh);
      return true;
    }

    fresh.push(now);
    hits.set(key, fresh);
    return false;
  };
}

/**
 * The caller's IP as Vercel reports it, or a single shared bucket when it
 * cannot be determined. Falling back to one shared key is deliberate: an
 * unidentifiable caller should be limited alongside every other
 * unidentifiable caller, never handed its own private allowance.
 */
export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}
