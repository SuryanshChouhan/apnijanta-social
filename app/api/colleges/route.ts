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
      approvedTuition: r.approved_tuition,
      reportedTotalAsk: r.reported_total_ask,
      tuition: r.tuition,
      placementRate: r.placement_rate,
      rating: r.rating,
      image: r.image,
      tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags,
      description: r.description,
      transparencyScore: typeof r.transparency_score === 'string' ? JSON.parse(r.transparency_score) : r.transparency_score,
      capitationReports: r.capitation_reports,
      marksheetComplaints: r.marksheet_complaints,
      grievanceOfficerListed: r.grievance_officer_listed
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
    
    // Ensure tags and transparencyScore are stringified for JSONB insertion
    const tagsJson = JSON.stringify(c.tags || []);
    const transparencyScoreJson = JSON.stringify(c.transparencyScore || {});

    await pool.query(
      `INSERT INTO colleges (
        id, name, location, state, college_type, approval_status, logo_text, 
        approved_tuition, reported_total_ask, tuition, placement_rate, rating, 
        image, tags, description, transparency_score, capitation_reports, 
        marksheet_complaints, grievance_officer_listed
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
      ) ON CONFLICT (id) DO UPDATE SET 
        name = $2, location = $3, state = $4, college_type = $5, approval_status = $6, 
        logo_text = $7, approved_tuition = $8, reported_total_ask = $9, tuition = $10, 
        placement_rate = $11, rating = $12, image = $13, tags = $14, description = $15, 
        transparency_score = $16, capitation_reports = $17, marksheet_complaints = $18, 
        grievance_officer_listed = $19`,
      [
        c.id, c.name, c.location, c.state, c.collegeType, c.approvalStatus, c.logoText,
        c.approvedTuition, c.reportedTotalAsk, c.tuition, c.placementRate, c.rating,
        c.image, tagsJson, c.description, transparencyScoreJson, c.capitationReports,
        c.marksheetComplaints, c.grievanceOfficerListed
      ]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error saving college:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
