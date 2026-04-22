"use client";

import { useAudioPlayer } from "@/context/AudioPlayerContext";
import type { Release, Track } from "@/types";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface PlayLatestButtonProps {
  track: Track;
  release: Release;
}

export function PlayLatestButton({ track, release }: PlayLatestButtonProps) {
  const { play } = useAudioPlayer();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => play(track, release.tracks)}
      className="flex items-center gap-3 rounded-full border border-white bg-white px-6 py-3 text-black transition hover:bg-zinc-200"
    >
      <Play size={20} className="fill-current" />
      <span className="font-medium">Play Latest: {release.title}</span>
    </motion.button>
  );
}
