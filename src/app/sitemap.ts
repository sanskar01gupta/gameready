import type { MetadataRoute } from "next";

const BASE_URL = "https://gameready.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Try to fetch games from DB, fall back gracefully if no database
  let gameEntries: MetadataRoute.Sitemap = [];
  try {
    const { db, schema } = await import("@/lib/db");
    const { games } = schema;
    const allGames = await db
      .select({ slug: games.slug, updatedAt: games.updatedAt })
      .from(games);

    gameEntries = allGames.map((g) => ({
      url: `${BASE_URL}/games/${g.slug}`,
      lastModified: g.updatedAt ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // No database available — return base sitemap without game pages
  }

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/games`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...gameEntries,
  ];
}
