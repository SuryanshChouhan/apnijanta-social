import fetch from 'node-fetch';

const demoBlogs = [
  {
    id: 'demo-blog-1',
    slug: 'massive-tuition-refund',
    title: 'Massive Tuition Refund Secured for Spring Cohort',
    category: 'Student Rights',
    date: 'Oct 12, 2023',
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
    date: 'Sep 28, 2023',
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
    date: 'Sep 15, 2023',
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
  for (const blog of demoBlogs) {
    try {
      const res = await fetch('http://localhost:3000/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog)
      });
      const data = await res.json();
      console.log('Seeded blog:', blog.slug, data);
    } catch (e) {
      console.error('Error seeding', blog.slug, e);
    }
  }
}

seed();
