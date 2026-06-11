"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { CompatibilityGauge } from "@/components/analysis/compatibility-gauge";
import { RequirementBars } from "@/components/analysis/requirement-bars";
import { FpsEstimator } from "@/components/analysis/fps-estimator";
import { BottleneckFinder } from "@/components/analysis/bottleneck-finder";
import { UpgradeSuggestions } from "@/components/analysis/upgrade-suggestions";
import { ShareButton } from "@/components/report/share-button";
import type { AnalysisResult } from "@/types/analysis";

export default function AnalyzePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Try to load from sessionStorage first
    const cached = sessionStorage.getItem(`analysis-${slug}`);
    if (cached) {
      try {
        setResult(JSON.parse(cached));
        setLoading(false);
        return;
      } catch {
        // Invalid cache
      }
    }

    // No cached result - redirect back to game page
    if (!cached) {
      router.replace(`/games/${slug}`);
    }
  }, [slug, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-[var(--accent)]" />
          <p className="mt-4 text-[var(--muted)]">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-[var(--muted)] mb-4">No analysis results found.</p>
          <Link
            href={`/games/${slug}`}
            className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back to check compatibility
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <Link
            href={`/games/${slug}`}
            className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-2"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to {result.game.title}
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Compatibility Report: {result.game.title}
          </h1>
        </div>
        <ShareButton
          gameSlug={result.game.slug}
          cpu={result.hardware.cpu}
          gpu={result.hardware.gpu}
          gpuVramGb={result.hardware.gpuVramGb}
          ramGb={result.hardware.ramGb}
          detectionMethod={result.hardware.detectionMethod}
        />
      </div>

      {/* Main Score */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 mb-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="shrink-0">
            <CompatibilityGauge
              overall={result.overall}
              tier={result.tier}
              matchedTier={result.matchedTier}
            />
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-lg font-semibold mb-4">Component Scores</h2>
            <RequirementBars scores={result.scores} />
          </div>
        </div>
      </section>

      {/* FPS Estimates */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 mb-6">
        <h2 className="text-lg font-semibold mb-4">FPS Estimates</h2>
        <FpsEstimator fps={result.fps} />
      </section>

      {/* Bottleneck */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Bottleneck Analysis</h2>
        <BottleneckFinder bottleneck={result.bottleneck} />
      </section>

      {/* Upgrade Suggestions */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Upgrade Recommendations</h2>
        <UpgradeSuggestions upgrades={result.upgrades} />
      </section>

      {/* Hardware Summary */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <h2 className="text-lg font-semibold mb-3">Your Hardware</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-[var(--muted-foreground)]">CPU</p>
            <p className="font-medium truncate">{result.hardware.cpu ?? "Unknown"}</p>
          </div>
          <div>
            <p className="text-[var(--muted-foreground)]">GPU</p>
            <p className="font-medium truncate">{result.hardware.gpu ?? "Unknown"}</p>
          </div>
          <div>
            <p className="text-[var(--muted-foreground)]">RAM</p>
            <p className="font-medium">{result.hardware.ramGb} GB</p>
          </div>
          <div>
            <p className="text-[var(--muted-foreground)]">VRAM</p>
            <p className="font-medium">
              {result.hardware.gpuVramGb ? `${result.hardware.gpuVramGb} GB` : "Unknown"}
            </p>
          </div>
        </div>
      </section>

      {/* Check Another Game */}
      <div className="mt-8 text-center">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
        >
          Check another game →
        </Link>
      </div>
    </div>
  );
}
