"use client";

import { useEffect, useRef, useState } from "react";
import Avatar3D from "./Avatar3D";
import AvatarPicker from "./AvatarPicker";
import { getTeacherIntro, getTeacherReply } from "@/lib/ai";
import { loadProgress } from "@/lib/storage";
import type { AITurn, AvatarId, Lesson, Progress } from "@/lib/types";

type Props = {
  lesson: Lesson;
};

export default function AITeacher({ lesson }: Props) {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [history, setHistory] = useState<AITurn[]>([]);
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [thinking, setThinking] = useState(false);
  const lastAvatar = useRef<AvatarId | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
    const onChange = () => setProgress(loadProgress());
    window.addEventListener("strumly:progress", onChange as EventListener);
    return () =>
      window.removeEventListener("strumly:progress", onChange as EventListener);
  }, []);

  // Speak the intro once when lesson/avatar loads or changes.
  useEffect(() => {
    if (!progress) return;
    if (lastAvatar.current === progress.avatar && history.length > 0) return;
    lastAvatar.current = progress.avatar;
    const intro = getTeacherIntro(lesson, progress.avatar);
    setHistory([{ role: "teacher", text: intro }]);
    pulseSpeak(intro);
  }, [progress?.avatar, lesson.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  function pulseSpeak(text: string) {
    setSpeaking(true);
    // Rough duration: ~45ms per character, clamped.
    const ms = Math.min(6000, Math.max(900, text.length * 45));
    window.setTimeout(() => setSpeaking(false), ms);
  }

  async function send() {
    const msg = input.trim();
    if (!msg || !progress || thinking) return;
    setInput("");
    const nextHistory: AITurn[] = [...history, { role: "student", text: msg }];
    setHistory(nextHistory);
    setThinking(true);
    const reply = await getTeacherReply(lesson, progress.avatar, nextHistory, msg);
    setHistory((h) => [...h, { role: "teacher", text: reply }]);
    setThinking(false);
    pulseSpeak(reply);
  }

  if (!progress) {
    return <div className="h-48 animate-pulse rounded-2xl bg-white/5" />;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start gap-4">
        <Avatar3D avatar={progress.avatar} speaking={speaking} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-bold uppercase tracking-widest text-white/60">
              Your AI teacher
            </div>
            <AvatarPicker />
          </div>
          <div className="mt-2 max-h-52 space-y-2 overflow-y-auto pr-1">
            {history.map((turn, i) => (
              <div
                key={i}
                className={
                  turn.role === "teacher"
                    ? "rounded-xl bg-brand-500/10 px-3 py-2 text-sm"
                    : "rounded-xl bg-white/10 px-3 py-2 text-sm text-white/80"
                }
              >
                {turn.text}
              </div>
            ))}
            {thinking && (
              <div className="rounded-xl bg-brand-500/10 px-3 py-2 text-sm text-white/60">
                …thinking
              </div>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void send();
              }}
              placeholder="Ask for a tip, say you're stuck, or request slower…"
              className="flex-1 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-brand-400"
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={thinking || !input.trim()}
              className="rounded-xl bg-brand-500 px-3 py-2 text-sm font-bold text-brand-950 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
