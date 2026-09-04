import { RecoverPage } from "./_components/recover-page";

export const metadata = {
  title: "Adhikaar — money left behind shouldn't stay lost",
  description:
    "Adhikaar helps families find and claim financial assets left behind by a loved one, with one simple, guided process.",
};

export default function Page() {
  return (
    <>
      {/*
        THESIS: recovery is a guided journey, not a single answer -- the
        page proves this by showing the journey, not by listing what it does.

        OWN-WORLD: deep navy #16233F on warm ivory #FBF8F2, muted saffron
        #BE7519 used only as icon fills, thin threads and tinted chips --
        never as a text ground, which the earlier contrast pass showed
        fails at 2.7:1. Serif display (the site's existing Spectral) over a
        plain sans UI voice. A dashed thread motif connects every step,
        appearing three times: the hero, the journey, the footer.

        STORY: a visitor worried something was left behind previews a real
        product screen, understands the three-step journey, sees what can
        be recovered and how a claim is guided afterward, and starts.

        FIRST VIEWPORT: headline and CTAs left; an interactive, honestly-
        labelled search-preview panel right -- never a stock photograph,
        never a fabricated "match found".

        FORM: user-pinned brief, built directly; concept-seed skipped per
        its own rule for a fully specified request.

        FINISH: unreviewed and undocumented is unfinished; this build ends
        with the finish review, the verdict, DESIGN.md, and every shipping
        raster carrying its provenance.
      */}
      <RecoverPage />
    </>
  );
}
