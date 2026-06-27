const pg = require('pg');
require('dotenv').config();

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS active_channels (
      id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      badge_type VARCHAR(50) NOT NULL,
      protest_title VARCHAR(255) NOT NULL,
      description TEXT,
      status_text VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  // Also seed the original 3 values so the frontend doesn't break
  const res = await pool.query('SELECT count(*) FROM active_channels');
  if (parseInt(res.rows[0].count) === 0) {
    console.log('Seeding initial active channels...');
    const now = new Date().toISOString();
    await pool.query(`
      INSERT INTO active_channels (id, title, badge_type, protest_title, description, status_text)
      VALUES 
      ('ac-1', 'Boston Union Hub', 'EMERGENCY', 'Protest: U-Dorm Habitability', 'Water leak caused black mold growth. Eviction notice issued to 42 juniors.', 'Started: Oct 12, 2025 • Dispatched 2 mins ago'),
      ('ac-2', 'California State Coalition', 'REPRESENTATION', 'Protest: Tuition Surcharge Audit', 'Syllabus claims 40-hour physical lab access; actual lab has been locked down.', 'Started: Oct 10, 2025 • Drafting Brief 14 mins ago'),
      ('ac-3', 'Chicago Student Assembly', 'ADVOCACY', 'Protest: Mental Health Cutbacks', 'Administration plans to downsize counseling staff by 30%. Waitlists are at 5 weeks.', 'Started: Oct 08, 2025 • Reviewing Signatures 1 hr ago')
    `);
  }
  console.log('Done');
  process.exit(0);
}

run().catch(console.error);
