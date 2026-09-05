/**
 * "What were you asked for?" — the set difference.
 *
 * The user ticks what the branch demanded. We split it into what the RBI
 * prescribes for their situation and what it does not, each item carrying its
 * paragraph reference.
 *
 * ─── Why this is not a lookup on `DOCUMENTS[id].prescribed` ───
 *
 * That flag describes the six-document list in para 10(a) — the no-nominee
 * case. It is the WRONG answer for a nominee claim, where para 9 forbids an
 * indemnity bond outright even though the same bond is prescribed under 10(a).
 * A single global flag would tell a nominee their indemnity bond was fine, and
 * tell a no-nominee claimant their indemnity bond was an overreach. Both wrong,
 * in opposite directions.
 *
 * So the comparison is always against the list that applies to THIS claim, and
 * the reason line names the paragraph that puts it there.
 *
 * At or above the threshold we refuse to run the comparison at all. Para 10(b)
 * lets the bank require more, so "not in the list" would be a false accusation
 * — and sending someone to argue with a bank on a wrong reading is the worst
 * thing this product could do.
 */

import { DOCUMENTS, NOMINEE_PROCEDURE, SIMPLIFIED_PROCEDURE, type DocId } from "./documents";
import { resolve, type Answers } from "./wizard";
import type { Locale } from "./i18n";

export type Situation = "nominee" | "simplified" | "above-threshold" | "unknown";

export function situationFrom(a: Answers): Situation {
  const step = resolve(a);
  if (step.kind !== "outcome") return "unknown";
  if (step.outcome === "nominee" || step.outcome === "survivorship") return "nominee";
  if (step.outcome === "under-threshold") return "simplified";
  if (step.outcome === "over-threshold") return "above-threshold";
  return "unknown";
}

export const SITUATION_LABEL: Record<Situation, string> = {
  nominee: "A nominee or surviving joint holder is on record",
  simplified: "No nominee, and the total is below the threshold",
  "above-threshold": "No nominee, and the total is at or above the threshold",
  unknown: "Your claim route has not been confirmed yet",
};

/** Translated 5 Sep 2026 -- Adhikaar's own prose, so translatable per the site's rule. */
export const SITUATION_LABEL_BY_LOCALE: Record<Locale, Record<Situation, string>> = {
  en: SITUATION_LABEL,
  hi: {
    nominee: "एक नामांकित व्यक्ति या जीवित संयुक्त धारक दर्ज है",
    simplified: "कोई नामांकित व्यक्ति नहीं, और कुल राशि सीमा से कम है",
    "above-threshold": "कोई नामांकित व्यक्ति नहीं, और कुल राशि सीमा पर या उससे ऊपर है",
    unknown: "आपके दावे का रास्ता अभी तय नहीं हुआ है",
  },
  kn: {
    nominee: "ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಜೀವಂತ ಜಂಟಿ ಖಾತೆದಾರರು ದಾಖಲಾಗಿದ್ದಾರೆ",
    simplified: "ನಾಮನಿರ್ದೇಶಿತರಿಲ್ಲ, ಮತ್ತು ಒಟ್ಟು ಮೊತ್ತ ಮಿತಿಗಿಂತ ಕಡಿಮೆ",
    "above-threshold": "ನಾಮನಿರ್ದೇಶಿತರಿಲ್ಲ, ಮತ್ತು ಒಟ್ಟು ಮೊತ್ತ ಮಿತಿಯಲ್ಲಿ ಅಥವಾ ಅದಕ್ಕಿಂತ ಮೇಲಿದೆ",
    unknown: "ನಿಮ್ಮ ಹಕ್ಕಿನ ಮಾರ್ಗ ಇನ್ನೂ ಖಚಿತಪಡಿಸಲಾಗಿಲ್ಲ",
  },
};

/** The documents that apply to this claim. Nothing else is in the list. */
export function applicableList(s: Situation): DocId[] | null {
  if (s === "nominee") return NOMINEE_PROCEDURE;
  if (s === "simplified") return SIMPLIFIED_PROCEDURE;
  return null; // above-threshold and unknown: no comparison can honestly be run
}

