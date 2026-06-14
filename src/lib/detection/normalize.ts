import { cpuPerformanceIndex, gpuPerformanceIndex, cpuAliases, gpuAliases } from "./hardware-db";
import { parseGpuString } from "./gpu-parser";

export interface NormalizedHardware {
  cpu: string | null;
  cpuConfidence: "high" | "medium" | "low";
  gpu: string | null;
  gpuConfidence: "high" | "medium" | "low";
  /** Secondary GPU (typically integrated) — only set on dual-GPU systems */
  gpuSecondary: string | null;
  gpuSecondaryConfidence: "high" | "medium" | "low";
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
  gpuRawSecondary?: string | null;
  ramGb: number | null;
  os: string | null;
}): NormalizedHardware {
  const result: NormalizedHardware = {
    cpu: null,
    cpuConfidence: "low",
    gpu: null,
    gpuConfidence: "low",
    gpuSecondary: null,
    gpuSecondaryConfidence: "low",
    ramGb: raw.ramGb,
    cores: raw.cpuCores,
  };

  // ── Primary GPU normalization ──────────────────────────────────────
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

  // ── Secondary GPU normalization (dual-GPU laptops) ─────────────────
  if (raw.gpuRawSecondary && raw.gpuRawSecondary !== raw.gpuRaw) {
    const parsedSec = parseGpuString(raw.gpuRawSecondary);
    if (parsedSec) {
      const normalizedSec = findClosestMatch(parsedSec.model, gpuPerformanceIndex, gpuAliases);
      if (normalizedSec) {
        result.gpuSecondary = normalizedSec;
        result.gpuSecondaryConfidence = normalizedSec === parsedSec.model ? "high" : "medium";
      } else {
        result.gpuSecondary = parsedSec.model;
        result.gpuSecondaryConfidence = "low";
      }
    }
  }

  // ── CPU normalization (combine cores + GPU vendor + OS for smarter guess) ─
  if (raw.cpuCores) {
    const estimatedCpu = estimateCpuFromSignals(raw.cpuCores, raw.gpuRaw, raw.os);
    if (estimatedCpu) {
      result.cpu = estimatedCpu;
      // "medium" if we had GPU vendor signal to narrow it down, else "low"
      result.cpuConfidence = raw.gpuRaw ? "medium" : "low";
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
 * Smarter CPU estimation combining core count, GPU vendor, and OS.
 *
 * Browsers don't expose CPU model names (privacy), but we can narrow
 * down the likely family by looking at the GPU vendor from WebGL:
 *  - AMD GPU   → likely AMD Ryzen system
 *  - Intel GPU → likely Intel Core system
 *  - Apple GPU → Apple Silicon
 *  - NVIDIA    → could be either (dedicated GPU), fall back to core count
 *
 * Windows 11 signals a modern system (Ryzen 5000+ or Intel 12th Gen+).
 */
function estimateCpuFromSignals(
  cores: number,
  gpuRaw: string | null,
  os: string | null
): string | null {
  const gpuFamily = detectGpuFamily(gpuRaw);
  const isModern = os?.includes("Windows 11") || os?.includes("macOS");

  // ── Apple Silicon ────────────────────────────────────────────────────
  if (gpuFamily === "apple") {
    if (cores >= 16) return "Apple M4 Max";
    if (cores >= 12) return "Apple M4 Pro";
    if (cores >= 8) return "Apple M4";
    return "Apple M2";
  }

  // ── AMD GPU → likely Ryzen system ────────────────────────────────────
  if (gpuFamily === "amd") {
    if (cores >= 32) return "AMD Ryzen 9 9950X";
    if (cores >= 24) return "AMD Ryzen 9 9900X";
    if (cores >= 20) return "AMD Ryzen 9 7900X";
    if (cores >= 16) return "AMD Ryzen 7 7800X3D";
    if (cores >= 12) return isModern ? "AMD Ryzen 5 7600X" : "AMD Ryzen 5 5600X";
    if (cores >= 8) return "AMD Ryzen 5 3600";
    if (cores >= 6) return "AMD Ryzen 5 1600";
    if (cores >= 4) return "AMD Ryzen 3 3100";
    return "AMD Ryzen 3 1200";
  }

  // ── Intel GPU → likely Intel system ─────────────────────────────────
  if (gpuFamily === "intel") {
    if (cores >= 32) return "Intel Core i9-14900K";
    if (cores >= 24) return isModern ? "Intel Core Ultra 9 285K" : "Intel Core i9-13900K";
    if (cores >= 20) return isModern ? "Intel Core Ultra 7 265K" : "Intel Core i7-13700K";
    if (cores >= 16) return "Intel Core i7-14700K";
    if (cores >= 12) return isModern ? "Intel Core i5-12600K" : "Intel Core i5-10600K";
    if (cores >= 8) return isModern ? "Intel Core i5-12400F" : "Intel Core i5-8400";
    if (cores >= 6) return "Intel Core i5-10400";
    if (cores >= 4) return isModern ? "Intel Core i3-12100" : "Intel Core i3-9100";
    return "Intel Core i3-6100";
  }

  // ── Unknown GPU vendor (NVIDIA dGPU, or no WebGL) → best guess ─────
  if (gpuFamily === "nvidia" || !gpuFamily) {
    if (cores >= 32) return "AMD Ryzen 9 9950X";
    if (cores >= 24) return "Intel Core i9-14900K";
    if (cores >= 20) return "Intel Core i7-14700K";
    if (cores >= 16) return "AMD Ryzen 7 7800X3D";
    if (cores >= 12) return isModern ? "AMD Ryzen 5 7600X" : "Intel Core i5-10400";
    if (cores >= 8) return "Intel Core i5-12400F";
    if (cores >= 6) return "Intel Core i5-10400";
    if (cores >= 4) return "Intel Core i3-12100";
    if (cores >= 2) return "Intel Core i3-6100";
  }

  return null;
}

/** Determine GPU vendor family from a raw WebGL renderer string. */
function detectGpuFamily(gpuRaw: string | null): "amd" | "intel" | "nvidia" | "apple" | null {
  if (!gpuRaw || gpuRaw === "Unknown") return null;
  const r = gpuRaw.toLowerCase();
  if (r.includes("amd") || r.includes("radeon") || r.includes("rx")) return "amd";
  if (r.includes("intel") || r.includes("iris") || r.includes("uhd")) return "intel";
  if (r.includes("nvidia") || r.includes("geforce") || r.includes("rtx") || r.includes("gtx")) return "nvidia";
  if (r.includes("apple") || r.includes("m1") || r.includes("m2") || r.includes("m3") || r.includes("m4")) return "apple";
  return null;
}
