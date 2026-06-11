"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Loader2, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { GameListItem } from "@/types/game";

export function GameSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GameListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const router = useRouter();

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/games?search=${encodeURIComponent(q)}&limit=8`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.games ?? []);
        setOpen((data.games?.length ?? 0) > 0);
      }
    } catch {
      // Silently fail - search is non-critical
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), 150);
    setSelectedIndex(-1);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      router.push(`/games/${results[selectedIndex].slug}`);
      setOpen(false);
      setQuery("");
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div ref={containerRef} className="relative w-full" role="combobox" aria-expanded={open} aria-haspopup="listbox">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search any game..."
          className="w-full h-10 pl-10 pr-10 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-shadow"
          aria-label="Search for a game"
          aria-autocomplete="list"
          aria-controls="search-results"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] animate-spin" />
        )}
      </div>

      {open && results.length > 0 && (
        <ul
          id="search-results"
          role="listbox"
          className="absolute top-full mt-1 w-full rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-lg overflow-hidden z-50 max-h-80 overflow-y-auto"
        >
          {results.map((game, i) => (
            <li
              key={game.id}
              role="option"
              aria-selected={i === selectedIndex}
              className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${
                i === selectedIndex
                  ? "bg-[var(--surface-hover)]"
                  : "hover:bg-[var(--surface-hover)]"
              }`}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <Link
                href={`/games/${game.slug}`}
                className="flex items-center gap-3 w-full"
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
              >
                {game.coverImageUrl ? (
                  <img
                    src={game.coverImageUrl}
                    alt=""
                    className="w-10 h-12 rounded object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-10 h-12 rounded bg-[var(--border)] flex items-center justify-center">
                    <Gamepad2 className="h-5 w-5 text-[var(--muted-foreground)]" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{game.title}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {game.genres?.slice(0, 2).join(", ") ?? "Game"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {open && query.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute top-full mt-1 w-full rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-lg p-4 text-center text-sm text-[var(--muted-foreground)] z-50">
          No games found for &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
