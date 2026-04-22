import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos",
  description: "Music videos and live sessions from Pacoveli.",
};

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-light tracking-tight md:text-4xl">
          Videos
        </h1>
        <p className="mt-2 text-zinc-500">
          Music videos and live performances.
        </p>
      </header>
      <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-lg border border-zinc-800/80 bg-zinc-950/50 px-6 py-16 text-center">
        <p className="text-lg font-medium tracking-tight text-white md:text-xl">
          Coming soon
        </p>
        <p className="mt-3 max-w-md text-sm text-zinc-500">
          New visuals are on the way. Check back shortly.
        </p>
      </div>
    </div>
  );
}
