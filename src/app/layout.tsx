import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { AudioPlayerProvider } from "@/context/AudioPlayerContext";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Navigation } from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Pacoveli | Music",
    template: "%s | Pacoveli",
  },
  description:
    "Pacoveli - Independent artist crafting immersive soundscapes. Ambient, electronic, indie. Monochrome sound.",
  keywords: ["Pacoveli", "music", "ambient", "electronic", "indie", "artist"],
  authors: [{ name: "Pacoveli" }],
  openGraph: {
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black font-sans text-white antialiased`}
      >
        <AudioPlayerProvider>
          <Navigation />
          <main className="pt-14 md:pt-16">{children}</main>
          <AudioPlayer />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
