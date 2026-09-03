/**
 * /discovery/variants — three hero treatments, stacked, to choose between.
 *
 * Not a page anyone ships. A comparison sheet: the same headline, the same
 * button, the same palette, three different ways of carrying a picture. Pick
 * one and it becomes /discovery's hero.
 *
 * ─── About the photographs ───
 *
 * `public/images/hands.jpg` and `frame.jpg` are CROPPED OUT OF THE USER'S OWN
 * ChatGPT mockup (`ChatGPT Image Sep 4, 2026, 03_09_34 AM.png`). They are
 * placeholders so the layout can be judged with a real photograph in it — they
 * are not licensed stock and should be replaced before anything ships publicly.
 * There is no image generation in this session; this is the honest way to get a
 * photograph on the screen tonight.
 *
 * Variant C uses no photograph at all — the authored SVG scenes — so the choice
 * includes "no photo" as a real option rather than assuming one is wanted.
 */

import Link from "next/link";
import { HeroPictures } from "../../_components/banner-carousel";
import { parseLocale, withLang, type Locale } from "@/lib/i18n";
import { D } from "@/lib/i18n-discovery";

export const metadata = { title: "Adhikaar — hero options" };

export default async function Variants({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const lang = parseLocale((await searchParams).lang);

  return (
    <main className="flex-1 bg-paper">
      <div className="shell py-10">
        <h1 className="font-serif text-[2rem] font-bold text-indigo-ink">
          Three hero options
        </h1>
        <p className="mt-2 max-w-[70ch] text-[1.0625rem] text-ink-soft">
          Same headline, same button, same palette. Only the picture treatment
          differs. Tell me A, B or C and it becomes the real hero.
        </p>
        <p className="mt-3 max-w-[70ch] rounded-xl border border-maroon/35 bg-blush px-4 py-3 text-[0.9375rem] text-ink">
          <strong className="font-bold">The photographs are placeholders</strong>{" "}
          cropped out of your own ChatGPT mockup, so the layout can be judged
          with a real photo in it. They are not licensed stock — replace before
          anything ships publicly.
        </p>
      </div>

      <VariantLabel
        letter="A"
        name="Photo beside the words"
        note="The mockup's own layout. Photograph on the right, two small cards over it. Warmest of the three; needs a real licensed photograph."
      />
      <HeroA lang={lang} />

      <VariantLabel
        letter="B"
        name="Photo as a wide band"
        note="myScheme's approach. The picture runs the full width behind a tinted panel, text sitting on top. Boldest; the photo has to be good, and text over a photo is always a contrast risk."
      />
      <HeroB lang={lang} />

      <VariantLabel
        letter="C"
        name="Drawn scenes, no photograph"
        note="Three authored illustrations you can swipe. Nothing to license, nothing to replace, and no stock photo of a grieving family. Quietest of the three."
      />
      <HeroC lang={lang} />

      <div className="shell py-14">
        <Link
          href={withLang("/discovery", lang)}
          className="font-bold text-link underline underline-offset-2"
        >
          &larr; Back to /discovery
        </Link>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */

function VariantLabel({
  letter,
  name,
  note,
}: {
  letter: string;
  name: string;
  note: string;
}) {
  return (
    <div className="border-t border-rule bg-mist-deep">
      <div className="shell flex flex-wrap items-baseline gap-x-4 gap-y-1 py-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo font-serif text-[1.375rem] font-bold text-white">
          {letter}
        </span>
        <span className="font-serif text-[1.5rem] font-bold text-indigo-ink">
          {name}
        </span>
        <span className="w-full max-w-[74ch] text-[1rem] text-ink-soft">
          {note}
        </span>
      </div>
    </div>
  );
}

function Words({ lang, onDark }: { lang: Locale; onDark?: boolean }) {
  const d = D[lang];
  return (
    <div>
      <h2
        className={`font-serif text-[clamp(2.25rem,4.4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.02em] ${
          onDark ? "text-white" : "text-indigo-ink"
        }`}
      >
        {d.heroTitle}
      </h2>
      <p
        className={`mt-5 max-w-[48ch] text-[clamp(1.125rem,1.5vw,1.375rem)] leading-[1.5] ${
          onDark ? "text-white/85" : "text-ink-soft"
        }`}
      >
        {d.heroSub}
      </p>
      <Link
        href={withLang("/start", lang)}
        className={`mt-8 inline-flex items-center gap-3 rounded-xl px-8 py-4.5 text-[1.125rem] font-bold transition-colors ${
          onDark
            ? "bg-saffron text-indigo-ink hover:bg-[#ab6314] hover:text-white"
            : "bg-indigo text-white hover:bg-indigo-lift"
        }`}
      >
        {d.startSearch}
        <span aria-hidden="true">&rarr;</span>
      </Link>
      <p
        className={`mt-4 text-[1.0625rem] italic ${
          onDark ? "text-white/70" : "text-ink-soft"
        }`}
      >
        {d.heroNote}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ A */

function HeroA({ lang }: { lang: Locale }) {
  const d = D[lang];
  return (
    <section className="bg-mist">
      <div className="shell grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Words lang={lang} />

        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hands.jpg"
            alt="Two people holding hands across a table"
            width={1200}
            height={456}
            className="h-auto w-full rounded-2xl object-cover"
          />
          <div className="mt-4 flex flex-wrap gap-3 lg:absolute lg:-bottom-6 lg:-left-6 lg:mt-0 lg:flex-col">
            <p className="rounded-xl border border-rule bg-paper px-4 py-3 text-[1rem] font-bold text-indigo-ink shadow-[0_6px_20px_rgba(23,37,29,0.10)]">
              {d.cardBank}
            </p>
            <p className="rounded-xl border border-rule bg-paper px-4 py-3 text-[1rem] font-bold text-indigo-ink shadow-[0_6px_20px_rgba(23,37,29,0.10)]">
              {d.cardInsurance}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ B */

function HeroB({ lang }: { lang: Locale }) {
  return (
    <section className="relative isolate overflow-hidden bg-indigo-ink">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hands.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right opacity-55"
      />
      {/* The words must stay readable over a photograph: a graduated scrim,
          dark where the text is, transparent where the picture should show. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-ink via-indigo-ink/92 to-indigo-ink/35"
      />
      <div className="shell py-16 lg:py-24">
        <div className="max-w-[58%] min-w-[20rem]">
          <Words lang={lang} onDark />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ C */

function HeroC({ lang }: { lang: Locale }) {
  const d = D[lang];
  return (
    <section className="bg-mist">
      <div className="shell grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Words lang={lang} />
        <div>
          <HeroPictures />
          <ul className="mt-5 grid grid-cols-3 gap-3">
            {[d.cardBank, d.cardInsurance, d.cardInvestments].map((l) => (
              <li
                key={l}
                className="rounded-xl border border-rule bg-paper px-3 py-4 text-center text-[1rem] font-bold text-indigo-ink"
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
