import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Radio } from 'lucide-react';

export interface ActiveChannelFeed {
  id: string;
  title: string;
  badge_type: string;
  protest_title: string;
  description: string;
  status_text: string;
  created_at?: string;
}

export default function ActiveChannelAdmin() {
  const [channels, setChannels] = useState<ActiveChannelFeed[]>([]);
  const [editingItem, setEditingItem] = useState<ActiveChannelFeed | null>(null);

  useEffect(() => {
    fetch('/api/active-channels')
      .then(res => res.json())
      .then(data => setChannels(data))
      .catch(err => console.error('Error fetching active channels:', err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const method = 'POST';
    try {
      await fetch('/api/active-channels', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });
      
      const isNew = !channels.find(c => c.id === editingItem.id);
      if (isNew) {
        setChannels([editingItem, ...channels]);
      } else {
        setChannels(channels.map(c => c.id === editingItem.id ? editingItem : c));
      }
      setEditingItem(null);
    } catch (err) {
      console.error(err);
      alert('Error saving active channel item');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this live feed entry?')) {
      try {
        await fetch(`/api/active-channels/${id}`, { method: 'DELETE' });
        setChannels(channels.filter(c => c.id !== id));
      } catch (err) {
        console.error(err);
        alert('Error deleting active channel item');
      }
    }
  };

  const startNew = () => {
    setEditingItem({
      id: `ac-${Date.now()}`,
      title: '',
      badge_type: 'EMERGENCY',
      protest_title: '',
      description: '',
      status_text: ''
    });
  };

  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'EMERGENCY': return 'bg-red-500/10 text-red-400 border border-red-500/30';
      case 'REPRESENTATION': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30';
      case 'ADVOCACY': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      default: return 'bg-slate-800/60 text-slate-300 border border-slate-700/50';
    }
  };

  if (editingItem) {
    return (
      <div className="bg-slate-800/40 border border-slate-700/40 border-t-slate-600/30 backdrop-blur-md rounded-2xl shadow-xl shadow-black/30 overflow-hidden">
        <div className="p-6 border-b border-slate-700/30 flex justify-between items-center bg-slate-800/60">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400" />
            {channels.find(c => c.id === editingItem.id) ? 'Edit Live Feed' : 'New Live Feed'}
          </h2>
          <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Group / Organization Title</label>
              <input
                type="text"
                required
                className="w-full bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm p-3"
                value={editingItem.title}
                onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                placeholder="e.g. Boston Union Hub"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Badge Type</label>
              <select
                className="w-full bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none transition-all text-sm p-3"
                value={editingItem.badge_type}
                onChange={e => setEditingItem({...editingItem, badge_type: e.target.value})}
              >
                <option value="EMERGENCY" className="bg-slate-900 text-slate-100">EMERGENCY (Red)</option>
                <option value="REPRESENTATION" className="bg-slate-900 text-slate-100">REPRESENTATION (Indigo)</option>
                <option value="ADVOCACY" className="bg-slate-900 text-slate-100">ADVOCACY (Green)</option>
                <option value="UPDATE" className="bg-slate-900 text-slate-100">UPDATE (Slate)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Protest / Campaign Title</label>
              <input
                type="text"
                required
                className="w-full bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm p-3"
                value={editingItem.protest_title}
                onChange={e => setEditingItem({...editingItem, protest_title: e.target.value})}
                placeholder="e.g. Protest: U-Dorm Habitability"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Description</label>
              <textarea
                required
                className="w-full bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm p-3 h-24"
                value={editingItem.description}
                onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                placeholder="Water leak caused black mold growth..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Status Text</label>
              <input
                type="text"
                required
                className="w-full bg-slate-900/60 border border-slate-700/50 text-slate-100 rounded-xl focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none placeholder:text-slate-500 transition-all text-sm p-3"
                value={editingItem.status_text}
                onChange={e => setEditingItem({...editingItem, status_text: e.target.value})}
                placeholder="e.g. Started: Oct 12, 2025 • Dispatched 2 mins ago"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-700/50">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl px-6 py-3 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 flex items-center gap-2 cursor-pointer text-sm"
            >
              <Save className="w-4 h-4" /> Save Live Feed Entry
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-800/40 border border-slate-700/40 border-t-slate-600/30 backdrop-blur-md p-6 rounded-2xl shadow-xl shadow-black/30">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400" />
            Active Channel / Live Feed Management
          </h2>
          <p className="text-slate-400 text-sm mt-1">Manage the live feed entries shown on the homepage. Only the top 3 latest entries will be displayed to users.</p>
        </div>
        <button 
          onClick={startNew}
          className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl px-5 py-2.5 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 flex items-center gap-2 cursor-pointer text-sm"
        >
          <Plus className="w-4 h-4" /> Add New Entry
        </button>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/40 backdrop-blur-md rounded-2xl shadow-xl shadow-black/30 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-700/30 bg-slate-800/60 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-3">Group Title</div>
          <div className="col-span-4">Protest/Campaign</div>
          <div className="col-span-2 text-center">Badge</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        <div className="divide-y divide-slate-700/30">
          {channels.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-700/20 transition-colors">
              <div className="col-span-3">
                <span className="font-semibold text-slate-100">{item.title}</span>
              </div>
              <div className="col-span-4 text-slate-300 text-sm truncate pr-4">
                {item.protest_title}
              </div>
              <div className="col-span-2 text-center">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${getBadgeColor(item.badge_type)}`}>
                  {item.badge_type}
                </span>
              </div>
              <div className="col-span-3 flex justify-end gap-2">
                <button 
                  onClick={() => setEditingItem(item)}
                  className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {channels.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No live feed entries found. Create one to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
