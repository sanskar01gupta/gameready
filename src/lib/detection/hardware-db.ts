// ───────────────────────────────────────────────────────────────────────────
// Performance index for CPUs (relative to baseline i5-2500K = 100)
// Based on aggregate gaming + multi-thread benchmarks as of mid-2026
// ───────────────────────────────────────────────────────────────────────────
export const cpuPerformanceIndex: Record<string, number> = {
  // ── Intel Core 2 Duo / Quad ─────────────────────────────────────────────
  "Intel Core 2 Duo E5200": 20,
  "Intel Core 2 Duo E8400": 25,
  "Intel Core 2 Quad Q6600": 30,

  // ── Intel i3 (1st–7th Gen) ──────────────────────────────────────────────
  "Intel Core i3-530": 35,
  "Intel Core i3-560": 35,
  "Intel Core i3-2100": 40,
  "Intel Core i3-2120": 40,
  "Intel Core i3-3210": 42,
  "Intel Core i3-3225": 42,
  "Intel Core i3-3250": 45,
  "Intel Core i3-4150": 50,
  "Intel Core i3-4160": 52,
  "Intel Core i3-6100": 58,
  "Intel Core i3-6300": 60,
  "Intel Core i3-7100": 62,
  "Intel Core i3-7300": 65,
  "Intel Core i3-8100": 70,
  "Intel Core i3-9100": 75,
  "Intel Core i3-10100": 90,
  "Intel Core i3-10100F": 88,
  "Intel Core i3-12100": 110,
  "Intel Core i3-12100F": 108,
  "Intel Core i3-13100": 120,
  "Intel Core i3-13100F": 118,
  "Intel Core i3-14100": 128,
  "Intel Core i3-14100F": 126,

  // ── Intel i5 (1st–10th Gen) ─────────────────────────────────────────────
  "Intel Core i5-750": 55,
  "Intel Core i5-2300": 70,
  "Intel Core i5-2400": 75,
  "Intel Core i5-2500K": 100,
  "Intel Core i5-3300": 85,
  "Intel Core i5-3470": 105,
  "Intel Core i5-3570K": 115,
  "Intel Core i5-4460": 120,
  "Intel Core i5-4570": 120,
  "Intel Core i5-4670": 125,
  "Intel Core i5-4670K": 130,
  "Intel Core i5-4690": 135,
  "Intel Core i5-6600": 140,
  "Intel Core i5-6600K": 150,
  "Intel Core i5-7300U": 80,
  "Intel Core i5-7400": 145,
  "Intel Core i5-8400": 165,
  "Intel Core i5-8600K": 180,
  "Intel Core i5-9400F": 170,
  "Intel Core i5-9600K": 190,
  "Intel Core i5-10400": 195,
  "Intel Core i5-10400F": 193,
  "Intel Core i5-10600K": 200,
  "Intel Core i5-11400": 210,
  "Intel Core i5-11600K": 220,

  // ── Intel i5 (12th–14th Gen) ────────────────────────────────────────────
  "Intel Core i5-12400": 250,
  "Intel Core i5-12400F": 250,
  "Intel Core i5-12500": 260,
  "Intel Core i5-12600K": 280,
  "Intel Core i5-12600KF": 275,
  "Intel Core i5-13400": 280,
  "Intel Core i5-13400F": 278,
  "Intel Core i5-13500": 295,
  "Intel Core i5-13600K": 310,
  "Intel Core i5-13600KF": 305,
  "Intel Core i5-14400": 295,
  "Intel Core i5-14400F": 292,
  "Intel Core i5-14500": 305,
  "Intel Core i5-14600K": 320,
  "Intel Core i5-14600KF": 315,

  // ── Intel i7 (2nd–10th Gen) ─────────────────────────────────────────────
  "Intel Core i7-2600K": 120,
  "Intel Core i7-3770": 155,
  "Intel Core i7-4770K": 185,
  "Intel Core i7-4790": 175,
  "Intel Core i7-4790K": 190,
  "Intel Core i7-6700K": 200,
  "Intel Core i7-6800K": 210,
  "Intel Core i7-8700": 220,
  "Intel Core i7-8700K": 240,
  "Intel Core i7-9700K": 250,
  "Intel Core i7-10700K": 260,
  "Intel Core i7-11700K": 270,

  // ── Intel i7 (12th–14th Gen) ────────────────────────────────────────────
  "Intel Core i7-12700K": 310,
  "Intel Core i7-12700KF": 305,
  "Intel Core i7-13700K": 340,
  "Intel Core i7-13700KF": 335,
  "Intel Core i7-14700K": 355,
  "Intel Core i7-14700KF": 350,
  "Intel Core i7-14700F": 345,

  // ── Intel i9 ────────────────────────────────────────────────────────────
  "Intel Core i9-9900K": 260,
  "Intel Core i9-10900K": 280,
  "Intel Core i9-11900K": 290,
  "Intel Core i9-12900K": 345,
  "Intel Core i9-12900KF": 340,
  "Intel Core i9-12900KS": 355,
  "Intel Core i9-13900K": 380,
  "Intel Core i9-13900KF": 375,
  "Intel Core i9-13900KS": 390,
  "Intel Core i9-14900K": 395,
  "Intel Core i9-14900KF": 390,
  "Intel Core i9-14900KS": 405,

  // ── Intel Core Ultra 100 (Meteor Lake) ──────────────────────────────────
  "Intel Core Ultra 5 125H": 220,
  "Intel Core Ultra 5 135H": 235,
  "Intel Core Ultra 7 155H": 270,
  "Intel Core Ultra 7 165H": 285,
  "Intel Core Ultra 9 185H": 310,

  // ── Intel Core Ultra 200 (Arrow Lake) ───────────────────────────────────
  "Intel Core Ultra 5 225": 290,
  "Intel Core Ultra 5 245K": 330,
  "Intel Core Ultra 5 245KF": 325,
  "Intel Core Ultra 7 265K": 380,
  "Intel Core Ultra 7 265KF": 375,
  "Intel Core Ultra 9 285K": 415,
  "Intel Core Ultra 9 285KF": 410,

  // ── Intel Core Ultra 200 Plus (Arrow Lake Refresh) ──────────────────────
  "Intel Core Ultra 5 250K+": 345,
  "Intel Core Ultra 7 270K+": 400,
  "Intel Core Ultra 9 290K+": 430,

  // ── AMD FX ──────────────────────────────────────────────────────────────
  "AMD FX-4300": 55,
  "AMD FX-4350": 58,
  "AMD FX-6300": 85,
  "AMD FX-8120": 95,
  "AMD FX-8310": 100,
  "AMD FX-8320": 105,
  "AMD FX-8350": 110,
  "AMD FX-9590": 125,

  // ── AMD Phenom / Athlon / A-Series ──────────────────────────────────────
  "AMD Phenom 9850": 30,
  "AMD Phenom II X4 945": 55,
  "AMD A6-3650": 35,
  "AMD A8-7600": 45,
  "AMD Athlon 200GE": 40,

  // ── AMD Ryzen 3 ─────────────────────────────────────────────────────────
  "AMD Ryzen 3 1200": 105,
  "AMD Ryzen 3 1300X": 115,
  "AMD Ryzen 3 2300X": 120,
  "AMD Ryzen 3 3100": 145,
  "AMD Ryzen 3 3200G": 140,
  "AMD Ryzen 3 3300X": 155,
  "AMD Ryzen 3 3300U": 65,
  "AMD Ryzen 3 4100": 150,
  "AMD Ryzen 3 4300G": 155,
  "AMD Ryzen 3 5300G": 165,

  // ── AMD Ryzen 5 (1000–3000) ─────────────────────────────────────────────
  "AMD Ryzen 5 1400": 118,
  "AMD Ryzen 5 1500X": 130,
  "AMD Ryzen 5 1600": 150,
  "AMD Ryzen 5 1600X": 160,
  "AMD Ryzen 5 2400G": 140,
  "AMD Ryzen 5 2600": 170,
  "AMD Ryzen 5 2600X": 180,
  "AMD Ryzen 5 3600": 205,
  "AMD Ryzen 5 3600X": 215,
  "AMD Ryzen 5 3600XT": 218,

  // ── AMD Ryzen 5 (5000–7000) ─────────────────────────────────────────────
  "AMD Ryzen 5 5500": 210,
  "AMD Ryzen 5 5600": 230,
  "AMD Ryzen 5 5600X": 240,
  "AMD Ryzen 5 5600X3D": 270,
  "AMD Ryzen 5 5600GT": 225,
  "AMD Ryzen 5 7500F": 270,
  "AMD Ryzen 5 7600": 285,
  "AMD Ryzen 5 7600X": 290,
  "AMD Ryzen 5 7600X3D": 320,
  "AMD Ryzen 5 8400F": 260,
  "AMD Ryzen 5 8500G": 250,
  "AMD Ryzen 5 8600G": 270,

  // ── AMD Ryzen 5 (9000 Zen 5) ────────────────────────────────────────────
  "AMD Ryzen 5 9600": 340,
  "AMD Ryzen 5 9600X": 360,
  "AMD Ryzen 5 9600X3D": 400,

  // ── AMD Ryzen 7 (1000–3000) ─────────────────────────────────────────────
  "AMD Ryzen 7 1700": 175,
  "AMD Ryzen 7 1700X": 185,
  "AMD Ryzen 7 1800X": 195,
  "AMD Ryzen 7 2700": 195,
  "AMD Ryzen 7 2700X": 210,
  "AMD Ryzen 7 3700X": 240,
  "AMD Ryzen 7 3800X": 250,
  "AMD Ryzen 7 3800XT": 255,

  // ── AMD Ryzen 7 (5000–7000) ─────────────────────────────────────────────
  "AMD Ryzen 7 5700": 265,
  "AMD Ryzen 7 5700X": 270,
  "AMD Ryzen 7 5700X3D": 290,
  "AMD Ryzen 7 5800X": 280,
  "AMD Ryzen 7 5800X3D": 300,
  "AMD Ryzen 7 5800XT": 285,
  "AMD Ryzen 7 7700": 310,
  "AMD Ryzen 7 7700X": 320,
  "AMD Ryzen 7 7800X3D": 340,
  "AMD Ryzen 7 8700F": 290,
  "AMD Ryzen 7 8700G": 300,

  // ── AMD Ryzen 7 (9000 Zen 5) ────────────────────────────────────────────
  "AMD Ryzen 7 9700X": 400,
  "AMD Ryzen 7 9800X3D": 450,

  // ── AMD Ryzen 9 (3000–5000) ─────────────────────────────────────────────
  "AMD Ryzen 9 3900X": 270,
  "AMD Ryzen 9 3900XT": 275,
  "AMD Ryzen 9 3950X": 295,
  "AMD Ryzen 9 5900X": 310,
  "AMD Ryzen 9 5950X": 330,
  "AMD Ryzen 9 5900XT": 325,

  // ── AMD Ryzen 9 (7000) ──────────────────────────────────────────────────
  "AMD Ryzen 9 7900": 345,
  "AMD Ryzen 9 7900X": 360,
  "AMD Ryzen 9 7900X3D": 365,
  "AMD Ryzen 9 7950X": 370,
  "AMD Ryzen 9 7950X3D": 380,

  // ── AMD Ryzen 9 (9000 Zen 5) ────────────────────────────────────────────
  "AMD Ryzen 9 9900X": 430,
  "AMD Ryzen 9 9900X3D": 450,
  "AMD Ryzen 9 9950X": 460,
  "AMD Ryzen 9 9950X3D": 480,

  // ── AMD Threadripper ────────────────────────────────────────────────────
  "AMD Threadripper 3960X": 350,
  "AMD Threadripper 3970X": 390,
  "AMD Threadripper 3990X": 420,
  "AMD Threadripper 7960X": 450,
  "AMD Threadripper 7970X": 480,
  "AMD Threadripper 7980X": 510,
  "AMD Threadripper 7985WX": 520,
};

