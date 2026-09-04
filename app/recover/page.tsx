import { redirect } from "next/navigation";

/** This page moved to "/" on 4 Sep 2026. Redirect rather than 404 for
    anyone who still has /recover bookmarked or linked. */
export default function Page() {
  redirect("/");
}
