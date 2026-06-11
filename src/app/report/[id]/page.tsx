import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReportBySlug } from "@/lib/db/queries";
import { CompatibilityGauge } from "@/components/analysis/compatibility-gauge";
import { RequirementBars } from "@/components/analysis/requirement-bars";
import { FpsEstimator } from "@/components/analysis/fps-estimator";
import { BottleneckFinder } from "@/components/analysis/bottleneck-finder";
import { ArrowLeft } from "lucide-react";
import { fpsFromReport } from "@/types/report";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const report = await getReportBySlug(id);
  if (!report || !report.game) return { title: "Report Not Found | GameReady" };

  return {
    title: `Can I Run ${report.game.title}? Compatibility Report | GameReady`,
    description: `Compatibility report for ${report.game.title}: Score ${report.overallScore}/100. CPU: ${report.cpuNormalized ?? "N/A"}, GPU: ${report.gpuNormalized ?? "N/A"}, RAM: ${report.ramGb}GB.`,
    robots: { index: false, follow: false },
  };
}

function getTier(score: number): "excellent" | "good" | "fair" | "poor" | "insufficient" {
  if (score >= 90) return "excellent";
  if (score >= 70) return "good";
  if (score >= 50) return "fair";
  if (score >= 30) return "poor";
  return "insufficient";
}

function getMatchedTier(
  score: number
): "ultra" | "recommended" | "minimum" | "insufficient" {
  if (score >= 85) return "ultra";
  if (score >= 65) return "recommended";
  if (score >= 35) return "minimum";
  return "insufficient";
}

export default async function ReportPage({ params }: Props) {
  const { id } = await params;
  const report = await getReportBySlug(id);

  if (!report || !report.game) notFound();

  const fps = fpsFromReport(report);
  const overall = report.overallScore ?? 50;
  const scores = {
    cpu: report.cpuScore ?? 50,
    gpu: report.gpuScore ?? 50,
    ram: report.ramScore ?? 50,
    storage: report.storageScore ?? 50,
    os: report.osScore ?? 50,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-2"
        >
          <ArrowLeft className="h-3 w-3" />
          GameReady
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Compatibility Report: {report.game.title}
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Shared report • Viewed {report.viewerCount ?? 1} time(s)
        </p>
      </div>

      {/* Main Score */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 mb-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="shrink-0">
            <CompatibilityGauge
              overall={overall}
              tier={getTier(overall)}
              matchedTier={getMatchedTier(overall)}
            />
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-lg font-semibold mb-4">Component Scores</h2>
            <RequirementBars scores={scores} />
          </div>
        </div>
      </section>

      {/* FPS Estimates */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 mb-6">
        <h2 className="text-lg font-semibold mb-4">FPS Estimates</h2>
        <FpsEstimator fps={fps} />
      </section>

      {/* Bottleneck */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Bottleneck Analysis</h2>
        <BottleneckFinder
          bottleneck={{
            component: (report.bottleneckComponent as "cpu" | "gpu" | "ram" | "storage") ?? null,
            severity: (report.bottleneckSeverity as "minor" | "moderate" | "severe") ?? null,
            description:
              report.bottleneckComponent
                ? `Your ${report.bottleneckComponent.toUpperCase()} is the limiting factor.`
                : "Your system appears well-balanced.",
          }}
        />
      </section>

      {/* Hardware Summary */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <h2 className="text-lg font-semibold mb-3">Hardware Configuration</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-[var(--muted-foreground)]">CPU</p>
            <p className="font-medium truncate">
              {report.cpuNormalized ?? report.cpuDetected ?? "Unknown"}
            </p>
          </div>
          <div>
            <p className="text-[var(--muted-foreground)]">GPU</p>
            <p className="font-medium truncate">
              {report.gpuNormalized ?? report.gpuDetected ?? "Unknown"}
            </p>
          </div>
          <div>
            <p className="text-[var(--muted-foreground)]">RAM</p>
            <p className="font-medium">{report.ramGb} GB</p>
          </div>
          <div>
            <p className="text-[var(--muted-foreground)]">VRAM</p>
            <p className="font-medium">
              {report.gpuVramGb ? `${report.gpuVramGb} GB` : "Unknown"}
            </p>
          </div>
        </div>
      </section>

      {/* Check Your Own */}
      <div className="mt-8 text-center p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <p className="text-sm text-[var(--muted)] mb-3">
          Want to check your own PC against this game?
        </p>
        <Link
          href={`/games/${report.game.slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent)]/90 transition-colors"
        >
          Check {report.game.title} on your PC →
        </Link>
      </div>
    </div>
  );
}
