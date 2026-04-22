import type { SoundCloudTrack } from "@/types";

function widgetSrc(trackUrl: string) {
  const params = new URLSearchParams({
    url: trackUrl,
    color: "a1a1aa",
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    show_teaser: "false",
    visual: "false",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

export function SoundCloudTrackEmbed({ track }: { track: SoundCloudTrack }) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-950/50">
      <iframe
        title={`${track.title} on SoundCloud`}
        src={widgetSrc(track.url)}
        width="100%"
        height="120"
        loading="lazy"
        className="block border-0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
