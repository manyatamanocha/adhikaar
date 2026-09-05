"use client";

import { createContext } from "react";
import { useSearchParams } from "next/navigation";
import { parseLocale, type Locale } from "@/lib/i18n";
import type { HomeDict } from "@/lib/i18n-home";
import { HOME_T } from "@/lib/i18n-home";

/** Shared locale + dictionary for the homepage's component tree -- avoids
    threading `t` through every section as a prop. */
const HomeI18nContext = createContext<{ t: HomeDict; locale: Locale }>({
  t: HOME_T.en,
  locale: "en",
});

export const HomeI18nProvider = HomeI18nContext.Provider;

/** Only the locale crosses the server boundary; dictionaries contain functions. */
export function HomeLocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <HomeI18nProvider value={{ t: HOME_T[locale], locale }}>{children}</HomeI18nProvider>;
}

export function useHomeT() {
  const params = useSearchParams();
  const locale = parseLocale(params.get("lang") ?? undefined);
  return { t: HOME_T[locale], locale };
}
