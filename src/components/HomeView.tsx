"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContent } from '../context/ContentContext';
import { Tab } from '../types';
import { 
  School, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle, 
  Search, 
  Flame, 
  Users, 
  Landmark, 
  Globe, 
  FileText, 
  ChevronRight, 
  MessageSquare, 
  Compass,
  ArrowUpRight,
  Award,
  ShieldCheck,
  Scale,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  CalendarDays,
  TrendingUp,
  FileCheck2,
  Users2,
  Zap,
  Activity,
  ThumbsUp,
  ShieldX,
  MapPin,
  Lock,
  ArrowDownRight,
  HelpCircle,
  FileCode,
  Users as GroupIcon,
  Building,
  BookOpen,
  Mail,
  Copy,
  PhoneCall
} from 'lucide-react';

export default function HomeView() {

  const navigate = useRouter();
  const { content } = useContent();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fallbackText, setFallbackText] = useState<{id: string, text: string} | null>(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      setFallbackText(null);
    } catch (err) {
      setFallbackText({ id, text });
    }
  };

  // Victory Drawer State
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);


  const [latestBlogs, setLatestBlogs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLatestBlogs(data.slice(0, 3));
        }
      })
      .catch(err => console.error('Error fetching blogs:', err));
  }, []);

  const [activeChannels, setActiveChannels] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/active-channels?limit=3')
      .then(res => res.json())
      .then(data => setActiveChannels(data))
      .catch(err => console.error('Error fetching active channels:', err));
  }, []);

  const stylingOptions = [
    { badgeColor: 'blue', gradient: 'from-[#f9c74f] via-[#e9c46a] to-white/5' },
    { badgeColor: 'green', gradient: 'from-[#90be6d]/80 via-[#90be6d]/30 to-white/5' },
    { badgeColor: 'slate', gradient: 'from-[#bc8a5f]/80 via-[#bc8a5f]/30 to-white/5' }
  ];

  const victories = latestBlogs.length > 0 ? latestBlogs.map((blog, index) => ({
    id: blog.id,
    slug: blog.slug,
    category: blog.category || 'News',
    date: new Date(blog.date || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    title: blog.title,
    summary: blog.excerpt,
    image: blog.image,
    badgeColor: stylingOptions[index % stylingOptions.length].badgeColor,
    gradient: stylingOptions[index % stylingOptions.length].gradient
  })) : [
    {
      id: 'vic-skeleton-1', slug: '', category: 'Loading...', badgeColor: 'blue', date: '', title: 'Loading...', summary: '', image: '', gradient: 'from-gray-200 to-gray-100'
    },
    {
      id: 'vic-skeleton-2', slug: '', category: 'Loading...', badgeColor: 'green', date: '', title: 'Loading...', summary: '', image: '', gradient: 'from-gray-200 to-gray-100'
    },
    {
      id: 'vic-skeleton-3', slug: '', category: 'Loading...', badgeColor: 'slate', date: '', title: 'Loading...', summary: '', image: '', gradient: 'from-gray-200 to-gray-100'
    }
  ];


  return (
    <div className="relative bg-slate-50 min-h-screen text-slate-800 antialiased overflow-x-hidden selection:bg-indigo-600 selection:text-white">
      
      {/* Modern High-Contrast Grid Mesh Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-[1200px] bg-[radial-gradient(#e2e8f0_1px,transparent_1.5px)] [background-size:24px_24px] opacity-60 pointer-events-none -z-10" />

      {/* 🚀 EDITORIAL HERO SECTON (Sophisticated Editorial Redesign) */}
      <section className="pt-24 sm:pt-28 pb-10 relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Asymmetrical Heavy Typography Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-slate-200/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-300 text-slate-800 text-xs font-semibold tracking-wider uppercase font-mono shadow-sm">
              <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>{content['home_hero_label'] || 'EMPOWERING STUDENTS'}</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-slate-950 leading-[0.95] whitespace-pre-line">
                {(() => {
                  const title = content['home_hero_title'] || 'Your Campus.\nYour Voice.';
                  const lines = title.split('\n');
                  if (lines.length > 1) {
                    const lastLine = lines.pop();
                    return (
                      <>
                        {lines.map((l, i) => (
                          <React.Fragment key={i}>
                            {l}
                            <br />
                          </React.Fragment>
                        ))}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-600 block sm:inline">
                          {lastLine}
                        </span>
                      </>
                    );
                  }
                  return title;
                })()}
              </h1>
              <p className="text-base sm:text-xl text-slate-600 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {content['home_hero_desc'] || 'Apnijanta is a student-powered platform that helps you fight unfair policies, recover fees, protect your housing rights, and hold universities accountable.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={() => navigate.push('/get-help')}
                className="w-full sm:w-auto flex justify-center items-center gap-2 group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-indigo-600 text-white font-black text-sm sm:text-base rounded-2xl overflow-hidden transition-all shadow-[0_0_40px_-10px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_-10px_rgba(79,70,229,0.6)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Start a Case</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate.push('/colleges')}
                className="w-full sm:w-auto flex justify-center items-center gap-1.5 px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border border-slate-300/80 hover:border-slate-400 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>Compare Colleges</span>
              </button>
            </div>

            {/* Micro-Trust Grid */}
            <div className="pt-8 grid grid-cols-3 gap-3 text-left max-w-xl mx-auto lg:mx-0">
              <div className="bg-slate-100/80 backdrop-blur-sm border border-slate-200/60 p-3 rounded-2xl flex flex-col justify-center shadow-[inset_0_1px_0_rgba(255,255,255,1)] hover:bg-white hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <p className="text-xl font-black text-slate-950 tracking-tight font-mono">100%</p>
                </div>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest pl-6">Private</p>
              </div>
              <div className="bg-slate-100/80 backdrop-blur-sm border border-slate-200/60 p-3 rounded-2xl flex flex-col justify-center shadow-[inset_0_1px_0_rgba(255,255,255,1)] hover:bg-white hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <p className="text-xl font-black text-slate-950 tracking-tight font-mono">24H</p>
                </div>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest pl-6">Fast Response</p>
              </div>
              <div className="bg-slate-100/80 backdrop-blur-sm border border-slate-200/60 p-3 rounded-2xl flex flex-col justify-center shadow-[inset_0_1px_0_rgba(255,255,255,1)] hover:bg-white hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <GroupIcon className="w-4 h-4 text-amber-600" />
                  <p className="text-xl font-black text-slate-950 tracking-tight font-mono">Free</p>
                </div>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest pl-6">Peer Support</p>
              </div>
            </div>
          </div>

          {/* Right: The High-Fidelity Active Dispatch Hub (Replacing typical mockup images) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-[2.5rem] opacity-20 blur-lg" />
              
              {/* Interactive Console */}
              <div className="relative bg-white rounded-[2rem] border border-slate-300/80 shadow-2xl overflow-hidden p-6 space-y-6">
                
                {/* Header of Console */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider border border-indigo-100">
                    Active Channel
                  </span>
                </div>

                {/* Dynamic Active Channels Feed */}
                <div className="space-y-3">
                  {activeChannels.map((channel) => {
                    let Icon = ShieldAlert;
                    let iconBg = 'bg-slate-100 text-slate-700';
                    let badgeBg = 'bg-slate-50 text-slate-600';

                    if (channel.badge_type === 'EMERGENCY') {
                      Icon = ShieldAlert;
                      iconBg = 'bg-red-100 text-red-700';
                      badgeBg = 'bg-red-50 text-red-600';
                    } else if (channel.badge_type === 'REPRESENTATION') {
                      Icon = Scale;
                      iconBg = 'bg-indigo-100 text-indigo-700';
                      badgeBg = 'bg-indigo-50 text-indigo-600';
                    } else if (channel.badge_type === 'ADVOCACY') {
                      Icon = Users;
                      iconBg = 'bg-emerald-100 text-emerald-700';
                      badgeBg = 'bg-emerald-50 text-emerald-600';
                    } else {
                      Icon = Activity;
                    }

                    return (
                      <div key={channel.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                        <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${iconBg}`}>
                          <Icon className={`w-4 h-4 ${channel.badge_type === 'EMERGENCY' ? 'animate-pulse' : ''}`} />
                        </div>
                        <div className="space-y-1 text-xs w-full">
                          <div className="flex justify-between items-center">
                            <strong className="text-slate-900">{channel.title}</strong>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${badgeBg}`}>
                              {channel.badge_type}
                            </span>
                          </div>
                          <p className="text-slate-700 font-semibold text-[11px]">{channel.protest_title}</p>
                          <p className="text-slate-500 text-[11px] leading-relaxed">{channel.description}</p>
                          <div className="text-[10px] text-slate-400 font-mono flex flex-wrap items-center gap-1 mt-1">
                            <span>{channel.status_text}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {activeChannels.length === 0 && (
                    <div className="text-center p-4 text-xs text-slate-500">Loading live feed...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧭 SECTION: BROWSE BY PROBLEM (Actionable Playbooks) */}
      <section id="common-issues" className="pt-10 pb-12 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
              <Compass className="w-3.5 h-3.5 text-indigo-600" /> BROWSE BY PROBLEM
            </div>
            <h3 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {content['home_rights_title'] || 'Know Your Rights.'}
            </h3>
            <p className="text-slate-600 text-base sm:text-lg">
              {content['home_rights_desc'] || "We've built instant action playbooks for the most common issues faced by students in Indian engineering and medical colleges. Choose your issue below to get started."}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Capitation Fees */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col h-full hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-red-100 text-red-700 rounded-xl">
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 bg-red-50 text-red-600 border border-red-100 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Urgent
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Hidden / Capitation Fees</h4>
              <p className="text-sm text-slate-600 mb-6 flex-grow">Demand for illegal donations, building funds, or unreceipted cash payments for admission.</p>
              <div className="space-y-3 mt-auto">
                <Link href="/blog/capitation-fee-illegal" className="w-full flex justify-between items-center px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  <span>Read the Guide</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <div className="space-y-1.5 text-center">
                  <button onClick={() => navigate.push('/get-help?issue=fees')} className="w-full py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 transition-colors">
                    Submit Your Case &rarr;
                  </button>
                  <p className="text-[10px] text-slate-500">No login needed &bull; Fast response &bull; 100% private</p>
                </div>
              </div>
            </div>

            {/* Card 2: Marksheet Withheld */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col h-full hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-red-100 text-red-700 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 bg-red-50 text-red-600 border border-red-100 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Urgent
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Marksheet or TC Withheld</h4>
              <p className="text-sm text-slate-600 mb-6 flex-grow">College refusing to return original certificates to force fee payments or block transfers.</p>
              <div className="space-y-3 mt-auto">
                <Link href="/blog/marksheet-withheld-rights" className="w-full flex justify-between items-center px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  <span>Read the Guide</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <div className="space-y-1.5 text-center">
                  <button onClick={() => navigate.push('/get-help?issue=documents')} className="w-full py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 transition-colors">
                    Submit Your Case &rarr;
                  </button>
                  <p className="text-[10px] text-slate-500">No login needed &bull; Fast response &bull; 100% private</p>
                </div>
              </div>
            </div>

            {/* Card 3: Forced Hostel Fees */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col h-full hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
                  <Building className="w-6 h-6" /> 
                </div>
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> High
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Forced Hostel / Canteen Fees</h4>
              <p className="text-sm text-slate-600 mb-6 flex-grow">Mandatory bundling of hostel or mess fees even if you are a day scholar.</p>
              <div className="space-y-3 mt-auto">
                <Link href="/blog/forced-hostel-fee" className="w-full flex justify-between items-center px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  <span>Read the Guide</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <div className="space-y-1.5 text-center">
                  <button onClick={() => navigate.push('/get-help?issue=hostel')} className="w-full py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 transition-colors">
                    Submit Your Case &rarr;
                  </button>
                  <p className="text-[10px] text-slate-500">No login needed &bull; Fast response &bull; 100% private</p>
                </div>
              </div>
            </div>

            {/* Card 4: Fake Affiliation */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col h-full hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> High
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Fake Affiliation or Approvals</h4>
              <p className="text-sm text-slate-600 mb-6 flex-grow">College claiming fake UGC, AICTE, or university approvals they do not possess.</p>
              <div className="space-y-3 mt-auto">
                <Link href="/blog/verify-college-affiliation" className="w-full flex justify-between items-center px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  <span>Read the Guide</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <div className="space-y-1.5 text-center">
                  <button onClick={() => navigate.push('/get-help?issue=affiliation')} className="w-full py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 transition-colors">
                    Submit Your Case &rarr;
                  </button>
                  <p className="text-[10px] text-slate-500">No login needed &bull; Fast response &bull; 100% private</p>
                </div>
              </div>
            </div>

            {/* Card 5: Mid-Year Transfer */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col h-full hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> High
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Mid-Year Transfer Harassment</h4>
              <p className="text-sm text-slate-600 mb-6 flex-grow">College demanding remaining 4-year tuition fees when a student attempts to transfer out early.</p>
              <div className="space-y-3 mt-auto">
                <Link href="/blog/leaving-college-rights" className="w-full flex justify-between items-center px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  <span>Read the Guide</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <div className="space-y-1.5 text-center">
                  <button onClick={() => navigate.push('/get-help?issue=transfer')} className="w-full py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 transition-colors">
                    Submit Your Case &rarr;
                  </button>
                  <p className="text-[10px] text-slate-500">No login needed &bull; Fast response &bull; 100% private</p>
                </div>
              </div>
            </div>

            {/* Card 6: General Rights Reference */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col h-full hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Standard
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">General Rights Reference</h4>
              <p className="text-sm text-slate-600 mb-6 flex-grow">A complete master-guide on UGC anti-ragging laws, fee refund policies, and basic student rights.</p>
              <div className="space-y-3 mt-auto">
                <Link href="/colleges" className="w-full flex justify-between items-center px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  <span>Browse Directory</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
                <div className="space-y-1.5 text-center">
                  <button onClick={() => navigate.push('/get-help')} className="w-full py-3 bg-slate-200 text-slate-800 font-bold text-sm rounded-xl hover:bg-slate-300 transition-colors">
                    General Inquiry &rarr;
                  </button>
                  <p className="text-[10px] text-slate-500">No login needed &bull; Fast response &bull; 100% private</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 🏆 SECTION: CASE RECORDS & RESOLUTIONS (The Redesigned Interactive Cards Grid) */}
      <section id="victories" className="pt-12 pb-24 bg-gradient-to-b from-[#f4f7ff] to-white relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-2 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                RECENT VICTORIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Latest Issue Solvers
              </h2>
            </div>
            
            <div className="flex justify-center sm:justify-end">
              <Link
                href="/blog"
                className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors cursor-pointer group"
              >
                <span>View All Stories</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Bento Style Case Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {victories.map((victory) => {
            const badgeClasses = 
              victory.badgeColor === 'blue' ? 'bg-[#3b49df] text-white' :
              victory.badgeColor === 'green' ? 'bg-[#1b6b43] text-white' :
              'bg-[#475569] text-white';

            const linkColorClass = 
              victory.badgeColor === 'blue' ? 'text-[#3b49df]' :
              victory.badgeColor === 'green' ? 'text-[#1b6b43]' :
              'text-[#64748b]';

            return (
              <Link 
                key={victory.id}
                id={`victory-${victory.id}`}
                href={`/blog/${victory.slug}`}
                className="bg-white rounded-3xl shadow-[0_4px_24px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer block"
              >
                
                {/* Top Image or Gradient Placeholder */}
                {victory.image ? (
                  <div className="h-[180px] relative bg-slate-100">
                    <Image 
                      src={victory.image} 
                      alt={victory.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover" 
                    />
                    <div className="absolute top-6 left-6">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${badgeClasses} shadow-sm`}>
                        {victory.category}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={`h-[180px] relative bg-gradient-to-br ${victory.gradient}`}>
                    <div className="absolute top-6 left-6">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${badgeClasses} shadow-sm`}>
                        {victory.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content Box */}
                <div className="p-8 flex flex-col flex-grow bg-white">
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                      <CalendarDays className="w-4 h-4" /> {victory.date}
                    </span>
                  </div>

                  <h3 className="text-[22px] font-bold text-slate-900 leading-tight mb-3 line-clamp-2">
                    {victory.title}
                  </h3>

                  <p className="text-slate-500 text-[15px] leading-relaxed flex-grow">
                    {victory.summary}
                  </p>

                  <div className="mt-6 pt-2">
                    <div 
                      className={`${linkColorClass} font-bold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all`}
                    >
                      <span>Read Success Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

              </Link>
            );
          })}
        </div>
      </section>

      {/* 🧭 SECTION: HOW IT WORKS (Timeline) */}
      <section className="py-24 bg-slate-950 text-white border-t border-slate-900 relative overflow-hidden">
        {/* Glow behind section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-1 bg-indigo-500/25 text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-mono border border-indigo-400/20">
              <Compass className="w-3.5 h-3.5 text-indigo-400" /> THE RESOLUTION PROCESS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-white">
              How It Works
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto mt-4">
              Most cases see meaningful action within <strong className="text-white">7–14 days</strong>.<br className="hidden sm:block"/>
              Document recovery: 3–5 days average. Fee disputes: 2–6 weeks.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-slate-300 mt-6 pb-6 border-b border-slate-800/60 max-w-xl mx-auto">
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-400" /> ₹47L+ Recovered</span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-400" /> 312 Cases Resolved</span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-400" /> 89% Doc Recovery</span>
            </div>
            
            <div className="pt-6">
              <Link 
                href="/get-help" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
              >
                Submit Your Case <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative space-y-8 sm:space-y-12 before:absolute before:inset-0 before:ml-6 sm:before:ml-[2.25rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
            
            {/* Step 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 text-slate-400 group-[.is-active]:bg-indigo-600 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-lg">1. Secure Submission</h3>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">100% PRIVATE</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  You submit your issue (fees, marksheet, etc.) without needing an account. Your identity is strictly shielded from the college.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 text-slate-400 group-[.is-active]:bg-indigo-600 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-lg">2. Case Evaluation</h3>
                  <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded">24-48 HRS</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our volunteer legal experts and senior peers review your grievance against UGC/AICTE mandates.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 text-slate-400 group-[.is-active]:bg-indigo-600 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
                <h3 className="font-bold text-white text-lg mb-2">3. Guided Action Plan</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We give you the exact RTI template, legal notice format, or escalation script tailored to your specific college and issue type.
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 text-slate-400 group-[.is-active]:bg-emerald-500 group-[.is-active]:text-slate-950 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl border-t-2 border-t-emerald-500/50">
                <h3 className="font-bold text-white text-lg mb-2">4. Resolution Support</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We document your case publicly (with consent), connect you with student legal aid networks, and escalate to UGC/AICTE grievance portals on your behalf — creating real institutional pressure.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto space-y-6">
            <p className="text-slate-500 text-sm italic px-4 font-medium">
              Not every case ends in full resolution — but every student leaves knowing exactly where they stand, what their rights are, and what to do next.
            </p>
            <div className="pt-8 border-t border-slate-900">
              <Link 
                href="/get-help" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm uppercase tracking-wider font-mono rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                Submit Your Case Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
        </div>
      </section>

      {/* 📜 SECTION: UGC POLICY CHEAT SHEET (Legal Weapons) */}
      <section id="policy-cheat-sheet" className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-mono border border-indigo-100">
                <Scale className="w-3.5 h-3.5" /> STUDENT RIGHTS CHEAT SHEET
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Your Legal Arsenal
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                When colleges bully students, they rely on you not knowing the actual national regulations. 
                Here are the exact UGC and AICTE mandates you can quote to make them back down.
              </p>
            </div>
            
            <Link 
              href="/resources"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold text-sm group"
            >
              See all 12 regulations <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* CARD 1: Document Retention */}
            <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
              <div className="space-y-4 mb-8">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Document Retention Ban</h3>
                  <div className="mt-2 inline-block bg-white border border-slate-200 text-slate-600 text-xs font-mono font-bold px-3 py-1 rounded-md">
                    UGC Notification 2012 / Circular on Original Certificates
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Colleges are strictly prohibited from retaining your original marksheets, degrees, or birth certificates under any circumstances, even if fees are pending.
                </p>
              </div>
              
              <div className="space-y-3 pt-6 border-t border-slate-200">
                {fallbackText?.id === 'doc-retention' ? (
                  <textarea 
                    readOnly 
                    className="w-full text-xs font-mono bg-white border border-indigo-200 rounded-lg p-3 h-24 text-slate-700 focus:outline-none focus:border-indigo-400"
                    value={fallbackText.text}
                    onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                  />
                ) : (
                  <button 
                    onClick={() => handleCopy('doc-retention', "Under UGC Notification on Remittance and Retention of Original Certificates, colleges are strictly prohibited from holding original marksheets or degrees. I request the immediate return of my documents. Non-compliance will be reported to the UGC Grievance Portal.")}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${copiedId === 'doc-retention' ? 'bg-emerald-100 text-emerald-700' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer'}`}
                  >
                    {copiedId === 'doc-retention' ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Email Template</>}
                  </button>
                )}
                
                <Link href="/get-help?issue=documents" className="block text-center text-xs font-bold text-indigo-600 hover:text-indigo-700">
                  → Still being ignored? File a case here
                </Link>
              </div>
            </div>

            {/* CARD 2: Fee Refund */}
            <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
              <div className="space-y-4 mb-8">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">100% Fee Refund Policy</h3>
                  <div className="mt-2 inline-block bg-white border border-slate-200 text-slate-600 text-xs font-mono font-bold px-3 py-1 rounded-md">
                    AICTE Approval Process Handbook 2024 (Appendix)
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  If you withdraw your admission before the stipulated deadline, colleges must refund 100% of your fees (minus a maximum ₹1,000 processing fee). They cannot withhold seat-booking amounts.
                </p>
              </div>
              
              <div className="space-y-3 pt-6 border-t border-slate-200">
                {fallbackText?.id === 'fee-refund' ? (
                  <textarea 
                    readOnly 
                    className="w-full text-xs font-mono bg-white border border-indigo-200 rounded-lg p-3 h-24 text-slate-700 focus:outline-none focus:border-indigo-400"
                    value={fallbackText.text}
                    onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                  />
                ) : (
                  <button 
                    onClick={() => handleCopy('fee-refund', "As per the AICTE Approval Process Handbook 2024 Refund Guidelines, I am eligible for a full fee refund (less ₹1000 processing fee) since I am withdrawing before the deadline. Please process the refund within 7 days to avoid AICTE escalation.")}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${copiedId === 'fee-refund' ? 'bg-emerald-100 text-emerald-700' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer'}`}
                  >
                    {copiedId === 'fee-refund' ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Email Template</>}
                  </button>
                )}
                
                <Link href="/get-help?issue=fees" className="block text-center text-xs font-bold text-indigo-600 hover:text-indigo-700">
                  → Still being ignored? File a case here
                </Link>
              </div>
            </div>

            {/* CARD 3: Capitation Fee Ban */}
            <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
              <div className="space-y-4 mb-8">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Capitation Fee Ban</h3>
                  <div className="mt-2 inline-block bg-white border border-slate-200 text-slate-600 text-xs font-mono font-bold px-3 py-1 rounded-md">
                    AICTE Act 1987, Sec 16(1)(g) + State Acts
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Charging undocumented "donations", "building funds", or capitation fees beyond the official published fee structure is a severe statutory violation and punishable by loss of affiliation.
                </p>
              </div>
              
              <div className="space-y-3 pt-6 border-t border-slate-200">
                {fallbackText?.id === 'capitation' ? (
                  <textarea 
                    readOnly 
                    className="w-full text-xs font-mono bg-white border border-indigo-200 rounded-lg p-3 h-24 text-slate-700 focus:outline-none focus:border-indigo-400"
                    value={fallbackText.text}
                    onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                  />
                ) : (
                  <button 
                    onClick={() => handleCopy('capitation', "Under Section 16(1)(g) of the AICTE Act and relevant State Capitation Fee Prohibition Acts, charging unreceipted 'donations' or excess fees is prohibited. I request an official receipt for the full amount demanded, failing which I will raise the matter with the state fee regulatory committee.")}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${copiedId === 'capitation' ? 'bg-emerald-100 text-emerald-700' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer'}`}
                  >
                    {copiedId === 'capitation' ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Email Template</>}
                  </button>
                )}
                
                <Link href="/get-help?issue=capitation" className="block text-center text-xs font-bold text-indigo-600 hover:text-indigo-700">
                  → Still being ignored? File a case here
                </Link>
              </div>
            </div>

            {/* CARD 4: Anti-Ragging (Urgent styling) */}
            <div className="bg-red-50 border-2 border-red-200 rounded-[2rem] p-8 flex flex-col justify-between shadow-lg shadow-red-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-[100px] pointer-events-none" />
              
              <div className="space-y-4 mb-8 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <span className="bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full animate-pulse">
                    Emergency Resource
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-900">National Anti-Ragging Helpline</h3>
                  <div className="mt-2 inline-block bg-white/60 border border-red-200 text-red-700 text-xs font-mono font-bold px-3 py-1 rounded-md">
                    UGC Regulations 2009 (Strictly Enforced)
                  </div>
                </div>
                <p className="text-red-800/80 leading-relaxed text-sm">
                  Ragging is a criminal offense. The national helpline is completely free, available 24x7, and your identity remains strictly confidential. Do not wait for the college to act.
                </p>
                <div className="pt-2 pb-1">
                  <span className="text-3xl font-black text-red-700 tracking-tight select-all">
                    1800-180-5522
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 pt-6 border-t border-red-200/60 relative z-10">
                <a 
                  href="tel:18001805522"
                  className="w-full py-4 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-600/20"
                >
                  <PhoneCall className="w-5 h-5" /> Call Now (24/7 Toll-Free)
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}



