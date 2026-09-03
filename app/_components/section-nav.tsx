/**
 * The jump bar.
 *
 * A verdict page is roughly ten thousand pixels on a phone — it is a reference
 * document, and the length is not the fault: the RBI's own sentences, six
 * documents with real costs, the four counter tactics and the caveats all have
 * to be there, and all of them have to reach paper. What was wrong was that the
 * only way to any of it was the thumb.
 *
 * So this does not hide anything. It gives the page a spine: five destinations,
 * always reachable, one tap each. Someone standing at a counter who needs the
 * paragraph number *now* gets there without scrolling past six documents.
 *
 * It is a <nav>, which the print stylesheet already drops, so it cannot reach
 * the sheet. It holds no state and needs no JavaScript — five anchors and the
 * browser's own scrolling. There is deliberately no scroll-spy: highlighting
 * the current section would need a client component and an observer, and would
 * buy nothing a reader of a document they are scrolling actually needs.
 */

const DESTINATIONS = [
  { id: "steps", label: "Your next steps" },
  { id: "documents", label: "Documents" },
  { id: "evidence", label: "The rule" },
  { id: "tactics", label: "At the counter" },
  { id: "caveats", label: "Caveats" },
] as const;

export function SectionNav({ present }: { present: string[] }) {
  const items = DESTINATIONS.filter((d) => present.includes(d.id));
  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Sections of this page"
      // Fully opaque. A translucent bar let the document badges ghost through
      // the chip labels, and this is a bar someone reads at a bank counter.
      className="sticky top-0 z-30 border-b border-rule bg-white shadow-[0_1px_3px_rgb(15_23_42/0.06)]"
    >
      <div className="shell max-w-[860px]">
        {/* Fades at both ends so a cut-off chip reads as "there is more here"
            rather than as a clipped bug. */}
        <ul
          className="-mx-1 flex gap-1 overflow-x-auto py-2 [-ms-overflow-style:none] [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-16px),transparent)] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((d) => (
            <li key={d.id} className="shrink-0">
              <a
                href={`#${d.id}`}
                className="block whitespace-nowrap rounded-pill px-3 py-1.5 text-[0.875rem] font-semibold text-indigo transition-colors hover:bg-indigo/8 focus-visible:bg-indigo/8"
              >
                {d.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
