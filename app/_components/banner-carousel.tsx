/**
 * The banner carousel.
 *
 * Modelled on myscheme.gov.in's hero: full-bleed illustrated banners with an
 * arrow either side, which the user asked for by name.
 *
 * ─── No JavaScript ───
 *
 * It is a scroll-snap strip: the track scrolls horizontally with
 * `scroll-snap-type: x mandatory`, each panel snaps, and the arrows and dots
 * are ordinary `#anchor` links. So it swipes with a thumb on a phone, scrolls
 * with a trackpad on a desktop, works with JavaScript off, and keeps every
 * panel in the DOM for in-page search and for the printer. No client
 * component, no interval, no state — which also means it does NOT auto-rotate,
 * and that is deliberate: an auto-advancing banner steals the page from
 * someone reading slowly, and this product's readers are grieving and tired.
 *
 * ─── The illustrations are drawn, not photographed ───
 *
 * There is no image generation in this session, and a stock photograph of a
 * grieving family would be worse than none. Each panel carries an authored SVG
 * scene in the product's own palette. The brief's own instruction is honoured:
 * no coins, no rupee symbols raining down, no glassmorphism, no emblem that
 * could be mistaken for a government mark.
 */

import Link from "next/link";

type Banner = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  art: React.ReactNode;
};

const BANNERS: Banner[] = [
  {
    id: "banner-1",
    kicker: "Where to begin",
    title: "Find unclaimed money left behind by a loved one.",
    body: "Bank accounts, investments and other assets can be hard for a family to trace after a death.",
    cta: { label: "Start a family asset search", href: "/start" },
    art: <DeskScene />,
  },
  {
    id: "banner-2",
    kicker: "Official sources",
    title: "UDGAM is the Reserve Bank's own portal. We help you use it.",
    body: "Adhikaar does not replace it. We explain when it helps, what to prepare, and what to do with a match.",
    cta: { label: "Understand UDGAM", href: "/other-assets" },
    art: <InstitutionScene />,
  },
  {
    id: "banner-3",
    kicker: "The whole picture",
    title: "Six places a family may need to check.",
    body: "Deposits, insurance, mutual funds, shares, provident fund and pension each run on their own rails, with their own process.",
    cta: { label: "See where to look", href: "/other-assets" },
    art: <RailsScene />,
  },
];

