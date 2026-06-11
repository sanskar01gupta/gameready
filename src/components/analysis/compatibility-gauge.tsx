"use client";

interface CompatibilityGaugeProps {
  overall: number;
  tier: "excellent" | "good" | "fair" | "poor" | "insufficient";
  matchedTier: "ultra" | "recommended" | "minimum" | "insufficient";
}

const TIER_COLORS = {
  excellent: "#22C55E",
  good: "#65A30D",
  fair: "#CA8A04",
  poor: "#EA580C",
  insufficient: "#DC2626",
};

const TIER_LABELS = {
  excellent: "Excellent! Your PC exceeds requirements.",
  good: "Good — your PC can handle this game well.",
  fair: "Fair — your PC meets minimum requirements.",
  poor: "Below par — upgrade recommended.",
  insufficient: "Your PC may struggle with this game.",
};

const MATCHED_TIER_LABELS: Record<string, string> = {
  ultra: "Meets Ultra requirements",
  recommended: "Meets Recommended requirements",
  minimum: "Meets Minimum requirements",
  insufficient: "Below Minimum requirements",
};

export function CompatibilityGauge({
  overall,
  tier,
  matchedTier,
}: CompatibilityGaugeProps) {
  const color = TIER_COLORS[tier];
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (overall / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* SVG Gauge */}
      <div className="relative w-48 h-48">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 160 160"
          role="meter"
          aria-valuenow={overall}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Compatibility score: ${overall} out of 100. ${TIER_LABELS[tier]}`}
        >
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="var(--border)"
            strokeWidth="12"
          />
          {/* Score circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
          {/* Center text */}
          <text
            x="80"
            y="75"
            textAnchor="middle"
            className="text-3xl font-bold"
            fill="currentColor"
            style={{ transform: "rotate(90deg)", transformOrigin: "80px 80px" }}
          >
            {overall}
          </text>
          <text
            x="80"
            y="95"
            textAnchor="middle"
            className="text-xs"
            fill="var(--muted-foreground)"
            style={{ transform: "rotate(90deg)", transformOrigin: "80px 80px" }}
          >
            / 100
          </text>
        </svg>
      </div>

      {/* Labels */}
      <div className="text-center mt-2">
        <p className="text-lg font-bold" style={{ color }}>
          {tier.charAt(0).toUpperCase() + tier.slice(1)}
        </p>
        <p className="text-sm text-[var(--muted)] mt-1">{TIER_LABELS[tier]}</p>
        <p className="text-xs text-[var(--muted-foreground)] mt-1">
          {MATCHED_TIER_LABELS[matchedTier]}
        </p>
      </div>
    </div>
  );
}
