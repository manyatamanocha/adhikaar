"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RecoverNav } from "../../recover/_components/nav";
import { HomeI18nProvider, useHomeT } from "../../recover/_components/home-i18n";
import { LeafMark } from "../../recover/_components/brand";
import { parseLocale, withLang } from "@/lib/i18n";
import { HOME_T } from "@/lib/i18n-home";

/**
 * Full FAQ page -- English only for now (content supplied directly, not
 * yet added to lib/i18n-home.ts's three-locale HomeDict; the homepage's
 * own short 4-question Faq() there is unrelated and untouched). First six
 * questions render open, the rest sit under "More questions" collapsed,
 * same as the homepage's progressive-disclosure pattern elsewhere on the
 * site. Each answer links to whichever of the guide / bank page /
 * checklist / escalation route actually applies -- never all four, since
 * most answers only touch one or two of those.
 */

type Faq = {
  q: string;
  a: string;
  links?: { label: string; href: string }[];
  highlight?: boolean;
};

const FAQS: Faq[] = [
  {
    q: "What is Adhikaar?",
    a: "Adhikaar is an independent guidance tool that helps Indian families understand what to do when claiming money or bank deposits left behind by someone who has died.",
  },
  {
    q: "Is Adhikaar a government website?",
    a: "No. Adhikaar is independent. It does not represent the RBI, any bank, or the Government of India.",
  },
  {
    q: "Does Adhikaar search for my family's money?",
    a: "No. Adhikaar cannot search private bank or financial records. It points you to official sources and helps explain the next steps after you find a possible asset.",
    highlight: true,
    links: [{ label: "Official sources this points to", href: "/guide" }],
  },
  {
    q: "Does Adhikaar store my information?",
    a: "No login is required, and Adhikaar does not store your family, account, Aadhaar, PAN, or death-certificate information.",
  },
  {
    q: "Do I need a succession certificate if there was a nominee?",
    a: "Usually, the bank should not insist on a succession certificate, probate, letter of administration, indemnity bond, or surety merely because of the amount. You may still need the claim form, death certificate, and identity proof.",
    links: [
      { label: "The detailed RBI guide", href: "/guide" },
      { label: "Your checklist", href: "/start" },
    ],
  },
  {
    q: "What if there was no nominee?",
    a: "The answer depends on the total amount at that bank and whether all legal heirs agree. Below the applicable threshold, RBI rules provide a simplified procedure with a prescribed document list. Above the threshold, a succession certificate or equivalent document may genuinely be required.",
    links: [
      { label: "The detailed RBI guide", href: "/guide" },
      { label: "Your checklist", href: "/start" },
    ],
  },
  {
    q: "What is the threshold?",
    a: "The RBI floor is ₹15 lakh for commercial banks and ₹5 lakh for co-operative banks. A bank may set a higher limit. The amount is calculated together across accounts held at the same bank.",
    links: [
      { label: "The detailed RBI guide", href: "/guide" },
      { label: "The relevant bank page", href: "/banks" },
    ],
  },
  {
    q: "What if the heirs disagree?",
    a: "A dispute can change the process completely. A court document or court order may be required even when a nominee exists. Adhikaar does not resolve family disputes.",
    links: [{ label: "What a dispute changes", href: "/dispute" }],
  },
  {
    q: "What if I do not know whether there was a nominee?",
    a: "Ask the bank in writing to check its account-opening records and confirm whether a nomination exists. That answer determines which process applies.",
    links: [{ label: "Start your claim", href: "/start" }],
  },
  {
    q: "What if the bank asks me for a surety or succession certificate?",
    a: "Ask the bank to provide the demand in writing and mention the rule it relies on. Then compare the demand with the relevant Adhikaar checklist and bank policy.",
    links: [
      { label: "Your checklist", href: "/what-were-you-asked-for" },
      { label: "The escalation process", href: "/bank-refused" },
    ],
  },
  {
    q: "How long does the bank have to settle the claim?",
    a: "The RBI deadline is 15 calendar days after the bank receives all required documents and considers the claim complete.",
    links: [{ label: "The detailed RBI guide", href: "/guide" }],
  },
  {
    q: "Does this apply to PPF or insurance?",
    a: "No. The bank-deposit rules covered here exclude PPF, SCSS, MSSC, and SSA. Insurance, mutual funds, shares, EPF, and other assets follow separate processes.",
    links: [{ label: "Other assets", href: "/other-assets" }],
  },
  {
    q: "Is Adhikaar legal advice?",
    a: "No. Adhikaar explains published rules and procedures. It does not decide ownership, guarantee an outcome, or replace a lawyer or the institution processing the claim.",
  },
];

