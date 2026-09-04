import { Suspense } from "react";
import { ContactPage } from "./_components/contact-page";

export const metadata = {
  title: "Contact — Adhikaar",
  description: "How to reach Adhikaar by phone or email.",
};

export default function Contact() {
  return (
    <Suspense fallback={null}>
      <ContactPage />
    </Suspense>
  );
}
