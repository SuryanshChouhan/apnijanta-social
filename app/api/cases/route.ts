import { NextResponse } from 'next/server';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM support_requests ORDER BY created_at DESC');
    const cases = result.rows.map((r: any) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      status: r.status,
      category: r.category,
      urgency: r.urgency,
      contactMethod: r.contact_method,
      createdAt: r.created_at
    }));
    return NextResponse.json(cases);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const c = await req.json();
    await pool.query(
      `INSERT INTO support_requests (id, title, description, status, category, urgency, contact_method, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [c.id, c.title, c.description, c.status, c.category, c.urgency, c.contactMethod, c.createdAt]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
