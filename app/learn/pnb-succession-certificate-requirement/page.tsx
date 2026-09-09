import { Suspense } from "react";
import { PnbArticle } from "./_components/content";

export const metadata = {
  title: "PNB succession certificate requirement — Adhikaar",
  description:
    "When Punjab National Bank actually requires a succession certificate for a deceased customer's claim, and when its own published rules say it should not — read from PNB's own page.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PnbArticle />
    </Suspense>
  );
}
