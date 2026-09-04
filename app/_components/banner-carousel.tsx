/**
 * The hero picture strip.
 *
 * Three scrollable illustrations, as asked for after myscheme.gov.in, but
 * living inside the hero's right column rather than as a separate rotating
 * banner above it — the brief's hero is "family documents plus three floating
 * cards", and a full-width banner carousel on top of that would be two heroes.
 *
 * ─── No JavaScript ───
 *
 * A scroll-snap strip: the track scrolls horizontally with
 * `scroll-snap-type: x mandatory`, each picture snaps, and the dots are
 * ordinary `#anchor` links. So it swipes with a thumb, scrolls with a
 * trackpad, and works with JavaScript off. It deliberately does NOT
 * auto-rotate: an advancing picture steals the page from someone reading
 * slowly, and these readers are grieving and tired.
 *
 * ─── Drawn, not photographed ───
 *
 * There is no image generation in this session, and a stock photograph of a
 * grieving family would be worse than none. Each is an authored SVG scene in
 * the product's palette. The brief's own ban is honoured: no coins, no rupee
 * symbols raining down, no emblem that could pass for a government mark.
 */

const SCENES = [
  { id: "pic-1", label: "A passbook and papers on a table", art: <DeskScene /> },
  { id: "pic-2", label: "A path leading to an official building", art: <InstitutionScene /> },
  { id: "pic-3", label: "Separate institutions, each with its own process", art: <RailsScene /> },
];

export function HeroPictures() {
  return (
    <div>
      <div className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-2xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SCENES.map((s) => (
          <figure
            key={s.id}
            id={s.id}
            aria-label={s.label}
            className="w-full shrink-0 snap-center"
          >
            {s.art}
          </figure>
        ))}
      </div>

      <ol
        data-print="hide"
        className="mt-4 flex items-center justify-center gap-2.5"
      >
        {SCENES.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-label={`Picture ${i + 1} of ${SCENES.length}`}
              className={`block h-2.5 rounded-full bg-rule transition-all hover:bg-indigo ${
                i === 0 ? "w-7 bg-indigo" : "w-2.5"
              }`}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Authored scenes. Flat shapes in the product palette, line detail on top. */

const GREEN = "#5C1B28";
const GREEN_SOFT = "#dde1ea";
const OCHRE = "#A87A1E";
const CREAM = "#f3eee3";
const PAPER = "#ffffff";
const RULE = "#e4dcc8";

/** A table with a passbook, papers and a cup: where the paperwork happens. */
function DeskScene() {
  return (
    <svg viewBox="0 0 440 300" className="h-auto w-full" role="img" aria-label="A passbook and papers on a table">
      <rect x="0" y="0" width="440" height="300" rx="18" fill={GREEN_SOFT} />
      <circle cx="360" cy="70" r="52" fill={PAPER} opacity="0.55" />
      <rect x="30" y="214" width="380" height="12" rx="6" fill={GREEN} opacity="0.85" />
      <rect x="96" y="96" width="150" height="112" rx="6" fill={PAPER} stroke={RULE} strokeWidth="2" transform="rotate(-6 171 152)" />
      <rect x="122" y="112" width="150" height="102" rx="6" fill={PAPER} stroke={RULE} strokeWidth="2" />
      <path d="M140 136h114M140 152h114M140 168h74" stroke={RULE} strokeWidth="3" strokeLinecap="round" />
      <rect x="250" y="146" width="118" height="70" rx="8" fill={GREEN} />
      <rect x="262" y="158" width="94" height="8" rx="4" fill={PAPER} opacity="0.75" />
      <rect x="262" y="174" width="60" height="8" rx="4" fill={OCHRE} />
      <rect x="262" y="190" width="76" height="6" rx="3" fill={PAPER} opacity="0.45" />
      <path d="M74 178h44v22a12 12 0 0 1-12 12H86a12 12 0 0 1-12-12z" fill={CREAM} stroke={GREEN} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M118 184h9a9 9 0 0 1 0 18h-9" stroke={GREEN} strokeWidth="2.5" fill="none" />
      <path d="M88 164c0-6 8-6 8-12M104 164c0-6 8-6 8-12" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <path d="M382 214v-30" stroke={GREEN} strokeWidth="3" strokeLinecap="round" />
      <path d="M382 190c-14-4-18-16-14-26 12 2 18 12 14 26zM382 196c13-6 15-18 10-27-11 4-15 15-10 27z" fill={GREEN} opacity="0.8" />
      <rect x="366" y="214" width="32" height="22" rx="4" fill={OCHRE} opacity="0.85" />
    </svg>
  );
}

/** A pillared institution at the end of a marked path. */
function InstitutionScene() {
  return (
    <svg viewBox="0 0 440 300" className="h-auto w-full" role="img" aria-label="A path leading to an official building">
      <rect x="0" y="0" width="440" height="300" rx="18" fill={GREEN_SOFT} />
      <circle cx="86" cy="76" r="44" fill={PAPER} opacity="0.5" />
      <path d="M40 258c70 0 74-52 132-52s70-40 128-40" stroke={GREEN} strokeWidth="3" strokeDasharray="10 12" strokeLinecap="round" fill="none" opacity="0.6" />
      <circle cx="40" cy="258" r="9" fill={OCHRE} />
      <rect x="252" y="150" width="150" height="14" rx="4" fill={GREEN} />
      <path d="M246 150l81-44 81 44z" fill={GREEN} />
      <rect x="268" y="164" width="14" height="70" rx="3" fill={PAPER} stroke={GREEN} strokeWidth="2.5" />
      <rect x="300" y="164" width="14" height="70" rx="3" fill={PAPER} stroke={GREEN} strokeWidth="2.5" />
      <rect x="332" y="164" width="14" height="70" rx="3" fill={PAPER} stroke={GREEN} strokeWidth="2.5" />
      <rect x="364" y="164" width="14" height="70" rx="3" fill={PAPER} stroke={GREEN} strokeWidth="2.5" />
      <rect x="246" y="234" width="162" height="14" rx="4" fill={GREEN} />
      <circle cx="327" cy="122" r="17" fill={PAPER} stroke={GREEN} strokeWidth="2.5" />
      <path d="M319 122l6 6 11-12" stroke={GREEN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/** Separate institutions, each on its own rail. */
function RailsScene() {
  const items = [{ x: 44 }, { x: 164 }, { x: 284 }];
  return (
    <svg viewBox="0 0 440 300" className="h-auto w-full" role="img" aria-label="Separate institutions, each with its own process">
      <rect x="0" y="0" width="440" height="300" rx="18" fill={GREEN_SOFT} />
      {items.map((it, i) => (
        <g key={it.x}>
          <rect x={it.x} y={92 + i * 10} width="112" height="112" rx="16" fill={PAPER} stroke={RULE} strokeWidth="2" />
          <rect x={it.x + 16} y={172 + i * 10} width="80" height="7" rx="3.5" fill={RULE} />
          <rect x={it.x + 16} y={186 + i * 10} width="52" height="7" rx="3.5" fill={RULE} opacity="0.6" />
        </g>
      ))}
      <path d="M62 148h76L100 124zM70 156v22M88 156v22M112 156v22M130 156v22M62 182h76" stroke={GREEN} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M180 156a40 40 0 0 1 80 0z" fill={GREEN} opacity="0.85" />
      <path d="M220 156v30a11 11 0 0 0 22 0" stroke={GREEN} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M300 196h96M312 196v-24M336 196v-44M360 196v-30M384 196v-56" stroke={GREEN} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M156 250h24M276 250h24" stroke={OCHRE} strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round" />
    </svg>
  );
}
