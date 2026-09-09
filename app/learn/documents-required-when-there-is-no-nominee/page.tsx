import { Suspense } from "react";
import { NoNomineeDocsArticle } from "./_components/content";

export const metadata = {
  title: "Documents required when there is no nominee — Adhikaar",
  description:
    "Where there is no nominee and the claim is below the RBI's threshold, banks must settle on a fixed list of six documents — real cost and time for each, and what is not on the list.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <NoNomineeDocsArticle />
    </Suspense>
  );
}
