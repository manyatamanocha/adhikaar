import Link from "next/link";
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";
import { LEARN_ARTICLES } from "@/lib/learn";

export const metadata = {
  title: "Learn — Adhikaar",
  description:
    "Bank-by-bank and rule-by-rule articles on claiming a deceased customer's bank account under the RBI's 2025 Directions.",
};

export default function LearnIndex() {
  return (
    <>
      <RecoverNav />

      <main className="flex-1">
        <section className="bg-indigo">
          <div className="shell max-w-[760px] py-10 sm:py-14">
            <h1 className="display-xl font-serif font-bold tracking-[-0.015em] text-white">
              Learn
            </h1>
            <p className="lede-fluid mt-4 max-w-[62ch] text-white/90">
              Rule-by-rule and bank-by-bank articles, each one traced to the RBI&apos;s own
              wording or a bank&apos;s own published page.
            </p>
          </div>
        </section>

        <div className="shell max-w-[760px] py-10 sm:py-12">
          <ul className="space-y-4">
            {LEARN_ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/learn/${a.slug}`}
                  className="group block rounded-xl border-2 border-rule bg-white p-6 transition-all hover:border-indigo hover:shadow-[0_6px_24px_rgba(45,48,121,0.12)]"
                >
                  <h2 className="display-md font-serif font-bold text-indigo-ink">{a.title}</h2>
                  <p className="body-fluid mt-1.5 leading-relaxed text-ink-soft">{a.dek}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <RecoverFooter />
    </>
  );
}