const VISIBLE_COUNT = 6;

export function FaqPage() {
  const searchParams = useSearchParams();
  const locale = parseLocale(searchParams.get("lang") ?? undefined);
  const t = HOME_T[locale];

  return (
    <HomeI18nProvider value={{ t, locale }}>
      <div className="min-h-screen bg-[#FAF5EC] text-[#16233F] antialiased">
        <RecoverNav />
        <Body />
        <Footer />
      </div>
    </HomeI18nProvider>
  );
}

function Body() {
  const [showAll, setShowAll] = useState(false);
  const visible = FAQS.slice(0, VISIBLE_COUNT);
  const rest = FAQS.slice(VISIBLE_COUNT);

  return (
    <main className="mx-auto max-w-[1920px] px-5 py-20 sm:px-8">
      <div className="max-w-[820px]">
        <h1 className="font-serif text-[3.25rem] font-bold tracking-[-0.01em] text-[#16233F]">
          Frequently asked questions
        </h1>
        <p className="mt-2 text-[1.5rem] text-[#5B5344]">
          Short answers. Each one links to the fuller page if you want more.
        </p>

        <div className="mt-10 space-y-5">
          {visible.map((f) => (
            <FaqItem key={f.q} f={f} />
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-6">
            {!showAll ? (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="rounded-full border border-[#16233F] px-6 py-3 text-[1.125rem] font-bold text-[#16233F] transition-colors hover:bg-[#16233F] hover:text-white"
              >
                More questions ({rest.length})
              </button>
            ) : (
              <div className="space-y-5">
                {rest.map((f) => (
                  <FaqItem key={f.q} f={f} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function FaqItem({ f }: { f: Faq }) {
  return (
    <div
      className={
        "rounded-2xl bg-white p-7 shadow-[0_16px_40px_rgba(22,35,63,0.08)]" +
        (f.highlight ? " ring-2 ring-[#E2653B]" : "")
      }
    >
      {f.highlight && (
        <span className="mb-2 inline-block rounded-full bg-[#E2653B]/10 px-3 py-1 text-[0.875rem] font-bold uppercase tracking-[0.08em] text-[#E2653B]">
          Most asked
        </span>
      )}
      <h2 className="text-[1.375rem] font-bold text-[#16233F]">{f.q}</h2>
      <p className="mt-2 text-[1.125rem] leading-relaxed text-[#3A4256]">{f.a}</p>
      {f.links && f.links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          {f.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[1rem] font-bold text-[#E2653B] hover:underline"
            >
              {l.label} &rarr;
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Footer() {
  const { t, locale } = useHomeT();
  return (
    <footer className="border-t border-[#EFE7D8] bg-white py-16 text-[1.125rem] text-[#6B6255]">
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <Link href={withLang("/", locale)} className="flex items-center gap-4">
            <LeafMark className="h-[3.575rem] w-[3.575rem]" />
            <span className="leading-tight">
              <span className="block font-serif text-[2.275rem] font-bold text-[#16233F]">
                Adhikaar
              </span>
              <span className="block text-[1.2188rem] text-[#6B6255]">{t.tagline}</span>
            </span>
          </Link>
          <p>{t.footer.madeFor}</p>
        </div>
      </div>
    </footer>
  );
}
