const { Pool } = require('pg');
require('dotenv').config({ path: 'apps/api/.env' });

async function test() {
  console.log('Testing connection to:', process.env.DATABASE_URL);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connection successful!', res.rows[0]);
  } catch (err) {
    console.error('Connection failed!', err);
  } finally {
    await pool.end();
  }
}

test();
