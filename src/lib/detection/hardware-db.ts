// Performance index for common CPUs (relative to baseline i5-2500K = 100)
export const cpuPerformanceIndex: Record<string, number> = {
  // Intel Core 2
  "Intel Core 2 Duo E5200": 20,
  "Intel Core 2 Duo E8400": 25,
  "Intel Core 2 Quad Q6600": 30,
  // Intel i3
  "Intel Core i3-530": 35,
  "Intel Core i3-2100": 40,
  "Intel Core i3-3225": 42,
  "Intel Core i3-3250": 45,
  "Intel Core i3-4150": 50,
  "Intel Core i3-4160": 52,
  "Intel Core i3-560": 35,
  "Intel Core i3-6100": 58,
  "Intel Core i3-6300": 60,
  "Intel Core i3-9100": 75,
  "Intel Core i3-2120": 40,
  "Intel Core i3-3210": 42,
  // Intel i5 (older)
  "Intel Core i5-750": 55,
  "Intel Core i5-2300": 70,
  "Intel Core i5-2400": 75,
  "Intel Core i5-2500K": 100,
  "Intel Core i5-3470": 105,
  "Intel Core i5-3570K": 115,
  "Intel Core i5-4460": 120,
  "Intel Core i5-4570": 120,
  "Intel Core i5-4670": 125,
  "Intel Core i5-4670K": 130,
  "Intel Core i5-4690": 135,
  "Intel Core i5-6600": 140,
  "Intel Core i5-6600K": 150,
  "Intel Core i5-7400": 145,
  "Intel Core i5-7300U": 80,
  "Intel Core i5-8400": 165,
  "Intel Core i5-8600K": 180,
  "Intel Core i5-10600K": 200,
  "Intel Core i5-3300": 85,
  // Intel i7 (older)
  "Intel Core i7-3770": 155,
  "Intel Core i7-4790": 175,
  "Intel Core i7-4790K": 190,
  "Intel Core i7-4770K": 185,
  "Intel Core i7-6700K": 200,
  "Intel Core i7-6800K": 210,
  "Intel Core i7-8700": 220,
  "Intel Core i7-8700K": 240,
  // AMD FX
  "AMD FX-4300": 55,
  "AMD FX-4350": 58,
  "AMD FX-6300": 85,
  "AMD FX-8120": 95,
  "AMD FX-8310": 100,
  "AMD FX-8320": 105,
  "AMD FX-8350": 110,
  "AMD FX-9590": 125,
  // AMD Phenom
  "AMD Phenom II X4 945": 55,
  "AMD Phenom 9850": 30,
  // AMD A-series
  "AMD A6-3650": 35,
  "AMD A8-7600": 45,
  // AMD Ryzen 3
  "AMD Ryzen 3 1200": 105,
  "AMD Ryzen 3 1300X": 115,
  "AMD Ryzen 3 2300X": 120,
  "AMD Ryzen 3 3100": 145,
  "AMD Ryzen 3 3200G": 140,
  "AMD Ryzen 3 3300X": 155,
  "AMD Ryzen 3 3300U": 65,
  // AMD Ryzen 5
  "AMD Ryzen 5 1400": 118,
  "AMD Ryzen 5 1500X": 130,
  "AMD Ryzen 5 1600": 150,
  "AMD Ryzen 5 1600X": 160,
  "AMD Ryzen 5 2400G": 140,
  "AMD Ryzen 5 2600": 170,
  "AMD Ryzen 5 2600X": 180,
  "AMD Ryzen 5 3600": 205,
  "AMD Ryzen 5 3600X": 215,
  "AMD Ryzen 5 5600X": 240,
  "AMD Ryzen 5 7600X": 290,
  // AMD Ryzen 7
  "AMD Ryzen 7 1800X": 195,
  "AMD Ryzen 7 2700X": 210,
  "AMD Ryzen 7 3700X": 240,
  "AMD Ryzen 7 5800X": 280,
  "AMD Ryzen 7 5800X3D": 300,
  "AMD Ryzen 7 7800X3D": 340,
  // AMD Ryzen 9
  "AMD Ryzen 9 3900X": 270,
  "AMD Ryzen 9 5900X": 310,
  "AMD Ryzen 9 5950X": 330,
  "AMD Ryzen 9 7950X": 370,
  "AMD Ryzen 9 7950X3D": 380,
  // Intel 12th-14th Gen
  "Intel Core i5-12400F": 250,
  "Intel Core i5-12600K": 280,
  "Intel Core i5-13600K": 310,
  "Intel Core i5-14600K": 320,
  "Intel Core i7-12700K": 310,
  "Intel Core i7-13700K": 340,
  "Intel Core i7-14700K": 355,
  "Intel Core i9-12900K": 345,
  "Intel Core i9-13900K": 380,
  "Intel Core i9-14900K": 395,
  // Athlon
  "AMD Athlon 200GE": 40,
};