export function BannerCarousel() {
  return (
    <section aria-roledescription="carousel" aria-label="Adhikaar" className="relative bg-mist">
      <div
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {BANNERS.map((b, i) => {
          const prev = BANNERS[(i - 1 + BANNERS.length) % BANNERS.length];
          const next = BANNERS[(i + 1) % BANNERS.length];
          return (
            <article
              key={b.id}
              id={b.id}
              aria-label={`${i + 1} of ${BANNERS.length}`}
              className="w-full shrink-0 snap-center scroll-mt-0"
            >
              <div className="shell grid items-center gap-8 py-12 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
                <div>
                  <p className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-saffron-ink">
                    {b.kicker}
                  </p>
                  <h2 className="display-lg mt-3 font-serif font-bold tracking-[-0.01em] text-indigo-ink">
                    {b.title}
                  </h2>
                  <p className="body-fluid mt-4 max-w-[52ch] text-ink-soft">
                    {b.body}
                  </p>
                  <Link
                    href={b.cta.href}
                    className="mt-7 inline-flex items-center gap-3 rounded-xl bg-indigo px-7 py-3.5 text-[1rem] font-bold text-white transition-colors hover:bg-indigo-lift"
                  >
                    {b.cta.label}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>

                <div className="order-first lg:order-none">{b.art}</div>
              </div>

              {/* Controls live inside each panel, so an anchor jump lands on a
                  panel whose arrows already point at its own neighbours. */}
              <div
                data-print="hide"
                className="shell flex items-center justify-between gap-4 pb-8"
              >
                <a
                  href={`#${prev.id}`}
                  aria-label="Previous"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-rule bg-paper text-[1.125rem] text-indigo transition-colors hover:border-indigo hover:bg-indigo hover:text-white"
                >
                  <span aria-hidden="true">&larr;</span>
                </a>

                <ol className="flex items-center gap-2.5">
                  {BANNERS.map((d, j) => (
                    <li key={d.id}>
                      <a
                        href={`#${d.id}`}
                        aria-label={`Go to ${j + 1} of ${BANNERS.length}`}
                        aria-current={j === i ? "true" : undefined}
                        className={`block h-2.5 rounded-full transition-all ${
                          j === i
                            ? "w-7 bg-indigo"
                            : "w-2.5 bg-rule hover:bg-indigo/50"
                        }`}
                      />
                    </li>
                  ))}
                </ol>

                <a
                  href={`#${next.id}`}
                  aria-label="Next"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-rule bg-paper text-[1.125rem] text-indigo transition-colors hover:border-indigo hover:bg-indigo hover:text-white"
                >
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Authored scenes. Flat shapes in the product palette, line detail on top.  */

const GREEN = "#2d5443";
const GREEN_SOFT = "#dfe7e0";
const OCHRE = "#c8761a";
const CREAM = "#efe9db";
const PAPER = "#ffffff";
const RULE = "#d8d2c4";

/** A table with a passbook, papers and a cup: where the paperwork happens. */
function DeskScene() {
  return (
    <svg
      viewBox="0 0 440 300"
      className="h-auto w-full"
      role="img"
      aria-label="A passbook and papers on a table"
    >
      <rect x="0" y="0" width="440" height="300" rx="18" fill={GREEN_SOFT} />
      <circle cx="360" cy="70" r="52" fill={PAPER} opacity="0.55" />

      {/* table */}
      <rect x="30" y="214" width="380" height="12" rx="6" fill={GREEN} opacity="0.85" />

      {/* back sheet */}
      <rect x="96" y="96" width="150" height="112" rx="6" fill={PAPER} stroke={RULE} strokeWidth="2" transform="rotate(-6 171 152)" />
      {/* front sheet */}
      <rect x="122" y="112" width="150" height="102" rx="6" fill={PAPER} stroke={RULE} strokeWidth="2" />
      <path d="M140 136h114M140 152h114M140 168h74" stroke={RULE} strokeWidth="3" strokeLinecap="round" />

      {/* passbook */}
      <rect x="250" y="146" width="118" height="70" rx="8" fill={GREEN} />
      <rect x="262" y="158" width="94" height="8" rx="4" fill={PAPER} opacity="0.75" />
      <rect x="262" y="174" width="60" height="8" rx="4" fill={OCHRE} />
      <rect x="262" y="190" width="76" height="6" rx="3" fill={PAPER} opacity="0.45" />

      {/* cup */}
      <path d="M74 178h44v22a12 12 0 0 1-12 12H86a12 12 0 0 1-12-12z" fill={CREAM} stroke={GREEN} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M118 184h9a9 9 0 0 1 0 18h-9" stroke={GREEN} strokeWidth="2.5" fill="none" />
      <path d="M88 164c0-6 8-6 8-12M104 164c0-6 8-6 8-12" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />

      {/* plant */}
      <path d="M382 214v-30" stroke={GREEN} strokeWidth="3" strokeLinecap="round" />
      <path d="M382 190c-14-4-18-16-14-26 12 2 18 12 14 26zM382 196c13-6 15-18 10-27-11 4-15 15-10 27z" fill={GREEN} opacity="0.8" />
      <rect x="366" y="214" width="32" height="22" rx="4" fill={OCHRE} opacity="0.85" />
    </svg>
  );
}

/** A pillared institution at the end of a marked path. */
function InstitutionScene() {
  return (
    <svg
      viewBox="0 0 440 300"
      className="h-auto w-full"
      role="img"
      aria-label="A path leading to an official building"
    >
      <rect x="0" y="0" width="440" height="300" rx="18" fill={GREEN_SOFT} />
      <circle cx="86" cy="76" r="44" fill={PAPER} opacity="0.5" />

      {/* path */}
      <path d="M40 258c70 0 74-52 132-52s70-40 128-40" stroke={GREEN} strokeWidth="3" strokeDasharray="10 12" strokeLinecap="round" fill="none" opacity="0.6" />
      <circle cx="40" cy="258" r="9" fill={OCHRE} />

      {/* building */}
      <rect x="252" y="150" width="150" height="14" rx="4" fill={GREEN} />
      <path d="M246 150l81-44 81 44z" fill={GREEN} />
      <rect x="268" y="164" width="14" height="70" rx="3" fill={PAPER} stroke={GREEN} strokeWidth="2.5" />
      <rect x="300" y="164" width="14" height="70" rx="3" fill={PAPER} stroke={GREEN} strokeWidth="2.5" />
      <rect x="332" y="164" width="14" height="70" rx="3" fill={PAPER} stroke={GREEN} strokeWidth="2.5" />
      <rect x="364" y="164" width="14" height="70" rx="3" fill={PAPER} stroke={GREEN} strokeWidth="2.5" />
      <rect x="246" y="234" width="162" height="14" rx="4" fill={GREEN} />

      {/* a tick, not an emblem */}
      <circle cx="327" cy="122" r="17" fill={PAPER} stroke={GREEN} strokeWidth="2.5" />
      <path d="M319 122l6 6 11-12" stroke={GREEN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/** Separate institutions, each on its own rail. */
function RailsScene() {
  const items = [
    { x: 44, label: "bank" },
    { x: 164, label: "umbrella" },
    { x: 284, label: "chart" },
  ];
  return (
    <svg
      viewBox="0 0 440 300"
      className="h-auto w-full"
      role="img"
      aria-label="Separate institutions, each with its own process"
    >
      <rect x="0" y="0" width="440" height="300" rx="18" fill={GREEN_SOFT} />

      {items.map((it, i) => (
        <g key={it.label}>
          <rect x={it.x} y={92 + i * 10} width="112" height="112" rx="16" fill={PAPER} stroke={RULE} strokeWidth="2" />
          <rect x={it.x + 16} y={172 + i * 10} width="80" height="7" rx="3.5" fill={RULE} />
          <rect x={it.x + 16} y={186 + i * 10} width="52" height="7" rx="3.5" fill={RULE} opacity="0.6" />
        </g>
      ))}

      {/* bank */}
      <path d="M62 148h76L100 124zM70 156v22M88 156v22M112 156v22M130 156v22M62 182h76" stroke={GREEN} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* umbrella */}
      <path d="M180 156a40 40 0 0 1 80 0z" fill={GREEN} opacity="0.85" />
      <path d="M220 156v30a11 11 0 0 0 22 0" stroke={GREEN} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* chart */}
      <path d="M300 196h96M312 196v-24M336 196v-44M360 196v-30M384 196v-56" stroke={GREEN} strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* they do not connect */}
      <path d="M156 250h24M276 250h24" stroke={OCHRE} strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round" />
    </svg>
  );
}
