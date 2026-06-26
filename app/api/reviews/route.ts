import { NextResponse } from 'next/server';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM reviews ORDER BY date DESC');
    const reviews = result.rows.map((r: any) => ({
      id: r.id,
      collegeId: r.college_id,
      author: r.author,
      role: r.role,
      rating: r.rating,
      date: r.date,
      content: r.content,
      verified: r.verified,
      tags: JSON.parse(r.tags)
    }));
    return NextResponse.json(reviews);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const r = await req.json();
    await pool.query(
      `INSERT INTO reviews (id, college_id, author, role, rating, date, content, verified, tags) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [r.id, r.collegeId, r.author, r.role, r.rating, r.date, r.content, r.verified, JSON.stringify(r.tags)]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
