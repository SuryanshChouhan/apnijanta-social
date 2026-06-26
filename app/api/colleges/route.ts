import { NextResponse } from 'next/server';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM colleges ORDER BY name ASC');
    const colleges = result.rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      location: r.location,
      type: r.type,
      transparencyScore: r.transparency_score,
      flags: JSON.parse(r.flags),
      stats: JSON.parse(r.stats),
      knownIssues: JSON.parse(r.known_issues),
      verifiedScams: JSON.parse(r.verified_scams),
      feeStructure: JSON.parse(r.fee_structure)
    }));
    return NextResponse.json(colleges);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const c = await req.json();
    await pool.query(
      `INSERT INTO colleges (id, name, location, type, transparency_score, flags, stats, known_issues, verified_scams, fee_structure) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO UPDATE SET 
         name = $2, location = $3, type = $4, transparency_score = $5, flags = $6, stats = $7, 
         known_issues = $8, verified_scams = $9, fee_structure = $10`,
      [c.id, c.name, c.location, c.type, c.transparencyScore, JSON.stringify(c.flags), JSON.stringify(c.stats), JSON.stringify(c.knownIssues), JSON.stringify(c.verifiedScams), JSON.stringify(c.feeStructure)]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
