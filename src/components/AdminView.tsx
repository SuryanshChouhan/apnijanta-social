"use client";
import React, { useState } from 'react';
import { BlogPost, College, SupportRequest } from '../types';
import { LayoutDashboard, FileText, Building, Users, LogIn, Plus, Edit2, Trash2, X, Save, Settings, ShieldAlert, BarChart2, Radio, Menu } from 'lucide-react';
import { blogCategories } from '../data/blogData';
import { useGlobal } from '../context/GlobalContext';
import CMSEditor from './CMSEditor';
import ActiveChannelAdmin from './ActiveChannelAdmin';

export default function AdminView() {
  const { 
    blogList, setBlogList, 
    collegeList, setCollegeList, 
    supportRequests 
  } = useGlobal();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'blogs' | 'colleges' | 'cases' | 'cms' | 'active_channel'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [casesFilter, setCasesFilter] = useState<'all' | 'critical' | 'high'>('all');

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isEditingBlog, setIsEditingBlog] = useState(false);

  const [editingCollege, setEditingCollege] = useState<College | null>(null);
  const [isEditingCollege, setIsEditingCollege] = useState(false);

  // Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect passcode');
    }
  };

  // Blog Handlers
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    
    try {
      await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlog)
      });
      
      const isNew = !blogList.find(b => b.id === editingBlog.id);
      if (isNew) {
        setBlogList([editingBlog, ...blogList]);
      } else {
        setBlogList(blogList.map(b => b.id === editingBlog.id ? editingBlog : b));
      }
      setIsEditingBlog(false);
      setEditingBlog(null);
    } catch (err) {
      console.error(err);
      alert('Error saving blog');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        setBlogList(blogList.filter(b => b.id !== id));
      } catch (err) {
        console.error(err);
        alert('Error deleting blog');
      }
    }
  };

  const startNewBlog = () => {
    setEditingBlog({
      id: `post-${Date.now()}`,
      slug: '',
      title: '',
      category: 'Rights',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      authorName: '',
      authorAvatar: '',
      excerpt: '',
      image: '',
      content: '',
      readTime: '5 min read'
    });
    setIsEditingBlog(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !editingBlog) return;
    const file = e.target.files[0];
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setEditingBlog({ ...editingBlog, image: data.url });
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image');
    }
  };

  // College Handlers
  const handleSaveCollege = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollege) return;
    
    try {
      await fetch('/api/colleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCollege)
      });
      
      const isNew = !collegeList.find(c => c.id === editingCollege.id);
      if (isNew) {
        setCollegeList([...collegeList, editingCollege]);
      } else {
        setCollegeList(collegeList.map(c => c.id === editingCollege.id ? editingCollege : c));
      }
      setIsEditingCollege(false);
      setEditingCollege(null);
    } catch (err) {
      console.error(err);
      alert('Error saving college');
    }
  };

  const handleDeleteCollege = async (id: string) => {
    if (confirm('Are you sure you want to delete this college?')) {
      try {
        await fetch(`/api/colleges/${id}`, { method: 'DELETE' });
        setCollegeList(collegeList.filter(c => c.id !== id));
      } catch (err) {
        console.error(err);
        alert('Error deleting college');
      }
    }
  };

  const startNewCollege = () => {
    setEditingCollege({
      id: `college-${Date.now()}`,
      name: '',
      location: 'Bhopal',
      state: 'Madhya Pradesh',
      collegeType: 'Private',
      approvalStatus: 'Approved',
      logoText: '',
      rating: 0,
      image: '',
      tags: [],
      description: '',
      transparencyScore: {
        feeStructurePublished: 0,
        grievanceResponseRate: 0,
        documentReleaseRecord: 0,
        capitationComplaintHistory: 0,
        total: 0
      },
      capitationReports: 0,
      marksheetComplaints: 0,
      grievanceOfficerListed: false,
      courses: []
    });
    setIsEditingCollege(true);
  };

  const handleCollegeImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !editingCollege) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setEditingCollege({ ...editingCollege, image: data.url });
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading image');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Radial Gradient Mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"></div>
        </div>

        <form onSubmit={handleLogin} className="relative z-10 bg-slate-900/60 border border-slate-700/50 backdrop-blur-xl p-8 rounded-2xl w-full max-w-sm space-y-6 shadow-2xl shadow-black/50 border-t-slate-600/30">
          <div className="text-center">
            <h1 className="text-2xl font-black text-slate-100">Admin Login</h1>
            <p className="text-xs text-slate-400 mt-2">Restricted Access</p>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Passcode</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all"
              placeholder="Enter passcode..."
            />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 cursor-pointer">
            <LogIn className="w-4 h-4" /> Authenticate
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Radial Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      </div>
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 relative z-20">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-100">Apnijanta Admin</h2>
        <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-400 hover:text-slate-100 p-2 cursor-pointer">
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {/* Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-slate-900/40 backdrop-blur-xl border-r border-slate-700/30 transform transition-transform duration-300 z-40 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 mt-4 mb-4">
           <h2 className="text-sm font-black uppercase tracking-widest text-slate-100 px-4 hidden md:block">Apnijanta Admin</h2>
           <h2 className="text-sm font-black uppercase tracking-widest text-slate-100 px-4 md:hidden">Menu</h2>
           <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-slate-100 p-2 cursor-pointer">
             <X className="w-5 h-5" />
           </button>
        </div>
        <nav className="space-y-1 px-4">
          {[
              { id: 'dashboard', icon: <BarChart2 className="w-5 h-5" />, label: 'Dashboard' },
              { id: 'blogs', icon: <FileText className="w-5 h-5" />, label: 'Blogs & Guides' },
              { id: 'colleges', icon: <Building className="w-5 h-5" />, label: 'Manage Colleges' },
              { id: 'cases', icon: <ShieldAlert className="w-5 h-5" />, label: 'Support Cases' },
              { id: 'active_channel', icon: <Radio className="w-5 h-5" />, label: 'Active Channel' },
              { id: 'cms', icon: <Settings className="w-5 h-5" />, label: 'Website Management' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setIsEditingBlog(false); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === item.id 
                  ? 'bg-cyan-500/10 text-cyan-300 border-l-2 border-cyan-400 pl-3' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto relative z-10">
        
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-black text-slate-100 font-serif">System Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-800/40 border border-slate-700/40 border-t-slate-600/30 backdrop-blur-md p-6 rounded-2xl shadow-xl shadow-black/30">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Blogs</p>
                <p className="text-4xl font-black text-slate-100 mt-2">{blogList.length}</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/40 border-t-slate-600/30 backdrop-blur-md p-6 rounded-2xl shadow-xl shadow-black/30">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Listed Colleges</p>
                <p className="text-4xl font-black text-slate-100 mt-2">{collegeList.length}</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/40 border-t-slate-600/30 backdrop-blur-md p-6 rounded-2xl shadow-xl shadow-black/30">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Open Cases</p>
                <p className="text-4xl font-black text-slate-100 mt-2">{supportRequests.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === 'blogs' && !isEditingBlog && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-black text-slate-100 font-serif">Manage Blogs</h1>
              <button onClick={startNewBlog} className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl px-5 py-2.5 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 flex items-center gap-2 cursor-pointer text-sm">
                <Plus className="w-4 h-4" /> New Post
              </button>
            </div>
            
            <div className="bg-slate-800/40 border border-slate-700/40 border-t-slate-600/30 backdrop-blur-md rounded-2xl shadow-xl shadow-black/30 overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-800/60 border-b border-slate-700/30 text-xs uppercase tracking-wider text-slate-400 font-bold">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {blogList.map(post => (
                    <tr key={post.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-100">{post.title}</td>
                      <td className="px-6 py-4"><span className="bg-slate-900/60 border border-slate-700/50 text-slate-300 px-2.5 py-1 rounded-md text-xs font-bold">{post.category}</span></td>
                      <td className="px-6 py-4 text-slate-400">{post.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => { setEditingBlog({...post}); setIsEditingBlog(true); }} className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded mr-2 cursor-pointer transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteBlog(post.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded cursor-pointer transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Blog Editor */}
        {activeTab === 'blogs' && isEditingBlog && editingBlog && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-black text-slate-100 font-serif">
                {editingBlog.title ? 'Edit Post' : 'New Post'}
              </h1>
              <button onClick={() => setIsEditingBlog(false)} className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl flex items-center gap-2 hover:bg-slate-700 cursor-pointer transition-colors">
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="bg-slate-800/40 border border-slate-700/40 border-t-slate-600/30 backdrop-blur-md rounded-2xl shadow-xl shadow-black/30 p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Title</label>
                  <input required type="text" value={editingBlog.title} onChange={e => setEditingBlog({...editingBlog, title: e.target.value})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Slug (URL)</label>
                  <input required type="text" value={editingBlog.slug} onChange={e => setEditingBlog({...editingBlog, slug: e.target.value})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm" placeholder="my-new-post" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Category</label>
                  <select value={editingBlog.category} onChange={e => setEditingBlog({...editingBlog, category: e.target.value as any})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm">
                    {blogCategories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Image URL or Upload</label>
                  <div className="flex gap-2">
                    <input type="text" value={editingBlog.image} onChange={e => setEditingBlog({...editingBlog, image: e.target.value})} className="flex-1 px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm" placeholder="https://..." />
                    <label className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-bold text-xs flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors whitespace-nowrap">
                      Upload Image
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Author Name</label>
                  <input required type="text" value={editingBlog.authorName} onChange={e => setEditingBlog({...editingBlog, authorName: e.target.value})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Author Initials (Avatar)</label>
                  <input required type="text" value={editingBlog.authorAvatar} onChange={e => setEditingBlog({...editingBlog, authorAvatar: e.target.value})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm" placeholder="JD" />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Excerpt (Short Summary)</label>
                <textarea required rows={2} value={editingBlog.excerpt} onChange={e => setEditingBlog({...editingBlog, excerpt: e.target.value})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm"></textarea>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Full Content (HTML/Text)</label>
                <textarea rows={12} value={editingBlog.content || ''} onChange={e => setEditingBlog({...editingBlog, content: e.target.value})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm font-mono" placeholder="<p>Write your article here...</p>"></textarea>
              </div>

              <div className="pt-4 border-t border-slate-700/50">
                <button type="submit" className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 cursor-pointer">
                  <Save className="w-4 h-4" /> Save Post
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Colleges Tab */}
        {activeTab === 'colleges' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-black text-slate-100 font-serif">Manage Colleges</h1>
              {!isEditingCollege && (
                <button onClick={startNewCollege} className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl px-5 py-2.5 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 flex items-center gap-2 cursor-pointer text-sm">
                  <Plus className="w-4 h-4" /> Add College
                </button>
              )}
            </div>
            
            {isEditingCollege && editingCollege ? (
              <div className="bg-slate-800/40 border border-slate-700/40 border-t-slate-600/30 backdrop-blur-md rounded-2xl shadow-xl shadow-black/30 overflow-hidden">
                <div className="bg-slate-800/60 border-b border-slate-700/30 px-6 py-4 flex justify-between items-center">
                  <h2 className="font-bold text-slate-100 flex items-center gap-2">
                    <Building className="w-4 h-4" /> {editingCollege.name || 'New College'}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDeleteCollege(editingCollege.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setIsEditingCollege(false)} className="p-2 text-slate-400 hover:bg-slate-700 hover:text-slate-200 rounded-lg cursor-pointer transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <form onSubmit={handleSaveCollege} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">College Name</label>
                      <input required type="text" value={editingCollege.name} onChange={e => setEditingCollege({...editingCollege, name: e.target.value})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm" />
                    </div>
                    <div className="col-span-1 md:col-span-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">College Name (Select existing to edit)</label>
                      <datalist id="college-names">
                        {collegeList.map(c => <option key={c.id} value={c.name} />)}
                      </datalist>
                      <input required type="text" list="college-names" value={editingCollege.name} onChange={e => {
                        const existing = collegeList.find(c => c.name === e.target.value);
                        if (existing) {
                          setEditingCollege(existing);
                        } else {
                          setEditingCollege({...editingCollege, name: e.target.value});
                        }
                      }} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm font-bold" placeholder="Type 2-3 letters to search existing Bhopal colleges..." />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Location</label>
                      <input required type="text" value={editingCollege.location} onChange={e => setEditingCollege({...editingCollege, location: e.target.value})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm" placeholder="City" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">State</label>
                      <input required type="text" value={editingCollege.state} onChange={e => setEditingCollege({...editingCollege, state: e.target.value})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Type</label>
                      <select value={editingCollege.collegeType} onChange={e => setEditingCollege({...editingCollege, collegeType: e.target.value})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none transition-all text-sm">
                        <option value="Private" className="bg-slate-900 text-slate-100">Private</option>
                        <option value="Government" className="bg-slate-900 text-slate-100">Government</option>
                        <option value="Deemed" className="bg-slate-900 text-slate-100">Deemed</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Approval Status</label>
                      <select value={editingCollege.approvalStatus} onChange={e => setEditingCollege({...editingCollege, approvalStatus: e.target.value})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none transition-all text-sm">
                        <option value="Approved" className="bg-slate-900 text-slate-100">Approved</option>
                        <option value="Pending" className="bg-slate-900 text-slate-100">Pending</option>
                        <option value="Warning" className="bg-slate-900 text-slate-100">Warning</option>
                        <option value="Unapproved" className="bg-slate-900 text-slate-100">Unapproved</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Rating (0-5)</label>
                      <input required type="number" step="0.1" value={editingCollege.rating} onChange={e => setEditingCollege({...editingCollege, rating: parseFloat(e.target.value)})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Capitation Reports</label>
                      <input required type="number" value={editingCollege.capitationReports} onChange={e => setEditingCollege({...editingCollege, capitationReports: parseInt(e.target.value)})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Marksheet Complaints</label>
                      <input required type="number" value={editingCollege.marksheetComplaints} onChange={e => setEditingCollege({...editingCollege, marksheetComplaints: parseInt(e.target.value)})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm" />
                    </div>
                    <div className="flex items-center pt-8">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-400 cursor-pointer">
                        <input type="checkbox" checked={editingCollege.grievanceOfficerListed} onChange={e => setEditingCollege({...editingCollege, grievanceOfficerListed: e.target.checked})} className="w-5 h-5 bg-slate-900 border-slate-700 rounded text-cyan-500 focus:ring-cyan-500/50" />
                        Grievance Officer Listed?
                      </label>
                    </div>
                    
                    {/* Courses Builder */}
                    <div className="col-span-1 md:col-span-3 pt-6 border-t border-slate-700/50">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 mb-4 flex items-center justify-between">
                        Courses Offered
                        <button type="button" onClick={() => {
                          const newCourse = { id: `course-${Date.now()}`, name: '', approvedTuition: 0, reportedTotalAsk: 0, placementRate: 0, duration: '4 Years' };
                          setEditingCollege({...editingCollege, courses: [...(editingCollege.courses || []), newCourse]});
                        }} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold text-xs flex items-center gap-1 rounded-lg hover:bg-indigo-500/20 transition-colors">
                          <Plus className="w-3 h-3" /> Add Course
                        </button>
                      </h3>
                      <div className="space-y-4">
                        {(editingCollege.courses || []).length === 0 && (
                          <div className="text-sm text-slate-500 italic p-4 bg-slate-900/60 border border-slate-700/50 border-dashed rounded-xl text-center">
                            No courses added yet. Click 'Add Course' to begin building the syllabus.
                          </div>
                        )}
                        {(editingCollege.courses || []).map((course, idx) => (
                          <div key={course.id || idx} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-slate-900/40 border border-slate-700/50 rounded-xl relative group">
                            <button type="button" onClick={() => {
                              const newC = [...editingCollege.courses];
                              newC.splice(idx, 1);
                              setEditingCollege({...editingCollege, courses: newC});
                            }} className="absolute -top-2 -right-2 p-1.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer">
                              <X className="w-3 h-3" />
                            </button>
                            
                            <div className="md:col-span-2">
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Course Name</label>
                              <datalist id="common-courses">
                                <option value="B.Tech Computer Science" />
                                <option value="B.Tech Information Technology" />
                                <option value="BBA" />
                                <option value="MBA" />
                                <option value="BCA" />
                                <option value="MBBS" />
                              </datalist>
                              <input required type="text" list="common-courses" value={course.name} onChange={e => {
                                const newC = [...editingCollege.courses];
                                newC[idx].name = e.target.value;
                                setEditingCollege({...editingCollege, courses: newC});
                              }} className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700/50 text-slate-100 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none text-sm rounded-lg transition-all" placeholder="e.g. B.Tech CSE" />
                            </div>
                            
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Approved Tuition</label>
                              <input required type="number" value={course.approvedTuition} onChange={e => {
                                const newC = [...editingCollege.courses];
                                newC[idx].approvedTuition = parseInt(e.target.value) || 0;
                                setEditingCollege({...editingCollege, courses: newC});
                              }} className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700/50 text-slate-100 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none text-sm rounded-lg transition-all" />
                            </div>
                            
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Reported Total Ask</label>
                              <input required type="number" value={course.reportedTotalAsk} onChange={e => {
                                const newC = [...editingCollege.courses];
                                newC[idx].reportedTotalAsk = parseInt(e.target.value) || 0;
                                setEditingCollege({...editingCollege, courses: newC});
                              }} className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700/50 text-slate-100 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none text-sm rounded-lg transition-all" />
                            </div>

                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Placement %</label>
                              <input required type="number" value={course.placementRate} onChange={e => {
                                const newC = [...editingCollege.courses];
                                newC[idx].placementRate = parseInt(e.target.value) || 0;
                                setEditingCollege({...editingCollege, courses: newC});
                              }} className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700/50 text-slate-100 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none text-sm rounded-lg transition-all" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Image URL or Upload</label>
                    <div className="flex gap-2">
                      <input type="text" value={editingCollege.image} onChange={e => setEditingCollege({...editingCollege, image: e.target.value})} className="flex-1 px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm" placeholder="https://..." />
                      <label className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-bold text-xs flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors whitespace-nowrap">
                        Upload Image
                        <input type="file" accept="image/*" className="hidden" onChange={handleCollegeImageUpload} />
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Description</label>
                    <textarea rows={4} value={editingCollege.description} onChange={e => setEditingCollege({...editingCollege, description: e.target.value})} className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm"></textarea>
                  </div>

                  <div className="pt-4 border-t border-slate-700/50">
                    <button type="submit" className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 cursor-pointer">
                      <Save className="w-4 h-4" /> Save College
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-slate-700/40 border-t-slate-600/30 backdrop-blur-md rounded-2xl shadow-xl shadow-black/30 overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-800/60 border-b border-slate-700/30 text-xs uppercase tracking-wider text-slate-400 font-bold">
                    <tr>
                      <th className="px-6 py-4">College Name</th>
                      <th className="px-6 py-4">State</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {collegeList.map(college => (
                      <tr key={college.id} className="hover:bg-slate-700/20 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-100">{college.name}</td>
                        <td className="px-6 py-4 text-slate-300">{college.state}</td>
                        <td className="px-6 py-4"><span className="bg-slate-900/60 border border-slate-700/50 text-slate-300 px-2.5 py-1 rounded-md text-xs font-bold">{college.collegeType}</span></td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => {
                            setEditingCollege(college);
                            setIsEditingCollege(true);
                          }} className="text-cyan-400 hover:text-cyan-300 font-bold text-xs cursor-pointer px-3 py-1.5 hover:bg-cyan-500/10 rounded-lg transition-colors">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Cases Tab */}
        {activeTab === 'cases' && (() => {
          const filteredCases = supportRequests.filter(req => {
            if (casesFilter === 'critical') return req.urgency === 'critical';
            if (casesFilter === 'high') return req.urgency === 'high';
            return true;
          });

          // Sort: Critical -> High -> Standard, then newest
          const urgencyWeight = { critical: 3, high: 2, standard: 1 };
          filteredCases.sort((a, b) => {
            const weightA = urgencyWeight[a.urgency as keyof typeof urgencyWeight] || 1;
            const weightB = urgencyWeight[b.urgency as keyof typeof urgencyWeight] || 1;
            if (weightA !== weightB) return weightB - weightA;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });

          return (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-black text-slate-100 font-serif">Support Cases</h1>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCasesFilter('all')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${casesFilter === 'all' ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 border-transparent' : 'border border-slate-700/50 text-slate-400 hover:text-slate-200'}`}>All Cases</button>
                  <button onClick={() => setCasesFilter('critical')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${casesFilter === 'critical' ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 border-transparent' : 'border border-slate-700/50 text-slate-400 hover:text-slate-200'}`}>Critical</button>
                  <button onClick={() => setCasesFilter('high')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${casesFilter === 'high' ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 border-transparent' : 'border border-slate-700/50 text-slate-400 hover:text-slate-200'}`}>High Priority</button>
                </div>
              </div>
              
              <div className="bg-slate-800/40 border border-slate-700/40 border-t-slate-600/30 backdrop-blur-md rounded-2xl shadow-xl shadow-black/30 overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-slate-800/60 border-b border-slate-700/30 text-xs uppercase tracking-wider text-slate-400 font-bold">
                    <tr>
                      <th className="px-6 py-4">Ref</th>
                      <th className="px-6 py-4">Priority</th>
                      <th className="px-6 py-4">Student</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {filteredCases.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-slate-400">No support cases found.</td>
                      </tr>
                    )}
                    {filteredCases.map(req => (
                      <tr key={req.id} className="hover:bg-slate-700/20 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-slate-300">{req.referenceNumber}</td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
                            req.urgency === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                            req.urgency === 'high' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 
                            'bg-slate-700/40 text-slate-400'
                          }`}>
                            {req.urgency === 'critical' && <span className="relative flex h-2 w-2 items-center justify-center"><span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span></span>}
                            {req.urgency}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-100">{req.firstName} {req.lastName}</div>
                          {(req.contactNumber || req.email) && (
                            <div className="text-[10px] text-slate-400 mt-1">
                              {req.contactNumber && <span>{req.contactNumber}</span>}
                              {req.contactNumber && req.email && <span className="mx-1">•</span>}
                              {req.email && <span>{req.email}</span>}
                            </div>
                          )}
                          {req.address && (
                            <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[200px]" title={req.address}>
                              {req.address}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-300">{req.category || 'General'}</td>
                        <td className="px-6 py-4 text-slate-400">{new Date(req.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

        {/* CMS VIEW */}
        {activeTab === 'cms' && (
          <CMSEditor />
        )}

        {/* ACTIVE CHANNEL VIEW */}
        {activeTab === 'active_channel' && (
          <ActiveChannelAdmin />
        )}

      </div>
    </div>
  );
}



