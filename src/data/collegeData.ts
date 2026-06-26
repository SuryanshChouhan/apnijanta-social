import { College, Review } from '../types';
import { formatINR } from '../utils/format';

export const defaultColleges: College[] = [
  {
    id: 'college-test-1',
    name: '[TEST] Engineering College A',
    location: 'Pune',
    state: 'Maharashtra',
    collegeType: 'Engineering',
    approvalStatus: 'AICTE Approved',
    logoText: 'TEA',
    approvedTuition: 180000,
    reportedTotalAsk: 280000,
    tuition: formatINR(180000) + '/yr',
    placementRate: 68,
    rating: 2.5,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop',
    tags: ['Capitation Fee Reports', 'Engineering', 'Maharashtra'],
    description: 'This is a test placeholder for a tier-2 engineering college. The gap between approved fees and reported asks is high.',
    transparencyScore: {
      feeStructurePublished: 10,
      grievanceResponseRate: 5,
      documentReleaseRecord: 15,
      capitationComplaintHistory: 4,
      total: 34
    },
    capitationReports: 12,
    marksheetComplaints: 3,
    grievanceOfficerListed: false
  },
  {
    id: 'college-test-2',
    name: '[TEST] Medical Institute B',
    location: 'Bangalore',
    state: 'Karnataka',
    collegeType: 'Medical',
    approvalStatus: 'Under Review',
    logoText: 'TMI',
    approvedTuition: 550000,
    reportedTotalAsk: 1200000,
    tuition: formatINR(550000) + '/yr',
    placementRate: 88,
    rating: 3.2,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    tags: ['Marksheet Complaints', 'Medical', 'Karnataka'],
    description: 'Test placeholder for a private medical college. High placement but severe marksheet withholding complaints.',
    transparencyScore: {
      feeStructurePublished: 20,
      grievanceResponseRate: 15,
      documentReleaseRecord: 5,
      capitationComplaintHistory: 5,
      total: 45
    },
    capitationReports: 8,
    marksheetComplaints: 14,
    grievanceOfficerListed: true
  },
  {
    id: 'college-test-3',
    name: '[TEST] Tech Academy C',
    location: 'Chennai',
    state: 'Tamil Nadu',
    collegeType: 'Engineering',
    approvalStatus: 'AICTE Approved',
    logoText: 'TAC',
    approvedTuition: 125000,
    reportedTotalAsk: 140000,
    tuition: formatINR(125000) + '/yr',
    placementRate: 85,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop',
    tags: ['Transparent', 'Engineering', 'Tamil Nadu'],
    description: 'Test placeholder for a highly transparent institution with minimal hidden fees and excellent grievance response.',
    transparencyScore: {
      feeStructurePublished: 25,
      grievanceResponseRate: 22,
      documentReleaseRecord: 25,
      capitationComplaintHistory: 20,
      total: 92
    },
    capitationReports: 0,
    marksheetComplaints: 0,
    grievanceOfficerListed: true
  },
  {
    id: 'college-test-4',
    name: '[TEST] Management School D',
    location: 'Delhi',
    state: 'Delhi NCR',
    collegeType: 'Management',
    approvalStatus: 'Flagged',
    logoText: 'TMS',
    approvedTuition: 450000,
    reportedTotalAsk: 650000,
    tuition: formatINR(450000) + '/yr',
    placementRate: 70,
    rating: 2.1,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    tags: ['Hostel Fee Bundling', 'Management', 'Delhi NCR'],
    description: 'Test placeholder. Known for mandatory hostel bundling pushing total ask way beyond the approved fee structure.',
    transparencyScore: {
      feeStructurePublished: 5,
      grievanceResponseRate: 0,
      documentReleaseRecord: 10,
      capitationComplaintHistory: 10,
      total: 25
    },
    capitationReports: 5,
    marksheetComplaints: 2,
    grievanceOfficerListed: false
  }
];

export const defaultReviews: Review[] = [
  {
    id: 'rev-1',
    collegeName: '[TEST] Engineering College A',
    rating: 2.5,
    authorName: 'Anonymous Student',
    cohort: "Class of '25 • Engineering",
    title: 'Capitation fee demanded in cash.',
    text: 'During admission, they asked for an extra ₹1,00,000 in cash under the table for a "development fund". They refused to give a receipt.',
    tags: ['Capitation Fee', 'No Receipt'],
    date: 'Oct 12, 2023'
  },
  {
    id: 'rev-2',
    collegeName: '[TEST] Management School D',
    rating: 2.0,
    authorName: 'Verified Alumnus',
    cohort: "Class of '23 • Management",
    title: 'Forced to pay for a hostel I didn\'t use.',
    text: 'Even though my house is 5km away, they made hostel fees mandatory for the first year. It added ₹1.5L to my total cost illegally.',
    tags: ['Hostel Bundling', 'Hidden Fees'],
    date: 'Sep 28, 2023'
  }
];
