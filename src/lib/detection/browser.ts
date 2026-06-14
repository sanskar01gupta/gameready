/**
 * Browser hardware detection utilities.
 * All functions are client-side only — never call these on the server.
 */

export interface DetectedHardware {
  cpuCores: number | null;
  gpuRaw: string | null;
  /** Secondary GPU raw string (typically integrated) — only set on dual-GPU systems */
  gpuRawSecondary: string | null;
  /** All unique GPU raw strings detected */
  allGpuRaws: string[];
  ramGb: number | null;
  os: string | null;
  screenResolution: string | null;
}

/**
 * Detect CPU logical core count via navigator.hardwareConcurrency.
 * Available in all modern browsers.
 */
export function detectCpuCores(): number | null {
  if (typeof navigator === "undefined") return null;
  const cores = navigator.hardwareConcurrency;
  return cores && cores > 0 ? cores : null;
}

/**
 * Detect GPU model via WebGL renderer info.
 * Creates a hidden canvas, gets WebGL context, reads the renderer string.
 * Returns the raw GPU string (needs parsing via gpu-parser.ts).
 *
 * @param powerPreference — hints which GPU to use:
 *   - "low-power" → typically the integrated GPU (iGPU)
 *   - "high-performance" → typically the dedicated GPU (dGPU)
 *   - undefined → browser default (usually integrated on laptops)
 */
export function detectGpu(powerPreference?: "low-power" | "high-performance"): string | null {
  if (typeof document === "undefined") return null;

  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;

    const contextOptions: WebGLContextAttributes = powerPreference
      ? { powerPreference, failIfMajorPerformanceCaveat: false }
      : {};

    const gl =
      canvas.getContext("webgl2", contextOptions) ||
      canvas.getContext("webgl", contextOptions);
    if (!gl) return null;

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return null;

    const renderer = (gl as WebGLRenderingContext & { getParameter(p: number): string }).getParameter(
      debugInfo.UNMASKED_RENDERER_WEBGL
    );

    return renderer ?? null;
  } catch {
    return null;
  }
}

/**
 * Detect all GPUs on a dual-GPU system by trying both power preferences.
 * On single-GPU systems, both calls may return the same renderer string
 * (or the second may fail), in which case we deduplicate.
 */
export function detectAllGpus(): { gpuRaw: string | null; gpuRawSecondary: string | null; allGpuRaws: string[] } {
  // Try high-performance first (likely dGPU) — this is the "primary" for gaming
  const highPerf = detectGpu("high-performance");
  // Then try low-power (likely iGPU)
  const lowPower = detectGpu("low-power");

  // Build unique list, preferring high-perf as primary
  const unique: string[] = [];
  if (highPerf) unique.push(highPerf);
  if (lowPower && lowPower !== highPerf) unique.push(lowPower);

  return {
    gpuRaw: highPerf || lowPower || null,
    gpuRawSecondary: highPerf && lowPower && highPerf !== lowPower ? lowPower : null,
    allGpuRaws: unique,
  };
}

/**
 * Detect system RAM via navigator.deviceMemory (Chromium-only).
 * Returns RAM in GB. Values are typically: 0.25, 0.5, 1, 2, 4, 8, 16, 32
 */
export function detectRam(): number | null {
  if (typeof navigator === "undefined") return null;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return mem && mem > 0 ? mem : null;
}

/**
 * Detect OS from user agent string.
 */
export function detectOS(): string {
  if (typeof navigator === "undefined") return "Unknown";

  const ua = navigator.userAgent;
  if (ua.includes("Windows NT 11") || ua.includes("Windows 11")) return "Windows 11";
  if (ua.includes("Windows NT 10") || ua.includes("Windows 10")) return "Windows 10";
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS X") || ua.includes("macOS")) return "macOS";
  if (ua.includes("Linux") && !ua.includes("Android")) return "Linux";
  if (ua.includes("Android")) return "Android";
  return "Unknown";
}

/**
 * Detect screen resolution.
 */
export function detectScreenResolution(): string {
  if (typeof screen === "undefined") return "Unknown";
  return `${screen.width}×${screen.height}`;
}

/**
 * Run all hardware detections. Returns whatever was found.
 * Some values may be null if the browser doesn't support the API.
 * On dual-GPU systems, both GPU renderer strings are captured.
 */
export function detectAll(): DetectedHardware {
  const gpus = detectAllGpus();
  return {
    cpuCores: detectCpuCores(),
    gpuRaw: gpus.gpuRaw,
    gpuRawSecondary: gpus.gpuRawSecondary,
    allGpuRaws: gpus.allGpuRaws,
    ramGb: detectRam(),
    os: detectOS(),
    screenResolution: detectScreenResolution(),
  };
}
