"use client";

import { useEffect, useRef } from "react";
import type { AvatarId } from "@/lib/types";

type Props = {
  avatar: AvatarId;
  speaking: boolean;
  size?: "sm" | "md" | "lg";
};

// 3D-video-style AI teacher avatar.
//
// Drop real talking-head MP4s (e.g. from D-ID, HeyGen, Synthesia) into
// /public/avatars/ as maya.mp4 and leo.mp4 and they'll auto-play.
// Until then, this falls back to a stylized 3D-feel SVG avatar that
// animates its mouth while `speaking` is true — so the interaction is
// fully functional out of the box.
export default function Avatar3D({ avatar, speaking, size = "md" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (speaking) void v.play().catch(() => {});
    else v.pause();
  }, [speaking]);

  const dims =
    size === "lg"
      ? "h-64 w-64"
      : size === "sm"
        ? "h-24 w-24"
        : "h-40 w-40";

  const src = avatar === "maya" ? "/avatars/maya.mp4" : "/avatars/leo.mp4";

  return (
    <div className={`relative ${dims}`}>
      {speaking && (
        <span className="absolute inset-0 rounded-full bg-brand-400/40 animate-pulse-ring" />
      )}
      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/10 bg-gradient-to-br from-slate-800 to-slate-950 shadow-xl">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          loop
          muted
          playsInline
          preload="metadata"
          onError={(e) => {
            // Hide video if source missing so SVG fallback shows through.
            (e.currentTarget as HTMLVideoElement).style.display = "none";
          }}
        />
        <AvatarFallbackSVG avatar={avatar} speaking={speaking} />
      </div>
      <div className="mt-2 text-center text-xs font-semibold uppercase tracking-wider text-white/60">
        {avatar === "maya" ? "Maya" : "Leo"} · AI teacher
      </div>
    </div>
  );
}

function AvatarFallbackSVG({ avatar, speaking }: { avatar: AvatarId; speaking: boolean }) {
  const skin = avatar === "maya" ? "#f1c7a5" : "#d9a87c";
  const hair = avatar === "maya" ? "#3b1d1d" : "#1a1512";
  const shirt = avatar === "maya" ? "#c026d3" : "#0ea5e9";
  const lipColor = avatar === "maya" ? "#be123c" : "#7f1d1d";

  return (
    <svg
      viewBox="0 0 200 200"
      className="relative h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#2a1a4a" />
          <stop offset="100%" stopColor="#0b0a1f" />
        </radialGradient>
        <radialGradient id="face" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={skin} />
          <stop offset="100%" stopColor={shade(skin)} />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#bg)" />

      {/* shoulders / shirt */}
      <path d="M20 200 C40 150, 80 140, 100 140 C120 140, 160 150, 180 200 Z" fill={shirt} />

      {/* neck */}
      <rect x="86" y="120" width="28" height="28" rx="10" fill={shade(skin)} />

      {/* hair back */}
      <ellipse cx="100" cy="80" rx="56" ry="54" fill={hair} />

      {/* face */}
      <ellipse cx="100" cy="90" rx="44" ry="50" fill="url(#face)" />

      {/* hair fringe */}
      {avatar === "maya" ? (
        <path d="M56 70 C70 40, 130 40, 146 72 C130 58, 115 62, 100 70 C85 62, 70 58, 56 70 Z" fill={hair} />
      ) : (
        <path d="M56 76 C70 48, 130 48, 146 76 C130 72, 115 74, 100 78 C85 74, 70 72, 56 76 Z" fill={hair} />
      )}

      {/* eyes */}
      <g fill="#1f2937">
        <ellipse cx="84" cy="92" rx="3.5" ry="4.5" />
        <ellipse cx="116" cy="92" rx="3.5" ry="4.5" />
      </g>
      <g fill="#fff">
        <circle cx="83" cy="90" r="1" />
        <circle cx="115" cy="90" r="1" />
      </g>

      {/* brows */}
      <g stroke={hair} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M76 82 Q84 78 92 82" />
        <path d="M108 82 Q116 78 124 82" />
      </g>

      {/* mouth — animated when speaking */}
      <g transform="translate(100 115)">
        <rect
          x="-10"
          y="-3"
          width="20"
          height="6"
          rx="3"
          fill={lipColor}
          style={{
            transformOrigin: "center",
            animation: speaking ? "talk 0.35s ease-in-out infinite" : "none",
          }}
        />
      </g>
    </svg>
  );
}

function shade(hex: string) {
  // rough darken by 18%
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((n >> 16) & 0xff) - 40);
  const g = Math.max(0, ((n >> 8) & 0xff) - 40);
  const b = Math.max(0, (n & 0xff) - 40);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
