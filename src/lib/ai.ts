import type { AITurn, Lesson, AvatarId } from "./types";

// Claude-ready interface. Swap the mock for a real Anthropic call by
// replacing getTeacherIntro / getTeacherFeedback / getTeacherReply with
// fetches to /api/ai, which can route to Anthropic's Messages API.

const persona: Record<AvatarId, { name: string; voice: string }> = {
  maya: {
    name: "Maya",
    voice:
      "warm, encouraging, precise. Uses short sentences and celebrates small wins.",
  },
  leo: {
    name: "Leo",
    voice:
      "calm, experienced, story-driven. Often links a technique to a song you'd know.",
  },
};

export function getPersona(avatar: AvatarId) {
  return persona[avatar];
}

export function getTeacherIntro(lesson: Lesson, avatar: AvatarId): string {
  const p = persona[avatar];
  return `Hey, I'm ${p.name}. Today: ${lesson.title}. ${lesson.intro}`;
}

export function getTeacherGoal(lesson: Lesson, avatar: AvatarId): string {
  const p = persona[avatar];
  return `${p.name} says: Your goal — ${lesson.goal}`;
}

export function getTeacherFeedback(
  lesson: Lesson,
  avatar: AvatarId,
  outcome: "great" | "ok" | "retry"
): string {
  const p = persona[avatar];
  if (outcome === "great") {
    return `${p.name}: That's the one. You felt it too, right? +${lesson.xp} XP is yours.`;
  }
  if (outcome === "ok") {
    return `${p.name}: Getting there. One clean pass and we move on.`;
  }
  return `${p.name}: No worries. Slow it down by half and we try again.`;
}

export async function getTeacherReply(
  lesson: Lesson,
  avatar: AvatarId,
  history: AITurn[],
  message: string
): Promise<string> {
  // Mocked — server route /api/ai returns canned replies shaped like Claude output.
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      lessonSlug: lesson.slug,
      avatar,
      history,
      message,
    }),
  });
  if (!res.ok) {
    const p = persona[avatar];
    return `${p.name}: Let's focus on the goal — ${lesson.goal}`;
  }
  const data = (await res.json()) as { reply: string };
  return data.reply;
}
