import { OutcomePage } from "../_components/outcome";

export const metadata = {
  title: "The heirs are in dispute — Adhikaar",
  description:
    "Where there are contesting claims among the legal heirs, paragraph 11(b) says the bank requires a probate, letter of administration, succession certificate or court order. That overrides every other answer on this site.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <OutcomePage id="dispute" sp={await searchParams} />;
}
