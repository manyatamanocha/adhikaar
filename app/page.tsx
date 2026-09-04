import { Suspense } from "react";
import { RecoverPage } from "./recover/_components/recover-page";

export const metadata = {
  title: "Adhikaar — money left behind shouldn't stay lost",
  description:
    "Adhikaar helps families find and claim financial assets left behind by a loved one, with one simple, guided process.",
};

/**
 * The homepage. Formerly at /recover -- moved here 4 Sep 2026 so the
 * search-first "find unclaimed money" framing is what a visitor lands on
 * first, per the reference brief. The RBI-cited succession-certificate
 * content that used to live at "/" moved to /guide rather than being
 * discarded; RecoverPage's own components (Situations, GuidedClaim, the
 * search flow) point a visitor there once there's something real to claim.
 *
 * See recover/_components/recover-page.tsx for the page itself and its own
 * direction contract; nothing about the component changed in this move.
 *
 * Suspense boundary added 5 Sep 2026 -- RecoverPage now reads ?lang= via
 * useSearchParams() for its Hindi/Kannada switch, and Next refuses to
 * statically prerender a page that calls it outside a Suspense boundary.
 */
export default function Home() {
  return (
    <Suspense fallback={null}>
      <RecoverPage />
    </Suspense>
  );
}
