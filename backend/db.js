import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool, types } = pg;

// Return DATE columns (OID 1082) as plain YYYY-MM-DD strings
types.setTypeParser(1082, (val) => val);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("Connected to Neon Postgres");
});

pool.on("error", (err) => {
  console.error("Unexpected Postgres error:", err);
  process.exit(-1);
});

export default pool;