import { defineConfig } from "drizzle-kit";

const tursoUrl = process.env.TURSO_URL || "";
const tursoToken = process.env.TURSO_AUTH_TOKEN || "";

const isTurso = !!(tursoUrl && tursoToken);

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: isTurso ? "turso" : "sqlite",
  dbCredentials: isTurso
    ? { url: tursoUrl, authToken: tursoToken }
    : { url: "./gameready.db" },
});
