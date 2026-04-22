# Pacoveli – Artist Website

A monochrome (black/white/grayscale) Next.js 14 website for the musical artist Pacoveli, featuring a global audio player, music catalog, videos, and contact form.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS** (monochrome theme)
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install

```bash
npm install
```

### Run Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
pacoveli/
├── public/
│   ├── audio/          # Place MP3 files here
│   ├── covers/         # Album/single artwork (JPG, PNG, SVG)
│   ├── images/         # Artist photos, hero images
│   └── press/          # Press kit PDF
├── src/
│   ├── app/
│   │   ├── api/contact/    # Contact form API
│   │   ├── music/          # Music list + release pages
│   │   ├── videos/         # Videos page
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── layout.tsx
│   │   └── page.tsx       # Home
│   ├── components/
│   │   ├── AudioPlayer.tsx
│   │   ├── PlayerControls.tsx
│   │   ├── PlaylistDrawer.tsx
│   │   ├── TrackCard.tsx
│   │   ├── ReleaseCard.tsx
│   │   ├── VideoCard.tsx
│   │   ├── Navigation.tsx
│   │   └── ...
│   ├── context/
│   │   └── AudioPlayerContext.tsx
│   ├── data/
│   │   ├── music.json     # Releases & tracks
│   │   ├── videos.json    # Video metadata
│   │   └── site.json      # Artist info, social links
│   └── types/
│       └── index.ts
```

## Where to Place Files

### Audio Files

Place MP3 files in `public/audio/`:

```
public/audio/
├── horizon.mp3
├── dawn.mp3
├── midday.mp3
├── dusk.mp3
├── intro.mp3
├── shadows.mp3
└── grayscale.mp3
```

Update `src/data/music.json` so each track’s `audioUrl` points to the correct path (e.g. `/audio/horizon.mp3`).

### Album Covers

Place artwork in `public/covers/`:

```
public/covers/
├── horizon.jpg
├── first-light.jpg
├── monochrome.jpg
└── placeholder.svg   # Fallback for missing art
```

Update `src/data/music.json` so each release’s `artworkUrl` matches the file (e.g. `/covers/horizon.jpg`).

### Artist Images

Place images in `public/images/`:

```
public/images/
├── paco.jpg      # Homepage hero image (centered)
└── artist.svg   # or artist.jpg, artist.png (About page)
```

Update `src/data/site.json`:

```json
"photoUrl": "/images/artist.jpg"
```

### Press Kit

Place the press kit PDF in `public/press/`:

```
public/press/
└── pacoveli-press-kit.pdf
```

Update `src/data/site.json`:

```json
"pressKitUrl": "/press/pacoveli-press-kit.pdf"
```

## Environment Variables

No environment variables are required for basic setup.

For production contact form delivery, add:

- `RESEND_API_KEY` – if using Resend
- `SMTP_*` – if using custom SMTP

Then update `src/app/api/contact/route.ts` to send emails via your provider.

## Customization

### Music Data

Edit `src/data/music.json`:

```json
{
  "releases": [
    {
      "id": "unique-id",
      "title": "Release Title",
      "type": "album",
      "releaseDate": "2024",
      "artworkUrl": "/covers/artwork.jpg",
      "description": "Optional description.",
      "tracks": [
        {
          "id": "track-id",
          "title": "Track Title",
          "duration": "3:42",
          "audioUrl": "/audio/track.mp3",
          "releaseId": "unique-id",
          "trackNumber": 1
        }
      ]
    }
  ]
}
```

### Site & Artist Info

Edit `src/data/site.json` for artist info, bio, social links, and contact email.

### Videos

Edit `src/data/videos.json` to add YouTube IDs or video URLs.

## Deployment (Vercel)

1. Push to GitHub.
2. Import the repo in [Vercel](https://vercel.com).
3. Deploy (default settings apply).

For audio and images, ensure files are under `public/` and within Vercel’s size limits.

## Design System

- **Background:** `#000`
- **Text:** `#fff`
- **Accents:** Grayscale (`#404040`, `#737373`, etc.)
- **Typography:** Geist Sans (thin, modern)

## License

Private – Pacoveli.
