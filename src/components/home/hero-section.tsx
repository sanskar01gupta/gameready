import Link from "next/link";
import { GameSearch } from "@/components/games/game-search";
import { ArrowRight, Monitor, Zap, Share2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Can Your PC Run{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-purple-400">
              Any Game
            </span>
            ?
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[var(--muted)] leading-relaxed max-w-2xl mx-auto">
            Instant compatibility reports, FPS estimates, and upgrade suggestions.
            Find out in seconds if your system is ready.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-xl mx-auto">
            <GameSearch />
            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
              Try: Cyberpunk 2077, Elden Ring, GTA V, Fortnite...
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/games"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent)]/90 transition-colors shadow-lg shadow-[var(--accent)]/25"
            >
              Browse All Games
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { icon: Monitor, title: "1. Search a Game", desc: "Find any game in our database of 100+ titles with accurate requirements." },
            { icon: Zap, title: "2. Enter Your Specs", desc: "Tell us your CPU, GPU, and RAM. Simple manual entry or auto-detection where available." },
            { icon: Share2, title: "3. Get Your Report", desc: "See your compatibility score, FPS estimates, bottlenecks, and upgrade recommendations." },
          ].map((step) => (
            <div key={step.title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] mb-4">
                <step.icon className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
