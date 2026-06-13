import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.DATABASE_URL || "";

// Production: Neon PostgreSQL
const isPostgres =
  dbUrl.startsWith("postgres://") ||
  dbUrl.startsWith("postgresql://") ||
  dbUrl.startsWith("neon://");

export default isPostgres
  ? defineConfig({
      schema: "./src/lib/db/schema.pg.ts",
      out: "./drizzle",
      dialect: "postgresql",
      dbCredentials: { url: dbUrl },
    })
  : defineConfig({
      schema: "./src/lib/db/schema.ts",
      out: "./drizzle",
      dialect: "sqlite",
      dbCredentials: { url: "./gameready.db" },
    });
