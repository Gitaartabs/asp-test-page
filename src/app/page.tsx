import Link from "next/link";
import StatBar from "@/components/StatBar";
import SkillTree from "@/components/SkillTree";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-brand-500/10 via-violet-500/10 to-sky-500/10 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand-300">
              Daily goal · 5 minutes
            </div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
              Learn guitar, one riff at a time
            </h1>
            <p className="mt-2 max-w-lg text-white/70">
              Tiny lessons. A real 3D AI teacher. Songs from Soundslice. Keep your
              streak, earn XP, play music.
            </p>
          </div>
          <Link
            href="/lesson/hold-the-guitar"
            className="inline-flex items-center gap-2 self-start rounded-xl bg-brand-500 px-5 py-3 font-bold text-brand-950 shadow-lg shadow-brand-500/30 transition hover:bg-brand-400 md:self-auto"
          >
            Start today's lesson →
          </Link>
        </div>
      </section>

      <StatBar />
      <SkillTree />
    </div>
  );
}
