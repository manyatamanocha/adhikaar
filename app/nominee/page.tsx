import { OutcomePage } from "../_components/outcome";

export const metadata = {
  title: "A nominee was registered — Adhikaar",
  description:
    "Where a nominee is registered, paragraph 9 of the RBI's 2025 Directions says the bank shall not insist on a succession certificate, probate, letter of administration, indemnity bond or surety — irrespective of the amount.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <OutcomePage id="nominee" sp={await searchParams} />;
}
