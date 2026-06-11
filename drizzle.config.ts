import { defineConfig } from "drizzle-kit";

// Local development: SQLite
// For production with Neon PostgreSQL:
//   1. Set DATABASE_URL=postgresql://user:pass@host/db
//   2. Change dialect to "postgresql"
//   3. Change schema to "./src/lib/db/schema.pg.ts"
export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "./gameready.db",
  },
});
