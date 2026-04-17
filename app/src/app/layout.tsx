import "../styles/globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Strumly — learn guitar, one riff at a time",
  description:
    "A Duolingo-style guitar coach: bite-size lessons, a 3D AI teacher, and Soundslice-powered tabs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-display antialiased">
        <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0b0a1f]/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-500/30">
                <span className="text-lg">🎸</span>
              </span>
              <span className="text-lg font-bold tracking-tight">Strumly</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-white/70">
              <Link href="/" className="hover:text-white">Learn</Link>
              <Link href="/profile" className="hover:text-white">Profile</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6 pb-24">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 pb-8 pt-4 text-center text-xs text-white/40">
          Built with Soundslice embeds · AI teacher is mocked · No account needed
        </footer>
      </body>
    </html>
  );
}
