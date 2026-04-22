import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-HZBTZRKYL7";
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <AudioPlayerProvider>
          <Navigation />
          <main className="pt-14 md:pt-16 pb-[calc(11rem+env(safe-area-inset-bottom,0px))] md:pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))]">
            {children}
          </main>
          <AudioPlayer />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
