"use client";

import { useEffect, useState } from "react";
import Avatar3D from "./Avatar3D";
import { loadProgress, saveProgress, setAvatar } from "@/lib/storage";
import type { AvatarId, Progress } from "@/lib/types";

export default function AvatarPicker({
  onChange,
}: {
  onChange?: (a: AvatarId) => void;
}) {
  const [p, setP] = useState<Progress | null>(null);

  useEffect(() => {
    setP(loadProgress());
  }, []);

  if (!p) return null;

  function pick(a: AvatarId) {
    if (!p) return;
    const next = setAvatar(p, a);
    setP(next);
    saveProgress(next);
    window.dispatchEvent(new Event("strumly:progress"));
    onChange?.(a);
  }

  return (
    <div className="flex items-center gap-4">
      {(["maya", "leo"] as AvatarId[]).map((a) => {
        const selected = p.avatar === a;
        return (
          <button
            key={a}
            type="button"
            onClick={() => pick(a)}
            className={`rounded-2xl border p-2 transition ${
              selected
                ? "border-brand-400 bg-brand-500/10 shadow-lg shadow-brand-500/20"
                : "border-white/10 bg-white/5 hover:border-white/30"
            }`}
            aria-pressed={selected}
          >
            <Avatar3D avatar={a} speaking={false} size="sm" />
          </button>
        );
      })}
    </div>
  );
}
