"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, Gamepad2 } from "lucide-react";
import { GameSearch } from "@/components/games/game-search";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Gamepad2 className="h-7 w-7 text-[var(--accent)]" />
            <span className="text-xl font-bold tracking-tight">
              Game<span className="text-[var(--accent)]">Ready</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/games"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Browse Games
            </Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <GameSearch />
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
              aria-label={searchOpen ? "Close search" : "Open search"}
            >
              {searchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <GameSearch />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2" aria-label="Mobile navigation">
            <Link
              href="/"
              className="block px-3 py-2 rounded-lg text-sm hover:bg-[var(--surface-hover)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/games"
              className="block px-3 py-2 rounded-lg text-sm hover:bg-[var(--surface-hover)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Games
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
