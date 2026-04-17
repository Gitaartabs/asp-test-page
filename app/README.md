# Strumly

A Duolingo-style guitar learning web app with a 3D AI teacher avatar and
Soundslice-powered tabs/playback.

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind
- Soundslice public embeds for tabs & synced playback
- Mocked Claude-style AI teacher (swap in real Anthropic calls later)
- Local-storage progress (XP, streak, hearts, completed lessons)

## Run

```bash
cd app
npm install
npm run dev
```

Open http://localhost:3000

## Customize

- **Soundslice songs** — edit `soundsliceSlug` for each lesson in `src/lib/lessons.ts`.
  Grab the slug from any public slice URL: `soundslice.com/slices/<SLUG>/`.
- **AI teacher** — the mock lives in `src/app/api/ai/route.ts`. Replace
  the canned replies with a real call to Anthropic's Messages API
  (`claude-sonnet-4-6` recommended). The client already POSTs the shape you need.
- **3D avatar video** — drop `maya.mp4` and `leo.mp4` into `public/avatars/`.
  Until then, a 3D-feel SVG avatar with animated mouth is used as fallback.

## Duolingo-style loop

- Skill tree with unlock gating
- Daily streak (calendar-based)
- Hearts that drain on mistakes
- XP reward + auto-advance after each lesson
- Two AI coaches to choose from (Maya / Leo)
