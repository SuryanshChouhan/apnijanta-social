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
      state: r.state,
      collegeType: r.college_type,
      approvalStatus: r.approval_status,
      logoText: r.logo_text,
      rating: r.rating,
      image: r.image,
      tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : (r.tags || []),
      description: r.description,
      transparencyScore: typeof r.transparency_score === 'string' ? JSON.parse(r.transparency_score) : (r.transparency_score || {}),
      capitationReports: r.capitation_reports,
      marksheetComplaints: r.marksheet_complaints,
      grievanceOfficerListed: r.grievance_officer_listed,
      courses: typeof r.courses === 'string' ? JSON.parse(r.courses) : (r.courses || [])
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
    
    // Ensure complex objects are stringified for JSONB insertion
    const tagsJson = JSON.stringify(c.tags || []);
    const transparencyScoreJson = JSON.stringify(c.transparencyScore || {});
    const coursesJson = JSON.stringify(c.courses || []);

    await pool.query(
      `INSERT INTO colleges (
        id, name, location, state, college_type, approval_status, logo_text, 
        rating, image, tags, description, transparency_score, capitation_reports, 
        marksheet_complaints, grievance_officer_listed, courses
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
      ) ON CONFLICT (id) DO UPDATE SET 
        name = $2, location = $3, state = $4, college_type = $5, approval_status = $6, 
        logo_text = $7, rating = $8, image = $9, tags = $10, description = $11, 
        transparency_score = $12, capitation_reports = $13, marksheet_complaints = $14, 
        grievance_officer_listed = $15, courses = $16`,
      [
        c.id, c.name, c.location, c.state, c.collegeType, c.approvalStatus, c.logoText,
        c.rating, c.image, tagsJson, c.description, transparencyScoreJson, c.capitationReports,
        c.marksheetComplaints, c.grievanceOfficerListed, coursesJson
      ]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error saving college:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
