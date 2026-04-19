import type { Lesson, Unit } from "./types";

// NOTE: These soundsliceSlug values are placeholders. Soundslice public embeds
// use the pattern https://www.soundslice.com/slices/{SLUG}/embed/
// Replace each slug with a real public slice from your Soundslice account.
export const LESSONS: Lesson[] = [
  {
    slug: "hold-the-guitar",
    title: "Hold the guitar",
    subtitle: "Posture, hand position, and your first string pluck",
    unit: "foundations",
    difficulty: "beginner",
    durationMin: 4,
    xp: 20,
    soundsliceSlug: "DEMO1",
    intro:
      "Welcome! Before a single note, we get comfortable. A relaxed body means relaxed hands, and relaxed hands mean clean sound.",
    tips: [
      "Sit tall, guitar waist resting on your right leg.",
      "Thumb behind the neck, not curled over.",
      "Let the pick rest lightly between thumb and index.",
    ],
    goal: "Pluck each open string cleanly, one at a time.",
  },
  {
    slug: "first-chord-em",
    title: "Your first chord: Em",
    subtitle: "Two fingers, six ringing strings",
    unit: "chords",
    difficulty: "beginner",
    durationMin: 5,
    xp: 25,
    soundsliceSlug: "DEMO2",
    intro:
      "E minor is the friendliest chord on the guitar. Two fingers, and every string rings. Let's make it sound huge.",
    tips: [
      "Fingers 2 and 3 on the A and D strings, 2nd fret.",
      "Press just behind the fret wire, not on top.",
      "Strum all six strings in one confident motion.",
    ],
    goal: "Strum Em four times in a row, all strings ringing.",
  },
  {
    slug: "chord-a-minor",
    title: "Add A minor",
    subtitle: "Your second chord and first chord change",
    unit: "chords",
    difficulty: "beginner",
    durationMin: 6,
    xp: 30,
    soundsliceSlug: "DEMO3",
    intro:
      "Am shares a shape with Em — just slide it over. Changing between them is your first real guitar move.",
    tips: [
      "Keep fingers 2 and 3 planted; finger 1 lands on the B string.",
      "Strum from the A string down (skip the low E).",
      "Switch slowly — accuracy beats speed every time.",
    ],
    goal: "Switch Em → Am → Em cleanly, 4 times.",
  },
  {
    slug: "down-strum-groove",
    title: "Down-strum groove",
    subtitle: "Your first strumming pattern",
    unit: "rhythm",
    difficulty: "beginner",
    durationMin: 5,
    xp: 25,
    soundsliceSlug: "DEMO4",
    intro:
      "Four steady down-strums. Nothing fancy — but played in time, it sounds like music already.",
    tips: [
      "Strum from the wrist, not the whole arm.",
      "Keep the pick loose; let it glide across the strings.",
      "Tap your foot. If your foot stops, so does the beat.",
    ],
    goal: "Play 8 bars of Em with four down-strums per bar at 80 bpm.",
  },
  {
    slug: "down-up-pattern",
    title: "Down-up pattern",
    subtitle: "Eighth notes that groove",
    unit: "rhythm",
    difficulty: "beginner",
    durationMin: 6,
    xp: 30,
    soundsliceSlug: "DEMO5",
    intro:
      "Same arm, now keep it moving. Down on the beat, up on the and. That tiny detail is the whole feel of pop music.",
    tips: [
      "Never stop the strumming arm — even when not hitting strings.",
      "Upstrokes are lighter than downstrokes.",
      "Count out loud: 1 and 2 and 3 and 4 and.",
    ],
    goal: "Play 4 bars of Em with down-up pattern at 80 bpm.",
  },
  {
    slug: "two-chord-song",
    title: "Two-chord song",
    subtitle: "Em + Am = your first song",
    unit: "songs",
    difficulty: "beginner",
    durationMin: 7,
    xp: 40,
    soundsliceSlug: "DEMO6",
    intro:
      "Two chords, one pattern, real music. We'll play through a simple 8-bar progression until it flows.",
    tips: [
      "Change chord on beat 4's upstroke — it buys you time.",
      "If you miss the change, stay in time — catch the next bar.",
      "Smile when it sounds good. That's a legitimate technique.",
    ],
    goal: "Play the full progression twice through without stopping.",
  },
  {
    slug: "first-pentatonic",
    title: "The pentatonic box",
    subtitle: "Your first lead scale",
    unit: "lead",
    difficulty: "intermediate",
    durationMin: 8,
    xp: 45,
    soundsliceSlug: "DEMO7",
    intro:
      "Five notes that sound good over almost anything. Learn this shape and you can improvise on day one.",
    tips: [
      "One finger per fret — index on fret 5, pinky on fret 8.",
      "Play slow and even before you play fast.",
      "Try ending every phrase on the root note.",
    ],
    goal: "Play the A minor pentatonic up and down at 60 bpm, no mistakes.",
  },
  {
    slug: "string-bends",
    title: "String bends",
    subtitle: "Make the guitar sing",
    unit: "lead",
    difficulty: "intermediate",
    durationMin: 8,
    xp: 50,
    soundsliceSlug: "DEMO8",
    intro:
      "Bending is how guitarists cry, laugh, and shout. Use two fingers to push — your ear tells you when to stop.",
    tips: [
      "Support the bend with the finger behind.",
      "Aim for a whole step first (two frets of pitch).",
      "Bend up slowly, hold, release in time.",
    ],
    goal: "Bend the 7th fret of the G string up a whole step, in tune.",
  },
];

export const UNITS: Unit[] = [
  {
    id: "foundations",
    title: "Foundations",
    description: "How to hold, tune, and play your first note.",
    color: "from-emerald-400 to-emerald-600",
    lessonSlugs: ["hold-the-guitar"],
  },
  {
    id: "chords",
    title: "First Chords",
    description: "Em and Am — the two that unlock thousands of songs.",
    color: "from-sky-400 to-sky-600",
    lessonSlugs: ["first-chord-em", "chord-a-minor"],
  },
  {
    id: "rhythm",
    title: "Rhythm",
    description: "Steady strumming that makes people nod.",
    color: "from-violet-400 to-violet-600",
    lessonSlugs: ["down-strum-groove", "down-up-pattern"],
  },
  {
    id: "songs",
    title: "Your First Song",
    description: "Put it all together.",
    color: "from-rose-400 to-rose-600",
    lessonSlugs: ["two-chord-song"],
  },
  {
    id: "lead",
    title: "Lead & Solos",
    description: "Scales, bends, and starting to improvise.",
    color: "from-amber-400 to-amber-600",
    lessonSlugs: ["first-pentatonic", "string-bends"],
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getLessonsForUnit(unitId: string): Lesson[] {
  const unit = UNITS.find((u) => u.id === unitId);
  if (!unit) return [];
  return unit.lessonSlugs
    .map((s) => getLesson(s))
    .filter((l): l is Lesson => Boolean(l));
}

export function nextLesson(completed: string[]): Lesson | undefined {
  return LESSONS.find((l) => !completed.includes(l.slug));
}
