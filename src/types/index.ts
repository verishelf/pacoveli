export interface Track {
  id: string;
  title: string;
  duration: string;
  /** Stream URL (e.g. iTunes 30s preview, hosted MP3, or SoundCloud if allowed) */
  audioUrl: string;
  releaseId: string;
  trackNumber: number;
  lyrics?: string;
  appleMusicUrl?: string;
  soundcloudUrl?: string;
  /** Cover art (e.g. same as parent release) for the now-playing bar */
  artworkUrl?: string;
}

export interface Release {
  id: string;
  title: string;
  type: "album" | "single" | "ep";
  releaseDate: string;
  artworkUrl: string;
  tracks: Track[];
  description?: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnailUrl?: string;
  youtubeId?: string;
  videoUrl?: string;
  releaseDate?: string;
}
