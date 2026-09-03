import { OutcomePage } from "../_components/outcome";

export const metadata = {
  title: "You don't know whether there was a nominee — Adhikaar",
  description:
    "Most families do not know whether a nominee was registered, and it is the one fact that decides the answer. Ask the branch in writing to check the account-opening records.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <OutcomePage
      id="unknown-nominee"
      sp={await searchParams}
    />
  );
}
