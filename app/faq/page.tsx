import { Suspense } from "react";
import { FaqPage } from "./_components/faq-page";

export const metadata = {
  title: "FAQs — Adhikaar",
  description:
    "What Adhikaar is, what it does not do, and short answers on nominees, thresholds, disputes, and escalation — each with a link to the fuller page.",
};

export default function Faq() {
  return (
    <Suspense fallback={null}>
      <FaqPage />
    </Suspense>
  );
}
