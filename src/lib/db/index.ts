import * as schemaSqlite from "./schema";
import * as schemaPg from "./schema.pg";

let db: ReturnType<typeof import("drizzle-orm/better-sqlite3").drizzle>;
let schema: typeof schemaSqlite;

const dbUrl = process.env.DATABASE_URL || "";

// ── Neon PostgreSQL (production / Vercel) ─────────────────────────────
if (dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://") || dbUrl.startsWith("neon://")) {
  const { neon } = require("@neondatabase/serverless");
  const { drizzle: drizzlePg } = require("drizzle-orm/neon-http");

  const sql = neon(dbUrl);
  db = drizzlePg(sql, { schema: schemaPg });
  schema = schemaPg as unknown as typeof schemaSqlite;
}
// ── SQLite (local development) ────────────────────────────────────────
else {
  const Database = require("better-sqlite3");
  const { drizzle: drizzleSqlite } = require("drizzle-orm/better-sqlite3");
  const path = require("path");

  const dbPath = dbUrl || path.join(process.cwd(), "gameready.db");
  const sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");

  db = drizzleSqlite(sqlite, { schema: schemaSqlite });
  schema = schemaSqlite;
}

export { db, schema };
