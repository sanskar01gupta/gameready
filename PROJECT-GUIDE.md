# 🎮 GameReady — Complete Project Guide

## What It Does

**GameReady** answers one question: *"Can my PC run this game?"*

You search for a game, enter your hardware specs (or auto-detect them), and instantly get:

- A **compatibility score** (0–100) with clear verdicts
- **FPS estimates** for every resolution and quality setting
- **Bottleneck analysis** — which component is holding you back
- **Upgrade recommendations** with expected improvement percentages
- A **shareable report** link you can send to anyone

---

## Project Map (52 source files)

```
gameready/
│
├── 📄 drizzle.config.ts          Database ORM configuration (SQLite)
├── 📄 next.config.ts             Next.js config (image domains, etc.)
├── 📄 package.json               Dependencies & scripts
│
├── 🗄️  src/lib/db/                DATABASE LAYER
│   ├── schema.ts                 Drizzle ORM — 4 tables defined
│   ├── index.ts                  DB client (SQLite via better-sqlite3)
│   ├── queries.ts                All database queries (12 functions)
│   ├── seed.ts                   Seed runner — populates empty DB
│   └── seed-data/games.ts        58 games with real system requirements
│
├── 🧠 src/lib/scoring/            COMPATIBILITY ENGINE (pure logic)
│   ├── algorithm.ts              MAIN ENTRY — weights & orchestration
│   ├── cpu.ts                    CPU score: performance index ratio
│   ├── gpu.ts                    GPU score: perf index + VRAM penalty
│   ├── ram.ts                    RAM score: tiered GB comparison
│   ├── fps-estimator.ts          FPS grid: 3 resolutions × 4 qualities
│   ├── bottlenecks.ts            Finds weakest component
│   └── upgrade-paths.ts          Suggests upgrades with % improvement
│
├── 🔍 src/lib/detection/          HARDWARE AUTO-DETECTION
│   ├── browser.ts                Browser APIs: WebGL, navigator.*
│   ├── gpu-parser.ts             Parses raw GPU strings (ANGLE, etc.)
│   ├── normalize.ts              Maps detected → canonical names
│   └── hardware-db.ts            260+ CPUs, 200+ GPUs performance index
│
├── 🛠️  src/lib/utils/              UTILITIES
│   ├── cn.ts                     Tailwind class merge (clsx + twMerge)
│   └── rate-limit.ts             In-memory sliding window rate limiter
│
├── ✅ src/lib/validation/         INPUT VALIDATION
│   └── analyze-schema.ts         Zod schemas for API endpoints
│
├── 📝 src/types/                  TYPESCRIPT TYPES
│   ├── game.ts                   Game, GameRequirement, etc.
│   ├── analysis.ts               CompatibilityResult, FpsMatrix, etc.
│   └── report.ts                 Report, fpsFromReport helper
│
├── 🌐 src/app/api/                BACKEND API (Next.js Route Handlers)
│   ├── games/route.ts            GET — search & list games
│   ├── games/[slug]/route.ts     GET — single game + requirements
│   ├── analyze/route.ts          POST — run compatibility engine
│   ├── reports/route.ts          POST — create report, GET — fetch report
│   └── popular-searches/route.ts GET — top 10 trending
│
├── 📱 src/app/                    FRONTEND PAGES
│   ├── layout.tsx                Root layout (header, footer, theme, SEO)
│   ├── page.tsx                  LANDING PAGE (hero, trending, FAQ, CTA)
│   ├── globals.css               Dark gaming theme (CSS variables)
│   ├── sitemap.ts                Dynamic sitemap (all game pages)
│   ├── robots.ts                 Robots config
│   ├── games/page.tsx            BROWSE ALL GAMES (grid)
│   ├── games/[slug]/page.tsx     GAME DETAIL (requirements + checker)
│   ├── games/[slug]/analyze/     ANALYSIS RESULTS (gauge, FPS, etc.)
│   └── report/[id]/page.tsx      SHAREABLE REPORT (public, no-auth)
│
└── 🧩 src/components/             REACT COMPONENTS
    ├── layout/
    │   ├── header.tsx            Sticky header, search, mobile nav
    │   └── footer.tsx            Links, disclaimers
    ├── home/
    │   ├── hero-section.tsx      Headline, search bar, how-it-works
    │   ├── trending-games.tsx    Server component — popular games grid
    │   └── faq.tsx               Accordion FAQ (client component)
    ├── games/
    │   ├── game-card.tsx         Game cover card with hover effect
    │   ├── game-search.tsx       Autocomplete search (debounced, keyboard nav)
    │   └── requirements-table.tsx Min/Rec/Ultra requirements cards
    ├── detection/
    │   └── hardware-form.tsx     CPU/GPU comboboxes + RAM selector + AUTO-DETECT
    ├── analysis/
    │   ├── compatibility-gauge.tsx  SVG circle gauge (animated, accessible)
    │   ├── requirement-bars.tsx     Per-component progress bars
    │   ├── fps-estimator.tsx        Resolution tabs + quality grid
    │   ├── bottleneck-finder.tsx    Bottleneck card with severity
    │   └── upgrade-suggestions.tsx  Upgrade cards with improvement %
    └── report/
        └── share-button.tsx      Share → creates report → copies URL
```

