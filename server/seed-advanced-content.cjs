require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const advancedContent = [
  // Navbar
  {
    id: 'navbar_links',
    section: 'Navbar',
    field_type: 'json_array',
    value: JSON.stringify([
      { label: 'Home', path: '/' },
      { label: 'Blog', path: '/blog' },
      { label: 'Colleges', path: '/colleges' },
      { label: 'Resources', path: '/resources' },
      { label: 'Success Stories', path: '/', hash: '#victories' }
    ])
  },
  // Footer
  {
    id: 'footer_desc',
    section: 'Footer',
    field_type: 'textarea',
    value: 'Structured urgency for student change. We champion student voices, expose institutional hidden costs, and provide direct peer support.'
  },
  {
    id: 'footer_platform_links',
    section: 'Footer',
    field_type: 'json_array',
    value: JSON.stringify([
      { label: 'Home / Initiatives', path: '/' },
      { label: 'Insights & Blog', path: '/blog' },
      { label: 'Honest College Truths', path: '/colleges' },
      { label: 'Action Playbooks', path: '/resources' }
    ])
  },
  {
    id: 'footer_action_links',
    section: 'Footer',
    field_type: 'json_array',
    value: JSON.stringify([
      { label: 'File a Support Case', path: '/get-help' },
      { label: 'Report Capitation Fee', path: '/get-help' },
      { label: 'Report Document Retention', path: '/get-help' },
      { label: 'Submit Success Story', path: '/get-help' }
    ])
  },
  // Home Page
  {
    id: 'home_hero_title',
    section: 'Home Page',
    field_type: 'text',
    value: 'Break The System.'
  },
  {
    id: 'home_hero_subtitle',
    section: 'Home Page',
    field_type: 'text',
    value: 'Student Power.'
  },
  {
    id: 'home_hero_desc',
    section: 'Home Page',
    field_type: 'textarea',
    value: 'We help students fight hidden college fees, retrieve illegally withheld documents, and expose predatory institutional policies. You are not alone.'
  },
  {
    id: 'home_features',
    section: 'Home Page',
    field_type: 'json_array',
    value: JSON.stringify([
      { title: 'Marksheet or TC Withheld', text: 'College refusing to return original certificates to force fee payments or block transfers.' },
      { title: 'Forced Hostel / Canteen Fees', text: 'Mandatory bundling of hostel or mess fees even if you are a day scholar.' },
      { title: 'Fake Affiliation or Approvals', text: 'College claiming fake UGC, AICTE, or university approvals they do not possess.' }
    ])
  },
  // Resources Page
  {
    id: 'resources_title',
    section: 'Resources Page',
    field_type: 'text',
    value: 'Know Your Rights.'
  },
  {
    id: 'resources_desc',
    section: 'Resources Page',
    field_type: 'textarea',
    value: 'We\'ve built instant action playbooks for the most common issues faced by students in Indian engineering and medical colleges. Choose your issue below to get started.'
  },
  {
    id: 'resources_regulations',
    section: 'Resources Page',
    field_type: 'json_array',
    value: JSON.stringify([
      {
        id: 'doc-retention',
        color: 'indigo',
        title: 'Document Retention Ban',
        law: 'UGC Notification 2012 / Circular on Original Certificates',
        description: 'Colleges are strictly prohibited from retaining your original marksheets, degrees, or birth certificates under any circumstances, even if fees are pending.',
        template: 'Under UGC Notification on Remittance and Retention of Original Certificates, colleges are strictly prohibited from holding original marksheets or degrees. I request the immediate return of my documents. Non-compliance will be reported to the UGC Grievance Portal.'
      },
      {
        id: 'fee-refund',
        color: 'emerald',
        title: '100% Fee Refund Policy',
        law: 'AICTE Approval Process Handbook 2024 (Appendix)',
        description: 'If you withdraw your admission before the stipulated deadline, colleges must refund 100% of your fees (minus a maximum ₹1,000 processing fee). They cannot withhold seat-booking amounts.',
        template: 'As per AICTE Approval Process Handbook guidelines on Fee Refund, I request the full refund of my paid admission fee minus the ₹1,000 processing charge, as I am withdrawing before the deadline.'
      },
      {
        id: 'forced-hostel',
        color: 'amber',
        title: 'Forced Hostel Bundling Illegal',
        law: 'UGC Guidelines on Student Entitlements',
        description: 'Making hostel accommodation mandatory for local/day scholars to extract extra fees is an unfair practice. You cannot be forced to pay for services you do not consume.',
        template: 'I am a local resident and do not require hostel accommodation. Under UGC Guidelines on Student Entitlements, bundling services and forcing unused facilities is considered an unfair practice. Please remove hostel charges from my fee structure.'
      },
      {
        id: 'capitation-fee',
        color: 'red',
        title: 'Capitation Fee Prohibition',
        law: 'Prohibition of Unfair Practices in Technical Educational Institutions Act',
        description: 'Demanding donations or capitation fees beyond the state-approved fee structure is a criminal offense. All fees must be receipted and transparent.',
        template: 'I am requesting an official, stamped receipt detailing all heads of the fee demanded. Under the Prohibition of Unfair Practices Act, demanding unreceipted capitation fees is illegal. If a receipt cannot be provided, I expect the fee to be waived.'
      }
    ])
  }
];

async function seedAdvancedContent() {
  console.log('Seeding advanced CMS content...');
  try {
    for (const item of advancedContent) {
      await pool.query(
        `INSERT INTO site_content (id, value, section, field_type) 
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (id) DO UPDATE SET 
           value = EXCLUDED.value,
           section = EXCLUDED.section,
           field_type = EXCLUDED.field_type,
           updated_at = CURRENT_TIMESTAMP`,
        [item.id, item.value, item.section, item.field_type]
      );
      console.log(`✅ Seeded: ${item.id}`);
    }
    console.log('Advanced seeding complete!');
  } catch (err) {
    console.error('Error seeding advanced content:', err);
  } finally {
    pool.end();
  }
}

seedAdvancedContent();
