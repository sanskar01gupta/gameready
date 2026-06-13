import * as schemaSqlite from "./schema";

let db: ReturnType<typeof import("drizzle-orm/libsql").drizzle>;
let schema: typeof schemaSqlite;
let isRemote = false;

const tursoUrl = process.env.TURSO_URL || "";
const tursoToken = process.env.TURSO_AUTH_TOKEN || "";

// ── Turso / libSQL (production / Vercel) ──────────────────────────────
if (tursoUrl && tursoToken) {
  const { createClient } = require("@libsql/client");
  const { drizzle: drizzleLibsql } = require("drizzle-orm/libsql");

  const client = createClient({ url: tursoUrl, authToken: tursoToken });
  db = drizzleLibsql(client, { schema: schemaSqlite });
  schema = schemaSqlite;
  isRemote = true;
}
// ── SQLite (local development) ────────────────────────────────────────
else {
  try {
    const Database = require("better-sqlite3");
    const { drizzle: drizzleSqlite } = require("drizzle-orm/better-sqlite3");
    const path = require("path");

    const dbPath = path.join(process.cwd(), "gameready.db");
    const sqlite = new Database(dbPath);
    sqlite.pragma("journal_mode = WAL");
    sqlite.pragma("foreign_keys = ON");

    db = drizzleSqlite(sqlite, { schema: schemaSqlite });
    schema = schemaSqlite;
  } catch (err) {
    throw new Error(
      `SQLite is not available (this is normal on Vercel). ` +
        `Set TURSO_URL and TURSO_AUTH_TOKEN for production. ` +
        `Original error: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

export { db, schema, isRemote };