---

## How Data Flows Through the System

### 1. User lands on homepage
```
Browser → GET / → HeroSection + TrendingGames + FAQ
TrendingGames → fetch /api/popular-searches → DB query → top 10 games
```

### 2. User searches for a game
```
GameSearch component:
  User types "cyber" → 150ms debounce → fetch /api/games?search=cyber
  → searchGames(query) → SQL: WHERE title LIKE '%cyber%'
  → Returns list with cover images, genres → Show dropdown
```

### 3. User clicks a game → Game detail page
```
GET /games/cyberpunk-2077
  → getGameBySlug("cyberpunk-2077")
  → Joins games + game_requirements tables
  → Returns game info + minimum + recommended requirements
  → Renders RequirementsTable (3 cards: Min / Rec / Ultra)
  → Renders HardwareForm (CPU/GPU/RAM pickers)
```

### 4. User fills hardware + clicks "Check Compatibility"
```
HardwareForm → POST /api/analyze
  Body: { gameSlug, cpu: "Intel Core i7-12700K", gpu: "NVIDIA GeForce RTX 3060", ramGb: 16 }

API /api/analyze:
  1. Rate limit check (30 req/min per IP)
  2. Zod validation
  3. getGameBySlug() → fetch game requirements from DB
  4. compatibility() → scoring engine:

     SCORE CPU:
       lookupCpu("Intel Core i7-12700K") → 310 (perf index)
       lookupCpu("Intel Core i7-4790") → 175 (game's min req)
       ratio = 310/175 = 1.77 → ratio ≥ 1.5 → score = 100

     SCORE GPU:
       lookupGpu("NVIDIA GeForce RTX 3060") → 170
       lookupGpu("NVIDIA GeForce RTX 2060 Super") → 160
       ratio = 170/160 = 1.06 → ratio ≥ 1.0 → score = 80

     SCORE RAM:
       game requires 12 GB, user has 16 GB
       16 ≥ 12 → score = 75

     WEIGHTED OVERALL:
       CPU 30% × 100 = 30.0
       GPU 35% × 80  = 28.0
       RAM 20% × 75  = 15.0
       Storage 10% × 100 = 10.0
       OS 5% × 100    = 5.0
       Total = 88 → "Good" tier

  5. estimateFps() → builds 12-cell grid (3 resolutions × 4 qualities)
  6. findBottleneck() → RAM is weakest component → "minor bottleneck"
  7. suggestUpgrades() → CPU/GPU already fine, RAM could go to 16GB

  Response: { overall: 88, tier: "good", scores: {...}, fps: {...}, ... }
```

### 5. Analysis page renders
```
sessionStorage reads result → CompatibilityGauge (animated SVG, 88/100)
  → RequirementBars (5 colored progress bars)
  → FpsEstimator (tabbed: 1080p | 1440p | 4K, each with Low/Med/High/Ultra)
  → BottleneckFinder (RAM card, minor severity)
  → UpgradeSuggestions (if any components < 70)
  → ShareButton (optional)
```

### 6. User clicks "Share Report"
```
ShareButton → POST /api/reports
  Body: { gameSlug, cpu, gpu, ramGb, ... }

API /api/reports:
  → Re-runs compatibility engine (same as analyze)
  → Generates nanoid(12) → shareSlug: "abc123xyz456"
  → Inserts into reports table
  → Returns { shareUrl: "/report/abc123xyz456" }
  → Copies URL to clipboard
```

