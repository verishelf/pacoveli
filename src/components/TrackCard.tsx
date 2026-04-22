"use client";

import { useAudioPlayer } from "@/context/AudioPlayerContext";
import type { Track } from "@/types";
import { Play, Pause, Plus } from "lucide-react";

interface TrackCardProps {
  track: Track;
  releaseTitle?: string;
}

export function TrackCard({ track, releaseTitle }: TrackCardProps) {
  const { play, addToQueue, togglePlay, currentTrack, isPlaying } = useAudioPlayer();
  const isActive = currentTrack?.id === track.id;

  const handlePlayClick = () => {
    if (isActive) {
      togglePlay();
    } else {
      play(track);
    }
  };

  return (
    <div
      className={`group flex items-center gap-4 rounded-lg border border-zinc-800/50 p-3 transition hover:border-zinc-600 ${
        isActive ? "border-zinc-500 bg-white/5" : ""
      }`}
    >
      <button
        onClick={handlePlayClick}
        className="flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-black active:scale-95"
        aria-label={`Play ${track.title}`}
      >
        {isActive && isPlaying ? (
          <Pause size={18} />
        ) : (
          <Play size={18} className="ml-0.5" />
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-white">{track.title}</p>
        <p className="truncate text-sm text-zinc-500">
          {releaseTitle && `${releaseTitle} · `}
          {track.duration}
        </p>
        {(track.appleMusicUrl || track.soundcloudUrl) && (
          <div className="mt-1.5 flex flex-wrap gap-3 text-xs">
            {track.appleMusicUrl && (
              <a
                href={track.appleMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 underline-offset-2 transition hover:text-zinc-300 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Listen on Apple Music
              </a>
            )}
            {track.soundcloudUrl && (
              <a
                href={track.soundcloudUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 underline-offset-2 transition hover:text-zinc-300 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                SoundCloud
              </a>
            )}
          </div>
        )}
      </div>
      <button
        onClick={() => addToQueue(track)}
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2 text-zinc-500 transition hover:bg-white/10 hover:text-white active:bg-white/10 active:text-white md:opacity-0 md:group-hover:opacity-100"
        aria-label={`Add ${track.title} to queue`}
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
