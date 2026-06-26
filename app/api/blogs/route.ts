import { NextResponse } from 'next/server';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY date DESC');
    const blogs = result.rows.map((r: any) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      category: r.category,
      date: r.date,
      authorName: r.author_name,
      authorAvatar: r.author_avatar,
      excerpt: r.excerpt,
      image: r.image,
      content: r.content,
      readTime: r.read_time,
      updatedAt: r.updated_at
    }));
    return NextResponse.json(blogs);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    await pool.query(
      `INSERT INTO blogs (id, slug, title, category, date, author_name, author_avatar, excerpt, image, content, read_time, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT (id) DO UPDATE SET 
         slug = $2, title = $3, category = $4, date = $5, author_name = $6, author_avatar = $7, 
         excerpt = $8, image = $9, content = $10, read_time = $11, updated_at = $12`,
      [b.id, b.slug, b.title, b.category, b.date, b.authorName, b.authorAvatar, b.excerpt, b.image, b.content, b.readTime, b.updatedAt]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
