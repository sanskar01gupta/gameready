import { db, schema } from "./index";
import { eq, like, desc, and, sql, or, gte, lte } from "drizzle-orm";
import type { GameWithRequirements, GameListItem } from "@/types/game";

const { games, gameRequirements, reports, popularSearches } = schema;

// Both local SQLite and Turso use SQLite-compatible datetime
const now = () => sql`(datetime('now'))`;

// ─── Games ───────────────────────────────────────────────────────────────────

export async function searchGames(
  query: string,
  limit = 20,
  offset = 0
): Promise<{ games: GameListItem[]; total: number }> {
  const pattern = `%${query}%`;

  const results = await db
    .select({
      id: games.id,
      slug: games.slug,
      title: games.title,
      coverImageUrl: games.coverImageUrl,
      genres: games.genres,
      releaseDate: games.releaseDate,
      developer: games.developer,
    })
    .from(games)
    .where(like(games.title, pattern))
    .limit(limit)
    .offset(offset)
    .orderBy(games.title);

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(games)
    .where(like(games.title, pattern));

  return {
    games: results as GameListItem[],
    total: countResult[0]?.count ?? results.length,
  };
}

export async function getAllGames(
  limit = 50,
  offset = 0
): Promise<{ games: GameListItem[]; total: number }> {
  const results = await db
    .select({
      id: games.id,
      slug: games.slug,
      title: games.title,
      coverImageUrl: games.coverImageUrl,
      genres: games.genres,
      releaseDate: games.releaseDate,
      developer: games.developer,
    })
    .from(games)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(games.releaseDate));

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(games);

  return {
    games: results as GameListItem[],
    total: countResult[0]?.count ?? results.length,
  };
}

export async function getGameBySlug(slug: string): Promise<GameWithRequirements | null> {
  const gameResults = await db
    .select()
    .from(games)
    .where(eq(games.slug, slug))
    .limit(1);

  if (!gameResults.length) return null;

  const game = gameResults[0];

  const reqs = await db
    .select()
    .from(gameRequirements)
    .where(eq(gameRequirements.gameId, game.id));

  const reqMap = {
    minimum: null,
    recommended: null,
    ultra: null,
  } as GameWithRequirements["requirements"];

  for (const req of reqs) {
    if (req.tier === "minimum") reqMap.minimum = req;
    else if (req.tier === "recommended") reqMap.recommended = req;
    else if (req.tier === "ultra") reqMap.ultra = req;
  }

  return {
    ...game,
    genres: (game.genres as string[]) ?? [],
    metadata: {},
    createdAt: game.createdAt ?? "",
    updatedAt: game.updatedAt ?? "",
    requirements: reqMap,
  } as GameWithRequirements;
}

export async function getGameById(id: string) {
  const result = await db.select().from(games).where(eq(games.id, id)).limit(1);
  return result[0] ?? null;
}

// ─── Reports ─────────────────────────────────────────────────────────────────

export async function createReport(data: {
  gameId: string;
  shareSlug: string;
  cpuDetected: string | null;
  cpuManual: string | null;
  cpuNormalized: string | null;
  gpuDetected: string | null;
  gpuManual: string | null;
  gpuNormalized: string | null;
  gpuVramGb: number | null;
  ramGb: number;
  detectionMethod: "auto" | "manual" | "mixed";
  overallScore: number;
  cpuScore: number;
  gpuScore: number;
  ramScore: number;
  storageScore: number;
  osScore: number;
  fps: Record<string, Record<string, number>>;
  bottleneckComponent: string | null;
  bottleneckSeverity: string | null;
}) {
  const [report] = await db
    .insert(reports)
    .values({
      gameId: data.gameId,
      shareSlug: data.shareSlug,
      cpuDetected: data.cpuDetected,
      cpuManual: data.cpuManual,
      cpuNormalized: data.cpuNormalized,
      gpuDetected: data.gpuDetected,
      gpuManual: data.gpuManual,
      gpuNormalized: data.gpuNormalized,
      gpuVramGb: data.gpuVramGb,
      ramGb: data.ramGb,
      detectionMethod: data.detectionMethod,
      overallScore: data.overallScore,
      cpuScore: data.cpuScore,
      gpuScore: data.gpuScore,
      ramScore: data.ramScore,
      storageScore: data.storageScore,
      osScore: data.osScore,
      fps1080pLow: data.fps["1080p"]?.low ?? null,
      fps1080pMedium: data.fps["1080p"]?.medium ?? null,
      fps1080pHigh: data.fps["1080p"]?.high ?? null,
      fps1080pUltra: data.fps["1080p"]?.ultra ?? null,
      fps1440pLow: data.fps["1440p"]?.low ?? null,
      fps1440pMedium: data.fps["1440p"]?.medium ?? null,
      fps1440pHigh: data.fps["1440p"]?.high ?? null,
      fps1440pUltra: data.fps["1440p"]?.ultra ?? null,
      fps4kLow: data.fps["4k"]?.low ?? null,
      fps4kMedium: data.fps["4k"]?.medium ?? null,
      fps4kHigh: data.fps["4k"]?.high ?? null,
      fps4kUltra: data.fps["4k"]?.ultra ?? null,
      bottleneckComponent: data.bottleneckComponent,
      bottleneckSeverity: data.bottleneckSeverity,
    })
    .returning();

  return report;
}

