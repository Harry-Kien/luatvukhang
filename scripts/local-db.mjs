import path from 'node:path';
import EmbeddedPostgres from "embedded-postgres";
import fs from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { Pool } from "pg";
const dir = path.resolve(".local/postgres");
await fs.mkdir(".local", { recursive: true });
let secret;
try {
  secret = (await fs.readFile(".local/db-password", "utf8")).trim();
} catch {
  secret = randomBytes(24).toString("hex");
  await fs.writeFile(".local/db-password", secret);
}
const db = new EmbeddedPostgres({
  databaseDir: dir,
  user: "law",
  password: secret,
  port: 5434,
  persistent: true,
  initdbFlags: ["--encoding=UTF8", "--locale=C"],
  authMethod: "scram-sha-256",
  postgresFlags: ["-h", "127.0.0.1"],
  onLog: () => {},
  onError: (e) => console.error(String(e)),
});
try {
  await fs.access(dir + "/PG_VERSION");
} catch {
  await db.initialise();
}
await db.start();
const admin = db.getPgClient();
await admin.connect();
const found = await admin.query(
  "SELECT 1 FROM pg_database WHERE datname='law_utf8'",
);
if (!found.rowCount)
  await admin.query(
    "CREATE DATABASE law_utf8 ENCODING 'UTF8' LC_COLLATE 'C' LC_CTYPE 'C' TEMPLATE template0",
  );
await admin.end();
const url = "postgresql://law:" + secret + "@127.0.0.1:5434/law_utf8";
let env = await fs.readFile(".env", "utf8");
env = env.replace(/^DATABASE_URL=.*\r?\n?/gm, "");
await fs.writeFile(".env", env + "\nDATABASE_URL=" + url + "\n");
const pool = new Pool({ connectionString: url });
await pool.query(await fs.readFile("scripts/init-rate-limit.sql", "utf8"));
await pool.end();
console.log("Local PostgreSQL ready on 127.0.0.1:5434");
process.on("SIGINT", async () => {
  await db.stop();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await db.stop();
  process.exit(0);
});
setInterval(() => {}, 60000);
