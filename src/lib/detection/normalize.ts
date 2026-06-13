import { cpuPerformanceIndex, gpuPerformanceIndex, cpuAliases, gpuAliases } from "./hardware-db";
import { parseGpuString } from "./gpu-parser";

export interface NormalizedHardware {
  cpu: string | null;
  cpuConfidence: "high" | "medium" | "low";
  gpu: string | null;
  gpuConfidence: "high" | "medium" | "low";
  ramGb: number | null;
  cores: number | null;
}

/**
 * Takes raw browser-detected values and maps them to canonical hardware names
 * that exist in our performance index.
 */
export function normalizeHardware(raw: {
  cpuCores: number | null;
  gpuRaw: string | null;
  ramGb: number | null;
  os: string | null;
}): NormalizedHardware {
  const result: NormalizedHardware = {
    cpu: null,
    cpuConfidence: "low",
    gpu: null,
    gpuConfidence: "low",
    ramGb: raw.ramGb,
    cores: raw.cpuCores,
  };

  // ── GPU normalization ──────────────────────────────────────────────
  if (raw.gpuRaw) {
    const parsed = parseGpuString(raw.gpuRaw);
    if (parsed) {
      const normalized = findClosestMatch(parsed.model, gpuPerformanceIndex, gpuAliases);
      if (normalized) {
        result.gpu = normalized;
        result.gpuConfidence = normalized === parsed.model ? "high" : "medium";
      } else {
        // Use the parsed model as-is (low confidence)
        result.gpu = parsed.model;
        result.gpuConfidence = "low";
      }
    }
  }

  // ── CPU normalization (from cores only — best we can do in browser) ─
  if (raw.cpuCores) {
    const estimatedCpu = estimateCpuFromCores(raw.cpuCores);
    if (estimatedCpu) {
      result.cpu = estimatedCpu;
      result.cpuConfidence = "low"; // Always low — we're guessing from cores
    }
  }

  return result;
}

function findClosestMatch(
  raw: string,
  index: Record<string, number>,
  aliases: Record<string, string>
): string | null {
  const rawLower = raw.toLowerCase().trim();

  // 1. Exact match
  if (index[raw]) return raw;

  // 2. Alias lookup
  for (const [alias, canonical] of Object.entries(aliases)) {
    if (rawLower.includes(alias.toLowerCase())) return canonical;
  }

  // 3. Substring match in index keys
  for (const key of Object.keys(index)) {
    if (key.toLowerCase().includes(rawLower)) return key;
  }

  // 4. Reverse substring: raw contains a known key
  for (const key of Object.keys(index)) {
    if (rawLower.includes(key.toLowerCase()) && key.length > 10) return key;
  }

  return null;
}

/**
 * Roughly estimate a CPU model based on core count.
 * This is inherently inaccurate — we can't know exact model from JS.
 * Returns a "safe" common CPU for the given core count to enable scoring.
 */
function estimateCpuFromCores(cores: number): string | null {
  if (cores >= 32) return "AMD Ryzen 9 9950X";
  if (cores >= 24) return "Intel Core i9-14900K";
  if (cores >= 20) return "Intel Core i7-14700K";
  if (cores >= 16) return "AMD Ryzen 7 7800X3D";
  if (cores >= 12) return "AMD Ryzen 5 7600X";
  if (cores >= 8) return "Intel Core i5-12400F";
  if (cores >= 6) return "Intel Core i5-10400";
  if (cores >= 4) return "Intel Core i3-12100";
  if (cores >= 2) return "Intel Core i3-6100";
  return null;
}
