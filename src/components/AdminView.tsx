"use client";
import React, { useState } from 'react';
import { BlogPost, College, SupportRequest } from '../types';
import { LayoutDashboard, FileText, Building, Users, LogIn, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { blogCategories } from '../data/blogData';
import { useGlobal } from '../context/GlobalContext';

export default function AdminView() {
  const { 
    blogList, setBlogList, 
    collegeList, setCollegeList, 
    supportRequests 
  } = useGlobal();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'blogs' | 'colleges' | 'cases'>('dashboard');

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isEditingBlog, setIsEditingBlog] = useState(false);

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center pt-20 px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl w-full max-w-sm space-y-6 shadow-2xl">
          <div className="text-center">
            <h1 className="text-2xl font-black text-slate-900">Admin Login</h1>
            <p className="text-xs text-slate-500 mt-2">Restricted Access</p>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Passcode</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:outline-none focus:border-slate-900"
              placeholder="Enter passcode..."
            />
          </div>
          <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors cursor-pointer">
            <LogIn className="w-4 h-4" /> Authenticate
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row pt-16">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-white shrink-0 p-4 border-t border-slate-800">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 px-4">Apnijanta Admin</h2>
        <nav className="space-y-1">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
            { id: 'blogs', icon: FileText, label: 'Blog Posts' },
            { id: 'colleges', icon: Building, label: 'Colleges' },
            { id: 'cases', icon: Users, label: 'Support Cases' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setIsEditingBlog(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors cursor-pointer ${activeTab === item.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-auto">
        
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-black text-slate-900 font-serif">System Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Blogs</p>
                <p className="text-4xl font-black text-slate-900 mt-2">{blogList.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Listed Colleges</p>
                <p className="text-4xl font-black text-slate-900 mt-2">{collegeList.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Open Cases</p>
                <p className="text-4xl font-black text-slate-900 mt-2">{supportRequests.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === 'blogs' && !isEditingBlog && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-black text-slate-900 font-serif">Manage Blogs</h1>
              <button onClick={startNewBlog} className="px-4 py-2 bg-slate-900 text-white font-bold text-xs flex items-center gap-2 cursor-pointer hover:bg-slate-800">
                <Plus className="w-4 h-4" /> New Post
              </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {blogList.map(post => (
                    <tr key={post.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-900">{post.title}</td>
                      <td className="px-6 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 text-xs font-bold">{post.category}</span></td>
                      <td className="px-6 py-4 text-slate-500">{post.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => { setEditingBlog({...post}); setIsEditingBlog(true); }} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded mr-2 cursor-pointer">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteBlog(post.id)} className="p-2 text-red-600 hover:bg-red-50 rounded cursor-pointer">
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
              <h1 className="text-3xl font-black text-slate-900 font-serif">
                {editingBlog.title ? 'Edit Post' : 'New Post'}
              </h1>
              <button onClick={() => setIsEditingBlog(false)} className="px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs flex items-center gap-2 hover:bg-slate-200 cursor-pointer">
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Title</label>
                  <input required type="text" value={editingBlog.title} onChange={e => setEditingBlog({...editingBlog, title: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 focus:outline-none focus:border-slate-900 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Slug (URL)</label>
                  <input required type="text" value={editingBlog.slug} onChange={e => setEditingBlog({...editingBlog, slug: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 focus:outline-none focus:border-slate-900 text-sm" placeholder="my-new-post" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Category</label>
                  <select value={editingBlog.category} onChange={e => setEditingBlog({...editingBlog, category: e.target.value as any})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 focus:outline-none focus:border-slate-900 text-sm">
                    {blogCategories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Image URL or Upload</label>
                  <div className="flex gap-2">
                    <input type="text" value={editingBlog.image} onChange={e => setEditingBlog({...editingBlog, image: e.target.value})} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 focus:outline-none focus:border-slate-900 text-sm" placeholder="https://..." />
                    <label className="px-4 py-2.5 bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center cursor-pointer hover:bg-slate-300 transition-colors whitespace-nowrap">
                      Upload Image
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Author Name</label>
                  <input required type="text" value={editingBlog.authorName} onChange={e => setEditingBlog({...editingBlog, authorName: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 focus:outline-none focus:border-slate-900 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Author Initials (Avatar)</label>
                  <input required type="text" value={editingBlog.authorAvatar} onChange={e => setEditingBlog({...editingBlog, authorAvatar: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 focus:outline-none focus:border-slate-900 text-sm" placeholder="JD" />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Excerpt (Short Summary)</label>
                <textarea required rows={2} value={editingBlog.excerpt} onChange={e => setEditingBlog({...editingBlog, excerpt: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 focus:outline-none focus:border-slate-900 text-sm"></textarea>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">Full Content (HTML/Text)</label>
                <textarea rows={12} value={editingBlog.content || ''} onChange={e => setEditingBlog({...editingBlog, content: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 focus:outline-none focus:border-slate-900 text-sm font-mono" placeholder="<p>Write your article here...</p>"></textarea>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button type="submit" className="px-6 py-3 bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer hover:bg-slate-800 transition-colors">
                  <Save className="w-4 h-4" /> Save Post
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Colleges Tab (Basic implementation for MVP) */}
        {activeTab === 'colleges' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-black text-slate-900 font-serif">Manage Colleges</h1>
              <button onClick={() => alert('College editor coming soon in phase 2!')} className="px-4 py-2 bg-slate-900 text-white font-bold text-xs flex items-center gap-2 cursor-pointer hover:bg-slate-800">
                <Plus className="w-4 h-4" /> Add College
              </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                  <tr>
                    <th className="px-6 py-4">College Name</th>
                    <th className="px-6 py-4">State</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {collegeList.map(college => (
                    <tr key={college.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-900">{college.name}</td>
                      <td className="px-6 py-4">{college.state}</td>
                      <td className="px-6 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 text-xs font-bold">{college.collegeType}</span></td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => alert('Editing coming in phase 2')} className="text-indigo-600 hover:underline font-bold text-xs cursor-pointer">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cases Tab */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-black text-slate-900 font-serif">Support Cases</h1>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                  <tr>
                    <th className="px-6 py-4">Ref</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Urgency</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {supportRequests.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No support cases submitted yet.</td>
                    </tr>
                  )}
                  {supportRequests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono text-xs">{req.referenceNumber}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{req.firstName} {req.lastName}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-[10px] font-bold uppercase ${
                          req.urgency === 'Critical / Urgent' ? 'bg-red-100 text-red-700' : 
                          req.urgency === 'High Priority' ? 'bg-amber-100 text-amber-700' : 
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {req.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4">{req.category || 'General'}</td>
                      <td className="px-6 py-4 text-slate-500">{new Date(req.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}



