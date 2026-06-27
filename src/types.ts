export type Tab = 'home' | 'blog' | 'colleges' | 'get-help';

export type BlogCategory = 
  | "Fees" 
  | "Documents" 
  | "Admissions" 
  | "Hostel" 
  | "Transfer" 
  | "Rights" 
  | "Victory";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: BlogCategory;
  date: string;
  authorName: string;
  authorAvatar: string;
  excerpt: string;
  image: string;
  content?: string;
  readTime?: string;
  updatedAt?: string;
}

export interface TransparencyScore {
  feeStructurePublished: number; // 0-25
  grievanceResponseRate: number; // 0-25
  documentReleaseRecord: number; // 0-25
  capitationComplaintHistory: number; // 0-25
  total: number; // 0-100
}

export interface Course {
  id: string;
  name: string;
  approvedTuition: number;
  reportedTotalAsk: number;
  placementRate: number;
  duration?: string;
}

export interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  collegeType: string;
  approvalStatus: string;
  logoText: string;
  rating: number;
  image: string;
  tags: string[];
  description: string;
  transparencyScore: TransparencyScore;
  capitationReports: number;
  marksheetComplaints: number;
  grievanceOfficerListed: boolean;
  courses: Course[];
}

export interface Review {
  id: string;
  collegeName: string;
  rating: number;
  authorName: string;
  cohort: string;
  title: string;
  text: string;
  tags: string[];
  date: string;
}

export interface SupportRequest {
  id: string;
  urgency: 'critical' | 'high' | 'standard';
  firstName: string;
  lastName: string;
  email: string;
  contactNumber?: string;
  address?: string;
  contactMethod: 'Email' | 'Phone Call' | 'Secure Message';
  category?: string;
  collegeName?: string;
  title?: string;
  description?: string;
  referenceNumber: string;
  createdAt: string;
}
