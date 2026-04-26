import AlphaTabPlayer from "@/components/AlphaTabPlayer";
import ChordDiagram from "@/components/ChordDiagram";

// AlphaTex (https://alphatab.net/docs/alphatex/introduction):
// Original 8-bar exercise — Em → Am chord stabs followed by an A-minor
// pentatonic run, in standard tuning at 90 bpm. Copyright-clean.
const DEMO_TEX = `\\title "Strumly POC: Em / Am + Pentatonic"
\\subtitle "AlphaTab in-browser tab + playback"
\\tempo 90
.
// Bar 1-2: Em chord stabs (down-strum, ring, rest)
(0.6 2.5 2.4 0.3 0.2 0.1).4 r.4 (0.6 2.5 2.4 0.3 0.2 0.1).4 r.4 |
(0.6 2.5 2.4 0.3 0.2 0.1).4 r.4 (0.6 2.5 2.4 0.3 0.2 0.1).4 r.4 |
// Bar 3-4: Am chord stabs (skip low E)
(x.6 0.5 2.4 2.3 1.2 0.1).4 r.4 (x.6 0.5 2.4 2.3 1.2 0.1).4 r.4 |
(x.6 0.5 2.4 2.3 1.2 0.1).4 r.4 (x.6 0.5 2.4 2.3 1.2 0.1).4 r.4 |
// Bar 5-6: A-minor pentatonic ascending (5th-position box)
5.6 8.6 5.5 7.5 5.4 7.4 | 5.3 7.3 5.2 8.2 5.1 8.1 |
// Bar 7-8: descending + landing on the A root
8.1 5.1 8.2 5.2 7.3 5.3 | 7.4 5.4 7.5 5.5 8.6 5.6 |
`;

type ChordDef = {
  name: string;
  frets: [number, number, number, number, number, number];
  fingers?: [number, number, number, number, number, number];
  startFret?: number;
  barre?: { fret: number; fromString: number; toString: number };
};

// First-position open chords (low E → high E).
const OPEN_CHORDS: ChordDef[] = [
  { name: "Em", frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
  { name: "Am", frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
  { name: "C", frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
  { name: "G", frets: [3, 2, 0, 0, 0, 3], fingers: [3, 2, 0, 0, 0, 4] },
  { name: "D", frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
  { name: "E", frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
];

// Barre / extended chords to show the higher-position rendering + barre rect.
const BARRE_CHORDS: ChordDef[] = [
  {
    name: "F",
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    startFret: 1,
    barre: { fret: 1, fromString: 1, toString: 6 },
  },
  {
    name: "Bm",
    frets: [-1, 2, 4, 4, 3, 2],
    fingers: [0, 1, 3, 4, 2, 1],
    startFret: 2,
    barre: { fret: 2, fromString: 1, toString: 5 },
  },
  {
    name: "Cmaj7",
    frets: [-1, 3, 2, 0, 0, 0],
    fingers: [0, 3, 2, 0, 0, 0],
  },
  {
    name: "Dm7",
    frets: [-1, -1, 0, 2, 1, 1],
    fingers: [0, 0, 0, 2, 1, 1],
  },
];

export default function PlayPage() {
  return (
    <div className="space-y-8">
      <header>
        <div className="text-xs font-bold uppercase tracking-widest text-brand-300">
          POC · /play
        </div>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
          Tabs &amp; Chords sandbox
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Two proofs of concept: an in-browser tab/notation renderer with audio
          playback (AlphaTab, loaded from CDN) and a dependency-free chord
          diagram component (pure SVG). All source — both the AlphaTex
          exercise below and every chord shape — is generated locally, no
          third-party transcriptions.
        </p>
      </header>

      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold">1. AlphaTab — score + tab + playback</h2>
          <span className="text-xs text-white/50">@coderline/alphatab 1.8.2</span>
        </div>
        <p className="text-sm text-white/60">
          Renders standard notation, guitar tab, and a synthesized playback
          cursor from a plain-text AlphaTex source. Same source could come from
          the Wix CMS as a string field per lesson.
        </p>
        <AlphaTabPlayer tex={DEMO_TEX} title="Em / Am + A-minor pentatonic" />
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold">2. Chord diagrams — pure SVG</h2>
          <span className="text-xs text-white/50">no dependencies</span>
        </div>
        <p className="text-sm text-white/60">
          Drop-in <code className="rounded bg-white/10 px-1">ChordDiagram</code>{" "}
          component. Pass frets / fingers / optional barre and start-fret —
          renders a clean SVG that scales to any size and inherits theme
          colors.
        </p>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
            Open position
          </h3>
          <div className="flex flex-wrap gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            {OPEN_CHORDS.map((c) => (
              <ChordDiagram key={c.name} {...c} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
            Barre &amp; extended
          </h3>
          <div className="flex flex-wrap gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            {BARRE_CHORDS.map((c) => (
              <ChordDiagram key={c.name} {...c} />
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
        <h3 className="mb-2 font-bold text-white">Notes for evaluation</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            AlphaTab here is loaded from jsDelivr (no bundler config). For
            production we&apos;d either keep that or self-host the assets in{" "}
            <code className="rounded bg-white/10 px-1">/public</code>.
          </li>
          <li>
            AlphaTab also reads Guitar Pro (.gp / .gp5) and MusicXML — switch{" "}
            <code className="rounded bg-white/10 px-1">tex</code> for{" "}
            <code className="rounded bg-white/10 px-1">src</code> to load a
            file.
          </li>
          <li>
            All notation in this POC is original / public exercise material.
            Copyrighted transcriptions would still need licensing.
          </li>
        </ul>
      </section>
    </div>
  );
}
