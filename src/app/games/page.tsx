import Link from "next/link";
import { GameCard } from "@/components/games/game-card";
import { getAllGames } from "@/lib/db/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All Games — System Requirements & Compatibility",
  description:
    "Browse our complete database of PC games. Check system requirements, get compatibility reports, and find out if your PC can run any game.",
};

export default async function GamesPage() {
  const { games } = await getAllGames(100, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Browse Games</h1>
        <p className="mt-2 text-[var(--muted)]">
          {games.length}+ games with system requirements. Select a game to check compatibility.
        </p>
      </div>

      {games.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--muted-foreground)]">
            No games found. Make sure the database has been seeded.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {games.map((game) => (
            <GameCard
              key={game.id}
              slug={game.slug}
              title={game.title}
              coverImageUrl={game.coverImageUrl}
              genres={game.genres ?? []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
