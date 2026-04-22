"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import type { Track } from "@/types";

interface AudioPlayerContextType {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  play: (track?: Track, queue?: Track[]) => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  addToQueue: (track: Track) => void;
  addReleaseToQueue: (tracks: Track[]) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  isPlaylistOpen: boolean;
  togglePlaylist: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  const play = useCallback(
    (track?: Track, newQueue?: Track[]) => {
      const trackToPlay = track ?? currentTrack ?? queue[0];
      if (!trackToPlay) return;

      if (newQueue && newQueue.length > 0) {
        setQueue(newQueue);
      }

      if (track) {
        setCurrentTrack(track);
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        audioRef.current.src = track.audioUrl;
        audioRef.current.load();
      }

      audioRef.current?.play().then(() => setIsPlaying(true)).catch(console.error);
    },
    [currentTrack, queue]
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      if (currentTrack) {
        audioRef.current?.play()
          .then(() => setIsPlaying(true))
          .catch(console.error);
      } else if (queue.length > 0) {
        play(queue[0], queue);
      }
    }
  }, [isPlaying, currentTrack, queue, pause, play]);

  const next = useCallback(() => {
    if (!currentTrack) return;
    const idx = queue.findIndex((t) => t.id === currentTrack.id);
    const nextTrack = idx >= 0 && idx < queue.length - 1 ? queue[idx + 1] : null;
    if (nextTrack) {
      play(nextTrack);
    } else {
      pause();
      setCurrentTrack(null);
    }
  }, [currentTrack, queue, play, pause]);

  const prev = useCallback(() => {
    if (!audioRef.current) return;
    if (currentTime > 3) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      const idx = queue.findIndex((t) => t.id === currentTrack?.id);
      const prevTrack = idx > 0 ? queue[idx - 1] : null;
      if (prevTrack) play(prevTrack);
    }
  }, [currentTime, currentTrack, queue, play]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setVolume = useCallback((vol: number) => {
    const v = Math.max(0, Math.min(1, vol));
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const addToQueue = useCallback((track: Track) => {
    setQueue((q) => [...q, track]);
  }, []);

  const addReleaseToQueue = useCallback((tracks: Track[]) => {
    setQueue((q) => [...q, ...tracks]);
  }, []);

  const removeFromQueue = useCallback((index: number) => {
    setQueue((q) => q.filter((_, i) => i !== index));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const togglePlaylist = useCallback(() => {
    setIsPlaylistOpen((o) => !o);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => next();
    const onError = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [next, currentTrack?.id]);

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.volume = volume;
  }, [volume]);

  const value: AudioPlayerContextType = {
    currentTrack,
    queue,
    isPlaying,
    currentTime,
    duration,
    volume,
    play,
    pause,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    addToQueue,
    addReleaseToQueue,
    removeFromQueue,
    clearQueue,
    isPlaylistOpen,
    togglePlaylist,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  return ctx;
}
