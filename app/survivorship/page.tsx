import { OutcomePage } from "../_components/outcome";

export const metadata = {
  title: "A joint account with survivorship — Adhikaar",
  description:
    "Where a joint account carries a survivorship clause, paragraph 9 of the RBI's 2025 Directions applies exactly as it does to a registered nominee — no succession certificate, no bond, whatever the amount.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <OutcomePage id="survivorship" sp={await searchParams} />
  );
}