### 7. Someone opens shared report
```
GET /report/abc123xyz456
  → getReportBySlug("abc123xyz456")
  → Gets report from DB + joins game info
  → Increments viewer_count
  → Renders same gauge + bars + FPS grid (read-only)
  → "Check this game on your own PC" CTA at bottom
```

---

## Database Schema (4 Tables)

```
┌─────────────────────────────────────────────────────┐
│ games                                               │
├─────────────────────────────────────────────────────┤
│ id (UUID, PK)                                       │
│ slug (UNIQUE)          ← "cyberpunk-2077"           │
│ title                  ← "Cyberpunk 2077"           │
│ developer, publisher                                │
│ release_date                                        │
│ genres (JSON array)    ← ["RPG", "Open World"]      │
│ description                                         │
│ cover_image_url                                     │
│ steam_id                                            │
└─────────────────────────────────────────────────────┘
                        │
                        │ 1-to-many
                        ▼
┌─────────────────────────────────────────────────────┐
│ game_requirements                                   │
├─────────────────────────────────────────────────────┤
│ id (UUID, PK)                                       │
│ game_id (FK → games.id, CASCADE)                    │
│ tier (ENUM: 'minimum' | 'recommended' | 'ultra')    │
│ cpu_min, cpu_recommended                            │
│ gpu_min, gpu_recommended                            │
│ gpu_vram_min_gb, gpu_vram_recommended_gb            │
│ ram_min_gb, ram_recommended_gb                      │
│ storage_min_gb, storage_type                        │
│ os_required, directx_version                        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ reports                                             │
├─────────────────────────────────────────────────────┤
│ id (UUID, PK)                                       │
│ game_id (FK → games.id, CASCADE)                    │
│ share_slug (UNIQUE)     ← "abc123xyz456"            │
│ cpu_normalized, gpu_normalized, ram_gb              │
│ detection_method (auto|manual|mixed)                │
│ overall_score, cpu_score, gpu_score, ram_score...   │
│ fps_1080p_low, fps_1080p_medium, ... (12 columns)  │
│ bottleneck_component, bottleneck_severity           │
│ viewer_count, created_at, last_viewed               │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ popular_searches                                    │
├─────────────────────────────────────────────────────┤
│ id, game_id (FK, UNIQUE), search_count              │
│ last_searched_at                                    │
└─────────────────────────────────────────────────────┘
```

---

## Scoring Algorithm (the heart of the app)

### Performance Index
Every CPU and GPU in our database has a **performance index number** relative to a baseline:

- **CPU baseline**: Intel Core i5-2500K = 100
- **GPU baseline**: NVIDIA GeForce GTX 1060 = 100

Examples:
| CPU | Index | GPU | Index |
|-----|-------|-----|-------|
| Intel Core i3-2100 | 40 | Intel HD 3000 | 5 |
| Intel Core i5-8400 | 165 | GTX 1060 | 100 |
| Ryzen 5 5600X | 240 | RTX 3060 | 170 |
| Ryzen 7 7800X3D | 340 | RTX 4090 | 400 |

### Scoring Formula
```
For each component:
  userPerf = performanceIndex[userHardware]
  reqPerf  = performanceIndex[gameRequirement]
  ratio    = userPerf / reqPerf

  ratio ≥ 1.5  → 100  (Excellent)
  ratio ≥ 1.2  → 90
  ratio ≥ 1.0  → 80
  ratio ≥ 0.85 → 65
  ratio ≥ 0.7  → 50   (Borderline)
  ratio ≥ 0.55 → 35
  ratio ≥ 0.4  → 20
  else         → 10   (Insufficient)

Overall = (CPU × 0.30) + (GPU × 0.35) + (RAM × 0.20) + (Storage × 0.10) + (OS × 0.05)

Weak-link penalty: If any component < 30, overall is capped at (that score + 25)
```

### Result Tiers
| Score | Tier | Meaning |
|-------|------|---------|
| 90-100 | Excellent | Exceeds recommended, runs on Ultra |
| 70-89 | Good | Meets recommended, runs on High |
| 50-69 | Fair | Meets minimum, runs on Low-Medium |
| 30-49 | Poor | Below minimum, may struggle |
| 0-29 | Insufficient | Won't run well |

