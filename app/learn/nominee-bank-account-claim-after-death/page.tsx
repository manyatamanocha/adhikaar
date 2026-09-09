import { Suspense } from "react";
import { NomineeArticle } from "./_components/content";

export const metadata = {
  title: "Nominee bank account claim after death — Adhikaar",
  description:
    "If a nominee was registered on a bank account, the RBI's 2025 Directions say no succession certificate is required, whatever the amount. What that means, and what a nominee actually receives.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <NomineeArticle />
    </Suspense>
  );
}