// Performance index for common GPUs (relative to baseline GTX 1060 = 100)
export const gpuPerformanceIndex: Record<string, number> = {
  // Integrated / Low-end
  "Intel HD 3000": 5,
  "Intel HD Graphics 4000": 8,
  "Intel HD 4600": 10,
  "AMD Radeon Vega 8": 12,
  "AMD Radeon R5 200": 6,
  "AMD Radeon R5 series": 8,
  // NVIDIA GT / GTX 600-700
  "NVIDIA GeForce 9800 GT": 5,
  "NVIDIA GeForce 9800 GTX+": 6,
  "NVIDIA GeForce GT 630": 8,
  "NVIDIA GeForce GT 640": 10,
  "NVIDIA GeForce GT 730": 12,
  "NVIDIA GeForce GTS 450": 15,
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
  // AMD HD 5000-7000
  "AMD Radeon HD 4870": 10,
  "AMD Radeon HD 5770": 15,
  "AMD Radeon HD 5750": 12,
  "AMD Radeon HD 5870": 22,
  "AMD Radeon HD 6670": 8,
  "AMD Radeon HD 6870": 25,
  "AMD Radeon HD 6950": 30,
  "AMD Radeon HD 7730": 12,
  "AMD Radeon HD 7850": 35,
  "AMD Radeon HD 7870": 40,
  "AMD Radeon HD 7950": 50,
  "AMD Radeon HD 7970": 60,
  // AMD R7/R9 200-300
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
  // NVIDIA GTX 900
  "NVIDIA GeForce GTX 950": 45,
  "NVIDIA GeForce GTX 960": 55,
  "NVIDIA GeForce GTX 970": 80,
  "NVIDIA GeForce GTX 980": 90,
  "NVIDIA GeForce GTX 980 Ti": 100,
  // NVIDIA GTX 1000
  "NVIDIA GeForce GTX 1050": 45,
  "NVIDIA GeForce GTX 1050 Ti": 55,
  "NVIDIA GeForce GTX 1060": 100,
  "NVIDIA GeForce GTX 1070": 130,
  "NVIDIA GeForce GTX 1070 Ti": 140,
  "NVIDIA GeForce GTX 1080": 160,
  "NVIDIA GeForce GTX 1080 Ti": 180,
  // AMD RX 400-500
  "AMD Radeon RX 460": 40,
  "AMD Radeon RX 470": 65,
  "AMD Radeon RX 480": 80,
  "AMD Radeon RX 560": 45,
  "AMD Radeon RX 570": 70,
  "AMD Radeon RX 570X": 75,
  "AMD Radeon RX 580": 85,
  "AMD Radeon RX 590": 95,
  // AMD RX Vega
  "AMD Radeon RX Vega 56": 130,
  "AMD Radeon RX Vega 64": 145,
  // NVIDIA RTX 2000
  "NVIDIA GeForce RTX 2060": 145,
  "NVIDIA GeForce RTX 2060 Super": 160,
  "NVIDIA GeForce RTX 2070": 170,
  "NVIDIA GeForce RTX 2070 Super": 185,
  "NVIDIA GeForce RTX 2080": 200,
  "NVIDIA GeForce RTX 2080 Super": 215,
  "NVIDIA GeForce RTX 2080 Ti": 230,
  // AMD RX 5000
  "AMD Radeon RX 5500 XT": 90,
  "AMD Radeon RX 5600 XT": 130,
  "AMD Radeon RX 5700": 165,
  "AMD Radeon RX 5700 XT": 185,
  // NVIDIA RTX 3000
  "NVIDIA GeForce RTX 3050": 110,
  "NVIDIA GeForce RTX 3060": 170,
  "NVIDIA GeForce RTX 3060 Ti": 195,
  "NVIDIA GeForce RTX 3070": 220,
  "NVIDIA GeForce RTX 3070 Ti": 240,
  "NVIDIA GeForce RTX 3080": 270,
  "NVIDIA GeForce RTX 3080 Ti": 290,
  "NVIDIA GeForce RTX 3090": 310,
  "NVIDIA GeForce RTX 3090 Ti": 325,
  // AMD RX 6000
  "AMD Radeon RX 6400": 80,
  "AMD Radeon RX 6500 XT": 95,
  "AMD Radeon RX 6600": 155,
  "AMD Radeon RX 6600 XT": 175,
  "AMD Radeon RX 6700 XT": 210,
  "AMD Radeon RX 6750 XT": 225,
  "AMD Radeon RX 6800": 240,
  "AMD Radeon RX 6800 XT": 270,
  "AMD Radeon RX 6900 XT": 295,
  "AMD Radeon RX 6950 XT": 310,
  // NVIDIA RTX 4000
  "NVIDIA GeForce RTX 4060": 200,
  "NVIDIA GeForce RTX 4060 Ti": 230,
  "NVIDIA GeForce RTX 4070": 270,
  "NVIDIA GeForce RTX 4070 Super": 300,
  "NVIDIA GeForce RTX 4070 Ti": 310,
  "NVIDIA GeForce RTX 4070 Ti Super": 325,
  "NVIDIA GeForce RTX 4080": 345,
  "NVIDIA GeForce RTX 4080 Super": 360,
  "NVIDIA GeForce RTX 4090": 400,
  // AMD RX 7000
  "AMD Radeon RX 7600": 180,
  "AMD Radeon RX 7700 XT": 240,
  "AMD Radeon RX 7800 XT": 280,
  "AMD Radeon RX 7900 GRE": 310,
  "AMD Radeon RX 7900 XT": 340,
  "AMD Radeon RX 7900 XTX": 370,
  // NVIDIA RTX 5000
  "NVIDIA GeForce RTX 5070": 315,
  "NVIDIA GeForce RTX 5080": 380,
  "NVIDIA GeForce RTX 5090": 450,
  // Apple Silicon (estimated)
  "Apple M1": 60,
  "Apple M1 Pro": 85,
  "Apple M1 Max": 105,
  "Apple M2": 80,
  "Apple M2 Pro": 110,
  "Apple M2 Max": 130,
  "Apple M3": 100,
  "Apple M3 Pro": 135,
  "Apple M3 Max": 160,
};

