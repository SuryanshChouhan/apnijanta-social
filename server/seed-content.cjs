require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const defaultContent = [
  {
    id: 'home_hero_label',
    value: 'APNI JANTA STUDENT UNION',
    section: 'Homepage Hero'
  },
  {
    id: 'home_hero_title',
    value: 'We Expose Scams. We Reclaim Your Fees. We Defend Your Rights.',
    section: 'Homepage Hero'
  },
  {
    id: 'home_hero_desc',
    value: 'The only anonymous student coalition fighting back against capitation fees, degree extortion, and abusive college administrations across India.',
    section: 'Homepage Hero'
  },
  {
    id: 'home_rights_title',
    value: 'Know Your Rights.',
    section: 'Homepage Rights Section'
  },
  {
    id: 'home_rights_desc',
    value: "We've built instant action playbooks for the most common issues faced by students in Indian engineering and medical colleges. Choose your issue below to get started.",
    section: 'Homepage Rights Section'
  }
];

async function seedContent() {
  for (const item of defaultContent) {
    try {
      await pool.query(
        `INSERT INTO site_content (id, value, section, updated_at) 
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (id) DO NOTHING`,
        [item.id, item.value, item.section, new Date().toISOString()]
      );
      console.log('Seeded content:', item.id);
    } catch (e) {
      console.error('Error seeding content', item.id, e);
    }
  }
  pool.end();
}

seedContent();
