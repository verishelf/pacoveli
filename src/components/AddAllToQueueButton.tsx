"use client";

import { useAudioPlayer } from "@/context/AudioPlayerContext";
import type { Track } from "@/types";
import { ListPlus } from "lucide-react";

interface AddAllToQueueButtonProps {
  tracks: Track[];
  className?: string;
}

export function AddAllToQueueButton({ tracks, className = "" }: AddAllToQueueButtonProps) {
  const { addReleaseToQueue } = useAudioPlayer();

  return (
    <button
      onClick={() => addReleaseToQueue(tracks)}
      className={`flex items-center gap-2 rounded-full border border-zinc-600 px-4 py-2 text-sm text-white transition hover:border-white hover:bg-white/5 ${className}`}
    >
      <ListPlus size={16} />
      Add all to queue
    </button>
  );
}
