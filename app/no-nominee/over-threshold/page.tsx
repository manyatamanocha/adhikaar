import { OutcomePage } from "../../_components/outcome";

export const metadata = {
  title: "No nominee, at or above the threshold — Adhikaar",
  description:
    "With no nominee and an aggregate at or above the threshold, a succession certificate or equivalent may genuinely be required. Two things move claims below the line more often than people expect.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <OutcomePage
      id="over-threshold"
      sp={await searchParams}
    />
  );
}
