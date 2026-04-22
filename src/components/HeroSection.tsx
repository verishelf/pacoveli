"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { PlayLatestButton } from "./PlayLatestButton";
import type { Release, Track } from "@/types";

const Scene3D = dynamic(() => import("./Scene3D").then((m) => ({ default: m.Scene3D })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-black" />,
});

interface HeroSectionProps {
  artistName: string;
  artistBio: string;
  photoUrl: string;
  fallbackPhotoUrl?: string;
  latestTrack?: Track;
  latestRelease?: Release;
}

export function HeroSection({
  artistName,
  artistBio,
  photoUrl,
  fallbackPhotoUrl = "/images/artist.svg",
  latestTrack,
  latestRelease,
}: HeroSectionProps) {
  const [imgSrc, setImgSrc] = useState(photoUrl);

  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-12 pb-28 sm:py-16 sm:pb-32 md:py-24 md:pb-40">
      <Scene3D />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <div className="relative mb-6 h-48 w-48 overflow-hidden rounded-full border-2 border-white/20 shadow-2xl sm:mb-8 sm:h-64 sm:w-64 md:h-80 md:w-80">
          <Image
            src={imgSrc}
            alt={artistName}
            fill
            priority
            sizes="(max-width: 768px) 256px, 320px"
            className="object-cover"
            onError={() => setImgSrc(fallbackPhotoUrl ?? "/images/artist.svg")}
          />
        </div>
        <h1 className="mb-2 text-4xl font-light tracking-tight md:text-6xl">
          {artistName}
        </h1>
        <p className="mb-6 max-w-md text-sm text-zinc-400 sm:mb-8 sm:text-base md:text-lg">{artistBio}</p>
        {latestTrack && latestRelease && (
          <PlayLatestButton track={latestTrack} release={latestRelease} />
        )}
      </motion.div>
    </section>
  );
}
