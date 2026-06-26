"use client";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SupportRequest, Tab } from '../types';
import { 
  Lock, Shield, Clock, PhoneCall, Mail, MessageSquare, AlertTriangle, 
  CheckCircle, ArrowRight, Upload, GraduationCap, Landmark, Home, 
  HeartPulse, FileText, Trash, ChevronRight, Sparkles, School
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

export default function GetHelpView() {
  const { handleAddSupportRequest: addSupportRequest } = useGlobal();
  const navigate = useRouter();
  const [step, setStep] = useState(1);
  
  // Form State
  const [urgency, setUrgency] = useState<SupportRequest['urgency']>('Standard Support');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactMethod, setContactMethod] = useState<SupportRequest['contactMethod']>('Email');
  const [category, setCategory] = useState('Financial (Aid/Fees)');
  const [collegeName, setCollegeName] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // File Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Completed Request Data for Success View
  const [submittedCase, setSubmittedCase] = useState<SupportRequest | null>(null);

  const categories = [
    { label: 'Academic (Grading/Discipline)', icon: GraduationCap, color: 'text-blue-500 bg-blue-50' },
    { label: 'Financial (Aid/Fees)', icon: Landmark, color: 'text-emerald-500 bg-emerald-50' },
    { label: 'Housing/Dorm Space', icon: Home, color: 'text-amber-500 bg-amber-50' },
    { label: 'Mental Health/Wellness', icon: HeartPulse, color: 'text-red-500 bg-red-50' },
    { label: 'Other Inquiries', icon: AlertTriangle, color: 'text-indigo-500 bg-indigo-50' }
  ];

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!firstName.trim() || !lastName.trim()) {
        alert('Please provide your first and last name to proceed.');
        return;
      }
    }
    if (step === 3) {
      if (!collegeName.trim() || !issueTitle.trim() || !description.trim()) {
        alert('Please fill out the institution name, issue title, and detailed description.');
        return;
      }
    }
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handleBackStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const referenceNumber = `ACT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRequest: SupportRequest = {
      id: `case-${Date.now()}`,
      urgency,
      firstName,
      lastName,
      email: email || 'anonymous@student.edu',
      contactMethod,
      category,
      collegeName,
      title: issueTitle,
      description,
      referenceNumber,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    addSupportRequest(newRequest);
    setSubmittedCase(newRequest);
    setStep(5); // Success step
  };

  const handleResetForm = () => {
    setStep(1);
    setUrgency('Standard Support');
    setFirstName('');
    setLastName('');
    setEmail('');
    setContactMethod('Email');
    setCategory('Financial (Aid/Fees)');
    setCollegeName('');
    setIssueTitle('');
    setDescription('');
    setUploadedFile(null);
    setSubmittedCase(null);
  };

  return (
    <div className="animate-fade-in duration-300 pt-32 pb-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step-by-Step Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Wizard Form Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {step < 5 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <Lock className="w-3.5 h-3.5" /> Privacy First Portal
                  </span>
                  <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">Request Assistance</h1>
                  <p className="text-gray-500 font-medium text-xs sm:text-sm">
                    We are here to support you. Provide the details of your situation below so we can connect you with the right resource channels.
                  </p>
                </div>

                {/* ðŸ§­ Stepper progress bar */}
                <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-400">
                    <span className={step >= 1 ? 'text-indigo-600' : ''}>1. Personal Info</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className={step >= 2 ? 'text-indigo-600' : ''}>2. Category</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className={step >= 3 ? 'text-indigo-600' : ''}>3. Details</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className={step >= 4 ? 'text-indigo-600' : ''}>4. Review</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 transition-all duration-300"
                      style={{ width: `${(step / 4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step Content Wrapper Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* ðŸ›¡ï¸ STEP 1: PERSONAL INFO */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-3">
                      <h3 className="font-extrabold text-sm sm:text-base text-gray-900 uppercase tracking-wide">
                        Urgency & Priority Classification
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { label: 'Standard Support', desc: 'Tuition audits, guide questions, general help. Responds in 24 hrs.' },
                          { label: 'High Priority', desc: 'Disciplinary hearings, grading curve shifts. Responds in 6 hrs.' },
                          { label: 'Critical / Urgent', desc: 'Immediate dorm eviction, safety threats. Responds in 1-2 hrs.' }
                        ].map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => setUrgency(item.label as any)}
                            className={`p-4 text-left border-2 rounded-xl transition-all cursor-pointer ${
                              urgency === item.label
                                ? 'border-indigo-600 bg-indigo-50/20 shadow-sm'
                                : 'border-gray-100 hover:border-indigo-300 bg-white'
                            }`}
                          >
                            <p className="font-bold text-xs sm:text-sm text-gray-900">{item.label}</p>
                            <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-400">First Name</label>
                        <input 
                          type="text" 
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Elena"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-400">Last Name</label>
                        <input 
                          type="text" 
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Gilbert"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-400">Institutional Email (Optional)</label>
                        <input 
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="egilbert@mystichaven.edu"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none"
                        />
                        <p className="text-[9px] text-gray-400">Your details are kept isolated in our secure databases.</p>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-400">Preferred Contact Method</label>
                        <select 
                          value={contactMethod}
                          onChange={(e) => setContactMethod(e.target.value as any)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-700 focus:outline-none"
                        >
                          <option value="Email">Secure Email</option>
                          <option value="Phone Call">Phone Call / Voice Callback</option>
                          <option value="Secure Message">Secure Direct Chat Session</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* ðŸ›¡ï¸ STEP 2: CATEGORY SELECT */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-sm sm:text-base text-gray-900 uppercase tracking-wide">
                        What category fits your dispute?
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">Classifying your case matches you with the appropriate student audit or legal advocate team.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5">
                      {categories.map((item) => {
                        const Icon = item.icon;
                        const isSelected = category === item.label;
                        return (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => setCategory(item.label)}
                            className={`w-full flex items-center gap-4 p-4 text-left border-2 rounded-xl transition-all cursor-pointer ${
                              isSelected
                                ? 'border-indigo-600 bg-indigo-50/20'
                                : 'border-gray-100 hover:border-indigo-300 bg-white'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-xs sm:text-sm text-gray-900">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ðŸ›¡ï¸ STEP 3: DETAILS */}
                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-sm sm:text-base text-gray-900 uppercase tracking-wide">
                        Case Specifics & Supporting Files
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">Please outline your institution and provide clear context so our coordinators can trace policies.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-400">Target Institution / College Name</label>
                        <input 
                          type="text" 
                          required
                          value={collegeName}
                          onChange={(e) => setCollegeName(e.target.value)}
                          placeholder="State University"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-400">Title of Your Dispute</label>
                        <input 
                          type="text" 
                          required
                          value={issueTitle}
                          onChange={(e) => setIssueTitle(e.target.value)}
                          placeholder="Unfair housing charge for Spring syllabus scaling"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-gray-400">Detailed Case Description</label>
                      <textarea 
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please describe exactly what happened. Include relevant dates, syllabus scaling metrics, or amounts charged unfairly..."
                        rows={5}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none resize-none"
                      />
                    </div>

                    {/* INTERACTIVE DRAG & DROP FILE UPLOAD CONTAINER */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400">Syllabus or Letter Upload (Drag & Drop support)</label>
                      
                      <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={triggerFileInput}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center space-y-3 cursor-pointer transition-colors ${
                          isDragOver 
                            ? 'border-indigo-500 bg-indigo-50/30' 
                            : 'border-gray-200 bg-gray-50/50 hover:border-indigo-400'
                        }`}
                      >
                        <input 
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          className="hidden"
                          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                        />
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-800">
                            Drag & drop your files here, or <span className="text-indigo-600">browse</span>
                          </p>
                          <p className="text-[9px] text-gray-400 mt-1">Supports PDF, DOCX, JPG up to 15MB</p>
                        </div>
                      </div>

                      {uploadedFile && (
                        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 flex justify-between items-center text-xs animate-scale-up">
                          <div className="flex items-center gap-2 pr-4 truncate">
                            <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                            <div className="truncate">
                              <p className="font-bold text-gray-800 truncate">{uploadedFile.name}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <button 
                            type="button"
                            onClick={removeFile}
                            className="p-1.5 hover:bg-gray-200/50 rounded-lg text-red-500 transition-colors"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ðŸ›¡ï¸ STEP 4: REVIEW & CONFIRM */}
                {step === 4 && (
                  <div className="space-y-6 animate-fade-in text-xs sm:text-sm">
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-sm sm:text-base text-gray-900 uppercase tracking-wide">
                        Validate Your Submission
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">Verify your classified parameters before formal ticketing. Changes can be retroactive.</p>
                    </div>

                    <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50/50 space-y-3">
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-400 uppercase font-bold text-[10px]">Classification:</span>
                        <strong className="text-gray-900">{urgency}</strong>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-400 uppercase font-bold text-[10px]">Target College:</span>
                        <strong className="text-gray-900">{collegeName}</strong>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-400 uppercase font-bold text-[10px]">Title of Issue:</span>
                        <strong className="text-gray-900">{issueTitle}</strong>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-400 uppercase font-bold text-[10px]">Full Name:</span>
                        <strong className="text-gray-900">{firstName} {lastName}</strong>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-400 uppercase font-bold text-[10px]">Contact Method:</span>
                        <strong className="text-gray-900">{contactMethod} ({email || 'No email provided'})</strong>
                      </div>
                      <div className="pt-2">
                        <span className="text-gray-400 uppercase font-bold text-[10px] block mb-1">Details:</span>
                        <p className="text-gray-600 bg-white p-3 rounded-lg border border-gray-100 leading-relaxed font-medium">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ðŸ›¡ï¸ STEP 5: SUCCESS REDIRECT STATE */}
                {step === 5 && submittedCase && (
                  <div className="space-y-6 text-center py-6 animate-scale-up text-xs sm:text-sm">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    
                    <div className="space-y-2">
                      <h2 className="text-2xl font-black text-gray-900">Case Submitted Successfully</h2>
                      <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                        Your request has been securely encrypted and assigned to an active peer advocacy coordinator. 
                      </p>
                    </div>

                    <div className="max-w-md mx-auto bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3.5 text-left text-xs text-gray-600">
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Case Reference:</span>
                        <strong className="text-indigo-600 font-extrabold">{submittedCase.referenceNumber}</strong>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Assigned Group:</span>
                        <strong className="text-gray-900">{submittedCase.category} Team</strong>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Estimated Response:</span>
                        <strong className="text-emerald-600 font-bold">2-4 Hours</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Privacy Standard:</span>
                        <span className="text-gray-400 font-bold flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-indigo-500" /> Fully Encrypted</span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                      <button 
                        onClick={handleResetForm}
                        className="px-6 py-3 border border-gray-200 hover:border-indigo-500 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-sm active:scale-95"
                      >
                        File Another Case
                      </button>
                      <button 
                        onClick={() => navigate.push('/')}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        Return to Homepage
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Navigation Controls buttons */}
                {step < 5 && (
                  <div className="flex justify-between border-t border-gray-100 pt-5 text-xs">
                    <button
                      type="button"
                      disabled={step === 1}
                      onClick={handleBackStep}
                      className={`px-5 py-2.5 font-bold rounded-xl border cursor-pointer ${
                        step === 1
                          ? 'border-gray-100 text-gray-300 bg-gray-50/50 cursor-not-allowed'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      Back
                    </button>

                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
                      >
                        <span>Next Step</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-lg active:scale-95"
                      >
                        <span>Submit Case Request</span>
                        <CheckCircle className="w-4 h-4 text-indigo-200" />
                      </button>
                    )}
                  </div>
                )}

              </form>
            </div>

          </div>

          {/* Right Info Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Privacy Priority */}
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="text-xs font-black uppercase text-gray-900">Privacy & Confidentiality Priority</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                All uploaded letters, case syllabus contexts, and email details are held behind end-to-end administrative shield standards. Peer advocates never share logs without written consent.
              </p>
            </div>

            {/* Estimated Processing Duration */}
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-xs font-black uppercase text-gray-900">Structured Response Urgency</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Standard Support issues are triaged in 24 hours. High-Priority cases are analyzed in 6 hours. Critical cases (e.g. eviction) trigger direct immediate phone consultation alerts within 2 hours.
              </p>
            </div>

            {/* Help Team Image Banner Card */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm relative group">
              <div className="aspect-[4/3] bg-indigo-50 relative overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8ZfP6-8K7rN7QZ5qNis-zC3TepF3V_6TzCGrEshUof8Y6l1VvC5kXsh9T_Y-X8lO_W0vVbQ_kCg7J9f0N8gH0VbZg9pQ8t0" 
                  alt="Assistance Help Team Desk"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="p-4 bg-white">
                <p className="text-xs font-bold text-gray-900 leading-snug">
                  Active Student Advocacy Coalition
                </p>
                <p className="text-[10px] text-gray-400 mt-1">Our team provides 24/7 coverage for student legal and wellness needs across CA, NY, and TX districts.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}



