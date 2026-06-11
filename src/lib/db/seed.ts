import { db, schema } from "./index";
import { seedGames } from "./seed-data/games";

const { games, gameRequirements, popularSearches } = schema;

async function seed() {
  console.log("[seed] Starting seed...");

  // Clear existing data in correct order
  await db.delete(popularSearches);
  await db.delete(gameRequirements);
  await db.delete(games);

  let count = 0;
  for (const game of seedGames) {
    // Insert game
    const [inserted] = await db
      .insert(games)
      .values({
        slug: game.slug,
        title: game.title,
        developer: game.developer,
        publisher: game.publisher,
        releaseDate: game.releaseDate,
        genres: game.genres,
        description: game.description,
        coverImageUrl: game.coverImageUrl,
      })
      .returning();

    if (!inserted) {
      console.error(`[seed] Failed to insert game: ${game.title}`);
      continue;
    }

    // Insert minimum requirements
    await db.insert(gameRequirements).values({
      gameId: inserted.id,
      tier: "minimum",
      cpuMin: game.minimum.cpuMin,
      cpuRecommended: game.minimum.cpuRecommended,
      gpuMin: game.minimum.gpuMin,
      gpuRecommended: game.minimum.gpuRecommended,
      gpuVramMinGb: game.minimum.gpuVramMinGb,
      gpuVramRecommendedGb: game.minimum.gpuVramRecommendedGb,
      ramMinGb: game.minimum.ramMinGb,
      ramRecommendedGb: game.minimum.ramRecommendedGb,
      storageMinGb: game.minimum.storageMinGb,
      storageRecommendedGb: game.minimum.storageRecommendedGb,
      storageType: game.minimum.storageType,
      osRequired: game.minimum.osRequired,
      directxVersion: game.minimum.directxVersion,
    });

    // Insert recommended requirements
    await db.insert(gameRequirements).values({
      gameId: inserted.id,
      tier: "recommended",
      cpuMin: game.recommended.cpuMin,
      cpuRecommended: game.recommended.cpuRecommended,
      gpuMin: game.recommended.gpuMin,
      gpuRecommended: game.recommended.gpuRecommended,
      gpuVramMinGb: game.recommended.gpuVramMinGb,
      gpuVramRecommendedGb: game.recommended.gpuVramRecommendedGb,
      ramMinGb: game.recommended.ramMinGb,
      ramRecommendedGb: game.recommended.ramRecommendedGb,
      storageMinGb: game.recommended.storageMinGb,
      storageRecommendedGb: game.recommended.storageRecommendedGb,
      storageType: game.recommended.storageType,
      osRequired: game.recommended.osRequired,
      directxVersion: game.recommended.directxVersion,
    });

    // Initialize popular search counter
    await db.insert(popularSearches).values({
      gameId: inserted.id,
      searchCount: 0,
    });

    count++;
    console.log(`[seed] Inserted: ${game.title}`);
  }

  console.log(`[seed] Done. Inserted ${count} games.`);
}

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("[seed] Failed:", e);
    process.exit(1);
  });
