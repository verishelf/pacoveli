"use client";

import { useAudioPlayer } from "@/context/AudioPlayerContext";
import type { Release } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { ListenOnAppleMusicButton } from "./ListenOnAppleMusicButton";

interface ReleaseCardProps {
  release: Release;
}

export function ReleaseCard({ release }: ReleaseCardProps) {
  const { play } = useAudioPlayer();

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    play(release.tracks[0], release.tracks);
  };

  const typeLabel = release.type.toUpperCase();
  const appleUrl = release.tracks[0]?.appleMusicUrl;

  return (
    <motion.article
      initial={false}
      className="group"
    >
      <Link href={`/music/${release.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-900">
          <Image
            src={release.artworkUrl}
            alt={release.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover grayscale transition duration-300 group-hover:grayscale-0 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/covers/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
            <button
              onClick={handlePlay}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition hover:scale-110"
              aria-label={`Play ${release.title}`}
            >
              <Play size={24} className="ml-1" />
            </button>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            {typeLabel}
          </span>
          <h3 className="mt-0.5 font-medium text-white transition group-hover:text-zinc-300">
            {release.title}
          </h3>
          <p className="text-sm text-zinc-500">{release.releaseDate}</p>
        </div>
      </Link>
      {appleUrl && (
        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
          <ListenOnAppleMusicButton href={appleUrl} size="sm" className="w-full sm:w-auto" />
        </div>
      )}
    </motion.article>
  );
}
