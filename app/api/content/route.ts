import { NextResponse } from 'next/server';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM site_content');
    const contentList = result.rows.map((r: any) => ({
      id: r.id,
      value: r.value,
      section: r.section,
      field_type: r.field_type || 'text',
      updatedAt: r.updated_at
    }));
    return NextResponse.json(contentList);
  } catch (error) {
    console.error('Error fetching site content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Expected an array of content objects' }, { status: 400 });
    }

    for (const item of body) {
      if (item.id && item.value !== undefined) {
        await pool.query(
          `INSERT INTO site_content (id, value, section, field_type, updated_at) 
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (id) DO UPDATE SET 
             value = $2, field_type = $4, updated_at = $5`,
          [item.id, item.value, item.section || 'General', item.field_type || 'text', new Date().toISOString()]
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating site content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
