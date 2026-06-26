import { BlogPost, BlogCategory } from '../types';

export const blogCategories = ['All', 'Fees', 'Documents', 'Admissions', 'Hostel', 'Transfer', 'Rights', 'Victory'] as const;

export const featuredBlogPost: BlogPost = {
  id: 'featured-1',
  slug: 'new-wave-student-led-policy-reform',
  title: 'The New Wave of Student-Led Policy Reform on Campus',
  category: 'Rights',
  date: 'Oct 24, 2024',
  updatedAt: 'Oct 25, 2024',
  authorName: 'Elena Rodriguez',
  authorAvatar: 'ER',
  excerpt: 'How grassroots movements are successfully changing administrative policies regarding mental health days and academic leniency across major universities. A deep dive into the strategies that are working.',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_B1l_5kArOojE6uAAGdykF9cpM-Ve_mNdWWpLFkMB_4Okn6ltSVSY85P8gB6RtmnQleo5YVTKLIN5r0qsRfI5hpRw6KbG3qN3Jsxm38aI1FxD6W8R59GIK84aw_VD_7CIb7q94dbZnBXK84CZyotPjTjJqk8vvEXmWjl1xXzOtlbiKJnjCGvP3trVE0jEEnzgyLmtwKJv_XNc4PVbbEXyg8hfVS0rQYmtjowfpKyEjDj9iBfTcrzoRsua7TszHWKllHGMDpT_ob4',
  readTime: '6 min read'
};

