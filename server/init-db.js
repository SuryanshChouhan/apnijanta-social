import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDB() {
  try {
    console.log('Connecting to PostgreSQL...');
    
    // Create Blogs Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id VARCHAR(255) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        date VARCHAR(50),
        author_name VARCHAR(100),
        author_avatar VARCHAR(10),
        excerpt TEXT,
        image TEXT,
        content TEXT,
        read_time VARCHAR(50),
        updated_at VARCHAR(50)
      );
    `);
    console.log('Blogs table ready.');

    // Create Colleges Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS colleges (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        state VARCHAR(100),
        college_type VARCHAR(100),
        approval_status VARCHAR(100),
        logo_text VARCHAR(10),
        approved_tuition INTEGER,
        reported_total_ask INTEGER,
        tuition VARCHAR(100),
        placement_rate FLOAT,
        rating FLOAT,
        image TEXT,
        tags JSONB,
        description TEXT,
        transparency_score JSONB,
        capitation_reports INTEGER,
        marksheet_complaints INTEGER,
        grievance_officer_listed BOOLEAN
      );
    `);
    console.log('Colleges table ready.');

    // Create Support Requests Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS support_requests (
        id VARCHAR(255) PRIMARY KEY,
        urgency VARCHAR(100),
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(255),
        contact_method VARCHAR(50),
        category VARCHAR(100),
        college_name VARCHAR(255),
        title VARCHAR(255),
        description TEXT,
        reference_number VARCHAR(100),
        created_at TIMESTAMP
      );
    `);
    console.log('Support Requests table ready.');

    // Create Reviews Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(255) PRIMARY KEY,
        college_name VARCHAR(255),
        rating INTEGER,
        author_name VARCHAR(100),
        cohort VARCHAR(100),
        title VARCHAR(255),
        text TEXT,
        tags JSONB,
        date VARCHAR(50)
      );
    `);
    console.log('Reviews table ready.');

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await pool.end();
  }
}

initDB();
