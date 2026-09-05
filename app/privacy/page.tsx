import Link from "next/link";
import { RecoverNav } from "../recover/_components/nav";
import { RecoverFooter } from "../recover/_components/footer";
import { PRIVACY_SUMMARY_BY_LOCALE } from "@/lib/privacy";
import { parseLocale, withLang } from "@/lib/i18n";
import { HOME_T } from "@/lib/i18n-home";

export const metadata = { title: "Privacy — Adhikaar", description: "How Adhikaar's claim guide uses page links, browser storage and optional analytics." };

export default async function PrivacyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const locale = parseLocale(sp.lang);
  const t = HOME_T[locale].privacyPage;

  return <>
    <RecoverNav />
    <main className="shell max-w-[860px] flex-1 py-10 sm:py-14" lang={locale}>
      <h1 className="display-xl font-serif font-bold text-indigo-ink">{t.heading}</h1>
      <p className="mt-3 text-ink-soft">{t.updated}</p>
      <p className="body-fluid mt-6">{PRIVACY_SUMMARY_BY_LOCALE[locale]}</p>
      <section className="body-fluid mt-8 space-y-4">
        <h2 className="display-md font-serif font-bold">{t.linkSectionHeading}</h2>
        <p>{t.linkSectionBody}</p>
        <h2 className="display-md pt-4 font-serif font-bold">{t.deviceSectionHeading}</h2>
        <p>{t.deviceSectionBody}</p>
        <h2 className="display-md pt-4 font-serif font-bold">{t.analyticsSectionHeading}</h2>
        <p>{t.analyticsSectionBody}</p>
        <h2 className="display-md pt-4 font-serif font-bold">{t.contactSectionHeading}</h2>
        <p>{t.contactSectionBody}</p>
        <p>{t.chatNote}</p>
        <h2 className="display-md pt-4 font-serif font-bold">{t.questionsSectionHeading}</h2>
        <p><Link href={withLang("/contact", locale)} className="text-link underline">{t.contactAdhikaar}</Link> {t.questionsSectionBody}</p>
      </section>
    </main>
    <RecoverFooter />
  </>;
}
