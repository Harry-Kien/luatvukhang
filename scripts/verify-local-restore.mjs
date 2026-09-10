import { Pool } from "pg";
import fs from "node:fs/promises";
import { createHash } from "node:crypto";
const source = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
const adminURL = new URL(process.env.DATABASE_URL);
adminURL.pathname = "/postgres";
const admin = new Pool({ connectionString: adminURL.href });
const restoreName = "law_restore_" + Date.now();
const quote = (s) => '"' + s.replaceAll('"', '""') + '"';
const canonical = (rows) =>
  rows
    .map((row) => JSON.stringify(row))
    .sort()
    .join("\n");
const client = await source.connect();
await client.query("BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY");
const names = await client.query(
  "SELECT schemaname,tablename FROM pg_tables WHERE schemaname IN ('public','operations') ORDER BY schemaname,tablename",
);
const snapshot = [];
for (const { schemaname, tablename } of names.rows) {
  const name = quote(schemaname) + "." + quote(tablename);
  const rows = (await client.query("SELECT * FROM " + name)).rows;
  const columns = (
    await client.query(
      "SELECT column_name,data_type FROM information_schema.columns WHERE table_schema=$1 AND table_name=$2",
      [schemaname, tablename],
    )
  ).rows;
  snapshot.push({ schemaname, tablename, rows, columns });
}
await client.query("COMMIT");
client.release();
await fs.mkdir(".local/backups", { recursive: true });
const backupPath = ".local/backups/" + restoreName + ".json";
await fs.writeFile(backupPath, JSON.stringify(snapshot));
await admin.query(
  "CREATE DATABASE " +
    quote(restoreName) +
    " ENCODING 'UTF8' LC_COLLATE 'C' LC_CTYPE 'C' TEMPLATE template0",
);
const targetURL = new URL(process.env.DATABASE_URL);
targetURL.pathname = "/" + restoreName;
const target = new Pool({ connectionString: targetURL.href, max: 1 });
const migrations = (await fs.readdir("src/migrations")).filter(name => /^\d+.*\.ts$/.test(name)).sort();
for (const name of migrations) {
 const migration = await fs.readFile("src/migrations/" + name, "utf8");
 const up = migration.split("export async function down")[0];
 const statements = [...up.matchAll(/db.execute\(sql\x60([\s\S]*?)\x60\)/g)];
 if (!statements.length) throw new Error("No migration statements: " + name);
 for (const [, sql] of statements) {
  if (sql.includes("$" + "{")) throw new Error("Dynamic migration SQL requires manual review");
  await target.query(sql);
 }
}
await target.query(await fs.readFile("scripts/init-rate-limit.sql", "utf8"));
const restore = await target.connect();
try {
  await restore.query("BEGIN");
  await restore.query("SET LOCAL session_replication_role = replica");
  for (const table of snapshot) {
    const name = quote(table.schemaname) + "." + quote(table.tablename);
    for (const row of table.rows) {
      const columns = Object.keys(row);
      const values = columns.map((c) =>
        table.columns
          .find((x) => x.column_name === c)
          ?.data_type?.startsWith("json")
          ? JSON.stringify(row[c])
          : row[c],
      );
      await restore.query(
        "INSERT INTO " +
          name +
          " (" +
          columns.map(quote).join(",") +
          ") VALUES (" +
          values.map((_, i) => "$" + (i + 1)).join(",") +
          ")",
        values,
      );
    }
    if (!table.columns.some((c) => c.column_name === "id")) continue;
    const seq = await restore
      .query("SELECT pg_get_serial_sequence($1,$2) AS seq", [name, "id"])
      .catch(() => ({ rows: [{ seq: null }] }));
    if (seq.rows[0]?.seq && table.rows.length)
      await restore.query(
        "SELECT setval($1, (SELECT MAX(id) FROM " + name + "), true)",
        [seq.rows[0].seq],
      );
  }
  await restore.query("COMMIT");
} catch (error) {
  await restore.query("ROLLBACK");
  throw error;
} finally {
  restore.release();
}
for (const table of snapshot) {
  const rows = (
    await target.query(
      "SELECT * FROM " + quote(table.schemaname) + "." + quote(table.tablename),
    )
  ).rows;
  if (canonical(rows) !== canonical(table.rows))
    throw new Error("Restored rows differ in " + table.tablename);
}
const report = {
  checkedAt: new Date().toISOString(),
  tables: snapshot.length,
  rows: snapshot.reduce((s, t) => s + t.rows.length, 0),
  result: "All restored rows match the consistent snapshot",
  restoreDatabase: restoreName,
  backupSha256: createHash("sha256")
    .update(await fs.readFile(backupPath))
    .digest("hex"),
  limitations:
    "Local logical data restore against all ordered migrations. Media, production storage, encryption, retention and disaster recovery infrastructure require separate acceptance.",
};
await fs.mkdir("docs", { recursive: true });
await fs.writeFile("docs/restore-test.json", JSON.stringify(report, null, 2));
console.log(
  JSON.stringify({
    tables: report.tables,
    rows: report.rows,
    result: report.result,
  }),
);
await source.end();
await admin.end();
await target.end();
