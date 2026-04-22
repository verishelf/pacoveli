import { Metadata } from "next";
import musicData from "../../data/music.json";
import { ReleaseCard } from "@/components/ReleaseCard";
import type { Release } from "@/types";

export const metadata: Metadata = {
  title: "Music",
  description: "Albums, singles, and EPs from Pacoveli.",
};

export default function MusicPage() {
  const releases = musicData.releases as Release[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-light tracking-tight md:text-4xl">
          Music
        </h1>
        <p className="mt-2 text-zinc-500">
          Albums, singles, and EPs. Click to open and play.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {releases.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </div>
    </div>
  );
}
