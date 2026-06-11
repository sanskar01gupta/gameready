"use client";

import { useState } from "react";
import type { FpsMatrix, Resolution, Quality } from "@/types/analysis";

interface FpsEstimatorProps {
  fps: FpsMatrix;
}

const RESOLUTIONS: Resolution[] = ["1080p", "1440p", "4k"];
const QUALITIES: Quality[] = ["low", "medium", "high", "ultra"];

const LABEL_COLORS: Record<string, string> = {
  Smooth: "text-[var(--success)]",
  Playable: "text-[#65A30D]",
  Choppy: "text-[var(--warning)]",
  Unplayable: "text-[var(--danger)]",
};

export function FpsEstimator({ fps }: FpsEstimatorProps) {
  const [selectedRes, setSelectedRes] = useState<Resolution>("1080p");

  return (
    <div>
      {/* Resolution Tabs */}
      <div
        className="flex gap-1 mb-4 p-1 rounded-lg bg-[var(--background)] border border-[var(--border)]"
        role="tablist"
        aria-label="Select resolution"
      >
        {RESOLUTIONS.map((res) => (
          <button
            key={res}
            role="tab"
            aria-selected={selectedRes === res}
            onClick={() => setSelectedRes(res)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              selectedRes === res
                ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            {res}
          </button>
        ))}
      </div>

      {/* Quality Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        role="tabpanel"
      >
        {QUALITIES.map((qual) => {
          const est = fps[selectedRes]?.[qual];
          if (!est) return null;

          return (
            <div
              key={qual}
              className="rounded-xl bg-[var(--background)] border border-[var(--border)] p-4 text-center"
            >
              <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide mb-2">
                {qual}
              </p>
              <p className="text-2xl font-bold tabular-nums">
                {est.avg > 0 ? est.avg : "—"}
              </p>
              {est.avg > 0 && (
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  FPS
                </p>
              )}
              {est.label && (
                <p
                  className={`text-xs font-medium mt-1.5 ${LABEL_COLORS[est.label] ?? "text-[var(--muted-foreground)]"}`}
                >
                  {est.label}
                </p>
              )}
              {est.confidence === "low" && (
                <p className="text-[10px] text-[var(--muted-foreground)] mt-1">
                  Estimated
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