### FPS Estimation Formula
```
baseFps = 30 (at minimum spec, 1080p Low)

For each resolution × quality:
  fps = 30 × gpuRatio × resolutionFactor × qualityFactor × cpuBottleneck × vramPenalty

Resolution factors:  1080p=1.0,  1440p=0.6,  4K=0.35
Quality factors:     Low=1.0,    Medium=0.75, High=0.55, Ultra=0.35
```

---

## Auto-Detection: What Browsers Can Reveal

### GPU Detection (most accurate)
```javascript
// 1. Create hidden canvas
canvas = document.createElement('canvas')
gl = canvas.getContext('webgl2')

// 2. Get debug extension
ext = gl.getExtension('WEBGL_debug_renderer_info')

// 3. Read GPU string
renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
// → "ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0, D3D11)"

// 4. Parse it
parseGpuString(renderer)
// → { vendor: "NVIDIA", model: "NVIDIA GeForce RTX 3060" }

// 5. Match against our database
lookupGpu("NVIDIA GeForce RTX 3060") → 170
```

### CPU Detection (inferred, not exact)
```javascript
cores = navigator.hardwareConcurrency  // → 20 (logical processors)

// Estimate based on core count:
20+ cores → Intel Core i7-13700K (confidence: LOW)
// Browsers CANNOT reveal exact CPU model — users should verify
```

### RAM Detection (Chromium only)
```javascript
ram = navigator.deviceMemory  // → 16 (GB, available in Chrome/Edge)
// Only returns: 0.25, 0.5, 1, 2, 4, 8, 16, 32
```

---

## API Reference

### `GET /api/games?search=<term>&page=1&limit=20`
Search or list games. Fuzzy LIKE matching on title.
```json
{
  "games": [{ "id": "...", "slug": "cyberpunk-2077", "title": "Cyberpunk 2077", ... }],
  "total": 58,
  "page": 1,
  "totalPages": 3,
  "query": "cyber"
}
```

### `GET /api/games/[slug]`
Get a single game with all requirement tiers.
```json
{
  "id": "...",
  "slug": "cyberpunk-2077",
  "title": "Cyberpunk 2077",
  "requirements": {
    "minimum": { "cpuMin": "Intel Core i5-3570K", "gpuMin": "NVIDIA GeForce GTX 780", ... },
    "recommended": { "cpuMin": "Intel Core i7-4790", "gpuMin": "NVIDIA GeForce RTX 2060 Super", ... },
    "ultra": null
  }
}
```

### `POST /api/analyze`
The core endpoint. Takes your hardware, returns compatibility report.
```json
// Request
{ "gameSlug": "cyberpunk-2077", "cpu": "Intel Core i7-12700K", "gpu": "NVIDIA GeForce RTX 3060", "ramGb": 16 }

// Response
{
  "game": { "slug": "cyberpunk-2077", "title": "Cyberpunk 2077" },
  "hardware": { "cpu": "Intel Core i7-12700K", "gpu": "NVIDIA GeForce RTX 3060", "ramGb": 16 },
  "overall": 88,
  "tier": "good",
  "matchedTier": "recommended",
  "scores": { "cpu": 100, "gpu": 80, "ram": 75, "storage": 100, "os": 100 },
  "fps": {
    "1080p": { "low": { "avg": 50, "label": "Playable" }, "medium": { "avg": 40, "label": "Playable" }, ... },
    "1440p": { ... },
    "4k": { ... }
  },
  "bottleneck": { "component": "gpu", "severity": "minor", "description": "..." },
  "upgrades": []
}
```

### `POST /api/reports` → `GET /api/reports?slug=<slug>`
Create and retrieve shareable reports.
```json
// POST response
{ "shareUrl": "/report/abc123xyz456", "slug": "abc123xyz456" }

// GET /api/reports?slug=abc123xyz456 → full report with game info
```

### `GET /api/popular-searches`
Top 10 most-searched games (updated on every analysis).

---

## Component Communication

