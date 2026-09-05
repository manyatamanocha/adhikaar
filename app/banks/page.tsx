import { Suspense } from "react";
import { BanksPage } from "./_components/banks-page";

export const metadata = {
  title: "What each bank publishes — Adhikaar",
  description:
    "Banks compiled from their own published pages: each one's own threshold, its position on third-party surety, its claim forms, whether it has published the policy it is required to publish, and the date we checked.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BanksPage />
    </Suspense>
  );
}
