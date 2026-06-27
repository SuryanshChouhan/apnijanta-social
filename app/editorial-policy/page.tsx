import React from 'react';
import { Shield, CheckCircle, Scale, AlertTriangle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial & Review Policy | Methodology for Identifying Scam Colleges',
  description: 'Understand how Apnijanta evaluates, reviews, and classifies colleges. Learn about our editorial methodology, strict fact-checking process, and dispute resolution for colleges.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
        
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editorial & Review Policy</h1>
            <p className="text-slate-500 font-medium mt-1">Our Methodology for College Evaluation & Trust</p>
          </div>
        </div>

        <div className="prose prose-slate prose-lg max-w-none">
          <p className="lead text-xl text-slate-600 mb-10 leading-relaxed">
            At Apnijanta, we deal with highly sensitive information involving student careers, financial investments, and institutional integrity. Because of the impact our platform has, we hold ourselves to the highest standards of journalistic integrity, factual accuracy, and fairness.
          </p>

          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mt-10 mb-6 pb-2 border-b border-slate-100">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            1. Methodology for Labeling a "Scam" College
          </h2>
          <p>
            We do not use the term "scam" lightly. A college or institution is only flagged on our platform if it meets one or more of the following strictly verified criteria:
          </p>
          <ul className="space-y-3 mt-4">
            <li className="flex gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              <span><strong>Lack of Accreditation:</strong> The institution claims to offer degrees but is not recognized by the UGC, AICTE, NMC, or relevant statutory bodies.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              <span><strong>Capitation Fees & Extortion:</strong> Documented proof (via student affidavits, hidden camera investigations, or official complaints) of illegal capitation fees, withholding of original marksheets, or financial extortion.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              <span><strong>Fake Infrastructure / Faculty:</strong> Substantial evidence that the campus, facilities, or faculty heavily advertised do not exist in reality, deceiving students.</span>
            </li>
          </ul>

          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mt-12 mb-6 pb-2 border-b border-slate-100">
            <Scale className="w-6 h-6 text-indigo-500" />
            2. Our Review & Moderation Process
          </h2>
          <p>
            Every claim published on Apnijanta undergoes a rigorous multi-step review:
          </p>
          <ol className="mt-4 space-y-4">
            <li><strong>Initial Submission:</strong> Students or whistleblowers submit detailed reports along with supporting evidence (fee receipts, emails, audio/video recordings).</li>
            <li><strong>Fact-Checking:</strong> Our internal team cross-references the claims against official government databases (e.g., UGC lists of fake universities).</li>
            <li><strong>Legal & Editorial Review:</strong> High-risk claims are reviewed by our advisory board of student rights advocates and legal professionals to ensure the content is factual, non-defamatory, and in the public interest.</li>
            <li><strong>Publication:</strong> Only after this clearance is a college profile updated with a warning or a specific investigation published.</li>
          </ol>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 pb-2 border-b border-slate-100">
            3. User-Generated Content (Reviews)
          </h2>
          <p>
            Student reviews are vital for transparency, but they are strictly moderated to comply with our community guidelines and Google AdSense policies. We do not permit:
          </p>
          <ul>
            <li>Hate speech, harassment, or personal attacks against specific faculty members.</li>
            <li>Unsubstantiated claims of illegal activity without contextual evidence.</li>
            <li>Spam, promotional content, or artificially generated reviews.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 pb-2 border-b border-slate-100">
            4. College Dispute & Right to Reply
          </h2>
          <p>
            We believe in fairness. If a college believes they have been inaccurately flagged or misrepresented, they have a formal <strong>Right to Reply</strong>.
          </p>
          <p>
            Authorized institutional representatives can contact us at <strong>legal@apnijanta.com</strong> with official documentation refuting the claims. If the documentation proves the initial claim was inaccurate or that the issue has been structurally resolved, we will issue a public correction and update the institution's standing on our platform within 72 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
