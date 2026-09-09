import { Suspense } from "react";
import { LearnIndexContent } from "./_components/content";

export const metadata = {
  title: "Learn — Adhikaar",
  description:
    "Bank-by-bank and rule-by-rule articles on claiming a deceased customer's bank account under the RBI's 2025 Directions.",
};

export default function LearnIndex() {
  return (
    <Suspense fallback={null}>
      <LearnIndexContent />
    </Suspense>
  );
}
