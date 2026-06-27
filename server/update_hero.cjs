const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
async function run() {
  await pool.query('UPDATE site_content SET value = $1 WHERE id = $2', ['Your Campus.\nYour Voice.', 'home_hero_title']);
  await pool.query('UPDATE site_content SET value = $1 WHERE id = $2', ['EMPOWERING STUDENTS', 'home_hero_label']);
  console.log('done');
  process.exit(0);
}
run();
