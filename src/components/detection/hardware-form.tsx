"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Cpu,
  Monitor,
  MemoryStick,
  Zap,
  Loader2,
  Scan,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";
import { cpuPerformanceIndex, gpuPerformanceIndex } from "@/lib/detection/hardware-db";
import { detectAll } from "@/lib/detection/browser";
import { normalizeHardware } from "@/lib/detection/normalize";
import { MobileWarning } from "@/components/ui/mobile-warning";

const CPU_LIST = Object.keys(cpuPerformanceIndex).sort();
const GPU_LIST = Object.keys(gpuPerformanceIndex).sort();
const RAM_OPTIONS = [4, 8, 12, 16, 24, 32, 48, 64];

interface HardwareFormProps {
  gameSlug: string;
  gameTitle: string;
  isMobile?: boolean;
}

export function HardwareForm({ gameSlug, gameTitle, isMobile }: HardwareFormProps) {
  const router = useRouter();
  const [cpu, setCpu] = useState("");
  const [gpu, setGpu] = useState("");
  const [ramGb, setRamGb] = useState(16);
  const [cpuSearch, setCpuSearch] = useState("");
  const [gpuSearch, setGpuSearch] = useState("");
  const [showCpuList, setShowCpuList] = useState(false);
  const [showGpuList, setShowGpuList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-detection state
  const [detecting, setDetecting] = useState(false);
  const [detectedInfo, setDetectedInfo] = useState<{
    cpu: string | null;
    gpu: string | null;
    gpuSecondary: string | null;
    gpuRaw: string | null;
    gpuRawSecondary: string | null;
    ramGb: number | null;
    cores: number | null;
    confidence: { cpu: string; gpu: string; gpuSecondary: string };
  } | null>(null);
  const [showDetectDetails, setShowDetectDetails] = useState(false);

  const filteredCPUs = CPU_LIST.filter((c) =>
    c.toLowerCase().includes(cpuSearch.toLowerCase())
  ).slice(0, 20);

  const filteredGPUs = GPU_LIST.filter((g) =>
    g.toLowerCase().includes(gpuSearch.toLowerCase())
  ).slice(0, 20);

  const handleAutoDetect = useCallback(async () => {
    setDetecting(true);
    setError("");

    try {
      // Small delay so user sees the spinner (feels more "real")
      await new Promise((r) => setTimeout(r, 600));

      const raw = detectAll();
      const normalized = normalizeHardware({
        cpuCores: raw.cpuCores,
        gpuRaw: raw.gpuRaw,
        gpuRawSecondary: raw.gpuRawSecondary,
        ramGb: raw.ramGb,
        os: raw.os,
      });

      const info = {
        cpu: normalized.cpu,
        gpu: normalized.gpu,
        gpuSecondary: normalized.gpuSecondary,
        gpuRaw: raw.gpuRaw,
        gpuRawSecondary: raw.gpuRawSecondary,
        ramGb: normalized.ramGb,
        cores: normalized.cores,
        confidence: {
          cpu: normalized.cpuConfidence,
          gpu: normalized.gpuConfidence,
          gpuSecondary: normalized.gpuSecondaryConfidence,
        },
      };

      setDetectedInfo(info);

      // Auto-fill the form with detected values
      if (normalized.cpu) {
        setCpu(normalized.cpu);
        setCpuSearch(normalized.cpu);
      }
      if (normalized.gpu) {
        setGpu(normalized.gpu);
        setGpuSearch(normalized.gpu);
      }
      if (normalized.ramGb) {
        // Round to nearest RAM option
        const rounded = RAM_OPTIONS.reduce((prev, curr) =>
          Math.abs(curr - normalized.ramGb!) < Math.abs(prev - normalized.ramGb!)
            ? curr
            : prev
        );
        setRamGb(rounded);
      }

      if (!normalized.cpu && !normalized.gpu) {
        setError(
          "Could not detect your hardware automatically. Please enter your specs manually below."
        );
      }
    } catch {
      setError("Detection failed. Please enter your specs manually.");
    } finally {
      setDetecting(false);
    }
  }, []);

  async function handleAnalyze() {
    if (!cpu || !gpu) {
      setError("Please select both a CPU and GPU.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameSlug,
          cpu,
          gpu,
          gpuSecondary: detectedInfo?.gpuSecondary ?? null,
          ramGb,
          detectionMethod: detectedInfo ? "mixed" : "manual",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Analysis failed. Please try again.");
        setLoading(false);
        return;
      }

      const result = await res.json();
      sessionStorage.setItem(`analysis-${gameSlug}`, JSON.stringify(result));
      router.push(`/games/${gameSlug}/analyze`);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  const confidenceBadge = (level: string) => {
    if (level === "high")
      return <CheckCircle2 className="h-3 w-3 text-[var(--success)]" />;
    if (level === "medium")
      return <AlertTriangle className="h-3 w-3 text-[var(--warning)]" />;
    return <Info className="h-3 w-3 text-[var(--muted-foreground)]" />;
  };

  return (
    <div className="space-y-5">
      {/* ── Mobile Warning ──────────────────────────────────────────── */}
      {isMobile && <MobileWarning />}

      {/* ── Auto-Detect Button ─────────────────────────────────────── */}
      <div className="rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold flex items-center gap-2">
              <Scan className="h-4 w-4 text-[var(--accent)]" />
              Auto-Detect My Hardware
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Let your browser detect your CPU, GPU, and RAM automatically.
              Works best in Chrome and Edge.
            </p>

            {/* Detection results */}
            {detectedInfo && (
              <div className="mt-3 space-y-1.5 text-xs">
                {detectedInfo.gpuRaw && (
                  <div className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
                    <Monitor className="h-3 w-3" />
                    <span className="truncate max-w-[280px]">
                      GPU detected: {detectedInfo.gpuRaw}
                      {detectedInfo.gpuSecondary && (
                        <span className="text-[var(--accent)]">
                          {" "}
                          + second GPU also found
                        </span>
                      )}
                    </span>
                  </div>
                )}
                {detectedInfo.cores && (
                  <div className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
                    <Cpu className="h-3 w-3" />
                    <span>{detectedInfo.cores} logical processor cores</span>
                  </div>
                )}
                {detectedInfo.ramGb && (
                  <div className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
                    <MemoryStick className="h-3 w-3" />
                    <span>~{detectedInfo.ramGb} GB RAM detected</span>
                  </div>
                )}

                {/* Closest-match note for low-confidence GPU */}
                {detectedInfo.gpu && detectedInfo.confidence.gpu === "low" && (
                  <div className="flex items-start gap-1.5 mt-2 p-2 rounded-lg bg-[var(--warning)]/10 border border-[var(--warning)]/20">
                    <AlertTriangle className="h-3 w-3 text-[var(--warning)] shrink-0 mt-0.5" />
                    <p className="text-[var(--warning)]">
                      This is the closest match from our hardware database. Your
                      actual GPU may differ. Please select your exact model
                      manually for the most accurate results.
                    </p>
                  </div>
                )}

                {/* Confidence indicators */}
                {(detectedInfo.confidence.cpu !== "low" ||
                  detectedInfo.confidence.gpu !== "low") && (
                  <button
                    onClick={() => setShowDetectDetails(!showDetectDetails)}
                    className="mt-2 text-[var(--accent)] hover:underline text-xs"
                  >
                    {showDetectDetails ? "Hide" : "Show"} match confidence
                  </button>
                )}

                {showDetectDetails && (
                  <div className="mt-2 space-y-1 p-2 rounded-lg bg-[var(--background)]">
                    {detectedInfo.cpu && (
                      <div className="flex items-center gap-1.5">
                        {confidenceBadge(detectedInfo.confidence.cpu)}
                        <span className="text-[var(--muted-foreground)]">CPU:</span>
                        <span className="font-medium">{detectedInfo.cpu}</span>
                        <span className="text-[var(--muted-foreground)] text-[10px] capitalize">
                          ({detectedInfo.confidence.cpu} confidence)
                        </span>
                      </div>
                    )}
                    {detectedInfo.gpu && (
                      <div className="flex items-center gap-1.5">
                        {confidenceBadge(detectedInfo.confidence.gpu)}
                        <span className="text-[var(--muted-foreground)]">
                          GPU (primary):
                        </span>
                        <span className="font-medium">{detectedInfo.gpu}</span>
                        <span className="text-[var(--muted-foreground)] text-[10px] capitalize">
                          ({detectedInfo.confidence.gpu} confidence)
                        </span>
                      </div>
                    )}
                    {detectedInfo.gpuSecondary && (
                      <div className="flex items-center gap-1.5">
                        {confidenceBadge(detectedInfo.confidence.gpuSecondary)}
                        <span className="text-[var(--muted-foreground)]">
                          GPU (secondary):
                        </span>
                        <span className="font-medium">
                          {detectedInfo.gpuSecondary}
                        </span>
                        <span className="text-[var(--muted-foreground)] text-[10px] capitalize">
                          ({detectedInfo.confidence.gpuSecondary} confidence)
                        </span>
                      </div>
                    )}
                    <p className="text-[10px] text-[var(--muted-foreground)] mt-1">
                      CPU model is estimated from core count — enter your exact
                      model for better accuracy.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleAutoDetect}
            disabled={detecting}
            className="shrink-0 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent)]/90 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {detecting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Detecting...
              </>
            ) : detectedInfo ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Re-detect
              </>
            ) : (
              <>
                <Scan className="h-4 w-4" />
                Detect
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── CPU Selection ──────────────────────────────────────────── */}
      <div className="relative">
        <label className="flex items-center gap-2 text-sm font-medium mb-2">
          <Cpu className="h-4 w-4 text-[var(--accent)]" />
          Processor (CPU)
          {detectedInfo?.cpu && cpu === detectedInfo.cpu && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)]">
              DETECTED
            </span>
          )}
        </label>
        <input
          type="text"
          value={cpuSearch}
          onChange={(e) => {
            setCpuSearch(e.target.value);
            setCpu("");
            setShowCpuList(true);
          }}
          onFocus={() => setShowCpuList(true)}
          onBlur={() => setTimeout(() => setShowCpuList(false), 150)}
          placeholder={
            cpu || "Search your CPU model... (e.g. Intel Core i7-12700K)"
          }
          className="w-full h-11 px-4 rounded-lg bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
          aria-label="Search CPU model"
        />
        {showCpuList && filteredCPUs.length > 0 && (
          <ul className="absolute top-full mt-1 w-full rounded-lg bg-[var(--background)] border border-[var(--border)] shadow-lg z-20 max-h-48 overflow-y-auto">
            {filteredCPUs.map((c) => (
              <li
                key={c}
                onMouseDown={() => {
                  setCpu(c);
                  setCpuSearch(c);
                  setShowCpuList(false);
                }}
                className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-[var(--surface-hover)] transition-colors ${
                  cpu === c ? "bg-[var(--accent)]/10 text-[var(--accent)]" : ""
                }`}
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── GPU Selection ──────────────────────────────────────────── */}
      <div className="relative">
        <label className="flex items-center gap-2 text-sm font-medium mb-2">
          <Monitor className="h-4 w-4 text-[var(--accent)]" />
          Graphics Card (GPU)
          {detectedInfo?.gpu && gpu === detectedInfo.gpu && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)]">
              DETECTED
            </span>
          )}
        </label>
        <input
          type="text"
          value={gpuSearch}
          onChange={(e) => {
            setGpuSearch(e.target.value);
            setGpu("");
            setShowGpuList(true);
          }}
          onFocus={() => setShowGpuList(true)}
          onBlur={() => setTimeout(() => setShowGpuList(false), 150)}
          placeholder={
            gpu || "Search your GPU model... (e.g. NVIDIA GeForce RTX 3060)"
          }
          className="w-full h-11 px-4 rounded-lg bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
          aria-label="Search GPU model"
        />
        {showGpuList && filteredGPUs.length > 0 && (
          <ul className="absolute top-full mt-1 w-full rounded-lg bg-[var(--background)] border border-[var(--border)] shadow-lg z-20 max-h-48 overflow-y-auto">
            {filteredGPUs.map((g) => (
              <li
                key={g}
                onMouseDown={() => {
                  setGpu(g);
                  setGpuSearch(g);
                  setShowGpuList(false);
                }}
                className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-[var(--surface-hover)] transition-colors ${
                  gpu === g ? "bg-[var(--accent)]/10 text-[var(--accent)]" : ""
                }`}
              >
                {g}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── RAM Selection ──────────────────────────────────────────── */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-2">
          <MemoryStick className="h-4 w-4 text-[var(--accent)]" />
          Memory (RAM) — {ramGb} GB
          {detectedInfo?.ramGb && ramGb === detectedInfo.ramGb && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)]">
              DETECTED
            </span>
          )}
        </label>
        <div className="flex flex-wrap gap-2">
          {RAM_OPTIONS.map((gb) => (
            <button
              key={gb}
              onClick={() => setRamGb(gb)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                ramGb === gb
                  ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/25"
                  : "bg-[var(--background)] border border-[var(--border)] hover:border-[var(--accent)]/50"
              }`}
            >
              {gb} GB
            </button>
          ))}
        </div>
      </div>

      {/* ── Error ───────────────────────────────────────────────────── */}
      {error && (
        <p className="text-sm text-[var(--danger)] bg-[var(--danger)]/10 px-4 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* ── Submit ──────────────────────────────────────────────────── */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full h-12 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent)]/25"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Zap className="h-5 w-5" />
            Check Compatibility for {gameTitle}
          </>
        )}
      </button>

      <p className="text-xs text-[var(--muted-foreground)] text-center">
        Your hardware info is never stored without your permission. You can save
        and share results after analysis.
      </p>
    </div>
  );
}
