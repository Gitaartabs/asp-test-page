"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UNITS, getLessonsForUnit } from "@/lib/lessons";
import { loadProgress } from "@/lib/storage";
import type { Progress } from "@/lib/types";

export default function SkillTree() {
  const [p, setP] = useState<Progress | null>(null);

  useEffect(() => {
    setP(loadProgress());
    const onChange = () => setP(loadProgress());
    window.addEventListener("strumly:progress", onChange as EventListener);
    return () =>
      window.removeEventListener("strumly:progress", onChange as EventListener);
  }, []);

  const completed = new Set(p?.completedLessons ?? []);

  // A lesson is unlocked if it's the first one, or any prior lesson is done.
  let unlockedAfter = true;

  return (
    <div className="space-y-6">
      {UNITS.map((unit) => {
        const lessons = getLessonsForUnit(unit.id);
        return (
          <section key={unit.id} className="space-y-3">
            <div
              className={`rounded-2xl bg-gradient-to-r ${unit.color} p-[1px]`}
            >
              <div className="rounded-2xl bg-[#0b0a1f]/90 px-4 py-3">
                <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                  {unit.id}
                </div>
                <div className="text-lg font-bold">{unit.title}</div>
                <div className="text-sm text-white/60">{unit.description}</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              {lessons.map((l, i) => {
                const isDone = completed.has(l.slug);
                const isUnlocked = unlockedAfter || isDone;
                unlockedAfter = isDone; // next becomes unlocked only if this one done
                const side = i % 2 === 0 ? "self-start ml-4" : "self-end mr-4";

                return (
                  <LessonNode
                    key={l.slug}
                    href={`/lesson/${l.slug}`}
                    title={l.title}
                    subtitle={`${l.durationMin} min · +${l.xp} XP`}
                    state={
                      isDone
                        ? "done"
                        : isUnlocked
                          ? "open"
                          : "locked"
                    }
                    sideClass={side}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function LessonNode({
  href,
  title,
  subtitle,
  state,
  sideClass,
}: {
  href: string;
  title: string;
  subtitle: string;
  state: "done" | "open" | "locked";
  sideClass: string;
}) {
  const base =
    "relative flex w-full max-w-md items-center gap-3 rounded-2xl border px-4 py-3 transition";
  const styles =
    state === "done"
      ? "border-emerald-400/30 bg-emerald-400/10 hover:bg-emerald-400/15"
      : state === "open"
        ? "border-brand-400/40 bg-brand-500/10 hover:bg-brand-500/20"
        : "border-white/10 bg-white/5 opacity-60 cursor-not-allowed";

  const icon = state === "done" ? "✓" : state === "open" ? "▶" : "🔒";

  const body = (
    <div className={`${base} ${styles} ${sideClass}`}>
      <div
        className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${
          state === "done"
            ? "bg-emerald-400 text-emerald-950"
            : state === "open"
              ? "bg-brand-500 text-brand-950 animate-pulse"
              : "bg-white/10 text-white/60"
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold">{title}</div>
        <div className="text-xs text-white/60">{subtitle}</div>
      </div>
      {state !== "locked" && <span className="text-white/40">›</span>}
    </div>
  );

  if (state === "locked") return body;
  return <Link href={href}>{body}</Link>;
}
