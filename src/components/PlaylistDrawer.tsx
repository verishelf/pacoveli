"use client";

import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function PlaylistDrawer() {
  const {
    currentTrack,
    queue,
    isPlaylistOpen,
    togglePlaylist,
    play,
    removeFromQueue,
    clearQueue,
  } = useAudioPlayer();

  const displayQueue = currentTrack
    ? [currentTrack, ...queue.filter((t) => t.id !== currentTrack.id)]
    : queue;

  return (
    <AnimatePresence>
      {isPlaylistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={togglePlaylist}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-zinc-800 bg-black"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 p-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                Queue
              </h3>
              <div className="flex gap-2">
                {displayQueue.length > 0 && (
                  <button
                    onClick={clearQueue}
                    className="text-xs text-zinc-500 underline transition hover:text-white"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={togglePlaylist}
                  className="rounded-full p-2 text-white transition hover:bg-white/10"
                  aria-label="Close playlist"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {displayQueue.length === 0 ? (
                <p className="py-8 text-center text-sm text-zinc-500">
                  Queue is empty. Play something from Music.
                </p>
              ) : (
                <ul className="space-y-1">
                  {displayQueue.map((track, idx) => (
                    <li
                      key={`${track.id}-${idx}`}
                      className={`group flex items-center gap-3 rounded-lg p-2 transition ${
                        currentTrack?.id === track.id
                          ? "bg-white/10"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <button
                        onClick={() => play(track)}
                        className="flex min-w-0 flex-1 items-center gap-3 text-left"
                      >
                        <span className="w-6 shrink-0 text-xs text-zinc-500">
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white">
                            {track.title}
                          </p>
                          <p className="truncate text-xs text-zinc-500">
                            Track {track.trackNumber}
                          </p>
                        </div>
                      </button>
                      {currentTrack?.id !== track.id && (
                        <button
                          onClick={() => removeFromQueue(idx)}
                          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded p-2 text-zinc-500 transition hover:bg-white/10 hover:text-white active:bg-white/10 md:opacity-0 md:group-hover:opacity-100"
                          aria-label="Remove from queue"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
