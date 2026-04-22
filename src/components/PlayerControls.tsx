"use client";

import { useAudioPlayer } from "@/context/AudioPlayerContext";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useCallback, useState } from "react";

function formatTime(seconds: number) {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PlayerControls() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    togglePlaylist,
  } = useAudioPlayer();

  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);

  const handleVolumeClick = useCallback(() => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  }, [isMuted, volume, prevVolume, setVolume]);

  const handleSeek = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      seek(val);
    },
    [seek]
  );

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex w-full flex-col gap-2 md:gap-3">
      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <span className="w-10 text-right text-xs text-zinc-500 tabular-nums">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-800 accent-white [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:touch-manipulation md:[&::-webkit-slider-thumb]:h-3 md:[&::-webkit-slider-thumb]:w-3"
        />
        <span className="w-10 text-xs text-zinc-500 tabular-nums">
          {formatTime(duration)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={!currentTrack}
            className="rounded-full p-2 text-white transition hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="Previous"
          >
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            disabled={!currentTrack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-zinc-200"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </button>
          <button
            onClick={next}
            disabled={!currentTrack}
            className="rounded-full p-2 text-white transition hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="Next"
          >
            <SkipForward size={20} />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center" />

        <div className="flex items-center gap-2">
          <button
            onClick={handleVolumeClick}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2 text-white transition hover:bg-white/10 active:bg-white/20"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setVolume(v);
              if (v > 0) setIsMuted(false);
            }}
            className="h-2 w-16 cursor-pointer appearance-none rounded-full bg-zinc-800 accent-white [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:touch-manipulation md:h-1 md:w-24 md:[&::-webkit-slider-thumb]:h-2.5 md:[&::-webkit-slider-thumb]:w-2.5"
          />
        </div>
      </div>
    </div>
  );
}
