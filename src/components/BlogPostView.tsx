"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

export default function BlogPostView() {
  const { blogList } = useGlobal();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find the post
  const post = blogList.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Helmet>
          <title>Post Not Found - Apnijanta</title>
        </Helmet>
        <h1 className="text-3xl font-bold text-slate-900 font-serif">Post Not Found</h1>
        <p className="text-slate-500">The article you are looking for does not exist.</p>
        <button onClick={() => navigate.push('/blog')} className="px-5 py-2.5 bg-slate-900 text-white font-bold uppercase tracking-wider text-xs">
          Back to Blog
        </button>
      </div>
    );
  }

  // Map category to a pre-tagged issue string for the action panel link
  const getHelpCategoryMap: Record<string, string> = {
    'Fees': 'fees',
    'Documents': 'documents',
    'Admissions': 'affiliation',
    'Hostel': 'hostel',
    'Transfer': 'transfer',
    'Rights': 'general',
    'Victory': 'general'
  };
  const mappedIssue = getHelpCategoryMap[post.category] || 'general';

  return (
    <div className="animate-fade-in duration-300 bg-white min-h-screen relative">
      <Helmet>
        <title>{post.title} - Apnijanta Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 z-50">
        <div 
          className="h-full bg-slate-900 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="pt-28 pb-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate.push('/blog')}
          className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
        </button>

        {/* Article Header */}
        <div className="space-y-6 mb-10">
          <div className="flex items-center gap-2 flex-wrap text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span className="text-slate-900 border border-slate-900 px-2 py-0.5">
              {post.category}
            </span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>Updated {post.updatedAt || post.date}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 leading-tight tracking-tight font-serif">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 py-6 border-y-2 border-slate-900 mt-8">
            <div className="w-12 h-12 bg-slate-100 flex items-center justify-center font-bold text-slate-900 text-lg font-serif">
              {post.authorAvatar}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-wider">{post.authorName}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">Contributor · Apnijanta</p>
            </div>
          </div>
        </div>

        {/* Article Image */}
        <div className="aspect-[2/1] overflow-hidden mb-12 bg-slate-100 border border-slate-200">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-lg prose-slate max-w-none text-slate-800 font-serif">
          <p className="text-xl leading-relaxed font-bold text-slate-900 mb-8 border-l-4 border-slate-900 pl-6">
            {post.excerpt}
          </p>
          
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="space-y-6">
              <p>
                At Apnijanta, we believe institutional transparency is a right, not a privilege. Grassroots research shows that when students organize and gather structured audit data, university boards have a historical 76% concession rate. This publication aims to guide you through the process, equipping you with legal guidelines and organizing strategies.
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-10 mb-4">Taking Action on Your Campus</h3>
              <p>
                The success of any student-led policy reform depends on sustained coalition building. Start by identifying the specific offices responsible for the policy you want to change. Next, gather stories from students who have been directly impacted. Data combined with personal narratives forms an undeniable case for change.
              </p>
              <div className="bg-slate-50 border-l-4 border-slate-900 p-6 my-8 italic">
                <p className="font-bold text-slate-900 m-0">
                  "Advocacy is not just about identifying the problem; it's about presenting a meticulously researched, viable alternative."
                </p>
              </div>
              <p>
                If your campus is facing a similar challenge regarding financial fees, housing irregularities, or unfair grading practices, please do not hesitate to reach out to our active advocacy team. Head over to the "Get Help" section in our main navigation bar to submit an inquiry form.
              </p>
            </div>
          )}
        </div>

        {/* Sharp Action Panel */}
        <div className="mt-16 pt-10 border-t-2 border-slate-900">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block mb-4">
            NEXT STEP
          </span>
          <p className="text-lg font-bold text-slate-900 mb-6 font-serif">
            Ready to act on this? Our team can help you draft the RTI / email / escalation for your specific college.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <button 
              onClick={() => navigate.push(`/get-help?issue=${mappedIssue}`)}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              Submit Your Case <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate.push('/blog')}
              className="w-full sm:w-auto text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-center"
            >
              Back to Guides
            </button>
          </div>
          
          <p className="text-xs text-slate-500 mt-6 font-medium">
            No account needed · Responded to within 48 hours
          </p>
        </div>

      </div>
    </div>
  );
}



