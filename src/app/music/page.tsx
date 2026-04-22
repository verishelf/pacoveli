import { Metadata } from "next";
import { MusicPageContent } from "@/components/MusicPageContent";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Pacoveli releases, Apple Music, and SoundCloud. Singles, EPs, and full tracks.",
};

export default function MusicPage() {
  return <MusicPageContent />;
}
