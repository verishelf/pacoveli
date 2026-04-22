import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import musicData from "../../../data/music.json";
import { TrackCard } from "@/components/TrackCard";
import { AddAllToQueueButton } from "@/components/AddAllToQueueButton";
import { ListenOnAppleMusicButton } from "@/components/ListenOnAppleMusicButton";
import type { Release } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const release = (musicData.releases as Release[]).find((r) => r.id === id);
  if (!release) return { title: "Release" };
  return {
    title: release.title,
    description: release.description || `Listen to ${release.title} by Pacoveli.`,
  };
}

export default async function ReleasePage({ params }: Props) {
  const { id } = await params;
  const release = (musicData.releases as Release[]).find((r) => r.id === id);

  if (!release) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12 md:py-16">
      <Link
        href="/music"
        className="mb-8 inline-block text-sm text-zinc-500 transition hover:text-white"
      >
        ← Back to Music
      </Link>
      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        <div className="relative aspect-square w-full max-w-sm shrink-0 overflow-hidden rounded-lg bg-zinc-900">
          <Image
            src={release.artworkUrl}
            alt={release.title}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover grayscale"
            priority
          />
        </div>
        <div className="flex-1">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {release.type}
          </span>
          <h1 className="mt-1 text-3xl font-light tracking-tight md:text-4xl">
            {release.title}
          </h1>
          <p className="mt-2 text-zinc-500">{release.releaseDate}</p>
          {release.description && (
            <p className="mt-4 text-zinc-400">{release.description}</p>
          )}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <AddAllToQueueButton tracks={release.tracks} className="w-fit" />
            {release.tracks[0]?.appleMusicUrl && (
              <ListenOnAppleMusicButton href={release.tracks[0].appleMusicUrl} />
            )}
          </div>
          <div className="mt-8">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
              Tracklist
            </h2>
            <div className="space-y-2">
              {release.tracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  releaseTitle={release.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
