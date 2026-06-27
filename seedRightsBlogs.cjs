require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const rightsBlogs = [
  {
    id: 'rights-1',
    slug: 'capitation-fee-illegal',
    title: 'The Truth About Capitation Fees: How to Identify and Refuse Illegal Demands',
    category: 'Guide',
    date: '2023-11-01',
    authorName: 'Apni Janta Legal',
    authorAvatar: 'https://ui-avatars.com/api/?name=AJ&background=random',
    excerpt: 'Demand for illegal donations, building funds, or unreceipted cash payments for admission is strictly prohibited by law. Here is what you need to know.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop',
    content: 'Full content goes here...',
    readTime: '6 min read',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'rights-2',
    slug: 'marksheet-withheld-rights',
    title: 'What to Do When a College Withholds Your Original Marksheets',
    category: 'Guide',
    date: '2023-11-02',
    authorName: 'Apni Janta Legal',
    authorAvatar: 'https://ui-avatars.com/api/?name=AJ&background=random',
    excerpt: 'Colleges often refuse to return original certificates to force fee payments or block transfers. Discover your legal rights and how to recover your documents.',
    image: 'https://images.unsplash.com/photo-1568227451052-a5e8e8117a02?q=80&w=2000&auto=format&fit=crop',
    content: 'Full content goes here...',
    readTime: '5 min read',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'rights-3',
    slug: 'forced-hostel-fee',
    title: 'Fighting Forced Hostel and Canteen Fees',
    category: 'Guide',
    date: '2023-11-03',
    authorName: 'Apni Janta Legal',
    authorAvatar: 'https://ui-avatars.com/api/?name=AJ&background=random',
    excerpt: 'Mandatory bundling of hostel or mess fees even if you are a day scholar is a common coercive tactic. Here is how to legally dispute it.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2000&auto=format&fit=crop',
    content: 'Full content goes here...',
    readTime: '4 min read',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'rights-4',
    slug: 'verify-college-affiliation',
    title: 'How to Verify College Affiliations and Approvals',
    category: 'Guide',
    date: '2023-11-04',
    authorName: 'Apni Janta Legal',
    authorAvatar: 'https://ui-avatars.com/api/?name=AJ&background=random',
    excerpt: 'Many institutes claim fake UGC, AICTE, or university approvals they do not possess. Follow our step-by-step verification guide.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
    content: 'Full content goes here...',
    readTime: '7 min read',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'rights-5',
    slug: 'leaving-college-rights',
    title: 'Mid-Year Transfer Harassment: Leaving a College Early',
    category: 'Guide',
    date: '2023-11-05',
    authorName: 'Apni Janta Legal',
    authorAvatar: 'https://ui-avatars.com/api/?name=AJ&background=random',
    excerpt: 'Colleges often demand remaining 4-year tuition fees when a student attempts to transfer out early. Learn the UGC guidelines on this practice.',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2000&auto=format&fit=crop',
    content: 'Full content goes here...',
    readTime: '8 min read',
    updatedAt: new Date().toISOString()
  }
];

async function seed() {
  for (const b of rightsBlogs) {
    try {
      await pool.query(
        `INSERT INTO blogs (id, slug, title, category, date, author_name, author_avatar, excerpt, image, content, read_time, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         ON CONFLICT (id) DO UPDATE SET 
           slug = $2, title = $3, category = $4, date = $5, author_name = $6, author_avatar = $7, 
           excerpt = $8, image = $9, content = $10, read_time = $11, updated_at = $12`,
        [b.id, b.slug, b.title, b.category, b.date, b.authorName, b.authorAvatar, b.excerpt, b.image, b.content, b.readTime, b.updatedAt]
      );
      console.log('Seeded Rights Guide directly:', b.slug);
    } catch (e) {
      console.error('Error seeding Rights Guide', b.slug, e);
    }
  }
  pool.end();
}

seed();
