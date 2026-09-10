import { Pool } from "pg";
const scope = globalThis as typeof globalThis & { operationsPool?: Pool };
export const operationsPool = (scope.operationsPool ||= new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
  connectionTimeoutMillis: 3000,
  idleTimeoutMillis: 10000,
  query_timeout: 5000,
  statement_timeout: 5000,
}));
// Idle connections can error after a database restart. Do not log connection strings.
if (operationsPool.listenerCount("error") === 0) operationsPool.on("error", () =>
  console.error("Operations database connection interrupted."),
);
