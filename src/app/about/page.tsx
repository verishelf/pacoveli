import { Metadata } from "next";
import Image from "next/image";
import siteData from "@/data/site.json";

export const metadata: Metadata = {
  title: "About",
  description: "The story, style, and influences behind Pacoveli.",
};

export default function AboutPage() {
  const { artist } = siteData;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12 md:py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-light tracking-tight md:text-4xl">
          About
        </h1>
      </header>
      <div className="flex flex-col gap-12 md:flex-row md:gap-16">
        <div className="relative aspect-[3/4] w-full max-w-sm shrink-0 overflow-hidden rounded-lg bg-zinc-900">
          <Image
            src="/images/paco.jpg"
            alt={artist.name}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="flex-1">
          <h2 className="mb-4 text-xl font-medium text-white">
            {artist.name}
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            {artist.longBio.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
