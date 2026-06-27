require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const demoBlogs = [
  {
    id: 'demo-blog-1',
    slug: 'massive-tuition-refund',
    title: 'Massive Tuition Refund Secured for Spring Cohort',
    category: 'News',
    date: '2023-10-12',
    authorName: 'Apni Janta',
    authorAvatar: 'https://ui-avatars.com/api/?name=AJ&background=random',
    excerpt: 'After a semester of inadequate online instruction, our coalition successfully negotiated a 15% tuition rebate for affected engineering students.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    content: 'Full content goes here...',
    readTime: '4 min read',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-blog-2',
    slug: 'emergency-housing-rights-secured',
    title: 'Emergency Housing Rights Secured for Dorm Evictees',
    category: 'Expose',
    date: '2023-09-28',
    authorName: 'Apni Janta',
    authorAvatar: 'https://ui-avatars.com/api/?name=AJ&background=random',
    excerpt: 'Blocked sudden dorm closures and secured temporary hotel accommodations for 200+ students facing unfair eviction notices.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop',
    content: 'Full content goes here...',
    readTime: '3 min read',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-blog-3',
    slug: 'overturned-unfair-grading',
    title: 'Overturned Unfair Departmental Grading Curve',
    category: 'News',
    date: '2023-09-15',
    authorName: 'Apni Janta',
    authorAvatar: 'https://ui-avatars.com/api/?name=AJ&background=random',
    excerpt: 'Investigated and dismantled a discriminatory curve system in the Engineering department, resulting in fair grades for hundreds of students.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
    content: 'Full content goes here...',
    readTime: '5 min read',
    updatedAt: new Date().toISOString()
  }
];

async function seed() {
  try {
    await pool.query('ALTER TABLE blogs ALTER COLUMN author_avatar TYPE TEXT;');
    console.log('Altered table to support longer avatar URLs');
  } catch (e) {
    console.log('Alter table skipped or failed:', e.message);
  }

  for (const b of demoBlogs) {
    try {
      await pool.query(
        `INSERT INTO blogs (id, slug, title, category, date, author_name, author_avatar, excerpt, image, content, read_time, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         ON CONFLICT (id) DO UPDATE SET 
           slug = $2, title = $3, category = $4, date = $5, author_name = $6, author_avatar = $7, 
           excerpt = $8, image = $9, content = $10, read_time = $11, updated_at = $12`,
        [b.id, b.slug, b.title, b.category, b.date, b.authorName, b.authorAvatar, b.excerpt, b.image, b.content, b.readTime, b.updatedAt]
      );
      console.log('Seeded DB directly:', b.slug);
    } catch (e) {
      console.error('Error seeding DB', b.slug, e);
    }
  }
  pool.end();
}

seed();
