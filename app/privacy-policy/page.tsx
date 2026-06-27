import React from 'react';
import { Shield } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Apnijanta',
  description: 'Privacy policy and data protection guidelines for Apnijanta.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
        
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
            <p className="text-slate-500 font-medium mt-1">Last updated: June 2026</p>
          </div>
        </div>

        <div className="prose prose-slate prose-lg max-w-none">
          <p>
            At Apnijanta ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Apnijanta.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey, fill out a form, or submit a grievance/review.
          </p>
          <ul>
            <li><strong>Personal Data:</strong> Name, email address (apnijantaofficial@gmail.com), phone number, and location.</li>
            <li><strong>Usage Data:</strong> IP address, browser type, operating system, and interactions with our platform.</li>
            <li><strong>Submitted Content:</strong> Documents, reviews, and evidence uploaded via our grievance portals (which are subject to anonymity protections).</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We may use the information we collect from you in the following ways:</p>
          <ul>
            <li>To personalize your experience and deliver content relevant to your interests.</li>
            <li>To improve our website and services based on user feedback.</li>
            <li>To process your grievances, reviews, or legal aid requests.</li>
            <li>To send periodic emails regarding your specific case or platform updates.</li>
          </ul>

          <h2>3. Data Protection & Anonymity</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. Your privacy is paramount, especially when reporting sensitive information regarding educational institutions. Whistleblower identities and user reviews can be kept strictly anonymous upon request, and we do not sell or trade your personally identifiable information to outside parties.
          </p>

          <h2>4. Cookies</h2>
          <p>
            We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If there are any questions regarding this privacy policy, you may contact us using the information below:
          </p>
          <p>
            <strong>Apnijanta Trust</strong><br/>
            Bhopal, Madhya Pradesh 462047, India<br/>
            Email: apnijantaofficial@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