// ───────────────────────────────────────────────────────────────────────────
// Performance index for GPUs (relative to baseline GTX 1060 = 100)
// Based on aggregate 1080p/1440p rasterization benchmarks as of mid-2026
// ───────────────────────────────────────────────────────────────────────────
export const gpuPerformanceIndex: Record<string, number> = {
  // ── Integrated / Entry-Level ────────────────────────────────────────────
  "Intel HD 3000": 5,
  "Intel HD Graphics 4000": 8,
  "Intel HD 4600": 10,
  "Intel UHD Graphics 610": 10,
  "Intel UHD Graphics 620": 12,
  "Intel UHD Graphics 630": 15,
  "Intel UHD Graphics 730": 22,
  "Intel UHD Graphics 750": 28,
  "Intel UHD Graphics 770": 32,
  "Intel Iris Xe Graphics": 38,
  "Intel Iris Xe Graphics G7": 42,
  "Intel Arc Graphics (iGPU)": 55,
  "AMD Radeon Vega 3": 8,
  "AMD Radeon Vega 6": 10,
  "AMD Radeon Vega 7": 12,
  "AMD Radeon Vega 8": 12,
  "AMD Radeon Vega 10": 14,
  "AMD Radeon Vega 11": 16,
  "AMD Radeon RX Vega 8": 14,
  "AMD Radeon RX Vega 10": 16,
  "AMD Radeon RX Vega 11": 18,
  "AMD Radeon Graphics (Ryzen 7000)": 35,
  "AMD Radeon 610M": 25,
  "AMD Radeon 660M": 35,
  "AMD Radeon 680M": 45,
  "AMD Radeon 740M": 40,
  "AMD Radeon 760M": 50,
  "AMD Radeon 780M": 60,
  "AMD Radeon 890M": 70,

  // ── Entry-Level Dedicated ───────────────────────────────────────────────
  "NVIDIA GeForce 9800 GT": 5,
  "NVIDIA GeForce 9800 GTX+": 6,
  "NVIDIA GeForce GT 630": 8,
  "NVIDIA GeForce GT 640": 10,
  "NVIDIA GeForce GT 730": 12,
  "NVIDIA GeForce GTS 450": 15,
  "NVIDIA GeForce GT 1030": 18,
  "NVIDIA GeForce GTX 460": 22,
  "NVIDIA GeForce GTX 470": 25,
  "NVIDIA GeForce GTX 550 Ti": 18,
  "NVIDIA GeForce GTX 560": 30,
  "NVIDIA GeForce GTX 660": 45,
  "NVIDIA GeForce GTX 670": 55,
  "NVIDIA GeForce GTX 750": 30,
  "NVIDIA GeForce GTX 750 Ti": 35,
  "NVIDIA GeForce GTX 760": 50,
  "NVIDIA GeForce GTX 770": 65,
  "NVIDIA GeForce GTX 780": 80,

  // ── AMD HD Series ───────────────────────────────────────────────────────
  "AMD Radeon HD 4870": 10,
  "AMD Radeon HD 5750": 12,
  "AMD Radeon HD 5770": 15,
  "AMD Radeon HD 5870": 22,
  "AMD Radeon HD 6670": 8,
  "AMD Radeon HD 6870": 25,
  "AMD Radeon HD 6950": 30,
  "AMD Radeon HD 7730": 12,
  "AMD Radeon HD 7850": 35,
  "AMD Radeon HD 7870": 40,
  "AMD Radeon HD 7950": 50,
  "AMD Radeon HD 7970": 60,

  // ── AMD R7 / R9 ─────────────────────────────────────────────────────────
  "AMD Radeon R5 200": 6,
  "AMD Radeon R5 series": 8,
  "AMD Radeon R7 240": 10,
  "AMD Radeon R7 260X": 25,
  "AMD Radeon R9 270X": 40,
  "AMD Radeon R9 280": 55,
  "AMD Radeon R9 280X": 60,
  "AMD Radeon R9 290": 70,
  "AMD Radeon R9 290X": 75,
  "AMD Radeon R9 380": 50,
  "AMD Radeon R9 390": 70,
  "AMD Radeon R9 Fury": 85,
  "AMD Radeon R9 Fury X": 90,

  // ── NVIDIA GTX 900 ──────────────────────────────────────────────────────
  "NVIDIA GeForce GTX 950": 45,
  "NVIDIA GeForce GTX 960": 55,
  "NVIDIA GeForce GTX 970": 80,
  "NVIDIA GeForce GTX 980": 90,
  "NVIDIA GeForce GTX 980 Ti": 100,

  // ── NVIDIA GTX 1000 ─────────────────────────────────────────────────────
  "NVIDIA GeForce GTX 1050": 45,
  "NVIDIA GeForce GTX 1050 Ti": 55,
  "NVIDIA GeForce GTX 1060": 100,
  "NVIDIA GeForce GTX 1060 6GB": 100,
  "NVIDIA GeForce GTX 1070": 130,
  "NVIDIA GeForce GTX 1070 Ti": 140,
  "NVIDIA GeForce GTX 1080": 160,
  "NVIDIA GeForce GTX 1080 Ti": 180,

  // ── AMD RX 400 / 500 ────────────────────────────────────────────────────
  "AMD Radeon RX 460": 40,
  "AMD Radeon RX 470": 65,
  "AMD Radeon RX 480": 80,
  "AMD Radeon RX 560": 45,
  "AMD Radeon RX 570": 70,
  "AMD Radeon RX 570X": 75,
  "AMD Radeon RX 580": 85,
  "AMD Radeon RX 590": 95,

  // ── AMD RX Vega ─────────────────────────────────────────────────────────
  "AMD Radeon RX Vega 56": 130,
  "AMD Radeon RX Vega 64": 145,

  // ── NVIDIA RTX 2000 ─────────────────────────────────────────────────────
  "NVIDIA GeForce RTX 2060": 145,
  "NVIDIA GeForce RTX 2060 Super": 160,
  "NVIDIA GeForce RTX 2070": 170,
  "NVIDIA GeForce RTX 2070 Super": 185,
  "NVIDIA GeForce RTX 2080": 200,
  "NVIDIA GeForce RTX 2080 Super": 215,
  "NVIDIA GeForce RTX 2080 Ti": 230,

  // ── AMD RX 5000 (RDNA 1) ────────────────────────────────────────────────
  "AMD Radeon RX 5500 XT": 90,
  "AMD Radeon RX 5600 XT": 130,
  "AMD Radeon RX 5700": 165,
  "AMD Radeon RX 5700 XT": 185,

  // ── NVIDIA RTX 3000 (Ampere) ────────────────────────────────────────────
  "NVIDIA GeForce RTX 3050": 110,
  "NVIDIA GeForce RTX 3060": 170,
  "NVIDIA GeForce RTX 3060 Ti": 195,
  "NVIDIA GeForce RTX 3070": 220,
  "NVIDIA GeForce RTX 3070 Ti": 240,
  "NVIDIA GeForce RTX 3080": 270,
  "NVIDIA GeForce RTX 3080 Ti": 290,
  "NVIDIA GeForce RTX 3090": 310,
  "NVIDIA GeForce RTX 3090 Ti": 325,

  // ── NVIDIA RTX 3000 Laptop ──────────────────────────────────────────────
  "NVIDIA GeForce RTX 3050 Laptop": 95,
  "NVIDIA GeForce RTX 3060 Laptop": 150,
  "NVIDIA GeForce RTX 3070 Laptop": 195,
  "NVIDIA GeForce RTX 3080 Laptop": 235,

  // ── AMD RX 6000 (RDNA 2) ────────────────────────────────────────────────
  "AMD Radeon RX 6400": 80,
  "AMD Radeon RX 6500 XT": 95,
  "AMD Radeon RX 6600": 155,
  "AMD Radeon RX 6600 XT": 175,
  "AMD Radeon RX 6650 XT": 185,
  "AMD Radeon RX 6700": 190,
  "AMD Radeon RX 6700 XT": 210,
  "AMD Radeon RX 6750 XT": 225,
  "AMD Radeon RX 6800": 240,
  "AMD Radeon RX 6800 XT": 270,
  "AMD Radeon RX 6900 XT": 295,
  "AMD Radeon RX 6950 XT": 310,

  // ── NVIDIA RTX 4000 (Ada Lovelace) ──────────────────────────────────────
  "NVIDIA GeForce RTX 4050": 140,
  "NVIDIA GeForce RTX 4060": 200,
  "NVIDIA GeForce RTX 4060 Ti": 230,
  "NVIDIA GeForce RTX 4070": 270,
  "NVIDIA GeForce RTX 4070 Super": 300,
  "NVIDIA GeForce RTX 4070 Ti": 310,
  "NVIDIA GeForce RTX 4070 Ti Super": 325,
  "NVIDIA GeForce RTX 4080": 345,
  "NVIDIA GeForce RTX 4080 Super": 360,
  "NVIDIA GeForce RTX 4090": 400,
  "NVIDIA GeForce RTX 4090D": 380,

  // ── NVIDIA RTX 4000 Laptop ──────────────────────────────────────────────
  "NVIDIA GeForce RTX 4050 Laptop": 120,
  "NVIDIA GeForce RTX 4060 Laptop": 170,
  "NVIDIA GeForce RTX 4070 Laptop": 230,
  "NVIDIA GeForce RTX 4080 Laptop": 275,
  "NVIDIA GeForce RTX 4090 Laptop": 320,

  // ── AMD RX 7000 (RDNA 3) ────────────────────────────────────────────────
  "AMD Radeon RX 7600": 180,
  "AMD Radeon RX 7600 XT": 195,
  "AMD Radeon RX 7700 XT": 240,
  "AMD Radeon RX 7800 XT": 280,
  "AMD Radeon RX 7900 GRE": 310,
  "AMD Radeon RX 7900 XT": 340,
  "AMD Radeon RX 7900 XTX": 370,

  // ── NVIDIA RTX 5000 (Blackwell) ─────────────────────────────────────────
  "NVIDIA GeForce RTX 5050": 170,
  "NVIDIA GeForce RTX 5060": 220,
  "NVIDIA GeForce RTX 5060 Ti": 260,
  "NVIDIA GeForce RTX 5070": 320,
  "NVIDIA GeForce RTX 5070 Ti": 355,
  "NVIDIA GeForce RTX 5080": 385,
  "NVIDIA GeForce RTX 5090": 460,

  // ── AMD RX 9000 (RDNA 4) ────────────────────────────────────────────────
  "AMD Radeon RX 9050": 170,
  "AMD Radeon RX 9060": 210,
  "AMD Radeon RX 9060 XT": 240,
  "AMD Radeon RX 9070": 310,
  "AMD Radeon RX 9070 XT": 350,

  // ── Intel Arc (Alchemist) ───────────────────────────────────────────────
  "Intel Arc A310": 55,
  "Intel Arc A380": 75,
  "Intel Arc A580": 85,
  "Intel Arc A750": 100,
  "Intel Arc A770": 115,
  "Intel Arc A770 16GB": 120,

  // ── Intel Arc (Battlemage) ──────────────────────────────────────────────
  "Intel Arc B570": 140,
  "Intel Arc B580": 165,
  "Intel Arc B770": 200,

  // ── Apple Silicon (estimated raster equivalents) ────────────────────────
  "Apple M1": 60,
  "Apple M1 Pro": 85,
  "Apple M1 Max": 105,
  "Apple M1 Ultra": 130,
  "Apple M2": 80,
  "Apple M2 Pro": 110,
  "Apple M2 Max": 130,
  "Apple M2 Ultra": 160,
  "Apple M3": 100,
  "Apple M3 Pro": 135,
  "Apple M3 Max": 160,
  "Apple M3 Ultra": 200,
  "Apple M4": 130,
  "Apple M4 Pro": 170,
  "Apple M4 Max": 210,
};

