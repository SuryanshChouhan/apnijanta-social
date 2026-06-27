const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  try {
    await pool.query(`
      ALTER TABLE support_requests 
      ADD COLUMN IF NOT EXISTS contact_number VARCHAR,
      ADD COLUMN IF NOT EXISTS address VARCHAR;
    `);
    console.log("Columns added successfully");
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
}
run();
