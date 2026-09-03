import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Source_Sans_3,
  Merriweather,
  Noto_Sans_Devanagari,
} from "next/font/google";
import "./globals.css";
import { Analytics } from "./_components/analytics";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

/* Headlines. The reference portal sets its display type in Merriweather. */
const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

const notoDeva = Noto_Sans_Devanagari({
  variable: "--font-noto-deva",
  subsets: ["devanagari"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adhikaar — you probably do not need a succession certificate",
  description:
    "The bank asked for a succession certificate. Since 31 March 2026 the RBI's rules say a bank usually must not insist on one for a deposit claim. Answer four questions and print a page quoting the rule and your bank's own policy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${merriweather.variable} ${notoDeva.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {/*
          THESIS: A bereaved family is told to get a succession certificate —
          ₹17,000 and 4-7 months — for money the RBI says they can usually claim
          without one. Adhikaar hands them the rule in the register of the
          official financial portals it cites. It refuses the friendly legal-SaaS
          card deck, whose startup styling loses authority at the one place that
          matters: a bank counter.

          OWN-WORLD: Indian official financial-services portal, sampled from
          unclaimedassetsportal.in — indigo #2d3079 on pale blue-grey #f4f6fa,
          maroon #7b1e3a for anything that can hurt you, saffron #fe7f01 for the
          one action per screen. Source Sans 3. Rounded rectangles and pill
          actions. Register borrowed, identity never: no emblem, no ministry
          mark, no tricolour.

          STORY: The visitor arrives holding a demand they believe is lawful.
          They learn the rule changed on 31 March 2026, answer four questions,
          and leave with a printable page carrying the RBI's own sentence and
          their bank's own published policy — to hand across the counter.

          FIRST VIEWPORT: Indigo bar, then the claim in one line at display
          size, the lede beneath it, and one saffron action. Immediately under
          the fold-line: what a search tells you, set against what the rule
          actually says, as two facing blocks — the product's whole argument
          before any question is asked.

          FORM: Public financial-notice portal; user-supplied reference,
          which outranks the roll. Seed key 711c1777, direction round abandoned
          in favour of the user's own reference.

          FINISH: unreviewed and undocumented is unfinished; this build ends
          with the finish review, the verdict, DESIGN.md, and every shipping
          raster carrying its provenance.
        */}
        {/* Reads route changes to derive events. Suspended so it can never
            hold up the first paint of a page someone is reading at a counter,
            and a no-op entirely when no Mixpanel token is configured. */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
