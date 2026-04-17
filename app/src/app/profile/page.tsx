"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatBar from "@/components/StatBar";
import AvatarPicker from "@/components/AvatarPicker";
import Avatar3D from "@/components/Avatar3D";
import {
  loadProgress,
  refillHearts,
  resetProgress,
  saveProgress,
} from "@/lib/storage";
import type { Progress } from "@/lib/types";

export default function ProfilePage() {
  const [p, setP] = useState<Progress | null>(null);

  useEffect(() => {
    setP(loadProgress());
  }, []);

  function emit(next: Progress) {
    setP(next);
    saveProgress(next);
    window.dispatchEvent(new Event("strumly:progress"));
  }

  if (!p) return <div className="h-40 animate-pulse rounded-2xl bg-white/5" />;

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm text-white/60 hover:text-white">
        ← Back
      </Link>

      <header className="flex items-center gap-4">
        <Avatar3D avatar={p.avatar} speaking={false} size="md" />
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Your profile</h1>
          <p className="text-white/60">
            Keep the streak going. Pick the coach who fits your vibe.
          </p>
        </div>
      </header>

      <StatBar />

      <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs font-bold uppercase tracking-widest text-white/60">
          Your AI teacher
        </div>
        <div className="mt-3">
          <AvatarPicker />
        </div>
      </section>

      <section className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => emit(refillHearts(p))}
          className="rounded-xl bg-rose-400 px-4 py-2 text-sm font-bold text-rose-950"
        >
          Refill hearts
        </button>
        <button
          type="button"
          onClick={() => {
            resetProgress();
            window.dispatchEvent(new Event("strumly:progress"));
            setP(loadProgress());
          }}
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
        >
          Reset progress
        </button>
      </section>
    </div>
  );
}
