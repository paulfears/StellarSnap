// src/lib/db.js (or similar)
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.ALLOYDB_HOST,
  port: process.env.ALLOYDB_PORT || 5432, 
  user: process.env.ALLOYDB_USER,
  password: process.env.ALLOYDB_PASSWORD,
  database: process.env.ALLOYDB_DATABASE,
  ssl: { // Only if SSL is required
    rejectUnauthorized: false, // Consider proper certificate verification in production
  },
  max: 20, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait before timing out when connecting a new client
});

// Query function
export async function query(text:string, params:any) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
}