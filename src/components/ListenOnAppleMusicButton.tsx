import { Music2 } from "lucide-react";

type Props = {
  href: string;
  className?: string;
  size?: "default" | "sm";
};

/**
 * Outbound CTA to Apple Music (track, album, or artist URL).
 */
export function ListenOnAppleMusicButton({ href, className = "", size = "default" }: Props) {
  const sizeClasses =
    size === "sm"
      ? "gap-1.5 px-3 py-1.5 text-xs"
      : "gap-2 px-4 py-2.5 text-sm";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-fit items-center justify-center rounded-full border border-zinc-500/80 bg-zinc-900/90 font-medium text-white transition hover:border-zinc-300 hover:bg-zinc-800 ${sizeClasses} ${className}`.trim()}
    >
      <Music2 className="shrink-0 opacity-90" size={size === "sm" ? 14 : 16} strokeWidth={2} aria-hidden />
      <span>Listen on Apple Music</span>
    </a>
  );
}
