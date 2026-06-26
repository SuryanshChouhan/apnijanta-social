import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// --- BLOGS API ---
app.get('/api/blogs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY date DESC');
    // Convert snake_case to camelCase
    const blogs = result.rows.map(r => ({
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
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const b = req.body;
    await pool.query(
      `INSERT INTO blogs (id, slug, title, category, date, author_name, author_avatar, excerpt, image, content, read_time, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT (id) DO UPDATE SET 
         slug = $2, title = $3, category = $4, date = $5, author_name = $6, author_avatar = $7, 
         excerpt = $8, image = $9, content = $10, read_time = $11, updated_at = $12`,
      [b.id, b.slug, b.title, b.category, b.date, b.authorName, b.authorAvatar, b.excerpt, b.image, b.content, b.readTime, b.updatedAt]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM blogs WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- COLLEGES API ---
app.get('/api/colleges', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM colleges');
    const colleges = result.rows.map(r => ({
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
      tags: r.tags,
      description: r.description,
      transparencyScore: r.transparency_score,
      capitationReports: r.capitation_reports,
      marksheetComplaints: r.marksheet_complaints,
      grievanceOfficerListed: r.grievance_officer_listed
    }));
    res.json(colleges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/colleges', async (req, res) => {
  try {
    const c = req.body;
    await pool.query(
      `INSERT INTO colleges (id, name, location, state, college_type, approval_status, logo_text, approved_tuition, reported_total_ask, tuition, placement_rate, rating, image, tags, description, transparency_score, capitation_reports, marksheet_complaints, grievance_officer_listed) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
       ON CONFLICT (id) DO UPDATE SET 
         name = $2, location = $3, state = $4, college_type = $5, approval_status = $6, logo_text = $7, approved_tuition = $8, reported_total_ask = $9, tuition = $10, placement_rate = $11, rating = $12, image = $13, tags = $14, description = $15, transparency_score = $16, capitation_reports = $17, marksheet_complaints = $18, grievance_officer_listed = $19`,
      [c.id, c.name, c.location, c.state, c.collegeType, c.approvalStatus, c.logoText, c.approvedTuition, c.reportedTotalAsk, c.tuition, c.placementRate, c.rating, c.image, JSON.stringify(c.tags), c.description, JSON.stringify(c.transparencyScore), c.capitationReports, c.marksheetComplaints, c.grievanceOfficerListed]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- SUPPORT REQUESTS API ---
app.get('/api/cases', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM support_requests ORDER BY created_at DESC');
    const cases = result.rows.map(r => ({
      id: r.id,
      urgency: r.urgency,
      firstName: r.first_name,
      lastName: r.last_name,
      email: r.email,
      contactMethod: r.contact_method,
      category: r.category,
      collegeName: r.college_name,
      title: r.title,
      description: r.description,
      referenceNumber: r.reference_number,
      createdAt: r.created_at
    }));
    res.json(cases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/cases', async (req, res) => {
  try {
    const s = req.body;
    await pool.query(
      `INSERT INTO support_requests (id, urgency, first_name, last_name, email, contact_method, category, college_name, title, description, reference_number, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [s.id, s.urgency, s.firstName, s.lastName, s.email, s.contactMethod, s.category, s.collegeName, s.title, s.description, s.referenceNumber, new Date(s.createdAt)]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// --- REVIEWS API ---
app.get('/api/reviews', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reviews');
    const reviews = result.rows.map(r => ({
      id: r.id,
      collegeName: r.college_name,
      rating: r.rating,
      authorName: r.author_name,
      cohort: r.cohort,
      title: r.title,
      text: r.text,
      tags: r.tags,
      date: r.date
    }));
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const r = req.body;
    await pool.query(
      `INSERT INTO reviews (id, college_name, rating, author_name, cohort, title, text, tags, date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [r.id, r.collegeName, r.rating, r.authorName, r.cohort, r.title, r.text, JSON.stringify(r.tags), r.date]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(\`Backend server running on port \${PORT}\`);
});
