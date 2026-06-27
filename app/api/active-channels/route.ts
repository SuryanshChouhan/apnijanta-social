import { NextResponse } from 'next/server';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    
    let query = 'SELECT * FROM active_channels ORDER BY created_at DESC';
    if (limit) {
      query += ` LIMIT ${parseInt(limit)}`;
    }
    
    const { rows } = await pool.query(query);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching active channels:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { id, title, badge_type, protest_title, description, status_text } = data;
    
    await pool.query(
      `INSERT INTO active_channels (id, title, badge_type, protest_title, description, status_text)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO UPDATE SET
       title = EXCLUDED.title,
       badge_type = EXCLUDED.badge_type,
       protest_title = EXCLUDED.protest_title,
       description = EXCLUDED.description,
       status_text = EXCLUDED.status_text,
       created_at = CURRENT_TIMESTAMP`,
      [id, title, badge_type, protest_title, description, status_text]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving active channel:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
