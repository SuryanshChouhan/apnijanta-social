import { Metadata } from 'next';
import BlogPostView from '../../../src/components/BlogPostView';
import pg from 'pg';

const { Pool } = pg;
let pool: any = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

type Props = {
  params: { slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  
  if (!pool) return { title: 'Blog | Apnijanta' };

  try {
    const result = await pool.query('SELECT title, excerpt FROM blogs WHERE slug = $1', [slug]);
    const blog = result.rows[0];

    if (blog) {
      return {
        title: `${blog.title} | Apnijanta Student Rights`,
        description: blog.excerpt,
        alternates: {
          canonical: `https://apnijanta.com/blog/${slug}`,
        }
      };
    }
  } catch (err) {
    console.error(err);
  }

  return { title: 'Blog | Apnijanta' };
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  let jsonLd = null;

  if (pool) {
    try {
      const result = await pool.query('SELECT * FROM blogs WHERE slug = $1', [slug]);
      const blog = result.rows[0];

      if (blog) {
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": blog.title,
          "image": [
            blog.image || "https://apnijanta.com/og-image.jpg"
          ],
          "datePublished": blog.date,
          "dateModified": blog.updated_at || blog.date,
          "author": {
            "@type": "Person",
            "name": blog.author_name,
            "url": `https://apnijanta.com/author/${encodeURIComponent(blog.author_name)}`,
            "sameAs": [
              "https://www.linkedin.com/in/author-profile" // Example generic link
            ]
          },
          "publisher": {
            "@type": "Organization",
            "name": "Apnijanta",
            "logo": {
              "@type": "ImageObject",
              "url": "https://apnijanta.com/logo.png"
            }
          }
        };
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <BlogPostView />
    </>
  );
}
