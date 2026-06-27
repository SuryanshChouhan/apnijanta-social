'use client';

import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

type ContentItem = {
  id: string;
  value: string;
  section: string;
  field_type?: string;
};

// Component to edit JSON arrays dynamically
function JsonArrayEditor({ 
  value, 
  onChange 
}: { 
  value: string, 
  onChange: (val: string) => void 
}) {
  let parsed: any[] = [];
  try {
    parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) parsed = [];
  } catch (e) {
    parsed = [];
  }

  const updateItem = (index: number, key: string, val: string) => {
    const newArr = [...parsed];
    newArr[index] = { ...newArr[index], [key]: val };
    onChange(JSON.stringify(newArr));
  };

  const removeItem = (index: number) => {
    const newArr = [...parsed];
    newArr.splice(index, 1);
    onChange(JSON.stringify(newArr));
  };

  const addItem = () => {
    const newArr = [...parsed];
    // Copy schema from first item if exists
    const schemaTemplate = newArr.length > 0 ? Object.keys(newArr[0]).reduce((acc, k) => ({ ...acc, [k]: '' }), {}) : { label: '', path: '' };
    newArr.push(schemaTemplate);
    onChange(JSON.stringify(newArr));
  };

  return (
    <div className="space-y-4">
      {parsed.length === 0 && (
        <div className="text-sm text-slate-500 italic p-4 bg-slate-900/60 border border-slate-700/50 border-dashed rounded-xl text-center">No items added yet.</div>
      )}
      {parsed.map((item, idx) => (
        <div key={idx} className="relative bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 space-y-3 group">
          <button 
            type="button"
            onClick={() => removeItem(idx)}
            className="absolute -top-2 -right-2 p-1.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-6">
            {Object.keys(item).map(k => (
              <div key={k}>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{k}</label>
                {item[k] && typeof item[k] === 'string' && item[k].length > 50 ? (
                  <textarea
                    value={item[k]}
                    onChange={(e) => updateItem(idx, k, e.target.value)}
                    rows={2}
                    className="w-full px-3 py-1.5 bg-slate-900/80 border border-slate-700/50 text-slate-100 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none text-sm rounded-lg transition-all"
                  />
                ) : (
                  <input
                    type="text"
                    value={item[k]}
                    onChange={(e) => updateItem(idx, k, e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900/80 border border-slate-700/50 text-slate-100 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none text-sm rounded-lg transition-all"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button 
        type="button" 
        onClick={addItem}
        className="flex items-center gap-1 text-sm font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-2 rounded-lg hover:bg-indigo-500/20 transition-colors cursor-pointer w-fit"
      >
        <Plus className="w-4 h-4" /> Add Item
      </button>
    </div>
  );
}

export default function CMSEditor() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContentItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (id: string, newValue: string) => {
    setContentItems(prev => prev.map(item => item.id === id ? { ...item, value: newValue } : item));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentItems)
      });
      if (res.ok) {
        alert('Content saved successfully!');
      } else {
        alert('Failed to save content.');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving content.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-slate-500">Loading content editor...</div>;

  // Group by section
  const sections = contentItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  return (
    <div className="bg-slate-800/40 border border-slate-700/40 border-t-slate-600/30 backdrop-blur-md p-8 rounded-2xl shadow-xl shadow-black/30">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-100">Website Content Manager (CMS)</h2>
          <p className="text-sm text-slate-400 mt-1">Advanced Mode: Edit text and complex lists across the website.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl px-6 py-2.5 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="space-y-10">
        {Object.entries(sections).map(([sectionName, items]) => (
          <div key={sectionName} className="border border-slate-700/50 rounded-xl overflow-hidden shadow-sm bg-slate-800/40">
            <div className="bg-slate-800/60 px-6 py-3 border-b border-slate-700/30">
              <h3 className="font-bold text-slate-100 uppercase tracking-wider text-sm">{sectionName}</h3>
            </div>
            <div className="p-6 space-y-8 bg-slate-900/20">
              {items.map(item => (
                <div key={item.id} className="grid grid-cols-1 lg:grid-cols-4 gap-4 pb-8 border-b border-slate-700/50 last:border-0 last:pb-0">
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-bold text-slate-100">{item.id}</label>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider bg-slate-900/60 border border-slate-700/50 px-2 py-0.5 rounded mt-1 inline-block">
                      {item.field_type || 'text'}
                    </span>
                  </div>
                  <div className="lg:col-span-3">
                    {item.field_type === 'json_array' ? (
                      <JsonArrayEditor 
                        value={item.value} 
                        onChange={(val) => handleChange(item.id, val)}
                      />
                    ) : item.field_type === 'textarea' || (item.field_type !== 'json_array' && item.value.length > 60) ? (
                      <textarea 
                        value={item.value} 
                        onChange={(e) => handleChange(item.id, e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 bg-slate-900/60 border border-slate-700/50 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 shadow-sm transition-all"
                      />
                    ) : (
                      <input 
                        type="text"
                        value={item.value} 
                        onChange={(e) => handleChange(item.id, e.target.value)}
                        className="w-full px-4 py-2 bg-slate-900/60 border border-slate-700/50 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 shadow-sm transition-all"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
