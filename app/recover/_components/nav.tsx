import Link from "next/link";
import { LeafMark } from "./brand";
import { ChevronDownIcon, ArrowRightIcon } from "./icons";

/**
 * Rebuilt 5 Sep 2026 against a user-supplied reference image: leaf mark +
 * tagline, a four-item nav, a decorative language selector (no i18n switch
 * lives here -- the site's actual language routing is elsewhere), and a
 * "Start a Search" button. The reference's own RBI-seal badge and tricolour
 * flag are NOT reproduced anywhere on this homepage -- excluded per the
 * standing rule (no state emblem, no ministry mark, no tricolour), and
 * reconfirmed directly when this reference was brought back.
 */
export function RecoverNav() {
  return (
    <header className="bg-[#FAF5EC] text-[#16233F]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <LeafMark className="h-8 w-8" />
          <span className="leading-tight">
            <span className="block font-serif text-[1.375rem] font-bold">Adhikaar</span>
            <span className="block text-[0.6875rem] text-[#6B6255]">
              What&apos;s yours should find its way home.
            </span>
          </span>
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-7 text-[0.9375rem] sm:flex">
          <a href="#how" className="text-[#4A4335] transition-colors hover:text-[#16233F]">
            How it works
          </a>
          <a href="#find" className="text-[#4A4335] transition-colors hover:text-[#16233F]">
            What you can find
          </a>
          <a href="#faq" className="text-[#4A4335] transition-colors hover:text-[#16233F]">
            FAQs
          </a>
          <Link href="/guide" className="text-[#4A4335] transition-colors hover:text-[#16233F]">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-1 text-[0.875rem] text-[#4A4335] sm:flex">
            EN
            <ChevronDownIcon className="h-3.5 w-3.5" />
          </span>
          <Link
            href="/start"
            className="inline-flex items-center gap-2 rounded bg-[#E2653B] px-5 py-2.5 text-[0.9375rem] font-bold text-white transition-colors hover:bg-[#C9532C]"
          >
            Start a Search
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