export type Judgement = {
  id: DocId;
  inList: boolean;
  /** The paragraph that decides it, and what that paragraph says. */
  reason: string;
};

export function judge(s: Situation, ids: DocId[], locale: Locale = "en"): Judgement[] | null {
  const list = applicableList(s);
  if (!list) return null;

  return ids.map((id) => {
    // Annex I-E is satisfied by EITHER a legal heir certificate or a
    // declaration about the heirs. The declaration is not a separate demand.
    const inList =
      list.includes(id) ||
      (s === "simplified" && id === "heir-declaration");
    return { id, inList, reason: reasonFor(s, id, inList, locale) };
  });
}

/** Translated 5 Sep 2026 -- Adhikaar's own explanation prose, not RBI-verbatim
 *  text, so translatable; the one embedded direct quote (third-party surety)
 *  stays in English in every locale, same as every other statutory quote. */
function reasonFor(s: Situation, id: DocId, inList: boolean, locale: Locale = "en"): string {
  if (locale === "hi") {
    if (s === "nominee") {
      if (inList) return "पैरा 9 नामांकित व्यक्ति या उत्तरजीविता दावे को दावा फ़ॉर्म, मृत्यु प्रमाणपत्र और आपके अपने पहचान पत्र पर निपटाता है। यह उनमें से एक है।";
      if (id === "succession-certificate" || id === "probate" || id === "indemnity-bond" || id === "third-party-surety") {
        return "पैरा 9 इसका नाम लेता है: बैंक उत्तराधिकार प्रमाणपत्र, प्रशासन पत्र या प्रोबेट पर ज़ोर नहीं देगा, या कोई क्षतिपूर्ति बॉन्ड या ज़मानत नहीं माँगेगा — खाते में राशि चाहे जितनी हो।";
      }
      return "जहाँ नामांकित व्यक्ति या उत्तरजीवी दर्ज है, वहाँ पैरा 9 इसकी माँग नहीं करता, और यह उन दस्तावेज़ों में शामिल नहीं जो RBI का अपना दावा फ़ॉर्म ऐसे मामलों के लिए माँगता है।";
    }
    if (inList) {
      if (id === "heir-declaration") return "पैरा 10(a) इसे क़ानूनी उत्तराधिकारी प्रमाणपत्र के विकल्प के रूप में, Annex I-E के तहत स्वीकार करता है। दोनों में से कोई भी सूची को पूरा करता है, और यह कहीं तेज़ है।";
      return "यह पैरा 10(a) की सूची के छह दस्तावेज़ों में से एक है। बैंक को इसी सूची पर दावा निपटाना है।";
    }
    if (id === "third-party-surety") return 'पैरा 10(a): "No bond of surety from a third-party shall be obtained in case of claims up to the threshold limit."';
    if (id === "succession-certificate" || id === "probate") return "पैरा 10(a) के छह दस्तावेज़ों में शामिल नहीं। पैरा 10(b) उत्तराधिकार प्रमाणपत्र को सीमा पर या उससे ऊपर के दावों के लिए, और पैरा 11(b) जहाँ उत्तराधिकारी विवाद में हों उनके लिए सुरक्षित रखता है।";
    if (id === "affidavit") return "पैरा 10(b) सीमा पर या उससे ऊपर के दावों के लिए किसी अधिकारी के सामने ली गई शपथ का विकल्प देता है। यह सीमा से कम दावों के लिए पैरा 10(a) की सूची में नहीं है।";
    if (id === "vanshavali") return "छह में शामिल नहीं। पैरा 10(a) जो सूचीबद्ध करता है वह है क़ानूनी उत्तराधिकारी प्रमाणपत्र या उत्तराधिकारियों के बारे में घोषणा — Annex I-E।";
    return "सरलीकृत प्रक्रिया के लिए पैरा 10(a) की सूची के छह दस्तावेज़ों में शामिल नहीं।";
  }

  if (locale === "kn") {
    if (s === "nominee") {
      if (inList) return "ಪ್ಯಾರಾ 9 ನಾಮನಿರ್ದೇಶಿತ ಅಥವಾ ಉತ್ತರಜೀವಿತ್ವ ಹಕ್ಕನ್ನು ಹಕ್ಕು ಫಾರ್ಮ್, ಮರಣ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ನಿಮ್ಮ ಸ್ವಂತ ಗುರುತಿನ ಚೀಟಿಯ ಮೇಲೆ ಇತ್ಯರ್ಥಗೊಳಿಸುತ್ತದೆ. ಇದು ಅವುಗಳಲ್ಲಿ ಒಂದು.";
      if (id === "succession-certificate" || id === "probate" || id === "indemnity-bond" || id === "third-party-surety") {
        return "ಪ್ಯಾರಾ 9 ಇದನ್ನು ಹೆಸರಿಸುತ್ತದೆ: ಬ್ಯಾಂಕ್ ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರ, ಆಡಳಿತ ಪತ್ರ ಅಥವಾ ಪ್ರೊಬೇಟ್ ಒತ್ತಾಯಿಸಬಾರದು, ಅಥವಾ ಯಾವುದೇ ಕ್ಷತಿಪೂರಣ ಬಾಂಡ್ ಅಥವಾ ಜಾಮೀನು ಕೇಳಬಾರದು — ಖಾತೆಯಲ್ಲಿನ ಮೊತ್ತ ಎಷ್ಟೇ ಇರಲಿ.";
      }
      return "ನಾಮನಿರ್ದೇಶಿತರು ಅಥವಾ ಉತ್ತರಜೀವಿ ದಾಖಲಾಗಿರುವಲ್ಲಿ ಪ್ಯಾರಾ 9 ಇದನ್ನು ಕೇಳುವುದಿಲ್ಲ, ಮತ್ತು ಅಂತಹ ಪ್ರಕರಣಗಳಿಗೆ RBI ಯ ಸ್ವಂತ ಹಕ್ಕು ಫಾರ್ಮ್ ಕೇಳುವ ದಾಖಲೆಗಳಲ್ಲಿ ಇದು ಸೇರಿಲ್ಲ.";
    }
    if (inList) {
      if (id === "heir-declaration") return "ಪ್ಯಾರಾ 10(a) ಇದನ್ನು ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರ ಪ್ರಮಾಣಪತ್ರಕ್ಕೆ ಪರ್ಯಾಯವಾಗಿ, Annex I-E ಅಡಿಯಲ್ಲಿ ಸ್ವೀಕರಿಸುತ್ತದೆ. ಎರಡರಲ್ಲಿ ಯಾವುದಾದರೂ ಪಟ್ಟಿಯನ್ನು ಪೂರೈಸುತ್ತದೆ, ಮತ್ತು ಇದು ಹೆಚ್ಚು ವೇಗವಾಗಿದೆ.";
      return "ಇದು ಪ್ಯಾರಾ 10(a) ಪಟ್ಟಿ ಮಾಡುವ ಆರು ದಾಖಲೆಗಳಲ್ಲಿ ಒಂದು. ಬ್ಯಾಂಕ್ ಆ ಪಟ್ಟಿಯ ಮೇಲೆ ಹಕ್ಕನ್ನು ಇತ್ಯರ್ಥಗೊಳಿಸಬೇಕು.";
    }
    if (id === "third-party-surety") return 'ಪ್ಯಾರಾ 10(a): "No bond of surety from a third-party shall be obtained in case of claims up to the threshold limit."';
    if (id === "succession-certificate" || id === "probate") return "ಪ್ಯಾರಾ 10(a) ಯ ಆರು ದಾಖಲೆಗಳಲ್ಲಿ ಇಲ್ಲ. ಪ್ಯಾರಾ 10(b) ಉತ್ತರಾಧಿಕಾರ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಮಿತಿಯಲ್ಲಿ ಅಥವಾ ಅದಕ್ಕಿಂತ ಮೇಲಿನ ಹಕ್ಕುಗಳಿಗೆ, ಮತ್ತು ಪ್ಯಾರಾ 11(b) ವಾರಸುದಾರರು ವಿವಾದದಲ್ಲಿರುವ ಪ್ರಕರಣಗಳಿಗೆ ಕಾಯ್ದಿರಿಸುತ್ತದೆ.";
    if (id === "affidavit") return "ಪ್ಯಾರಾ 10(b) ಮಿತಿಯಲ್ಲಿ ಅಥವಾ ಅದಕ್ಕಿಂತ ಮೇಲಿನ ಹಕ್ಕುಗಳಿಗೆ ಅಧಿಕಾರಿಯ ಮುಂದೆ ಪ್ರಮಾಣ ಮಾಡಿದ ಅಫಿಡವಿಟ್ ಅನ್ನು ನೀಡುತ್ತದೆ. ಇದು ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಹಕ್ಕುಗಳಿಗೆ ಪ್ಯಾರಾ 10(a) ಪಟ್ಟಿಯಲ್ಲಿಲ್ಲ.";
    if (id === "vanshavali") return "ಆರರಲ್ಲಿ ಇಲ್ಲ. ಪ್ಯಾರಾ 10(a) ಪಟ್ಟಿ ಮಾಡುವುದು ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ವಾರಸುದಾರರ ಬಗ್ಗೆ ಘೋಷಣೆ — Annex I-E.";
    return "ಸರಳೀಕೃತ ಪ್ರಕ್ರಿಯೆಗಾಗಿ ಪ್ಯಾರಾ 10(a) ಪಟ್ಟಿ ಮಾಡುವ ಆರು ದಾಖಲೆಗಳಲ್ಲಿ ಇಲ್ಲ.";
  }

  if (s === "nominee") {
    if (inList) {
      return "Para 9 settles a nominee or survivorship claim on the claim form, the death certificate and your own ID. This is one of them.";
    }
    if (
      id === "succession-certificate" ||
      id === "probate" ||
      id === "indemnity-bond" ||
      id === "third-party-surety"
    ) {
      return "Para 9 names this one: the bank shall not insist on a succession certificate, letter of administration or probate, or seek any bond of indemnity or surety — irrespective of the amount standing to the credit.";
    }
    return "Para 9 does not require this where a nominee or survivor is on record, and it is not among the documents the RBI's own claim form for those cases asks for.";
  }

  // simplified — no nominee, below the threshold
  if (inList) {
    if (id === "heir-declaration") {
      return "Para 10(a) accepts this as the alternative to a legal heir certificate, under Annex I-E. Either one satisfies the list, and this one is much faster.";
    }
    return "This is one of the six documents para 10(a) lists. The bank shall settle the claim on that list.";
  }
  if (id === "third-party-surety") {
    return "Para 10(a): “No bond of surety from a third-party shall be obtained in case of claims up to the threshold limit.”";
  }
  if (id === "succession-certificate" || id === "probate") {
    return "Not among the six documents in para 10(a). Para 10(b) reserves a succession certificate for claims at or above the threshold, and para 11(b) for cases where the heirs are in dispute.";
  }
  if (id === "affidavit") {
    return "Para 10(b) offers an affidavit sworn before an official for claims at or above the threshold. It is not in the para 10(a) list for claims below it.";
  }
  if (id === "vanshavali") {
    return "Not among the six. What para 10(a) lists is a legal heir certificate OR a declaration regarding the heirs — Annex I-E.";
  }
  return "Not among the six documents para 10(a) lists for the simplified procedure.";
}

/** Parse the ticked list from a comma-joined query parameter. */
export function parseAsked(raw: string | string[] | undefined): DocId[] {
  const s = Array.isArray(raw) ? raw.join(",") : (raw ?? "");
  const valid = new Set(Object.keys(DOCUMENTS));
  return s
    .split(",")
    .map((x) => x.trim())
    .filter((x) => valid.has(x)) as DocId[];
}

export function toggle(list: DocId[], id: DocId): DocId[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}
