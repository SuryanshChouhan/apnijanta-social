import { MetadataRoute } from 'next';
import pg from 'pg';

const { Pool } = pg;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://apnijanta.com';
  let pool;
  
  if (process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/colleges`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/get-help`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  if (pool) {
    try {
      // Fetch colleges
      const collegesResult = await pool.query('SELECT id FROM colleges');
      const collegeRoutes = collegesResult.rows.map((college) => ({
        url: `${baseUrl}/colleges/${college.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }));

      // Fetch blogs
      const blogsResult = await pool.query('SELECT slug, updated_at, image FROM blogs');
      const blogRoutes = blogsResult.rows.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.updated_at ? new Date(blog.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

      dynamicRoutes = [...collegeRoutes, ...blogRoutes];
    } catch (error) {
      console.error('Sitemap DB Error:', error);
    } finally {
      await pool.end();
    }
  }

  return [...staticRoutes, ...dynamicRoutes];
}
