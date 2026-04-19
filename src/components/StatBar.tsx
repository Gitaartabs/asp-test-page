"use client";

import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/storage";
import type { Progress } from "@/lib/types";

export default function StatBar() {
  const [p, setP] = useState<Progress | null>(null);

  useEffect(() => {
    setP(loadProgress());
    const onStorage = () => setP(loadProgress());
    window.addEventListener("storage", onStorage);
    window.addEventListener("strumly:progress", onStorage as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("strumly:progress", onStorage as EventListener);
    };
  }, []);

  if (!p) {
    return <div className="h-14 rounded-xl bg-white/5" />;
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-sm">
      <Stat label="Streak" value={`${p.streakDays}d`} icon="🔥" />
      <Stat label="XP" value={`${p.xp}`} icon="⭐" />
      <Stat
        label="Hearts"
        value={`${p.hearts}/${p.heartsMax}`}
        icon={p.hearts > 0 ? "❤️" : "💔"}
      />
      <Stat
        label="Done"
        value={`${p.completedLessons.length}`}
        icon="✅"
      />
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="text-xl leading-none">{icon}</span>
      <div className="min-w-0">
        <div className="text-sm font-semibold leading-tight">{value}</div>
        <div className="text-[10px] uppercase tracking-wider text-white/50">{label}</div>
      </div>
    </div>
  );
}