// ───────────────────────────────────────────────────────────────────────────
// Lookup helpers — exact match, then fuzzy fallback
// ───────────────────────────────────────────────────────────────────────────

export function lookupCpu(model: string | null): number | null {
  if (!model) return null;
  if (cpuPerformanceIndex[model]) return cpuPerformanceIndex[model];

  const keys = Object.keys(cpuPerformanceIndex);
  for (const key of keys) {
    if (key.toLowerCase().includes(model.toLowerCase())) {
      return cpuPerformanceIndex[key];
    }
  }
  for (const key of keys) {
    if (model.toLowerCase().includes(key.toLowerCase())) {
      return cpuPerformanceIndex[key];
    }
  }
  return null;
}

export function lookupGpu(model: string | null): number | null {
  if (!model) return null;
  if (gpuPerformanceIndex[model]) return gpuPerformanceIndex[model];

  const keys = Object.keys(gpuPerformanceIndex);
  for (const key of keys) {
    if (key.toLowerCase().includes(model.toLowerCase())) {
      return gpuPerformanceIndex[key];
    }
  }
  for (const key of keys) {
    if (model.toLowerCase().includes(key.toLowerCase())) {
      return gpuPerformanceIndex[key];
    }
  }
  return null;
}

// ───────────────────────────────────────────────────────────────────────────
// Canonical aliases: maps short/common names → full canonical names
// ───────────────────────────────────────────────────────────────────────────

