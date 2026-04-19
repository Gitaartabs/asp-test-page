import { NextResponse } from "next/server";
import { getLesson } from "@/lib/lessons";
import { getPersona } from "@/lib/ai";
import type { AITurn, AvatarId } from "@/lib/types";

type Payload = {
  lessonSlug: string;
  avatar: AvatarId;
  history: AITurn[];
  message: string;
};

// Mock AI endpoint. Shape mirrors a call to Anthropic's Messages API so
// flipping to real Claude is a small swap:
//
//   const client = new Anthropic();
//   const r = await client.messages.create({
//     model: "claude-sonnet-4-6",
//     max_tokens: 300,
//     system: `You are ${persona.name}, a guitar teacher. ${persona.voice}`,
//     messages: [...history mapped to {role,content}, {role:"user", content: message}]
//   });
//   return NextResponse.json({ reply: r.content[0].text });

export async function POST(req: Request) {
  const body = (await req.json()) as Payload;
  const lesson = getLesson(body.lessonSlug);
  const persona = getPersona(body.avatar);

  if (!lesson) {
    return NextResponse.json(
      { reply: `${persona.name}: Pick a lesson and let's get started.` },
      { status: 200 }
    );
  }

  const msg = body.message.toLowerCase();
  let reply: string;

  if (msg.includes("stuck") || msg.includes("help")) {
    reply = `${persona.name}: Totally normal. Try this — ${lesson.tips[0]} Then strum just once. If it rings, you've got it.`;
  } else if (msg.includes("slow") || msg.includes("fast")) {
    reply = `${persona.name}: Half-speed beats full-speed every time. 60 bpm, one bar, clean. Then bump it up.`;
  } else if (msg.includes("sound") || msg.includes("buzz") || msg.includes("mute")) {
    reply = `${persona.name}: That's usually finger placement. Press just behind the fret wire — almost touching it, not on top.`;
  } else if (msg.includes("next") || msg.includes("done")) {
    reply = `${persona.name}: Nice. Finish with your goal — ${lesson.goal} — and tap "I got it".`;
  } else if (msg.includes("chord") || msg.includes("shape")) {
    reply = `${persona.name}: ${lesson.tips[1] ?? lesson.tips[0]} Keep your thumb behind the neck.`;
  } else {
    const tip = lesson.tips[Math.floor(Math.random() * lesson.tips.length)];
    reply = `${persona.name}: ${tip}`;
  }

  // Tiny think time so the talking animation reads naturally.
  await new Promise((r) => setTimeout(r, 250));
  return NextResponse.json({ reply });
}
