"use client";

import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ShieldAlert, Check, Copy } from 'lucide-react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <>
      <Navbar openEmergencyModal={() => setEmergencyModalOpen(true)} />
      
      <main className="min-h-[calc(100vh-280px)]">
        {children}
      </main>

      <Footer openEmergencyModal={() => setEmergencyModalOpen(true)} />

      {emergencyModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-scale-up border border-red-100">
            
            <button 
              onClick={() => setEmergencyModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors cursor-pointer"
            >
              âœ•
            </button>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">Emergency Assistance</h2>
                <p className="text-xs text-gray-400">If you are facing an immediate safety threat, eviction, or mental distress, connect securely with national and peer services.</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { title: 'National Crisis Text Line', number: '741741', action: 'Text HOME to 741741', desc: 'Free, 24/7 confidential crisis counseling.' },
                { title: 'Peer Advocacy Legal Clinic', number: '+1-800-555-0199', action: 'Call 1-800-555-0199', desc: 'Syllabus disputes and housing rights specialists.' },
                { title: 'Title IX Safe Helpline', number: '+1-877-995-5247', action: 'Call 877-995-5247', desc: 'Confidential sexual assault legal aid network.' },
                { title: 'Apnijanta Urgent Dispatch', number: '+1-800-555-0144', action: 'Call 1-800-555-0144', desc: 'On-demand coordinator intervention (eviction support).' }
              ].map((contact, idx) => (
                <div key={idx} className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl flex justify-between items-center gap-4 text-xs">
                  <div className="space-y-1 pr-2 truncate">
                    <h4 className="font-extrabold text-gray-800">{contact.title}</h4>
                    <p className="text-[10px] text-gray-400 leading-normal">{contact.desc}</p>
                    <p className="text-indigo-600 font-bold">{contact.number}</p>
                  </div>
                  <button 
                    onClick={() => handleCopy(contact.number, contact.title)}
                    className="px-3.5 py-2 bg-white hover:bg-gray-50 text-gray-700 font-bold border border-gray-200 rounded-xl flex items-center gap-1.5 shrink-0 transition-colors shadow-sm cursor-pointer"
                  >
                    {copiedText === contact.title ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 text-[10px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[10px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 bg-red-50 text-red-900 border border-red-200 rounded-2xl text-xs font-medium leading-relaxed">
              <strong>Disclaimer:</strong> Apnijanta coordinates peer legal and mental wellness advocacy. For immediate severe medical threats, please dial 911 or visit the nearest healthcare center.
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setEmergencyModalOpen(false)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Close Emergency panel
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}


