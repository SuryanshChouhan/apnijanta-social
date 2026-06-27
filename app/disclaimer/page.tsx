import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | Apnijanta',
  description: 'Legal disclaimers and terms of advocacy for Apnijanta.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
        
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Legal Disclaimer</h1>
            <p className="text-slate-500 font-medium mt-1">Important Information Regarding Our Platform</p>
          </div>
        </div>

        <div className="prose prose-slate prose-lg max-w-none">
          <p>
            The information contained on the Apnijanta website is for general information and advocacy purposes only. Apnijanta assumes no responsibility for errors or omissions in the contents of the Service.
          </p>

          <h2>1. Not Legal Advice</h2>
          <p>
            The materials and resources provided on this website do not constitute legal advice. While we strive to provide accurate and up-to-date information regarding student rights, university regulations, and capitation fee rules, the information may not reflect the most current legal developments. You should consult a qualified attorney for advice regarding your individual situation.
          </p>

          <h2>2. Third-Party Content & Reviews</h2>
          <p>
            Apnijanta hosts user-generated content, including student reviews and college scam alerts. These views and opinions are solely those of the original authors and do not necessarily represent those of Apnijanta. We act as a platform for transparency and are protected under relevant safe harbor provisions for intermediary liability. We actively moderate content in accordance with our Editorial Policy, but we do not guarantee the absolute accuracy of every user submission.
          </p>

          <h2>3. Liability</h2>
          <p>
            In no event shall Apnijanta, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
          </p>

          <h2>4. Right to Remove or Update Content</h2>
          <p>
            Apnijanta reserves the right to make additions, deletions, or modifications to the contents on the Service at any time without prior notice. If an educational institution provides verifiable proof refuting claims on our platform, we will exercise our right to update the content accordingly under our "Right to Reply" framework.
          </p>

          <h2>5. External Links Disclaimer</h2>
          <p>
            The Apnijanta website may contain links to external websites that are not provided or maintained by or in any way affiliated with Apnijanta. Please note that Apnijanta does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
          </p>

          <p className="mt-8 text-sm text-slate-500">
            For official correspondence, please contact us at <strong>apnijantaofficial@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
