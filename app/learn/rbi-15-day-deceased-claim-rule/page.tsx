import { Suspense } from "react";
import { FifteenDayArticle } from "./_components/content";

export const metadata = {
  title: "RBI 15-day deceased claim rule — Adhikaar",
  description:
    "The RBI's 2025 Directions require a bank to settle a deceased customer's claim within 15 calendar days of receiving a complete set of documents — and pay compensation if it is late. What starts the clock, and how to prove it.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <FifteenDayArticle />
    </Suspense>
  );
}
