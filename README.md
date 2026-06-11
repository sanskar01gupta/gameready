# 🎮 GameReady

**Know instantly if your PC can run any game.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-FF5A1F)](https://orm.drizzle.team)

Get instant compatibility reports, FPS estimates, bottleneck analysis, and upgrade suggestions for any PC game. Fast, free, no signup required.

## Features

- 🔍 **Instant game search** — debounced autocomplete across 58+ games
- 🖥️ **Auto-detect hardware** — WebGL GPU detection, CPU core count, RAM
- 📊 **Compatibility score** — weighted CPU/GPU/RAM scoring (0–100)
- 🎯 **FPS estimates** — 1080p/1440p/4K across Low/Medium/High/Ultra
- ⚠️ **Bottleneck analysis** — identifies your weakest component
- 🔧 **Upgrade suggestions** — with expected improvement percentages
- 🔗 **Shareable reports** — unique URLs, no account needed
- 📱 **Mobile responsive** — works great on phones
- 🌙 **Dark gaming theme** — designed for gamers

## Quick Start

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/gameready.git
cd gameready

# Install dependencies
npm install

# Seed the database (58 games with real system requirements)
npm run db:seed

# Start development
npm run dev
# → http://localhost:3000
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Database (local) | SQLite via better-sqlite3 + Drizzle ORM |
| Database (prod) | Neon PostgreSQL via @neondatabase/serverless |
| Animation | Framer Motion |
| Icons | Lucide React |
| Validation | Zod |

## Deploy to Vercel

### 1. Create a Neon PostgreSQL database

Go to [console.neon.tech](https://console.neon.tech) → Create project → Copy the connection string.

### 2. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/gameready)

Or manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard:
# DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/gameready?sslmode=require
```

### 3. Set up the database on Vercel

```bash
# After setting DATABASE_URL in Vercel dashboard:
vercel env pull .env.local
npm run db:push   # Creates tables in Neon
npm run db:seed   # Populates with games
```

## Project Structure

```
src/
├── app/                # Next.js App Router pages & API
│   ├── api/            # Route handlers
│   │   ├── analyze/    # POST — compatibility engine
│   │   ├── games/      # GET — search & list
│   │   └── reports/    # POST/GET — shareable reports
│   ├── games/[slug]/   # Game detail + analyze pages
│   └── report/[id]/    # Shareable report page
├── components/         # React components
│   ├── analysis/       # Gauge, bars, FPS table, bottleneck
│   ├── detection/      # Hardware form with auto-detect
│   ├── games/          # Search, card, requirements table
│   ├── home/           # Hero, trending, FAQ
│   └── layout/         # Header, footer
├── lib/
│   ├── db/             # Drizzle schema, queries, seed data
│   ├── scoring/        # Compatibility algorithm, FPS estimator
│   ├── detection/      # GPU parser, normalizer, hardware DB
│   └── utils/          # Rate limiter, class utils
├── types/              # TypeScript type definitions
└── hooks/              # React hooks
```

## Scoring Algorithm

```
Overall Score = (CPU × 0.30) + (GPU × 0.35) + (RAM × 0.20) + (Storage × 0.10) + (OS × 0.05)

Each component is scored 0-100 based on:
  userPerformanceIndex / gameRequirementPerformanceIndex

Result tiers: Excellent (90+), Good (70-89), Fair (50-69), Poor (30-49), Insufficient (0-29)
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Production only | Neon PostgreSQL connection string |
| `NEXT_PUBLIC_BASE_URL` | Optional | Base URL for API calls (defaults to relative) |

## License

MIT
