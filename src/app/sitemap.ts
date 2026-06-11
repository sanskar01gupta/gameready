import type { MetadataRoute } from "next";
import { db, schema } from "@/lib/db";
const { games } = schema;

const BASE_URL = "https://gameready.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allGames = await db
    .select({ slug: games.slug, updatedAt: games.updatedAt })
    .from(games);

  const gameEntries = allGames.map((g) => ({
    url: `${BASE_URL}/games/${g.slug}`,
    lastModified: g.updatedAt ?? new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

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
