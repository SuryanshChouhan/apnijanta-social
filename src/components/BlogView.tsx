"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { blogCategories, trendingArticles } from '../data/blogData';
import { BlogPost } from '../types';
import { Search, ArrowRight, Sparkles, CheckCircle, ExternalLink } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

export default function BlogView() {
  const { blogList } = useGlobal();
  const navigate = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const featuredBlogPost = blogList[0];
  const otherPosts = blogList.slice(1);

  // Filter posts
  const filteredPosts = otherPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  const handleLoadMore = () => {
    alert('You have read all available articles. Please subscribe to our newsletter to receive real-time updates!');
  };

  return (
    <div className="animate-fade-in duration-300 pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Blog Header & Search */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight font-serif">
            The Student Bulletin
          </h1>
          <p className="text-slate-600 font-medium text-sm sm:text-base border-b border-slate-200 pb-8">
            The latest on student-led initiatives, policy changes, institutional transparency audits, and campus advocacy models.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto pt-2 relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, categories, or keywords..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-slate-900 transition-colors text-slate-900"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-[20px]" />
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex overflow-x-auto gap-1 pb-4 mb-10 no-scrollbar justify-start border-b border-slate-200">
          {blogCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
                selectedCategory === category
                  ? 'border-b-2 border-slate-900 text-slate-900'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Main Editorial Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main List Column */}
          <div className="lg:col-span-9">
            
            {/* Featured Post (Only visible if All or Rights selected & no searching) */}
            {(featuredBlogPost && !searchQuery && (selectedCategory === 'All' || selectedCategory === 'Rights' || selectedCategory === featuredBlogPost.category)) && (
              <div className="mb-12 pb-12 border-b-2 border-slate-900">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-8 relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img 
                      src={featuredBlogPost.image} 
                      alt={featuredBlogPost.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="md:col-span-4 flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-900 flex items-center gap-1.5 flex-wrap">
                        <span className="bg-slate-900 text-white px-2 py-0.5">{featuredBlogPost.category}</span>
                        <span className="text-slate-500">{featuredBlogPost.readTime}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-500">Updated {featuredBlogPost.updatedAt}</span>
                      </div>
                      <Link 
                        href={`/blog/${featuredBlogPost.slug}`}
                        className="text-3xl sm:text-4xl font-black text-slate-950 hover:text-indigo-700 transition-colors cursor-pointer leading-tight block font-serif"
                      >
                        {featuredBlogPost.title}
                      </Link>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {featuredBlogPost.excerpt}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-200">
                      <Link 
                        href={`/blog/${featuredBlogPost.slug}`}
                        className="text-xs text-slate-900 hover:text-indigo-700 font-bold uppercase tracking-wider flex items-center gap-1 group/btn cursor-pointer"
                      >
                        Read Full Guide <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Editorial Grid (Newspaper style 3-col below featured) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="flex flex-col border-b border-slate-200 sm:border-none pb-8 sm:pb-0 group"
                  >
                    <div className="aspect-[3/2] overflow-hidden bg-slate-100 mb-4 hidden sm:block">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500 flex flex-wrap gap-1.5 items-center">
                        <span className="text-slate-900 border border-slate-900 px-1.5 py-0.5">{post.category}</span>
                        <span>{post.readTime}</span>
                        <span>·</span>
                        <span>{post.updatedAt}</span>
                      </div>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-xl font-bold text-slate-950 hover:text-indigo-700 transition-colors cursor-pointer leading-snug block font-serif"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-slate-600 leading-relaxed sm:line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-3 border-y border-slate-200 py-12 text-center space-y-3">
                  <p className="text-lg font-bold text-slate-900 font-serif">No matching articles found</p>
                  <p className="text-xs text-slate-500">Try choosing another category tab or clearing your search phrase.</p>
                  <button 
                    onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                    className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-900 font-bold text-xs transition-colors mt-2 uppercase tracking-wider"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Newsletter Subscription Panel */}
            <div className="mt-16 border-y-2 border-slate-900 p-8 sm:p-12 bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="space-y-2 text-center md:text-left max-w-md">
                <span className="inline-flex items-center gap-1 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" /> Advocacy Alerts
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-serif">Join the Advocacy Newsletter</h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Weekly alerts detailing administrative policy changes, tuition tracking charts, and upcoming campaigns.
                </p>
              </div>

              <div className="w-full md:w-auto shrink-0">
                {newsletterSubscribed ? (
                  <div className="bg-emerald-50 border border-emerald-200 px-5 py-3 flex items-center gap-2 text-emerald-800">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-xs uppercase tracking-wider">Subscribed Successfully</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <input 
                      type="email" 
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="sara@college.edu"
                      className="px-4 py-3 bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-slate-900 w-full sm:w-56"
                    />
                    <button 
                      type="submit"
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Load More Button */}
            {filteredPosts.length > 0 && (
              <div className="text-center pt-12">
                <button 
                  onClick={handleLoadMore}
                  className="px-8 py-3 border border-slate-300 hover:bg-slate-50 text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Load More Articles
                </button>
              </div>
            )}

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-3 space-y-10">
            
            {/* Trending Now Sidebar List */}
            <div className="border-t-2 border-slate-900 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-6">
                Trending on Campus
              </h3>
              <div className="space-y-5">
                {trendingArticles.map((item) => (
                  <div key={item.number} className="flex gap-4 group cursor-pointer border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                    <span className="text-2xl font-black text-slate-200 group-hover:text-slate-900 transition-colors font-serif">
                      {item.number}
                    </span>
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">
                        {item.category}
                      </span>
                      <h4 
                        onClick={() => alert(`Redirecting to details for: "${item.title}"...`)}
                        className="text-sm font-bold text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors font-serif"
                      >
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Resources Finder Card */}
            <div className="border-t-2 border-slate-900 pt-4 bg-slate-50 p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
                Quick Resources
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate.push('/get-help')}
                  className="w-full flex justify-between items-center px-4 py-3 bg-white border border-slate-200 hover:border-slate-900 transition-colors text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <span>Legal Aid Locator</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button 
                  onClick={() => navigate.push('/colleges')}
                  className="w-full flex justify-between items-center px-4 py-3 bg-white border border-slate-200 hover:border-slate-900 transition-colors text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <span>Scam Alert Database</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button 
                  onClick={() => navigate.push('/colleges')}
                  className="w-full flex justify-between items-center px-4 py-3 bg-white border border-slate-200 hover:border-slate-900 transition-colors text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <span>Submit College Review</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}



