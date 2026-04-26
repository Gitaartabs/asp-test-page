"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Pin a specific version so the CDN URL is reproducible.
const ALPHA_TAB_VERSION = "1.8.2";
const CDN = `https://cdn.jsdelivr.net/npm/@coderline/alphatab@${ALPHA_TAB_VERSION}/dist`;
const SCRIPT_URL = `${CDN}/alphaTab.min.js`;
const FONT_DIR = `${CDN}/font/`;
const SOUNDFONT = `${CDN}/soundfont/sonivox.sf2`;

// Minimal subset of the AlphaTab runtime API we touch.
type AlphaTabApi = {
  tex: (data: string) => void;
  load: (data: ArrayBuffer | Uint8Array | string) => void;
  playPause: () => void;
  stop: () => void;
  destroy: () => void;
  playerStateChanged: { on: (cb: (e: { state: number }) => void) => void };
  renderStarted: { on: (cb: () => void) => void };
  renderFinished: { on: (cb: () => void) => void };
  soundFontLoaded: { on: (cb: () => void) => void };
};

type AlphaTabGlobal = {
  AlphaTabApi: new (el: HTMLElement, settings: unknown) => AlphaTabApi;
};

declare global {
  interface Window {
    alphaTab?: AlphaTabGlobal;
  }
}

type Props = {
  // AlphaTex source (https://alphatab.net/docs/alphatex/introduction).
  // Either tex OR src must be provided.
  tex?: string;
  // URL to a Guitar Pro / MusicXML file (served from /public or remote with CORS).
  src?: string;
  title?: string;
};

export default function AlphaTabPlayer({ tex, src, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<AlphaTabApi | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [soundFontReady, setSoundFontReady] = useState(false);

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !window.alphaTab) return;

    const api = new window.alphaTab.AlphaTabApi(containerRef.current, {
      core: {
        fontDirectory: FONT_DIR,
      },
      display: {
        staveProfile: "ScoreTab",
        layoutMode: "Page",
      },
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        soundFont: SOUNDFONT,
        scrollMode: 0,
      },
    });

    apiRef.current = api;

    api.playerStateChanged.on((e) => setIsPlaying(e.state === 1));
    api.renderFinished.on(() => setIsReady(true));
    api.soundFontLoaded.on(() => setSoundFontReady(true));

    if (tex) {
      api.tex(tex);
    } else if (src) {
      fetch(src)
        .then((r) => r.arrayBuffer())
        .then((buf) => api.load(buf))
        .catch((err) => console.error("AlphaTab load failed:", err));
    }

    return () => {
      api.destroy();
      apiRef.current = null;
    };
  }, [scriptLoaded, tex, src]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white">
      <Script
        src={SCRIPT_URL}
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
      />

      <div className="flex items-center gap-2 border-b border-black/10 bg-black/[0.03] px-3 py-2">
        <button
          type="button"
          onClick={() => apiRef.current?.playPause()}
          disabled={!isReady || !soundFontReady}
          className="rounded-lg bg-brand-500 px-3 py-1 text-xs font-bold text-brand-950 shadow disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={() => apiRef.current?.stop()}
          disabled={!isReady}
          className="rounded-lg border border-black/15 px-3 py-1 text-xs font-semibold text-black/80 disabled:opacity-40"
        >
          Stop
        </button>
        {title ? (
          <div className="ml-2 truncate text-xs font-medium text-black/60">
            {title}
          </div>
        ) : null}
        <div className="ml-auto text-[10px] uppercase tracking-wider text-black/40">
          {!scriptLoaded
            ? "Loading engine…"
            : !isReady
              ? "Rendering…"
              : !soundFontReady
                ? "Loading sound…"
                : "Ready"}
        </div>
      </div>

      <div
        ref={containerRef}
        className="alphaTab max-h-[480px] overflow-auto p-2 text-black"
      />
    </div>
  );
}
