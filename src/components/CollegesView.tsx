"use client";
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { College, Review } from '../types';
import { formatINR } from '../utils/format';
import { 
  Search, MapPin, Star, GraduationCap, ShieldAlert, CheckCircle, 
  BookOpen, Plus, Sparkles, Filter, ChevronRight, Scale, HeartPulse, 
  AlertTriangle, DollarSign, Activity, FileText, ArrowRight, Award, Trash, X
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

export default function CollegesView() {
  const { reviewsList, handleAddReview: addReview, collegeList } = useGlobal();
  const navigate = useRouter();
  const [subTab, setSubTab] = useState<'explorer' | 'scholarships' | 'scam' | 'fee' | 'legal' | 'mental'>('explorer');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filters
  const [selectedState, setSelectedState] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedIssue, setSelectedIssue] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Transparency Score');
  
  // Comparison Tool State
  const [comparisonList, setComparisonList] = useState<College[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  // Scam Checker state
  const [admissionLetterStatus, setAdmissionLetterStatus] = useState<'idle' | 'scanning' | 'clean' | 'suspicious'>('idle');
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Constants for Filters
  const STATES = ['All', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Delhi NCR', 'Telangana', 'Gujarat', 'Uttar Pradesh'];
  const TYPES = ['All', 'Engineering', 'Medical', 'Management', 'Arts & Science', 'Law'];
  const ISSUES = ['All', 'Capitation Fee Reports', 'Marksheet Complaints', 'Hostel Fee Bundling', 'Affiliation Issues'];
  const STATUSES = ['All', 'AICTE Approved', 'UGC Recognised', 'Under Review', 'Flagged'];
  const SORTS = ['Transparency Score', 'Most Complaints', 'Recently Added', 'Alphabetical'];

  const SCHOLARSHIPS = [
    { name: 'AICTE Pragati Scholarship', authority: 'AICTE', amount: '₹50,000/yr', deadline: 'Oct 31, 2026', eligibility: 'Girls in technical education', link: '/get-help' },
    { name: 'AICTE Saksham Scholarship', authority: 'AICTE', amount: '₹50,000/yr', deadline: 'Oct 31, 2026', eligibility: 'Differently abled students', link: '/get-help' },
    { name: 'PM Yasasvi Scheme', authority: 'Ministry of Social Justice', amount: '₹75,000 - ₹1,25,000', deadline: 'Nov 15, 2026', eligibility: 'OBC/EBC students', link: '/get-help' },
    { name: 'Ishan Uday Special Scholarship', authority: 'UGC', amount: '₹5,400 - ₹7,800/month', deadline: 'Nov 30, 2026', eligibility: 'NE region students', link: '/get-help' },
  ];

  const sidebarMenu = [
    { id: 'explorer', label: 'College Explorer', icon: GraduationCap },
    { id: 'scholarships', label: 'Scholarships Finder', icon: Award },
    { id: 'scam', label: 'Scam Alerts & Guide', icon: ShieldAlert },
    { id: 'fee', label: 'Fee Verification', icon: DollarSign },
    { id: 'legal', label: 'Legal Aid & Counsel', icon: Scale },
    { id: 'mental', label: 'Mental Health Support', icon: HeartPulse },
  ];

  // Filtered colleges
  const filteredColleges = useMemo(() => {
    let result = collegeList.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === 'All' || college.state === selectedState;
      const matchesType = selectedType === 'All' || college.collegeType === selectedType;
      const matchesIssue = selectedIssue === 'All' || college.tags.includes(selectedIssue);
      const matchesStatus = selectedStatus === 'All' || college.approvalStatus === selectedStatus;
      
      return matchesSearch && matchesState && matchesType && matchesIssue && matchesStatus;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'Transparency Score') return b.transparencyScore.total - a.transparencyScore.total;
      if (sortBy === 'Most Complaints') return (b.capitationReports + b.marksheetComplaints) - (a.capitationReports + a.marksheetComplaints);
      if (sortBy === 'Alphabetical') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [searchQuery, selectedState, selectedType, selectedIssue, selectedStatus, sortBy, collegeList]);

  const toggleComparison = (college: College) => {
    if (comparisonList.some(c => c.id === college.id)) {
      setComparisonList(comparisonList.filter(c => c.id !== college.id));
    } else {
      if (comparisonList.length >= 3) {
        alert('You can compare a maximum of 3 colleges at once.');
        return;
      }
      setComparisonList([...comparisonList, college]);
    }
  };

  const handleScanLetter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      setAdmissionLetterStatus('scanning');
      setTimeout(() => {
        if (file.name.toLowerCase().includes('clean')) {
          setAdmissionLetterStatus('clean');
        } else {
          setAdmissionLetterStatus('suspicious');
        }
      }, 2500);
    }
  };

  return (
    <div className="animate-fade-in duration-300 pt-32 pb-20 bg-gray-50/50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. Left Sidebar (Navigation + Filters) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Navigation Menu */}
            <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">Discovery Hub</p>
              <div className="flex flex-col gap-1">
                {sidebarMenu.map((item) => {
                  const Icon = item.icon;
                  const isActive = subTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setSubTab(item.id as any); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <button 
                  onClick={() => navigate.push('/get-help')}
                  className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 border border-red-200 cursor-pointer transition-all"
                >
                  <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
                  Urgent Support Portal
                </button>
              </div>
            </div>

            {/* Filters (Only visible when Explorer is active) */}
            {subTab === 'explorer' && (
              <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-5">
                {/* Search */}
                <div className="relative">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search colleges..."
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                </div>

              </div>
            )}
          </div>

          {/* 2. Middle Main Dynamic Content Column */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* SUB-TAB: COLLEGE EXPLORER */}
            {subTab === 'explorer' && (
              <>
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <GraduationCap className="w-3.5 h-3.5" /> Honest College Truths
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight">
                    Find Verified College Data
                  </h1>
                  <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed max-w-3xl">
                    Skip the glossy marketing brochures. Access verified tuition fees, actual placement statistics, and expose hidden institutional costs before you commit to a campus.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-amber-800 text-xs sm:text-sm font-medium">
                    <strong>This directory is being populated.</strong> The data below contains safe test placeholders for demonstration. 
                    <button className="font-bold underline ml-1 cursor-pointer hover:text-amber-900 transition-colors">Submit your college's data here &rarr;</button>
                  </p>
                </div>

                <div className="space-y-6">
                  {collegeList.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-sm bg-white border border-gray-100 rounded-2xl animate-pulse">
                      Loading verified college directory...
                    </div>
                  ) : filteredColleges.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 text-sm bg-white border border-gray-100 rounded-2xl">
                      No colleges match your strict filters.
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 gap-6">
                    {filteredColleges.map((college) => {
                      const isComparing = comparisonList.some(c => c.id === college.id);
                      const maxFeeGap = Math.max(0, ...(college.courses || []).map(c => c.reportedTotalAsk - c.approvedTuition));
                      const feeGap = Number.isFinite(maxFeeGap) ? maxFeeGap : 0;
                      const maxApprovedFee = Math.max(0, ...(college.courses || []).map(c => c.approvedTuition));
                      const maxReportedAsk = Math.max(0, ...(college.courses || []).map(c => c.reportedTotalAsk));

                      return (
                        <div key={college.id} onClick={() => setSelectedCollege(college)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 cursor-pointer">
                          
                          {/* Photo */}
                          <div className="w-full sm:w-48 aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shrink-0 relative group">
                            <img 
                              src={college.image} 
                              alt={college.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-2 left-2 bg-indigo-600/90 text-white text-[9px] font-black uppercase px-2 py-1 rounded-md shadow-sm backdrop-blur-sm">
                              {college.approvalStatus}
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <h3 className="text-lg font-extrabold text-gray-900">{college.name}</h3>
                                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {college.location}, {college.state} • {college.collegeType}
                                  </p>
                                </div>
                                <div className="text-right group/tooltip relative">
                                  <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-3 py-2 rounded-xl">
                                    <span className="text-xl font-black text-gray-900 leading-none">{college.transparencyScore.total}</span>
                                    <span className="text-xs text-gray-400 font-bold">/100</span>
                                  </div>
                                  <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mt-1">Transparency</p>
                                  
                                  {/* Hover tooltip for score breakdown */}
                                  <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 text-white p-4 rounded-2xl hidden group-hover/tooltip:block z-20 shadow-xl text-left">
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-700 pb-2 mb-2">Score Methodology</h4>
                                    <div className="space-y-2 text-xs font-medium">
                                      <div className="flex justify-between"><span>Fee Structure Published</span><span className="text-indigo-300">{college.transparencyScore.feeStructurePublished}/25</span></div>
                                      <div className="flex justify-between"><span>Grievance Response</span><span className="text-indigo-300">{college.transparencyScore.grievanceResponseRate}/25</span></div>
                                      <div className="flex justify-between"><span>Document Release</span><span className="text-indigo-300">{college.transparencyScore.documentReleaseRecord}/25</span></div>
                                      <div className="flex justify-between"><span>Capitation Record</span><span className="text-indigo-300">{college.transparencyScore.capitationComplaintHistory}/25</span></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <div>
                                  <p className="text-[9px] font-bold uppercase text-gray-400 mb-0.5">Approved Fee</p>
                                  <p className="text-sm font-bold text-gray-900">{maxApprovedFee > 0 ? formatINR(maxApprovedFee) : 'N/A'}</p>
                                </div>
                                <div>
                                  <p className="text-[9px] font-bold uppercase text-gray-400 mb-0.5">Reported Total Ask</p>
                                  <div className="flex items-center gap-2">
                                    <p className={`text-sm font-bold ${feeGap > 0 ? 'text-red-600' : 'text-gray-900'}`}>{maxReportedAsk > 0 ? formatINR(maxReportedAsk) : 'N/A'}</p>
                                    {feeGap > 0 && <span className="bg-red-100 text-red-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border border-red-200">GAP: {formatINR(feeGap)}</span>}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-5 flex items-center justify-between">
                              <div className="flex flex-wrap gap-1.5">
                                {college.tags.slice(0, 3).map(tag => (
                                  <span key={tag} className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleComparison(college); }}
                                className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                                  isComparing ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                }`}
                              >
                                {isComparing ? 'Comparing' : 'Compare'}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* SUB-TAB: SCAM ALERTS & SCANNER */}
            {subTab === 'scam' && (
              <div className="space-y-6 max-w-4xl">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-red-100">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-500" /> Protection Protocol
                  </span>
                  <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">Scam Alerts & Validator</h1>
                  <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed">
                    Institutional scammers often forge offer letters or charge fictitious placement reservation fees. Scan documents to expose verified red-flags instantly.
                  </p>
                </div>

                <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center space-y-4 hover:border-indigo-400 transition-colors">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Upload Offer Letter or Fee Demand</p>
                    <p className="text-xs text-gray-400 mt-1">Files are analyzed client-side and not stored.</p>
                  </div>
                  <label className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md transition-all active:scale-95">
                    <span>Choose File</span>
                    <input 
                      type="file" 
                      onChange={handleScanLetter}
                      className="hidden" 
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </label>

                  {uploadedFileName && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs text-gray-600 inline-flex items-center gap-2 border border-gray-100">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-bold max-w-[200px] truncate">{uploadedFileName}</span>
                    </div>
                  )}
                </div>

                {admissionLetterStatus === 'scanning' && (
                  <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-4 text-indigo-700 animate-pulse">
                    <Activity className="w-6 h-6 animate-spin" />
                    <div>
                      <p className="font-bold text-sm">Analyzing document...</p>
                      <p className="text-xs text-indigo-500 mt-0.5">Cross-referencing fee structures and regulatory compliance models.</p>
                    </div>
                  </div>
                )}

                {admissionLetterStatus === 'suspicious' && (
                  <div className="p-6 border border-red-200 bg-red-50 text-red-900 rounded-2xl space-y-4 shadow-sm">
                    <h3 className="font-extrabold text-lg flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-5 h-5 text-red-600 animate-bounce" /> 3 Potential Issues Found
                    </h3>
                    <ul className="space-y-2 text-sm text-red-800 font-medium list-disc pl-5">
                      <li>Fee amount exceeds AICTE approved limit by <span className="font-bold">₹45,000</span></li>
                      <li>Management quota seat availability is not disclosed upfront in the breakdown.</li>
                      <li>No grievance officer contact listed (mandatory under UGC guidelines).</li>
                    </ul>
                    <div className="pt-4 mt-2 border-t border-red-200">
                      <button onClick={() => navigate.push('/get-help')} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md flex items-center gap-1.5 transition-all">
                        Submit This Document for Review <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {admissionLetterStatus === 'clean' && (
                  <div className="p-6 border border-emerald-200 bg-emerald-50 text-emerald-900 rounded-2xl space-y-3 shadow-sm">
                    <h3 className="font-extrabold text-lg flex items-center gap-2 text-emerald-700">
                      <CheckCircle className="w-5 h-5 text-emerald-600" /> Document Appears Standard
                    </h3>
                    <p className="text-sm font-medium text-emerald-800 leading-relaxed">
                      No immediate red flags were detected based on standard UGC/AICTE formatting and fee disclosures. All central routing numbers appear to align.
                    </p>
                    <div className="pt-4 mt-2 border-t border-emerald-200">
                      <p className="text-xs text-emerald-700 font-bold mb-2">Still have concerns about hidden clauses?</p>
                      <button onClick={() => navigate.push('/get-help')} className="px-5 py-2 bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-bold text-xs rounded-xl cursor-pointer transition-colors">
                        Submit for Manual Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SUB-TAB: SCHOLARSHIPS FINDER */}
            {subTab === 'scholarships' && (
              <div className="space-y-6 max-w-4xl">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                    <Award className="w-3.5 h-3.5 text-emerald-500" /> Financial Aid Tracker
                  </span>
                  <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">Scholarships Directory</h1>
                  <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed">
                    Access verified peer funding, direct student advocacy scholarships, and state aid programs designed specifically for first generation or marginalized demographics.
                  </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-gray-50 text-gray-600 text-[10px] uppercase tracking-wider border-b border-gray-200">
                        <tr>
                          <th className="p-4 font-extrabold">Scholarship Name</th>
                          <th className="p-4 font-extrabold">Authority</th>
                          <th className="p-4 font-extrabold">Amount</th>
                          <th className="p-4 font-extrabold">Eligibility</th>
                          <th className="p-4 font-extrabold">Deadline</th>
                          <th className="p-4 font-extrabold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-800 bg-white">
                        {SCHOLARSHIPS.map((schol, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-bold text-gray-900">{schol.name}</td>
                            <td className="p-4 text-xs font-medium text-gray-500">{schol.authority}</td>
                            <td className="p-4 font-bold text-emerald-600 bg-emerald-50/50">{schol.amount}</td>
                            <td className="p-4 text-xs font-medium">{schol.eligibility}</td>
                            <td className="p-4 text-red-500 font-bold text-xs">{schol.deadline}</td>
                            <td className="p-4">
                              <button onClick={() => navigate.push(schol.link)} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1">
                                Apply / Mentor <ArrowRight className="w-3 h-3" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* OTHER TABS (fee, legal, mental) */}
            {(subTab === 'fee' || subTab === 'legal' || subTab === 'mental') && (
              <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm text-center space-y-4 max-w-2xl mx-auto mt-12">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  {subTab === 'fee' && 'Fee Verification Tool'}
                  {subTab === 'legal' && 'Legal Aid & Counsel Directory'}
                  {subTab === 'mental' && 'Mental Health Care Equity'}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We are currently organizing legal aid clinics, student advocate mental health circles, and tuition audits in partnership with qualified professionals in India.
                </p>
                <button 
                  onClick={() => navigate.push('/get-help')}
                  className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl cursor-pointer active:scale-95 transition-all shadow-md inline-flex"
                >
                  Request Early Access
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* ---------------- FIXED BOTTOM COMPARE BAR ---------------- */}
      {comparisonList.length > 0 && !showCompareModal && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-40 animate-fade-in flex justify-between items-center">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 overflow-x-auto">
              <span className="text-gray-900 font-extrabold text-sm hidden md:inline-block">Compare ({comparisonList.length}/3):</span>
              {comparisonList.map(c => (
                <span key={c.id} className="bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
                  {c.name}
                  <button onClick={() => toggleComparison(c)} className="hover:text-red-500 text-indigo-400 bg-white rounded-full p-0.5 shadow-sm"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <button 
              onClick={() => setShowCompareModal(true)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shrink-0 cursor-pointer ml-4 transition-all"
            >
              View Comparison Sheet
            </button>
          </div>
        </div>
      )}

      {/* ---------------- COMPARISON MODAL ---------------- */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative animate-scale-up shadow-2xl">
            
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10 rounded-t-3xl shadow-sm">
              <div>
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" /> Comparison Deck
                </h2>
                <p className="text-xs text-gray-500 mt-1 font-medium">Review approved vs reported fees and transparency metrics side-by-side.</p>
              </div>
              <button onClick={() => setShowCompareModal(false)} className="text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-x-auto bg-gray-50/30">
              <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px] border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th className="p-4 w-1/4"></th>
                    {comparisonList.map(col => (
                      <th key={col.id} className="p-4 bg-white border border-gray-200 rounded-t-2xl font-extrabold text-lg text-gray-900 text-center shadow-sm">
                        {col.name}
                        <p className="text-xs text-gray-500 font-medium mt-1">{col.location}, {col.state}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  <tr>
                    <td className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Approved Annual Fee</td>
                    {comparisonList.map(col => {
                      const maxApproved = Math.max(0, ...(col.courses || []).map(c => c.approvedTuition));
                      return <td key={col.id} className="p-4 border-x border-gray-200 bg-white font-bold text-center">{maxApproved > 0 ? formatINR(maxApproved) : 'N/A'}</td>
                    })}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Max Total Ask</td>
                    {comparisonList.map(col => {
                      const maxAsk = Math.max(0, ...(col.courses || []).map(c => c.reportedTotalAsk));
                      return <td key={col.id} className="p-4 border-x border-gray-200 bg-white font-extrabold text-red-600 text-center">{maxAsk > 0 ? formatINR(maxAsk) : 'N/A'}</td>
                    })}
                  </tr>
                  <tr>
                    <td className="p-4 font-black text-gray-900 text-sm">Gap (Hidden Fees)</td>
                    {comparisonList.map(col => {
                      const gap = Math.max(0, ...(col.courses || []).map(c => c.reportedTotalAsk - c.approvedTuition));
                      return (
                        <td key={col.id} className="p-4 border-x border-gray-200 bg-red-50/50 font-black text-lg text-center">
                          {gap > 0 ? <span className="text-red-600 flex items-center justify-center gap-1 bg-red-100 px-3 py-1 rounded-lg w-max mx-auto border border-red-200">⚠️ {formatINR(gap)}</span> : <span className="text-emerald-600 flex items-center justify-center gap-1"><CheckCircle className="w-4 h-4"/> None</span>}
                        </td>
                      )
                    })}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Capitation Reports</td>
                    {comparisonList.map(col => <td key={col.id} className="p-4 border-x border-gray-200 bg-white font-medium text-center">{col.capitationReports} filed</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Marksheet Complaints</td>
                    {comparisonList.map(col => <td key={col.id} className="p-4 border-x border-gray-200 bg-white font-medium text-center">{col.marksheetComplaints} open</td>)}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">AICTE / UGC Status</td>
                    {comparisonList.map(col => <td key={col.id} className="p-4 border-x border-gray-200 bg-white font-bold text-center">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs">{col.approvalStatus}</span>
                    </td>)}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Grievance Officer</td>
                    {comparisonList.map(col => (
                      <td key={col.id} className="p-4 border-x border-gray-200 bg-white text-center">
                        {col.grievanceOfficerListed ? <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg text-xs inline-flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Listed</span> : <span className="text-red-600 font-bold bg-red-50 px-3 py-1 rounded-lg text-xs inline-flex items-center gap-1"><X className="w-3 h-3" /> Not listed</span>}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Transparency Score</td>
                    {comparisonList.map(col => <td key={col.id} className="p-4 border-x border-b border-gray-200 bg-white font-black text-2xl text-center rounded-b-2xl">{col.transparencyScore.total}<span className="text-sm text-gray-400 font-normal">/100</span></td>)}
                  </tr>
                  <tr>
                    <td className="p-4"></td>
                    {comparisonList.map(col => (
                      <td key={col.id} className="p-4 text-center">
                         <button onClick={() => {setShowCompareModal(false); navigate.push('/get-help');}} className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-colors shadow-sm">
                           Report an Issue &rarr;
                         </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}
        {/* Compare Modal */}
        {showCompareModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <button onClick={() => setShowCompareModal(false)} className="bg-white p-4 rounded-xl font-bold">Close Compare</button>
          </div>
        )}

        {/* College Details & Courses Modal */}
        {selectedCollege && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] overflow-y-auto p-4 sm:p-8" onClick={() => setSelectedCollege(null)}>
            <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl relative mx-auto my-4 sm:my-8" onClick={(e) => e.stopPropagation()}>
              
              {/* Header */}
              <div className="relative h-48 sm:h-64 rounded-t-3xl overflow-hidden bg-gray-100">
                <img src={selectedCollege.image} alt={selectedCollege.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                <button 
                  onClick={() => setSelectedCollege(null)}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider rounded-lg mb-2 shadow-sm">
                    {selectedCollege.collegeType}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white">{selectedCollege.name}</h2>
                  <p className="text-indigo-100 text-sm font-medium mt-1 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {selectedCollege.location}, {selectedCollege.state}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Description & Tags */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedCollege.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg">{tag}</span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedCollege.description || "No description provided."}</p>
                </div>

                {/* Courses List */}
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" /> Programs & Fee Structures
                  </h3>
                  
                  {(!selectedCollege.courses || selectedCollege.courses.length === 0) ? (
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center">
                      <p className="text-gray-500 font-medium text-sm">No course data has been submitted for this college yet.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {selectedCollege.courses.map((course) => {
                        const gap = course.reportedTotalAsk - course.approvedTuition;
                        const hasGap = gap > 0;
                        return (
                          <div key={course.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-indigo-400 transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">{course.name}</h4>
                            </div>
                            <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-8 shrink-0">
                              <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Approved Fee</span>
                                <span className="font-bold text-gray-700">{formatINR(course.approvedTuition)}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Total Ask</span>
                                <div className="flex items-center gap-2">
                                  <span className={`font-bold ${hasGap ? 'text-red-600' : 'text-gray-900'}`}>{formatINR(course.reportedTotalAsk)}</span>
                                  {hasGap && <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-[9px] font-black border border-red-100">+{formatINR(gap)}</span>}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Placement</span>
                                <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg w-max">{course.placementRate}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Transparency Score */}
                <div className="bg-indigo-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center gap-8">
                  <div className="shrink-0 text-center">
                    <div className="w-32 h-32 rounded-full border-4 border-indigo-500/30 flex items-center justify-center flex-col relative bg-indigo-900/50">
                      <span className="text-4xl font-black">{selectedCollege.transparencyScore.total}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">/ 100</span>
                      {selectedCollege.transparencyScore.total >= 80 && (
                        <div className="absolute -bottom-2 bg-emerald-500 text-white text-[9px] font-black uppercase px-2 py-1 rounded-md shadow-lg border border-emerald-400">
                          Excellent
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-indigo-400" /> Transparency Breakdown
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-medium text-indigo-200"><span>Fee Structure Published</span> <span>{selectedCollege.transparencyScore.feeStructurePublished}/25</span></div>
                        <div className="w-full bg-indigo-900 h-1.5 rounded-full overflow-hidden"><div className="bg-indigo-400 h-full" style={{width: `${(selectedCollege.transparencyScore.feeStructurePublished/25)*100}%`}}></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-medium text-indigo-200"><span>Grievance Response</span> <span>{selectedCollege.transparencyScore.grievanceResponseRate}/25</span></div>
                        <div className="w-full bg-indigo-900 h-1.5 rounded-full overflow-hidden"><div className="bg-indigo-400 h-full" style={{width: `${(selectedCollege.transparencyScore.grievanceResponseRate/25)*100}%`}}></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-medium text-indigo-200"><span>Document Release</span> <span>{selectedCollege.transparencyScore.documentReleaseRecord}/25</span></div>
                        <div className="w-full bg-indigo-900 h-1.5 rounded-full overflow-hidden"><div className="bg-indigo-400 h-full" style={{width: `${(selectedCollege.transparencyScore.documentReleaseRecord/25)*100}%`}}></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-medium text-indigo-200"><span>Capitation Clean Record</span> <span>{selectedCollege.transparencyScore.capitationComplaintHistory}/25</span></div>
                        <div className="w-full bg-indigo-900 h-1.5 rounded-full overflow-hidden"><div className="bg-indigo-400 h-full" style={{width: `${(selectedCollege.transparencyScore.capitationComplaintHistory/25)*100}%`}}></div></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

    </div>
  );
}



