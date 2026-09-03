import { OutcomePage } from "../_components/outcome";

export const metadata = {
  title: "You have already started court proceedings — Adhikaar",
  description:
    "The RBI's Directions took effect on 31 March 2026, after many cases began. We will not tell you what to do about a case that is already running — here is what changed, so you can put it to your lawyer.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <OutcomePage
      id="already-in-court"
      sp={await searchParams}
    />
  );
}