export const cpuAliases: Record<string, string> = {
  // Intel modern
  "i3-10100": "Intel Core i3-10100",
  "i3-12100": "Intel Core i3-12100",
  "i3-12100f": "Intel Core i3-12100F",
  "i3-13100": "Intel Core i3-13100",
  "i3-14100": "Intel Core i3-14100",
  "i5-8400": "Intel Core i5-8400",
  "i5-9400f": "Intel Core i5-9400F",
  "i5-10400": "Intel Core i5-10400",
  "i5-10400f": "Intel Core i5-10400F",
  "i5-10600k": "Intel Core i5-10600K",
  "i5-11400": "Intel Core i5-11400",
  "i5-11600k": "Intel Core i5-11600K",
  "i5-12400": "Intel Core i5-12400",
  "i5-12400f": "Intel Core i5-12400F",
  "i5-12600k": "Intel Core i5-12600K",
  "i5-13400": "Intel Core i5-13400",
  "i5-13400f": "Intel Core i5-13400F",
  "i5-13600k": "Intel Core i5-13600K",
  "i5-14400": "Intel Core i5-14400",
  "i5-14400f": "Intel Core i5-14400F",
  "i5-14600k": "Intel Core i5-14600K",
  "i7-4790": "Intel Core i7-4790",
  "i7-4790k": "Intel Core i7-4790K",
  "i7-6700k": "Intel Core i7-6700K",
  "i7-8700k": "Intel Core i7-8700K",
  "i7-9700k": "Intel Core i7-9700K",
  "i7-10700k": "Intel Core i7-10700K",
  "i7-11700k": "Intel Core i7-11700K",
  "i7-12700k": "Intel Core i7-12700K",
  "i7-13700k": "Intel Core i7-13700K",
  "i7-14700k": "Intel Core i7-14700K",
  "i9-9900k": "Intel Core i9-9900K",
  "i9-10900k": "Intel Core i9-10900K",
  "i9-11900k": "Intel Core i9-11900K",
  "i9-12900k": "Intel Core i9-12900K",
  "i9-13900k": "Intel Core i9-13900K",
  "i9-14900k": "Intel Core i9-14900K",
  "i9-14900ks": "Intel Core i9-14900KS",
  "ultra 5 245k": "Intel Core Ultra 5 245K",
  "ultra 7 265k": "Intel Core Ultra 7 265K",
  "ultra 9 285k": "Intel Core Ultra 9 285K",

  // AMD Ryzen
  "ryzen 3 1200": "AMD Ryzen 3 1200",
  "ryzen 3 3100": "AMD Ryzen 3 3100",
  "ryzen 5 1600": "AMD Ryzen 5 1600",
  "ryzen 5 2600": "AMD Ryzen 5 2600",
  "ryzen 5 3600": "AMD Ryzen 5 3600",
  "ryzen 5 3600x": "AMD Ryzen 5 3600X",
  "ryzen 5 5500": "AMD Ryzen 5 5500",
  "ryzen 5 5600": "AMD Ryzen 5 5600",
  "ryzen 5 5600x": "AMD Ryzen 5 5600X",
  "ryzen 5 5600x3d": "AMD Ryzen 5 5600X3D",
  "ryzen 5 7600": "AMD Ryzen 5 7600",
  "ryzen 5 7600x": "AMD Ryzen 5 7600X",
  "ryzen 5 7600x3d": "AMD Ryzen 5 7600X3D",
  "ryzen 5 9600": "AMD Ryzen 5 9600",
  "ryzen 5 9600x": "AMD Ryzen 5 9600X",
  "ryzen 5 9600x3d": "AMD Ryzen 5 9600X3D",
  "ryzen 7 2700x": "AMD Ryzen 7 2700X",
  "ryzen 7 3700x": "AMD Ryzen 7 3700X",
  "ryzen 7 5700x": "AMD Ryzen 7 5700X",
  "ryzen 7 5700x3d": "AMD Ryzen 7 5700X3D",
  "ryzen 7 5800x": "AMD Ryzen 7 5800X",
  "ryzen 7 5800x3d": "AMD Ryzen 7 5800X3D",
  "ryzen 7 7700": "AMD Ryzen 7 7700",
  "ryzen 7 7700x": "AMD Ryzen 7 7700X",
  "ryzen 7 7800x3d": "AMD Ryzen 7 7800X3D",
  "ryzen 7 9700x": "AMD Ryzen 7 9700X",
  "ryzen 7 9800x3d": "AMD Ryzen 7 9800X3D",
  "ryzen 9 5900x": "AMD Ryzen 9 5900X",
  "ryzen 9 5950x": "AMD Ryzen 9 5950X",
  "ryzen 9 7900x": "AMD Ryzen 9 7900X",
  "ryzen 9 7950x": "AMD Ryzen 9 7950X",
  "ryzen 9 7950x3d": "AMD Ryzen 9 7950X3D",
  "ryzen 9 9900x": "AMD Ryzen 9 9900X",
  "ryzen 9 9950x": "AMD Ryzen 9 9950X",
  "ryzen 9 9950x3d": "AMD Ryzen 9 9950X3D",
};

