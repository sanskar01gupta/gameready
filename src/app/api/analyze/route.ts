import { NextRequest, NextResponse } from "next/server";
import { getGameBySlug, incrementPopularSearch } from "@/lib/db/queries";
import { analyzeSchema } from "@/lib/validation/analyze-schema";
import { compatibility } from "@/lib/scoring/algorithm";
import { estimateFps } from "@/lib/scoring/fps-estimator";
import { findBottleneck } from "@/lib/scoring/bottlenecks";
import { suggestUpgrades } from "@/lib/scoring/upgrade-paths";
import { rateLimitByIp } from "@/lib/utils/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limit
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
  const { success } = await rateLimitByIp(ip, 30, 60_000);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const body = await request.json();
    const parsed = analyzeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { gameSlug, cpu, gpu, gpuVramGb, ramGb, detectionMethod } = parsed.data;

    // Fetch game + requirements
    const game = await getGameBySlug(gameSlug);
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    const hardware = {
      cpu: cpu ?? null,
      gpu: gpu ?? null,
      gpuVramGb: gpuVramGb ?? null,
      ramGb,
      os: "Windows 10",
      detectionMethod,
    };

    // Run scoring engine
    const result = compatibility(hardware, game.requirements);

    // FPS estimation
    const fps = estimateFps(
      hardware,
      {
        minimum: game.requirements.minimum,
        recommended: game.requirements.recommended,
      },
      result.scores.cpu,
      result.scores.gpu
    );

    // Bottleneck detection
    const bottleneck = findBottleneck(result.scores);

    // Upgrade suggestions
    const upgrades = suggestUpgrades(hardware, result.scores, game.requirements);

    // Fire-and-forget: update popular searches
    incrementPopularSearch(game.id).catch(() => {});

    return NextResponse.json({
      game: {
        slug: game.slug,
        title: game.title,
        coverImageUrl: game.coverImageUrl,
      },
      hardware,
      scores: result.scores,
      overall: result.overall,
      tier: result.tier,
      matchedTier: result.matchedTier,
      fps,
      bottleneck,
      upgrades,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