export function lookupCpu(model: string | null): number | null {
  if (!model) return null;
  // Exact match
  if (cpuPerformanceIndex[model]) return cpuPerformanceIndex[model];
  // Try fuzzy: find a key containing the model string
  const keys = Object.keys(cpuPerformanceIndex);
  for (const key of keys) {
    if (key.toLowerCase().includes(model.toLowerCase())) {
      return cpuPerformanceIndex[key];
    }
  }
  // Try reverse: model contains a known key
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

// Map from short/common names to canonical names
export const cpuAliases: Record<string, string> = {
  "i5-2500k": "Intel Core i5-2500K",
  "i5-3570k": "Intel Core i5-3570K",
  "i5-4690": "Intel Core i5-4690",
  "i5-6600": "Intel Core i5-6600",
  "i5-8400": "Intel Core i5-8400",
  "i5-12400f": "Intel Core i5-12400F",
  "i7-4790": "Intel Core i7-4790",
  "i7-4790k": "Intel Core i7-4790K",
  "i7-6700k": "Intel Core i7-6700K",
  "i7-8700k": "Intel Core i7-8700K",
  "i7-12700k": "Intel Core i7-12700K",
  "i7-13700k": "Intel Core i7-13700K",
  "i9-12900k": "Intel Core i9-12900K",
  "i9-13900k": "Intel Core i9-13900K",
  "i9-14900k": "Intel Core i9-14900K",
  "ryzen 3 1200": "AMD Ryzen 3 1200",
  "ryzen 5 1600": "AMD Ryzen 5 1600",
  "ryzen 5 2600": "AMD Ryzen 5 2600",
  "ryzen 5 3600": "AMD Ryzen 5 3600",
  "ryzen 5 5600x": "AMD Ryzen 5 5600X",
  "ryzen 5 7600x": "AMD Ryzen 5 7600X",
  "ryzen 7 3700x": "AMD Ryzen 7 3700X",
  "ryzen 7 5800x": "AMD Ryzen 7 5800X",
  "ryzen 7 5800x3d": "AMD Ryzen 7 5800X3D",
  "ryzen 7 7800x3d": "AMD Ryzen 7 7800X3D",
  "ryzen 9 5900x": "AMD Ryzen 9 5900X",
  "ryzen 9 5950x": "AMD Ryzen 9 5950X",
  "ryzen 9 7950x": "AMD Ryzen 9 7950X",
};

export const gpuAliases: Record<string, string> = {
  // NVIDIA shortcuts
  "gtx 1060": "NVIDIA GeForce GTX 1060",
  "gtx 1070": "NVIDIA GeForce GTX 1070",
  "gtx 1080": "NVIDIA GeForce GTX 1080",
  "gtx 1080 ti": "NVIDIA GeForce GTX 1080 Ti",
  "rtx 2060": "NVIDIA GeForce RTX 2060",
  "rtx 2060 super": "NVIDIA GeForce RTX 2060 Super",
  "rtx 2070": "NVIDIA GeForce RTX 2070",
  "rtx 2080": "NVIDIA GeForce RTX 2080",
  "rtx 2080 ti": "NVIDIA GeForce RTX 2080 Ti",
  "rtx 3060": "NVIDIA GeForce RTX 3060",
  "rtx 3060 ti": "NVIDIA GeForce RTX 3060 Ti",
  "rtx 3070": "NVIDIA GeForce RTX 3070",
  "rtx 3070 ti": "NVIDIA GeForce RTX 3070 Ti",
  "rtx 3080": "NVIDIA GeForce RTX 3080",
  "rtx 3080 ti": "NVIDIA GeForce RTX 3080 Ti",
  "rtx 3090": "NVIDIA GeForce RTX 3090",
  "rtx 4060": "NVIDIA GeForce RTX 4060",
  "rtx 4060 ti": "NVIDIA GeForce RTX 4060 Ti",
  "rtx 4070": "NVIDIA GeForce RTX 4070",
  "rtx 4070 super": "NVIDIA GeForce RTX 4070 Super",
  "rtx 4070 ti": "NVIDIA GeForce RTX 4070 Ti",
  "rtx 4080": "NVIDIA GeForce RTX 4080",
  "rtx 4080 super": "NVIDIA GeForce RTX 4080 Super",
  "rtx 4090": "NVIDIA GeForce RTX 4090",
  "rtx 5070": "NVIDIA GeForce RTX 5070",
  "rtx 5080": "NVIDIA GeForce RTX 5080",
  "rtx 5090": "NVIDIA GeForce RTX 5090",
  // AMD shortcuts
  "rx 580": "AMD Radeon RX 580",
  "rx 5700 xt": "AMD Radeon RX 5700 XT",
  "rx 6600": "AMD Radeon RX 6600",
  "rx 6600 xt": "AMD Radeon RX 6600 XT",
  "rx 6700 xt": "AMD Radeon RX 6700 XT",
  "rx 6800": "AMD Radeon RX 6800",
  "rx 6800 xt": "AMD Radeon RX 6800 XT",
  "rx 6900 xt": "AMD Radeon RX 6900 XT",
  "rx 7800 xt": "AMD Radeon RX 7800 XT",
  "rx 7900 xt": "AMD Radeon RX 7900 XT",
  "rx 7900 xtx": "AMD Radeon RX 7900 XTX",
};