export const gpuAliases: Record<string, string> = {
  // NVIDIA shortcuts
  "gtx 1050": "NVIDIA GeForce GTX 1050",
  "gtx 1050 ti": "NVIDIA GeForce GTX 1050 Ti",
  "gtx 1060": "NVIDIA GeForce GTX 1060",
  "gtx 1070": "NVIDIA GeForce GTX 1070",
  "gtx 1080": "NVIDIA GeForce GTX 1080",
  "gtx 1080 ti": "NVIDIA GeForce GTX 1080 Ti",
  "rtx 2060": "NVIDIA GeForce RTX 2060",
  "rtx 2060 super": "NVIDIA GeForce RTX 2060 Super",
  "rtx 2070": "NVIDIA GeForce RTX 2070",
  "rtx 2070 super": "NVIDIA GeForce RTX 2070 Super",
  "rtx 2080": "NVIDIA GeForce RTX 2080",
  "rtx 2080 ti": "NVIDIA GeForce RTX 2080 Ti",
  "rtx 3050": "NVIDIA GeForce RTX 3050",
  "rtx 3060": "NVIDIA GeForce RTX 3060",
  "rtx 3060 ti": "NVIDIA GeForce RTX 3060 Ti",
  "rtx 3070": "NVIDIA GeForce RTX 3070",
  "rtx 3070 ti": "NVIDIA GeForce RTX 3070 Ti",
  "rtx 3080": "NVIDIA GeForce RTX 3080",
  "rtx 3080 ti": "NVIDIA GeForce RTX 3080 Ti",
  "rtx 3090": "NVIDIA GeForce RTX 3090",
  "rtx 3090 ti": "NVIDIA GeForce RTX 3090 Ti",
  "rtx 4050": "NVIDIA GeForce RTX 4050",
  "rtx 4060": "NVIDIA GeForce RTX 4060",
  "rtx 4060 ti": "NVIDIA GeForce RTX 4060 Ti",
  "rtx 4070": "NVIDIA GeForce RTX 4070",
  "rtx 4070 super": "NVIDIA GeForce RTX 4070 Super",
  "rtx 4070 ti": "NVIDIA GeForce RTX 4070 Ti",
  "rtx 4070 ti super": "NVIDIA GeForce RTX 4070 Ti Super",
  "rtx 4080": "NVIDIA GeForce RTX 4080",
  "rtx 4080 super": "NVIDIA GeForce RTX 4080 Super",
  "rtx 4090": "NVIDIA GeForce RTX 4090",
  "rtx 5050": "NVIDIA GeForce RTX 5050",
  "rtx 5060": "NVIDIA GeForce RTX 5060",
  "rtx 5060 ti": "NVIDIA GeForce RTX 5060 Ti",
  "rtx 5070": "NVIDIA GeForce RTX 5070",
  "rtx 5070 ti": "NVIDIA GeForce RTX 5070 Ti",
  "rtx 5080": "NVIDIA GeForce RTX 5080",
  "rtx 5090": "NVIDIA GeForce RTX 5090",

  // AMD shortcuts
  "rx 480": "AMD Radeon RX 480",
  "rx 580": "AMD Radeon RX 580",
  "rx 5500 xt": "AMD Radeon RX 5500 XT",
  "rx 5600 xt": "AMD Radeon RX 5600 XT",
  "rx 5700": "AMD Radeon RX 5700",
  "rx 5700 xt": "AMD Radeon RX 5700 XT",
  "rx 6400": "AMD Radeon RX 6400",
  "rx 6500 xt": "AMD Radeon RX 6500 XT",
  "rx 6600": "AMD Radeon RX 6600",
  "rx 6600 xt": "AMD Radeon RX 6600 XT",
  "rx 6650 xt": "AMD Radeon RX 6650 XT",
  "rx 6700 xt": "AMD Radeon RX 6700 XT",
  "rx 6750 xt": "AMD Radeon RX 6750 XT",
  "rx 6800": "AMD Radeon RX 6800",
  "rx 6800 xt": "AMD Radeon RX 6800 XT",
  "rx 6900 xt": "AMD Radeon RX 6900 XT",
  "rx 6950 xt": "AMD Radeon RX 6950 XT",
  "rx 7600": "AMD Radeon RX 7600",
  "rx 7600 xt": "AMD Radeon RX 7600 XT",
  "rx 7700 xt": "AMD Radeon RX 7700 XT",
  "rx 7800 xt": "AMD Radeon RX 7800 XT",
  "rx 7900 gre": "AMD Radeon RX 7900 GRE",
  "rx 7900 xt": "AMD Radeon RX 7900 XT",
  "rx 7900 xtx": "AMD Radeon RX 7900 XTX",
  "rx 9060": "AMD Radeon RX 9060",
  "rx 9060 xt": "AMD Radeon RX 9060 XT",
  "rx 9070": "AMD Radeon RX 9070",
  "rx 9070 xt": "AMD Radeon RX 9070 XT",

  // Intel Arc shortcuts
  "arc a580": "Intel Arc A580",
  "arc a750": "Intel Arc A750",
  "arc a770": "Intel Arc A770",
  "arc b570": "Intel Arc B570",
  "arc b580": "Intel Arc B580",
  "arc b770": "Intel Arc B770",
};
