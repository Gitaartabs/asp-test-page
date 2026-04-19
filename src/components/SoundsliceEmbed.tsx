"use client";

type Props = {
  slug: string;
  title: string;
};

// Soundslice public embed. Slug comes from a public slice URL:
//   https://www.soundslice.com/slices/<SLUG>/
// If the slug looks like a placeholder (starts with "DEMO"), we show
// a friendly setup card instead of a broken iframe.
export default function SoundsliceEmbed({ slug, title }: Props) {
  const isPlaceholder = slug.startsWith("DEMO") || slug === "";

  if (isPlaceholder) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
        <div className="text-4xl">🎼</div>
        <div className="text-sm font-semibold">Add your Soundslice slug</div>
        <p className="max-w-md text-xs text-white/60">
          Open a public slice on soundslice.com, copy the slug from the URL, and
          paste it into{" "}
          <code className="rounded bg-black/40 px-1">soundsliceSlug</code> for
          this lesson in{" "}
          <code className="rounded bg-black/40 px-1">
            src/lib/lessons.ts
          </code>
          .
        </p>
        <div className="text-[11px] text-white/40">
          Placeholder: <code>{slug}</code>
        </div>
      </div>
    );
  }

  const src = `https://www.soundslice.com/slices/${encodeURIComponent(slug)}/embed/`;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
      <iframe
        src={src}
        title={`Soundslice: ${title}`}
        className="h-[420px] w-full"
        allow="fullscreen"
        loading="lazy"
      />
    </div>
  );
}
