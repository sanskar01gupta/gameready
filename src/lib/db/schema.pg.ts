import { pgTable, text, integer, real, uniqueIndex, index, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// PostgreSQL schema — identical structure to SQLite, used with Neon in production

export const games = pgTable(
  "games",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    developer: text("developer"),
    publisher: text("publisher"),
    releaseDate: text("release_date"),
    genres: jsonb("genres").$type<string[]>().default([]),
    description: text("description"),
    coverImageUrl: text("cover_image_url"),
    bannerImageUrl: text("banner_image_url"),
    steamId: text("steam_id"),
    createdAt: text("created_at").default(sql`NOW()`),
    updatedAt: text("updated_at").default(sql`NOW()`),
  },
  (table) => [
    uniqueIndex("idx_games_slug").on(table.slug),
    index("idx_games_title").on(table.title),
  ]
);

export const gameRequirements = pgTable(
  "game_requirements",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    gameId: text("game_id")
      .notNull()
      .references(() => games.id, { onDelete: "cascade" }),
    tier: text("tier", { enum: ["minimum", "recommended", "ultra"] }).notNull(),

    cpuMin: text("cpu_min"),
    cpuRecommended: text("cpu_recommended"),
    cpuNotes: text("cpu_notes"),

    gpuMin: text("gpu_min"),
    gpuRecommended: text("gpu_recommended"),
    gpuNotes: text("gpu_notes"),
    gpuVramMinGb: real("gpu_vram_min_gb"),
    gpuVramRecommendedGb: real("gpu_vram_recommended_gb"),

    ramMinGb: integer("ram_min_gb").notNull(),
    ramRecommendedGb: integer("ram_recommended_gb"),

    storageMinGb: integer("storage_min_gb"),
    storageRecommendedGb: integer("storage_recommended_gb"),
    storageType: text("storage_type"),

    osRequired: text("os_required"),
    osVersionMin: text("os_version_min"),

    directxVersion: text("directx_version"),
    apiRequired: text("api_required"),

    additionalNotes: text("additional_notes"),
    fpsTarget: text("fps_target"),

    createdAt: text("created_at").default(sql`NOW()`),
    updatedAt: text("updated_at").default(sql`NOW()`),
  },
  (table) => [
    index("idx_requirements_game").on(table.gameId),
  ]
);

export const reports = pgTable(
  "reports",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    gameId: text("game_id")
      .notNull()
      .references(() => games.id, { onDelete: "cascade" }),
    shareSlug: text("share_slug").notNull().unique(),

    cpuDetected: text("cpu_detected"),
    cpuManual: text("cpu_manual"),
    cpuNormalized: text("cpu_normalized"),
    gpuDetected: text("gpu_detected"),
    gpuManual: text("gpu_manual"),
    gpuNormalized: text("gpu_normalized"),
    gpuVramGb: real("gpu_vram_gb"),
    ramGb: integer("ram_gb").notNull(),
    detectionMethod: text("detection_method", { enum: ["auto", "manual", "mixed"] }).default("auto"),

    overallScore: integer("overall_score"),
    cpuScore: integer("cpu_score"),
    gpuScore: integer("gpu_score"),
    ramScore: integer("ram_score"),
    storageScore: integer("storage_score"),
    osScore: integer("os_score"),

    fps1080pLow: integer("fps_1080p_low"),
    fps1080pMedium: integer("fps_1080p_medium"),
    fps1080pHigh: integer("fps_1080p_high"),
    fps1080pUltra: integer("fps_1080p_ultra"),
    fps1440pLow: integer("fps_1440p_low"),
    fps1440pMedium: integer("fps_1440p_medium"),
    fps1440pHigh: integer("fps_1440p_high"),
    fps1440pUltra: integer("fps_1440p_ultra"),
    fps4kLow: integer("fps_4k_low"),
    fps4kMedium: integer("fps_4k_medium"),
    fps4kHigh: integer("fps_4k_high"),
    fps4kUltra: integer("fps_4k_ultra"),

    bottleneckComponent: text("bottleneck_component"),
    bottleneckSeverity: text("bottleneck_severity"),

    viewerCount: integer("viewer_count").default(1),
    createdAt: text("created_at").default(sql`NOW()`),
    lastViewed: text("last_viewed").default(sql`NOW()`),
  },
  (table) => [
    uniqueIndex("idx_reports_slug").on(table.shareSlug),
    index("idx_reports_game").on(table.gameId),
  ]
);

export const popularSearches = pgTable(
  "popular_searches",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    gameId: text("game_id")
      .notNull()
      .unique()
      .references(() => games.id, { onDelete: "cascade" }),
    searchCount: integer("search_count").default(1),
    lastSearchedAt: text("last_searched_at").default(sql`NOW()`),
  },
  (table) => [
    index("idx_popular_count").on(table.searchCount),
  ]
);