export const defaultBlogPosts: BlogPost[] = [
  // --- NEW PROBLEM GUIDES ---
  {
    id: 'guide-1',
    slug: 'capitation-fee-illegal',
    title: 'How to Dispute Hidden and Capitation Fees',
    category: 'Fees',
    date: 'Jun 10, 2025',
    updatedAt: 'Jun 20, 2025',
    authorName: 'Legal Advocacy Team',
    authorAvatar: 'LA',
    excerpt: 'Understand your rights against illegal donations, building funds, and unreceipted cash payments under AICTE and state laws.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200',
    readTime: '8 min read',
    content: `
      // TODO: REPLACE WITH VERIFIED LEGAL CONTENT
      <p>This is a placeholder for the verified legal guide regarding Capitation and Hidden Fees.</p>
      <p>The AICTE strictly prohibits capitation fees under Section 16(1)(g) of the AICTE Act 1987. However, verified step-by-step procedures, state-specific acts, and grievance portal escalations will be populated here by the advocacy team.</p>
      <h3>Actionable Steps (Draft)</h3>
      <ol>
        <li>Document all communication where unreceipted fees are demanded.</li>
        <li>Do not pay in cash without a valid institutional receipt.</li>
        <li>Prepare to escalate to the AICTE grievance portal or State Fee Regulatory Committee.</li>
      </ol>
    `
  },
  {
    id: 'guide-2',
    slug: 'marksheet-withheld-rights',
    title: 'Your Rights When a College Withholds Your Marksheet',
    category: 'Documents',
    date: 'Jun 12, 2025',
    updatedAt: 'Jun 22, 2025',
    authorName: 'Legal Advocacy Team',
    authorAvatar: 'LA',
    excerpt: 'Colleges cannot hold your original certificates as collateral. Learn how to demand your documents back using UGC guidelines.',
    image: 'https://images.unsplash.com/photo-1568227451240-b5a83a0026e6?auto=format&fit=crop&q=80&w=1200',
    readTime: '7 min read',
    content: `
      // TODO: REPLACE WITH VERIFIED LEGAL CONTENT
      <p>This is a placeholder for the verified legal guide regarding Withheld Marksheets and Certificates.</p>
      <p>The UGC explicitly forbids institutions from retaining original certificates of students as collateral. Verified citations and exact escalation steps will be provided by the advocacy team.</p>
    `
  },
  {
    id: 'guide-3',
    slug: 'forced-hostel-fee',
    title: 'Refusing Mandatory Hostel and Canteen Fees',
    category: 'Hostel',
    date: 'Jun 14, 2025',
    updatedAt: 'Jun 23, 2025',
    authorName: 'Legal Advocacy Team',
    authorAvatar: 'LA',
    excerpt: 'Are you a day scholar being forced to pay for a hostel? Discover the regulatory policies that protect you from illegal bundling.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1200',
    readTime: '6 min read',
    content: `
      // TODO: REPLACE WITH VERIFIED LEGAL CONTENT
      <p>This is a placeholder for the verified legal guide regarding Forced Hostel and Canteen Fees.</p>
      <p>Institutions cannot mandate ancillary services for day scholars. The exact legal citations and escalation matrix will be provided by the advocacy team.</p>
    `
  },
  {
    id: 'guide-4',
    slug: 'verify-college-affiliation',
    title: 'How to Expose Fake Approvals and Affiliations',
    category: 'Admissions',
    date: 'Jun 15, 2025',
    updatedAt: 'Jun 24, 2025',
    authorName: 'Legal Advocacy Team',
    authorAvatar: 'LA',
    excerpt: 'Step-by-step guide to verifying if a college actually holds the UGC, AICTE, or university approvals they claim in their brochures.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200',
    readTime: '9 min read',
    content: `
      // TODO: REPLACE WITH VERIFIED LEGAL CONTENT
      <p>This is a placeholder for the verified legal guide on Verifying College Affiliations.</p>
      <p>Fraudulent claims of AICTE/UGC approval can ruin careers. The verified guide will show students how to cross-reference institutional claims with official government databases.</p>
    `
  },
  {
    id: 'guide-5',
    slug: 'leaving-college-rights',
    title: 'Mid-Year Transfers and Tuition Demands',
    category: 'Transfer',
    date: 'Jun 18, 2025',
    updatedAt: 'Jun 25, 2025',
    authorName: 'Legal Advocacy Team',
    authorAvatar: 'LA',
    excerpt: 'Colleges often demand 4-year tuition for mid-year withdrawals. Here is how to fight it and secure a fair exit.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200',
    readTime: '10 min read',
    content: `
      // TODO: REPLACE WITH VERIFIED LEGAL CONTENT
      <p>This is a placeholder for the verified legal guide on Mid-Year Transfer Harassment.</p>
      <p>Institutions often illegally demand remaining years' fees when a student attempts to transfer. Verified AICTE refund rules and legal precedent will be inserted here.</p>
    `
  },
  
  // --- EXISTING POSTS UPDATED WITH CATEGORIES ---
  {
    id: 'post-1',
    slug: 'navigating-financial-aid-2025',
    title: 'Navigating Financial Aid in 2025',
    category: 'Fees',
    date: 'Oct 22, 2024',
    updatedAt: 'Oct 23, 2024',
    authorName: 'Sarah Jenkins',
    authorAvatar: 'SJ',
    excerpt: 'A comprehensive guide to understanding the recent changes in federal grant structures and how they impact current undergraduates.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNvG7YaMrOVkHs4FnDP9UAsjD2L4YZqwUT40V6UZxR3cMTYaqVgcsPFYtmCiiBwiqnWVAqjhFZ39r-R0LUa9o-qSLR_buDkBJJaME9_kmJi8YunYLnr2A3MERX7CAVarrHyJIaJi9eYqSMA_43M5MKxxusoisHik6jw5-L3TfLpZURpFPOgMtVlkEQJ97Cu45IU-R6viDqOcbdifEr_IZy9dQBNVQ6GQZQCEs1fJMHvFm3cwsrW6cF8AGI7-T_vimV1Akz51SBQFc',
    readTime: '5 min read'
  },
  {
    id: 'post-2',
    slug: 'end-of-standardized-testing',
    title: 'The End of Standardized Testing?',
    category: 'Admissions',
    date: 'Oct 20, 2024',
    updatedAt: 'Oct 21, 2024',
    authorName: 'Marcus Chen',
    authorAvatar: 'MC',
    excerpt: 'Analyzing the long-term effects of test-optional policies on university diversity and admission rates.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA-nFqnc94o870noLBfW5T_ogMxQtDhGmd3LpKTNN2uWwABM7MHUR8GaI-uDy3Zk0U62oGt61LM5jksEBK2aJi4wYYz5psa3m18rCGFe38wsPQWOviETu1AvhYwK6TZmk_N9cN9i7gSDx9hdL6ORFOMDZx-PoyPmimWsxfW7CEvi9M4GfAh3gZiUTI_13UxXGUCNxpLyCDKrzkxssq6x5K5-zHIXJ1pQZEKdlCAJrcud28aA5NMLC5fYAxwOYr3u6WIu-5ht6j5XM',
    readTime: '4 min read'
  },
  {
    id: 'post-4',
    slug: 'advocating-for-accessibility',
    title: 'Advocating for Accessibility',
    category: 'Rights',
    date: 'Oct 15, 2024',
    updatedAt: 'Oct 16, 2024',
    authorName: 'Carlos Mendez',
    authorAvatar: 'CM',
    excerpt: 'How student coalitions are successfully demanding better physical and digital infrastructure for disabled students.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSLIbeQRhZIQMdptoPJYLgFbwO5-HRf4uE0uAJqRBZ-gh4qttxl2OCnh2iX5uX3hGIC8w0McOzrBEFdXFHnGJobxTafdh5CDliDUS1N4KzOj8o1SRUSuUaQyF_dHn3tm0N1pN_qlcoiDRgkJvEO_VP4WiFszF3tzU_GoI_-2XR-6JTmIoBwS-tNxsY5UL2EBs1Hd2i9MdEz3HxaIoufkbi4aZTRThmogxer4F7_Y0tBYIMOyLCq6ARbNv7d-yEASw8zuuD6MLjc5s',
    readTime: '5 min read'
  },
  {
    id: 'vic-1',
    slug: 'massive-tuition-refund',
    title: 'Massive Tuition Refund Secured for Spring Cohort',
    category: 'Victory',
    date: 'Oct 12, 2023',
    updatedAt: 'Oct 15, 2023',
    excerpt: 'After a semester of inadequate online instruction, our coalition successfully negotiated a 15% tuition rebate for all students affected by the mid-semester changes. We leveraged massive student audits and persistent outreach.',
    authorName: 'Finance Audit Team',
    authorAvatar: 'FA',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNvG7YaMrOVkHs4FnDP9UAsjD2L4YZqwUT40V6UZxR3cMTYaqVgcsPFYtmCiiBwiqnWVAqjhFZ39r-R0LUa9o-qSLR_buDkBJJaME9_kmJi8YunYLnr2A3MERX7CAVarrHyJIaJi9eYqSMA_43M5MKxxusoisHik6jw5-L3TfLpZURpFPOgMtVlkEQJ97Cu45IU-R6viDqOcbdifEr_IZy9dQBNVQ6GQZQCEs1fJMHvFm3cwsrW6cF8AGI7-T_vimV1Akz51SBQFc',
    readTime: '3 min read'
  },
  {
    id: 'vic-2',
    slug: 'emergency-housing-rights-secured',
    title: 'Emergency Housing Rights Secured for Dorm Evictees',
    category: 'Victory',
    date: 'Sep 28, 2023',
    updatedAt: 'Sep 29, 2023',
    excerpt: 'Blocked sudden dorm closures and secured temporary hotel accommodations for 200+ students after university administration attempted mid-semester eviction without proper 30-day notice or adequate relocation compensation.',
    authorName: 'Housing Coalition',
    authorAvatar: 'HC',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA-nFqnc94o870noLBfW5T_ogMxQtDhGmd3LpKTNN2uWwABM7MHUR8GaI-uDy3Zk0U62oGt61LM5jksEBK2aJi4wYYz5psa3m18rCGFe38wsPQWOviETu1AvhYwK6TZmk_N9cN9i7gSDx9hdL6ORFOMDZx-PoyPmimWsxfW7CEvi9M4GfAh3gZiUTI_13UxXGUCNxpLyCDKrzkxssq6x5K5-zHIXJ1pQZEKdlCAJrcud28aA5NMLC5fYAxwOYr3u6WIu-5ht6j5XM',
    readTime: '4 min read'
  },
  {
    id: 'vic-3',
    slug: 'overturned-unfair-grading',
    title: 'Overturned Unfair Departmental Grading Curve',
    category: 'Victory',
    date: 'Sep 15, 2023',
    updatedAt: 'Sep 16, 2023',
    excerpt: 'Investigated and dismantled a discriminatory curve system in the Engineering department, resulting in grade adjustments for over 400 affected students and establishing a new syllabus transparency policy.',
    authorName: 'Academic Rights Team',
    authorAvatar: 'AR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSLIbeQRhZIQMdptoPJYLgFbwO5-HRf4uE0uAJqRBZ-gh4qttxl2OCnh2iX5uX3hGIC8w0McOzrBEFdXFHnGJobxTafdh5CDliDUS1N4KzOj8o1SRUSuUaQyF_dHn3tm0N1pN_qlcoiDRgkJvEO_VP4WiFszF3tzU_GoI_-2XR-6JTmIoBwS-tNxsY5UL2EBs1Hd2i9MdEz3HxaIoufkbi4aZTRThmogxer4F7_Y0tBYIMOyLCq6ARbNv7d-yEASw8zuuD6MLjc5s',
    readTime: '4 min read'
  }
];

export interface TrendingItem {
  number: number;
  category: string;
  title: string;
}

export const trendingArticles: TrendingItem[] = [
  {
    number: 1,
    category: 'Rights',
    title: 'Understanding Your Rights in Academic Disciplinary Hearings'
  },
  {
    number: 2,
    category: 'Fees',
    title: 'Top 10 Scholarships for First-Generation Students'
  },
  {
    number: 3,
    category: 'Rights',
    title: 'Mental Health Resources Every Student Should Know About'
  },
  {
    number: 4,
    category: 'Rights',
    title: 'How to Organize a Successful Campus Protest Safely'
  }
];
