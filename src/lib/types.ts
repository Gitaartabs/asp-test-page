export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Lesson = {
  slug: string;
  title: string;
  subtitle: string;
  unit: string;
  difficulty: Difficulty;
  durationMin: number;
  xp: number;
  soundsliceSlug: string;
  intro: string;
  tips: string[];
  goal: string;
};

export type Unit = {
  id: string;
  title: string;
  description: string;
  color: string;
  lessonSlugs: string[];
};

export type AvatarId = "maya" | "leo";

export type Progress = {
  xp: number;
  streakDays: number;
  lastActiveISO: string | null;
  hearts: number;
  heartsMax: number;
  completedLessons: string[];
  avatar: AvatarId;
};

export type AITurn = {
  role: "teacher" | "student";
  text: string;
};
