import { Suspense } from "react";
import { SbiArticle } from "./_components/content";

export const metadata = {
  title: "SBI deceased account claim process — Adhikaar",
  description:
    "What State Bank of India itself publishes about claiming a deceased customer's account: its threshold, its claim forms, its position on third-party surety, and where it goes further than the RBI's floor.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SbiArticle />
    </Suspense>
  );
}
