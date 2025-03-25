import { sql } from "bun";

export async function createCounter() {
  await sql`CREATE TABLE IF NOT EXISTS counter (key INTEGER PRIMARY KEY, count INTEGER DEFAULT 0)`;
  await sql`INSERT INTO counter (key, count) VALUES (1, 0) ON CONFLICT (key) DO NOTHING`;
}

export async function getCount() {
  const [{ count }] = await sql`SELECT count FROM counter WHERE key = 1`;

  return count;
}

export async function incrementCount() {
  const [{ count }] =
    await sql`INSERT INTO counter (key, count) VALUES (1, 1) ON CONFLICT (key) DO UPDATE SET count = count + 1 RETURNING count`;

  return count;
}

export async function resetCount() {
  await sql`DELETE FROM counter`;
}