```
┌──────────────────────────────────────────────────────┐
│ LAYOUT (layout.tsx)                                  │
│ ┌──────────────────────────────────────────────────┐ │
│ │ HEADER                                            │ │
│ │  Logo │ Nav Links │ GameSearch (autocomplete)     │ │
│ └──────────────────────────────────────────────────┘ │
│                                                      │
│ ┌──────────────────────────────────────────────────┐ │
│ │ PAGE (varies by route)                            │ │
│ │                                                    │ │
│ │  HOME PAGE:                                        │ │
│ │   HeroSection → has its own GameSearch             │ │
│ │   TrendingGames → fetch /api/popular-searches      │ │
│ │   FAQ (accordion, client state)                    │ │
│ │                                                    │ │
│ │  GAME DETAIL PAGE:                                 │ │
│ │   RequirementsTable (server, reads DB directly)    │ │
│ │   HardwareForm (client)                            │ │
│ │     ├── Detect button → browser.ts → normalize.ts  │ │
│ │     ├── CPU combobox → 260+ CPU options            │ │
│ │     ├── GPU combobox → 200+ GPU options            │ │
│ │     ├── RAM selector → 4/8/16/32/64 GB             │ │
│ │     └── Submit → POST /api/analyze → navigate      │ │
│ │                                                    │ │
│ │  ANALYSIS PAGE:                                    │ │
│ │   CompatibilityGauge (SVG circle, animated)        │ │
│ │   RequirementBars (5 progress bars)                │ │
│ │   FpsEstimator (tabs + grid)                       │ │
│ │   BottleneckFinder (card)                          │ │
│ │   UpgradeSuggestions (cards)                       │ │
│ │   ShareButton → POST /api/reports → copy URL       │ │
│ │                                                    │ │
│ │  REPORT PAGE:                                      │ │
│ │   Same components as analysis, but read-only       │ │
│ │   Data from DB, not sessionStorage                 │ │
│ └──────────────────────────────────────────────────┘ │
│                                                      │
│ ┌──────────────────────────────────────────────────┐ │
│ │ FOOTER (links, disclaimers)                       │ │
│ └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

---

## Design System

```
Colors (dark gaming theme):
  Background:  #0F1117    Surface:      #1A1D29
  SurfaceHover:#242836    Border:       #2A2D3A
  Text:        #FFFFFF    Muted:        #B4B7C9
  MutedFg:     #8B8FA3    Accent:       #6366F1
  Success:     #22C55E    Warning:      #F59E0B
  Danger:      #EF4444

Typography: Geist Sans (system fallback)
Border Radius: 12px (rounded-xl)
Spacing: 4, 8, 12, 16, 24, 32, 48

Mobile breakpoints:
  < 768px:  Single column, horizontal game cards, hamburger menu
  ≥ 768px:  Multi-column grids, side-by-side layouts, full nav
```

---

## Running the Project

```bash
cd "C:\Users\SANSKAR GUPTA\gameready"

npm run dev         # Start dev server → http://localhost:3000
npm run build       # Production build
npm run db:seed     # Re-populate database with 58 games
npm run db:studio   # Open Drizzle Studio (DB GUI)

# To switch from SQLite to Neon PostgreSQL for production:
#   1. Change drizzle.config.ts dialect to "postgresql"
#   2. Set DATABASE_URL env var to your Neon connection string
#   3. Update src/lib/db/index.ts to use neon-http driver
#   (Schema is cross-compatible — no migration needed)
```

---

## Key Design Decisions

1. **Answer First**: The compatibility gauge and verdict are the first thing you see — detailed breakdowns come after.

2. **Human Language**: "Your graphics card is powerful enough" — never "RTX 3060 exceeds minimum threshold by 6.25%."

3. **No Auth**: Shareable reports use random 12-character slugs (nanoid). No accounts, no passwords, no sessions.

4. **SQLite for Dev, PostgreSQL for Prod**: Drizzle ORM makes the switch trivial — same schema, just change the driver.

5. **Server Components by Default**: Game pages, requirements tables, trending games — all rendered on the server. Only interactive elements (search, form, detection) are client components.

6. **CPU Detection is Honest**: The browser can't reveal your exact CPU model. We estimate from core count and clearly mark it as "low confidence" — the user should verify.

7. **Rate Limiting**: In-memory sliding window (30 req/min per IP). Sufficient for launch scale. Swap to Vercel KV for multi-instance production.
