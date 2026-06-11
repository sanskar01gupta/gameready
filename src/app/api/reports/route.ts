import { NextRequest, NextResponse } from "next/server";
import { getGameBySlug, createReport, getReportBySlug } from "@/lib/db/queries";
import { createReportSchema } from "@/lib/validation/analyze-schema";
import { compatibility } from "@/lib/scoring/algorithm";
import { estimateFps } from "@/lib/scoring/fps-estimator";
import { findBottleneck } from "@/lib/scoring/bottlenecks";
import { nanoid } from "nanoid";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Report slug required" }, { status: 400 });
  }

  try {
    const report = await getReportBySlug(slug);
    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }
    return NextResponse.json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json({ error: "Failed to fetch report" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createReportSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { gameSlug, cpu, gpu, gpuVramGb, ramGb, detectionMethod } = parsed.data;

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

    const result = compatibility(hardware, game.requirements);
    const fps = estimateFps(
      hardware,
      {
        minimum: game.requirements.minimum,
        recommended: game.requirements.recommended,
      },
      result.scores.cpu,
      result.scores.gpu
    );
    const bottleneck = findBottleneck(result.scores);

    const shareSlug = nanoid(12);

    const fpsData: Record<string, Record<string, number>> = {};
    for (const res of ["1080p", "1440p", "4k"] as const) {
      fpsData[res] = {};
      for (const qual of ["low", "medium", "high", "ultra"] as const) {
        fpsData[res][qual] = fps[res]?.[qual]?.avg ?? 0;
      }
    }

    const report = await createReport({
      gameId: game.id,
      shareSlug,
      cpuDetected: cpu ?? null,
      cpuManual: null,
      cpuNormalized: cpu ?? null,
      gpuDetected: gpu ?? null,
      gpuManual: null,
      gpuNormalized: gpu ?? null,
      gpuVramGb: gpuVramGb ?? null,
      ramGb,
      detectionMethod,
      overallScore: result.overall,
      cpuScore: result.scores.cpu,
      gpuScore: result.scores.gpu,
      ramScore: result.scores.ram,
      storageScore: result.scores.storage,
      osScore: result.scores.os,
      fps: fpsData,
      bottleneckComponent: bottleneck.component,
      bottleneckSeverity: bottleneck.severity,
    });

    return NextResponse.json({
      shareUrl: `/report/${shareSlug}`,
      slug: shareSlug,
      report,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 });
  }
}
