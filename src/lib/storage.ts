"use client";

import type { Progress, AvatarId } from "./types";

const KEY = "strumly.progress.v1";
const MAX_HEARTS = 5;

const defaultProgress: Progress = {
  xp: 0,
  streakDays: 0,
  lastActiveISO: null,
  hearts: MAX_HEARTS,
  heartsMax: MAX_HEARTS,
  completedLessons: [],
  avatar: "maya",
};

function isBrowser() {
  return typeof window !== "undefined";
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function daysBetween(a: Date, b: Date) {
  const ms = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime() -
    new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  return Math.round(ms / 86_400_000);
}

export function loadProgress(): Progress {
  if (!isBrowser()) return defaultProgress;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return { ...defaultProgress, ...parsed };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(p: Progress) {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEY, JSON.stringify(p));
}

export function touchStreak(p: Progress): Progress {
  const now = new Date();
  if (!p.lastActiveISO) {
    return { ...p, streakDays: 1, lastActiveISO: now.toISOString() };
  }
  const last = new Date(p.lastActiveISO);
  if (sameDay(last, now)) return p;
  const diff = daysBetween(last, now);
  const streakDays = diff === 1 ? p.streakDays + 1 : 1;
  return { ...p, streakDays, lastActiveISO: now.toISOString() };
}

export function completeLesson(p: Progress, slug: string, xp: number): Progress {
  const withStreak = touchStreak(p);
  if (withStreak.completedLessons.includes(slug)) return withStreak;
  return {
    ...withStreak,
    xp: withStreak.xp + xp,
    completedLessons: [...withStreak.completedLessons, slug],
  };
}

export function loseHeart(p: Progress): Progress {
  return { ...p, hearts: Math.max(0, p.hearts - 1) };
}

export function refillHearts(p: Progress): Progress {
  return { ...p, hearts: p.heartsMax };
}

export function setAvatar(p: Progress, avatar: AvatarId): Progress {
  return { ...p, avatar };
}

export function resetProgress(): Progress {
  if (isBrowser()) window.localStorage.removeItem(KEY);
  return defaultProgress;
}