export async function getReportBySlug(slug: string) {
  const result = await db
    .select()
    .from(reports)
    .where(eq(reports.shareSlug, slug))
    .limit(1);

  if (!result.length) return null;

  const report = result[0];
  const game = await getGameById(report.gameId);

  // Increment view count
  await db
    .update(reports)
    .set({
      viewerCount: (report.viewerCount ?? 0) + 1,
      lastViewed: now(),
    })
    .where(eq(reports.id, report.id));

  return {
    ...report,
    game: game
      ? {
          slug: game.slug,
          title: game.title,
          coverImageUrl: game.coverImageUrl,
          developer: game.developer,
        }
      : null,
  };
}

// ─── Popular Searches ────────────────────────────────────────────────────────

export async function incrementPopularSearch(gameId: string) {
  const existing = await db
    .select()
    .from(popularSearches)
    .where(eq(popularSearches.gameId, gameId))
    .limit(1);

  if (existing.length) {
    await db
      .update(popularSearches)
      .set({
        searchCount: (existing[0].searchCount ?? 0) + 1,
        lastSearchedAt: now(),
      })
      .where(eq(popularSearches.gameId, gameId));
  } else {
    await db.insert(popularSearches).values({
      gameId,
      searchCount: 1,
    });
  }
}

export async function getPopularSearches(limit = 10) {
  const results = await db
    .select({
      id: popularSearches.id,
      gameId: popularSearches.gameId,
      searchCount: popularSearches.searchCount,
      gameSlug: games.slug,
      gameTitle: games.title,
      gameCoverImageUrl: games.coverImageUrl,
      gameGenres: games.genres,
    })
    .from(popularSearches)
    .innerJoin(games, eq(popularSearches.gameId, games.id))
    .orderBy(desc(popularSearches.searchCount))
    .limit(limit);

  return results.map((r) => ({
    id: r.id,
    gameId: r.gameId,
    searchCount: r.searchCount,
    game: {
      slug: r.gameSlug,
      title: r.gameTitle,
      coverImageUrl: r.gameCoverImageUrl,
      genres: r.gameGenres as string[],
    },
  }));
}

export async function getTrendingGames(limit = 8) {
  const popular = await getPopularSearches(limit);
  if (popular.length >= limit) return popular;

  // If not enough popular searches, fill with recent games
  const recent = await db
    .select({
      id: games.id,
      slug: games.slug,
      title: games.title,
      coverImageUrl: games.coverImageUrl,
      genres: games.genres,
      releaseDate: games.releaseDate,
    })
    .from(games)
    .orderBy(desc(games.releaseDate))
    .limit(limit);

  return recent.map((g) => ({
    id: "",
    gameId: g.id,
    searchCount: 0,
    game: {
      slug: g.slug,
      title: g.title,
      coverImageUrl: g.coverImageUrl,
      genres: (g.genres as string[]) ?? [],
    },
  }));
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export async function getStats() {
  const [gameCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(games);

  const [reportCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(reports);

  return {
    gameCount: gameCount?.count ?? 0,
    reportCount: reportCount?.count ?? 0,
  };
}
