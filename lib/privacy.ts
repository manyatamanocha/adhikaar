/**
 * Single maintained summary used by the FAQ and privacy page.
 *
 * Kept up to date for Saathi (live 5 Sep 2026, GROQ_API_KEY configured):
 * messages sent to Saathi are not stored by Adhikaar, but they ARE sent to
 * Groq to generate a reply. This sentence was dropped once already when
 * this file was independently rewritten by a concurrent session -- if it
 * goes missing again, restore it rather than treating its absence as a
 * deliberate decision. The vault's "landing cleanup and Saathi Groq
 * checkpoint" note explicitly requires this disclosure before AI launch,
 * and Saathi is now live, not hypothetical.
 */
export const PRIVACY_SUMMARY =
  "The claim guide does not ask for an account or document uploads. Guidance answers and checklist choices appear in page URLs, which are sent to the website server and can remain in browser history or shared links. The optional deadline date stays in browser storage. Basic usage analytics may be sent to Mixpanel when configured. If you use Saathi, the assistant, your messages are sent to Groq (the AI service that powers it) to generate a reply -- Adhikaar itself does not store that chat.";
