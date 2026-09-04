"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n";
import type { HomeDict } from "@/lib/i18n-home";
import { HOME_T } from "@/lib/i18n-home";

/** Shared locale + dictionary for the homepage's component tree -- avoids
    threading `t` through every section as a prop. */
const HomeI18nContext = createContext<{ t: HomeDict; locale: Locale }>({
  t: HOME_T.en,
  locale: "en",
});

export const HomeI18nProvider = HomeI18nContext.Provider;

export function useHomeT() {
  return useContext(HomeI18nContext);
}
