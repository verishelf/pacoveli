import { Metadata } from "next";
import siteData from "@/data/site.json";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description: "Get in touch with Pacoveli for bookings, press, and inquiries.",
};

export default function ContactPage() {
  const { artist } = siteData;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12 md:py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-light tracking-tight md:text-4xl">
          Contact & Booking
        </h1>
        <p className="mt-2 text-zinc-500">
          For bookings, press, and general inquiries.
        </p>
      </header>
      <div className="space-y-12">
        <ContactForm email={artist.contactEmail} />
        <SocialLinks links={artist.socialLinks} />
        {artist.pressKitUrl && (
          <div>
            <a
              href={artist.pressKitUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-zinc-600 px-6 py-3 text-sm text-white transition hover:border-white hover:bg-white/5"
            >
              Download Press Kit
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
