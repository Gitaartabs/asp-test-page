import Link from "next/link";
import { notFound } from "next/navigation";
import StatBar from "@/components/StatBar";
import SoundsliceEmbed from "@/components/SoundsliceEmbed";
import AITeacher from "@/components/AITeacher";
import LessonActions from "@/components/LessonActions";
import { LESSONS, getLesson } from "@/lib/lessons";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm text-white/60 hover:text-white">
        ← Back to path
      </Link>

      <header className="space-y-1">
        <div className="text-xs font-bold uppercase tracking-widest text-brand-300">
          {lesson.unit} · {lesson.difficulty}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          {lesson.title}
        </h1>
        <p className="text-white/70">{lesson.subtitle}</p>
      </header>

      <StatBar />
      <AITeacher lesson={lesson} />
      <SoundsliceEmbed slug={lesson.soundsliceSlug} title={lesson.title} />

      <section className="grid gap-3 md:grid-cols-3">
        {lesson.tips.map((tip, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-white/50">
              Tip {i + 1}
            </div>
            <div className="mt-1 text-sm">{tip}</div>
          </div>
        ))}
      </section>

      <LessonActions lesson={lesson} />
    </div>
  );
}
