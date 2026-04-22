"use client";

import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { PlayerControls } from "./PlayerControls";
import { PlaylistDrawer } from "./PlaylistDrawer";
import { List } from "lucide-react";
import Image from "next/image";

export function AudioPlayer() {
  const {
    currentTrack,
    queue,
    isPlaylistOpen,
    togglePlaylist,
    play,
  } = useAudioPlayer();

  const queueCount = currentTrack
    ? 1 + queue.filter((t) => t.id !== currentTrack.id).length
    : queue.length;

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-zinc-800 bg-black/95 backdrop-blur-md pb-safe">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3 md:flex-row md:items-center md:gap-6 md:py-4">
          {/* Now playing */}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {currentTrack ? (
              <>
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-zinc-900 sm:h-12 sm:w-12">
                  <Image
                    src={currentTrack.artworkUrl || "/covers/placeholder.svg"}
                    alt={currentTrack.title}
                    fill
                    className="object-cover grayscale"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {currentTrack.title}
                  </p>
                  <p className="truncate text-xs text-zinc-500">
                    iTunes preview · {currentTrack.duration}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded bg-zinc-900 sm:h-12 sm:w-12" />
                <div>
                  <p className="text-sm font-medium text-zinc-500">
                    Nothing playing
                  </p>
                  <p className="text-xs text-zinc-600">
                    Select a track from Music
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="w-full md:max-w-xl">
            <PlayerControls />
          </div>

          {/* Queue button */}
          <div className="flex items-center justify-end md:justify-center">
            <button
              onClick={togglePlaylist}
              className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white transition hover:bg-white/10"
              aria-label="Open playlist"
            >
              <List size={18} />
              <span className="hidden sm:inline">Queue</span>
              {queueCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-medium text-black">
                  {queueCount > 99 ? "99+" : queueCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </footer>

      <PlaylistDrawer />
    </>
  );
}
