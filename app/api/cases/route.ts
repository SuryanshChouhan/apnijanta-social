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
      firstName: r.first_name,
      lastName: r.last_name,
      email: r.email,
      contactNumber: r.contact_number,
      address: r.address,
      contactMethod: r.contact_method,
      urgency: r.urgency,
      category: r.category,
      collegeName: r.college_name,
      title: r.title,
      description: r.description,
      referenceNumber: r.reference_number,
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
      `INSERT INTO support_requests (id, first_name, last_name, email, contact_number, address, contact_method, urgency, category, college_name, title, description, reference_number, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [c.id, c.firstName, c.lastName, c.email, c.contactNumber, c.address, c.contactMethod, c.urgency, c.category, c.collegeName, c.title, c.description, c.referenceNumber, c.createdAt]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
