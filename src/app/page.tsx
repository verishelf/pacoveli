import siteData from "@/data/site.json";
import musicData from "../data/music.json";
import { HeroSection } from "@/components/HeroSection";
import type { Release } from "@/types";

const latestRelease = musicData.releases[0] as Release | undefined;
const latestTrack = latestRelease?.tracks[0];

export default function HomePage() {
  return (
    <HeroSection
      artistName={siteData.artist.name}
      artistBio={siteData.artist.bio}
      photoUrl="/images/paco.jpg"
      fallbackPhotoUrl={siteData.artist.photoUrl}
      latestTrack={latestTrack}
      latestRelease={latestRelease}
    />
  );
}
