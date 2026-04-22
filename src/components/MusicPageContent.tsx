"use client";

import { useState } from "react";
import musicData from "@/data/music.json";
import scData from "@/data/soundcloud.json";
import siteData from "@/data/site.json";
import { ReleaseCard } from "@/components/ReleaseCard";
import { ListenOnAppleMusicButton } from "@/components/ListenOnAppleMusicButton";
import { SoundCloudTrackEmbed } from "@/components/SoundCloudTrackEmbed";
import type { Release } from "@/types";
import type { SoundCloudCatalog } from "@/types";
import { ExternalLink } from "lucide-react";

const catalog = scData as SoundCloudCatalog;
const scProfile = siteData.artist.socialLinks.soundcloud;

type Tab = "releases" | "soundcloud";

export function MusicPageContent() {
  const releases = musicData.releases as Release[];
  const [tab, setTab] = useState<Tab>("releases");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:py-16">
      <header className="mb-8 space-y-4 sm:mb-10">
        <div>
          <h1 className="text-3xl font-light tracking-tight md:text-4xl">
            Music
          </h1>
          <p className="mt-2 text-zinc-500">
            Releases and SoundCloud. Stream previews on-site or open full tracks
            in Apple Music and SoundCloud.
          </p>
        </div>

        <div
          className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
          role="tablist"
          aria-label="Music sources"
        >
          <div className="inline-flex gap-0 rounded-lg border border-zinc-800 bg-zinc-950/60 p-1">
            <button
              type="button"
              role="tab"
              id="tab-releases"
              aria-selected={tab === "releases"}
              aria-controls="panel-releases"
              onClick={() => setTab("releases")}
              className={`min-h-[44px] rounded-md px-4 py-2 text-sm font-medium transition ${
                tab === "releases"
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Releases
            </button>
            <button
              type="button"
              role="tab"
              id="tab-soundcloud"
              aria-selected={tab === "soundcloud"}
              aria-controls="panel-soundcloud"
              onClick={() => setTab("soundcloud")}
              className={`min-h-[44px] rounded-md px-4 py-2 text-sm font-medium transition ${
                tab === "soundcloud"
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              SoundCloud
            </button>
          </div>
          {tab === "releases" && siteData.artist.socialLinks.appleMusic && (
            <ListenOnAppleMusicButton href={siteData.artist.socialLinks.appleMusic} />
          )}
          {tab === "soundcloud" && scProfile && (
            <a
              href={scProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-sm text-zinc-400 underline-offset-4 transition hover:text-white hover:underline"
            >
              <ExternalLink size={16} className="shrink-0" aria-hidden />
              Open SoundCloud profile
            </a>
          )}
        </div>
      </header>

      {tab === "releases" && (
        <div
          id="panel-releases"
          role="tabpanel"
          aria-labelledby="tab-releases"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      )}

      {tab === "soundcloud" && (
        <div
          id="panel-soundcloud"
          role="tabpanel"
          aria-labelledby="tab-soundcloud"
          className="space-y-6"
        >
          <p className="text-sm text-zinc-500">
            Full tracks from{" "}
            <a
              href={catalog.profileUrl}
              className="text-zinc-300 underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pacoveli on SoundCloud
            </a>
            . Use the play controls in each player.
          </p>
          <ul className="max-w-3xl space-y-4">
            {catalog.tracks.map((track) => (
              <li key={track.id}>
                <SoundCloudTrackEmbed track={track} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
