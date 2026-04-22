"use client";

import type { Video } from "@/types";
import { motion } from "framer-motion";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const embedUrl = video.youtubeId
    ? `https://www.youtube.com/embed/${video.youtubeId}?rel=0`
    : video.videoUrl;

  if (!embedUrl) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50"
    >
      <div className="relative aspect-video">
        <iframe
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full grayscale hover:grayscale-0 transition duration-500"
        />
        <div className="pointer-events-none absolute inset-0 border border-zinc-800/50" />
      </div>
      <div className="border-t border-zinc-800 p-4">
        <h3 className="font-medium text-white">{video.title}</h3>
        {video.releaseDate && (
          <p className="mt-1 text-sm text-zinc-500">{video.releaseDate}</p>
        )}
      </div>
    </motion.article>
  );
}
