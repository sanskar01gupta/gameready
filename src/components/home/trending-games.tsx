import { GameCard } from "@/components/games/game-card";

interface TrendingGame {
  gameId: string;
  slug: string;
  title: string;
  coverImageUrl: string | null;
  genres: string[];
  searchCount: number;
}

async function getTrendingGames(): Promise<TrendingGame[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/popular-searches`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((item: any) => ({
      gameId: item.gameId,
      slug: item.game.slug,
      title: item.game.title,
      coverImageUrl: item.game.coverImageUrl,
      genres: item.game.genres ?? [],
      searchCount: item.searchCount,
    }));
  } catch {
    return [];
  }
}

export async function TrendingGames() {
  // For static fallback, use top games directly
  const games = await getTrendingGames().catch(() => []);

  // Fallback: static list of popular games for SSR
  const fallbackGames = [
    { slug: "cyberpunk-2077", title: "Cyberpunk 2077", coverImageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg", genres: ["RPG", "Open World"] },
    { slug: "elden-ring", title: "Elden Ring", coverImageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg", genres: ["Action RPG", "Fantasy"] },
    { slug: "baldurs-gate-3", title: "Baldur's Gate 3", coverImageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg", genres: ["RPG", "Fantasy"] },
    { slug: "gta-v", title: "Grand Theft Auto V", coverImageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg", genres: ["Action", "Open World"] },
    { slug: "valorant", title: "VALORANT", coverImageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/2161700/header.jpg", genres: ["FPS", "Tactical"] },
    { slug: "red-dead-redemption-2", title: "Red Dead Redemption 2", coverImageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg", genres: ["Action", "Western"] },
    { slug: "counter-strike-2", title: "Counter-Strike 2", coverImageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg", genres: ["FPS", "Competitive"] },
    { slug: "fortnite", title: "Fortnite", coverImageUrl: "https://cdn2.unrealengine.com/fortnite-nvidia-geforcenow-1920x1080-56ea6fa2d64a.jpg", genres: ["Battle Royale", "Shooter"] },
  ];

  const displayGames: { slug: string; title: string; coverImageUrl: string | null; genres: string[] }[] =
    games.length > 0 ? games : fallbackGames;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {displayGames.slice(0, 8).map((game) => (
        <GameCard
          key={game.slug}
          slug={game.slug}
          title={game.title}
          coverImageUrl={game.coverImageUrl}
          genres={game.genres}
        />
      ))}
    </div>
  );
}
