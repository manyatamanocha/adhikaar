import Link from "next/link";
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";
import { PRIVACY_SUMMARY } from "@/lib/privacy";

export const metadata = { title: "Privacy — Adhikaar", description: "How Adhikaar's claim guide uses page links, browser storage and optional analytics." };

export default function PrivacyPage() {
  return <>
    <RecoverNav />
    <main className="shell max-w-[860px] flex-1 py-10 sm:py-14" lang="en">
      <h1 className="display-xl font-serif font-bold text-indigo-ink">Privacy</h1>
      <p className="mt-3 text-ink-soft">Claim guide · Updated 5 September 2026</p>
      <p className="body-fluid mt-6">{PRIVACY_SUMMARY}</p>
      <section className="body-fluid mt-8 space-y-4">
        <h2 className="display-md font-serif font-bold">What is in a guide link?</h2>
        <p>Your selections, such as nominee status, amount category, selected bank and checklist ticks, can be included in the URL. They are not account balances or account numbers. The server receives that URL to render the page; browser history and hosting logs may retain it. Share links only with people you trust.</p>
        <h2 className="display-md pt-4 font-serif font-bold">What stays on your device?</h2>
        <p>The optional deadline tracker saves its date in your browser&apos;s local storage. Clear the tracker or the site&apos;s browser data to remove it. Printing and downloading a guide create copies under your control; Adhikaar cannot delete copies you have shared.</p>
        <h2 className="display-md pt-4 font-serif font-bold">Usage analytics</h2>
        <p>When configured, Mixpanel receives basic events such as a question being answered, the outcome reached, a checklist interaction or a print action. Analytics is configured without persistent browser identifiers, analytics cookies, automatic page views or session recording. It is not a promise that no data reaches a server: network providers can process technical information when handling requests.</p>
        <h2 className="display-md pt-4 font-serif font-bold">Contact and external services</h2>
        <p>If you email us, your email provider and ours process the message and address. Do not send passwords, OTPs, Aadhaar/PAN numbers, bank credentials or personal documents. RBI UDGAM, bank websites and other external services have their own privacy practices; this guide does not search their records or submit claims for you.</p>
        <p>This notice describes the claim guide. Any separate chat service must explain its own data handling before you send information; do not enter sensitive information in chat.</p>
        <h2 className="display-md pt-4 font-serif font-bold">Questions</h2>
        <p><Link href="/contact" className="text-link underline">Contact Adhikaar</Link> about privacy or a message you sent us. Hosting, email and external providers may retain technical records under their own policies; we do not promise instant deletion from those systems.</p>
      </section>
    </main>
    <RecoverFooter />
  </>;
}
