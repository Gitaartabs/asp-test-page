"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  completeLesson,
  loadProgress,
  loseHeart,
  saveProgress,
} from "@/lib/storage";
import { nextLesson } from "@/lib/lessons";
import type { Lesson, Progress } from "@/lib/types";

export default function LessonActions({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const [p, setP] = useState<Progress | null>(null);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    setP(loadProgress());
  }, []);

  function emit(next: Progress) {
    setP(next);
    saveProgress(next);
    window.dispatchEvent(new Event("strumly:progress"));
  }

  function onDone() {
    if (!p) return;
    const next = completeLesson(p, lesson.slug, lesson.xp);
    emit(next);
    setCelebrating(true);
    window.setTimeout(() => {
      const n = nextLesson(next.completedLessons);
      router.push(n ? `/lesson/${n.slug}` : "/");
    }, 1400);
  }

  function onMiss() {
    if (!p) return;
    emit(loseHeart(p));
  }

  if (!p) return null;

  const done = p.completedLessons.includes(lesson.slug);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-white/60">
            Goal
          </div>
          <div className="text-sm">{lesson.goal}</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMiss}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            Mistake (−1 ❤️)
          </button>
          <button
            type="button"
            onClick={onDone}
            disabled={celebrating}
            className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-bold text-emerald-950 disabled:opacity-70"
          >
            {done ? "Do again" : `I got it · +${lesson.xp} XP`}
          </button>
        </div>
      </div>
      {celebrating && (
        <div className="mt-3 rounded-xl bg-emerald-400/10 px-3 py-2 text-center text-sm text-emerald-200">
          🎉 Nice! Moving you to the next lesson…
        </div>
      )}
    </div>
  );
}
