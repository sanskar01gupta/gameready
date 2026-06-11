import Link from "next/link";
import { Gamepad2, Code2, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]/50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-[var(--accent)]" />
              <span className="font-bold">
                Game<span className="text-[var(--accent)]">Ready</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--muted)]">
              Know instantly if your PC can run any game. Fast, free, and accurate
              compatibility checks.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-[var(--foreground)] transition-colors">
                  Browse Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular */}
          <div>
            <h3 className="font-semibold mb-3">Popular Checks</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <Link href="/games/gta-vi" className="hover:text-[var(--foreground)] transition-colors">
                  Can I run GTA VI?
                </Link>
              </li>
              <li>
                <Link href="/games/cyberpunk-2077" className="hover:text-[var(--foreground)] transition-colors">
                  Can I run Cyberpunk 2077?
                </Link>
              </li>
              <li>
                <Link href="/games/elden-ring" className="hover:text-[var(--foreground)] transition-colors">
                  Can I run Elden Ring?
                </Link>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="font-semibold mb-3">More</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[var(--foreground)] transition-colors"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border)] text-center text-xs text-[var(--muted-foreground)]">
          <p>
            &copy; {new Date().getFullYear()} GameReady. All game titles, logos, and system
            requirements belong to their respective publishers. This is an independent
            compatibility checker and is not affiliated with any game publisher.
          </p>
        </div>
      </div>
    </footer>
  );
}
