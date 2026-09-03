import { OutcomePage } from "../_components/outcome";

export const metadata = {
  title: "This is outside what we cover — Adhikaar",
  description:
    "Adhikaar covers bank deposit accounts, lockers and safe custody, claimed by an adult heir or nominee. Pensions, insurance, provident fund, shares and mutual funds are claimed elsewhere.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <OutcomePage id="out-of-scope" sp={await searchParams} />
  );
}
