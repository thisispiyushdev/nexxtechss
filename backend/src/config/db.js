import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

if (process.env.DATABASE_URL) {
  console.log('✅ PostgreSQL connected');
} else {
  console.error('❌ CRITICAL: DATABASE_URL is missing from Environment Variables!');
}

export default pool;
