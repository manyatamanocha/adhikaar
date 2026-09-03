import { OutcomePage } from "../../_components/outcome";

export const metadata = {
  title: "No nominee, below the threshold — Adhikaar",
  description:
    "With no nominee and an aggregate below the threshold, paragraph 10(a) requires the bank to settle on a fixed list of six documents. A succession certificate is not one of them, and no third-party surety may be obtained.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <OutcomePage
      id="under-threshold"
      sp={await searchParams}
    />
  );
}
