"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Scale, FileText, Landmark, Building, ArrowRight, Check, Copy, AlertTriangle, BookOpen, ShieldAlert, GraduationCap, ArrowUpRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function ResourcesView() {
  const navigate = useRouter();
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

  const { content, getContentArray } = useContent();
  const cmsRegulations = getContentArray<any>('resources_regulations');

  const defaultRegulations = [
    {
      id: 'doc-retention',
      icon: FileText,
      color: 'indigo',
      title: 'Document Retention Ban',
      law: 'UGC Notification 2012 / Circular on Original Certificates',
      description: 'Colleges are strictly prohibited from retaining your original marksheets, degrees, or birth certificates under any circumstances, even if fees are pending.',
      template: 'Under UGC Notification on Remittance and Retention of Original Certificates, colleges are strictly prohibited from holding original marksheets or degrees. I request the immediate return of my documents. Non-compliance will be reported to the UGC Grievance Portal.'
    },
    {
      id: 'fee-refund',
      icon: Landmark,
      color: 'emerald',
      title: '100% Fee Refund Policy',
      law: 'AICTE Approval Process Handbook 2024 (Appendix)',
      description: 'If you withdraw your admission before the stipulated deadline, colleges must refund 100% of your fees (minus a maximum ₹1,000 processing fee). They cannot withhold seat-booking amounts.',
      template: 'As per AICTE Approval Process Handbook guidelines on Fee Refund, I request the full refund of my paid admission fee minus the ₹1,000 processing charge, as I am withdrawing before the deadline.'
    },
    {
      id: 'forced-hostel',
      icon: Building,
      color: 'amber',
      title: 'Forced Hostel Bundling Illegal',
      law: 'UGC Guidelines on Student Entitlements',
      description: 'Making hostel accommodation mandatory for local/day scholars to extract extra fees is an unfair practice. You cannot be forced to pay for services you do not consume.',
      template: 'I am a local resident and do not require hostel accommodation. Under UGC Guidelines on Student Entitlements, bundling services and forcing unused facilities is considered an unfair practice. Please remove hostel charges from my fee structure.'
    },
    {
      id: 'capitation-fee',
      icon: AlertTriangle,
      color: 'red',
      title: 'Capitation Fee Prohibition',
      law: 'Prohibition of Unfair Practices in Technical Educational Institutions Act',
      description: 'Demanding donations or capitation fees beyond the state-approved fee structure is a criminal offense. All fees must be receipted and transparent.',
      template: 'I am requesting an official, stamped receipt detailing all heads of the fee demanded. Under the Prohibition of Unfair Practices Act, demanding unreceipted capitation fees is illegal. If a receipt cannot be provided, I expect the fee to be waived.'
    },
    {
      id: 'fake-affiliation',
      icon: ShieldAlert,
      color: 'rose',
      title: 'Fake Approvals & Affiliation',
      law: 'UGC Fake Universities Act / AICTE Norms',
      description: 'Institutions claiming false UGC/AICTE approvals or offering unrecognised "diplomas" masked as degrees are liable for immediate closure and full fee refunds.',
      template: 'I am formally requesting the verified AICTE/UGC approval letter for my specific course batch. Offering unapproved degrees is a violation of UGC norms. Pending this verification, I reserve the right to seek a full refund.'
    },
    {
      id: 'transfer-harassment',
      icon: ArrowUpRight,
      color: 'blue',
      title: 'Mid-Year Transfer Rights',
      law: 'UGC Notification on Fee Remittance',
      description: 'If you wish to leave the college mid-course, the institution cannot demand the remaining 3 or 4 years of tuition fees to release your transfer certificate (TC).',
      template: 'I am applying for a mid-course transfer. As per UGC regulations, the college cannot demand fees for the remaining years of the course to issue my Transfer Certificate (TC) and Migration. Please process my TC immediately.'
    }
  ];

  const regulations = cmsRegulations.length > 0 ? cmsRegulations : defaultRegulations;
  
  const iconMap: Record<string, any> = {
    indigo: FileText,
    emerald: Landmark,
    amber: Building,
    red: AlertTriangle,
    rose: ShieldAlert,
    blue: ArrowUpRight
  };

  return (
    <div className="relative bg-slate-50 min-h-screen text-slate-800 antialiased overflow-x-hidden selection:bg-indigo-600 selection:text-white pt-24 pb-20">
      
      {/* Modern High-Contrast Grid Mesh Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(#e2e8f0_1px,transparent_1.5px)] [background-size:24px_24px] opacity-60 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-mono shadow-sm">
            <Scale className="w-4 h-4" /> STUDENT RIGHTS & LEGAL ARSENAL
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.1]">
            {content['resources_title'] || "The Rules They Don't Want You to Know."}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 font-light leading-relaxed">
            {content['resources_desc'] || "Colleges rely on intimidation and ignorance. Equip yourself with the exact UGC and AICTE mandates to fight back against hidden fees, withheld marksheets, and illegal policies."}
          </p>
        </div>

        {/* Regulations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regulations.map((reg: any, index: number) => {
            const Icon = iconMap[reg.color] || FileText;
            const colorMap: Record<string, string> = {
              indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
              emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
              amber: 'bg-amber-50 text-amber-600 border-amber-200',
              red: 'bg-red-50 text-red-600 border-red-200',
              rose: 'bg-rose-50 text-rose-600 border-rose-200',
              blue: 'bg-blue-50 text-blue-600 border-blue-200',
            };
            const iconColorMap: Record<string, string> = {
              indigo: 'bg-indigo-100 text-indigo-600',
              emerald: 'bg-emerald-100 text-emerald-600',
              amber: 'bg-amber-100 text-amber-600',
              red: 'bg-red-100 text-red-600',
              rose: 'bg-rose-100 text-rose-600',
              blue: 'bg-blue-100 text-blue-600',
            };

            return (
              <div key={reg.id || index} className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 hover:shadow-indigo-500/10 transition-all duration-300">
                <div className="space-y-4 mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconColorMap[reg.color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">{reg.title}</h3>
                    <div className={`mt-2 inline-block border text-[10px] font-mono font-bold px-2 py-1 rounded-md ${colorMap[reg.color]}`}>
                      {reg.law}
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {reg.description}
                  </p>
                </div>
                
                <div className="space-y-3 pt-6 border-t border-slate-100 mt-auto">
                  {fallbackText?.id === reg.id ? (
                    <textarea 
                      readOnly 
                      className="w-full text-xs font-mono bg-white border border-indigo-200 rounded-lg p-3 h-24 text-slate-700 focus:outline-none focus:border-indigo-400"
                      value={fallbackText.text}
                      onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                    />
                  ) : (
                    <button 
                      onClick={() => handleCopy(reg.id, reg.template)}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors ${copiedId === reg.id ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 cursor-pointer'}`}
                    >
                      {copiedId === reg.id ? <><Check className="w-4 h-4" /> Template Copied!</> : <><Copy className="w-4 h-4 text-slate-400" /> Copy Email Template</>}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-emerald-600/20 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black">Still not getting a response?</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              If copying a template isn't enough, we can help you draft a formal legal notice or escalate your case directly to the UGC Grievance Portal.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => navigate.push('/get-help')}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Submit Your Case for Review <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/colleges"
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore College Directory
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}



