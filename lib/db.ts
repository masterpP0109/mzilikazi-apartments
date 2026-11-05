// Neon Postgres client for Mzilikazi Apartments
let poolInstance: any = null;

export async function getDbPool(): Promise<any | null> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!poolInstance) {
    try {
      // Dynamic import so lack of local pg installation doesn't break build
      const { Pool } = await import("pg");
      poolInstance = new Pool({
        connectionString,
        ssl: {
          rejectUnauthorized: false,
        },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      });
    } catch {
      // Falls back to Neon HTTP API below
      return null;
    }
  }
  return poolInstance;
}

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  // 1. Try standard connection pool if pg is available
  try {
    const pool = await getDbPool();
    if (pool) {
      const result = await pool.query(text, params);
      return (result.rows || []) as T[];
    }
  } catch (poolErr) {
    console.warn("Neon pool query failed, attempting HTTP fallback:", poolErr);
  }

  // 2. Direct HTTP Fallback via Neon SQL HTTP endpoint (zero dependency)
  const parsed = new URL(
    connectionString.replace("postgresql://", "https://").replace("postgres://", "https://")
  );
  const host = parsed.host;
  const httpUrl = `https://${host}/sql`;

  const res = await fetch(httpUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Neon-Connection-String": connectionString,
    },
    body: JSON.stringify({
      query: text,
      params: params || [],
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Neon HTTP query error: ${res.status} ${errText}`);
  }

  const json = await res.json();
  return (json.rows || []) as T[];
}

export async function ensureTablesExist(): Promise<void> {
  const sql = `
    CREATE TABLE IF NOT EXISTS enquiries (
      id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      created_at           TIMESTAMPTZ DEFAULT now(),
      name                 TEXT NOT NULL,
      email                TEXT NOT NULL,
      phone                TEXT,
      arrival_date         DATE,
      departure_date       DATE,
      guests               INTEGER NOT NULL,
      message              TEXT,
      apartment_preference TEXT,
      status               TEXT DEFAULT 'new' CHECK (status IN ('new', 'responded', 'booked', 'closed')),
      source               TEXT DEFAULT 'website'
    );

    CREATE TABLE IF NOT EXISTS apartments (
      id     UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      slug   TEXT UNIQUE NOT NULL,
      name   TEXT NOT NULL,
      active BOOLEAN DEFAULT true
    );

    CREATE INDEX IF NOT EXISTS enquiries_created_idx ON enquiries (created_at DESC);
  `;
  try {
    await query(sql);
  } catch (e) {
    console.error("Could not verify tables:", e);
  }
}
