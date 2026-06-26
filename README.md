# Apnijanta Social - Empowering Students

Apnijanta is a student-powered platform that helps students in India fight unfair policies, recover fees, protect housing rights, and hold universities accountable. 

This repository contains the complete Next.js (App Router) codebase for the Apnijanta social platform, which features a directory of colleges, a legal rights blog, and a support case tracking system.

## Tech Stack
- **Framework:** Next.js 15 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 & Lucide React
- **Database:** PostgreSQL (via `pg`)
- **State Management:** React Context API

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SuryanshChouhan/apnijanta-social.git
   cd apnijanta-social
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Configuration**
   Ensure you have PostgreSQL running. Create a database (e.g. `apnijanta`) and configure your connection string in `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/apnijanta"
   ```

4. **Initialize Database Tables**
   Run the SQL statements found in `server/init-db.js` against your PostgreSQL database to set up the necessary tables (`colleges`, `blogs`, `cases`, `reviews`).

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

## Production Deployment
The application is fully optimized for production deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

```bash
npm run build
npm run start
```
