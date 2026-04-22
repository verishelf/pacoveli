"use client";

interface SocialLinksProps {
  links: Record<string, string>;
}

const labels: Record<string, string> = {
  spotify: "Spotify",
  appleMusic: "Apple Music",
  soundcloud: "SoundCloud",
  bandcamp: "Bandcamp",
  instagram: "Instagram",
  youtube: "YouTube",
  twitter: "X (Twitter)",
};

export function SocialLinks({ links }: SocialLinksProps) {
  const entries = Object.entries(links).filter(([, url]) => url);

  return (
    <div>
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
        Connect
      </h3>
      <ul className="flex flex-wrap gap-4">
        {entries.map(([key, url]) => (
          <li key={key}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 underline transition hover:text-white"
            >
              {labels[key] || key}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
