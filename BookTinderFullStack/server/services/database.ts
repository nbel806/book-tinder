import { createPool, type Pool } from "mysql2/promise";

const pool: Pool = createPool({
  host: process.env.DATABASE_ROUTE,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
