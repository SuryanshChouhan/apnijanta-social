import React from 'react';
import Link from 'next/link';
import { School, ShieldAlert, Heart, Info, MessageSquare } from 'lucide-react';

interface FooterProps {
  openEmergencyModal: () => void;
}

export default function Footer({ openEmergencyModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand and Description */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="flex items-center gap-2 cursor-pointer group text-white"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                <School className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">
                Apnijanta
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Structured urgency for student change. We champion student voices, expose institutional hidden costs, and provide direct peer support.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-200 uppercase mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Home / Initiatives
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Insights & Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/colleges"
                  className="hover:text-white transition-colors"
                >
                  Honest College Truths
                </Link>
              </li>
              <li>
                <Link 
                  href="/get-help"
                  className="hover:text-white transition-colors"
                >
                  Request Help Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-200 uppercase mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#victories" className="hover:text-white transition-colors">Success Stories</a>
              </li>
              <li>
                <button onClick={openEmergencyModal} className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-red-500 font-medium">
                  <ShieldAlert className="w-3.5 h-3.5" /> Emergency Response
                </button>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">Legal Aid Handbook</span>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">Fee Verification Tool</span>
              </li>
            </ul>
          </div>

          {/* Legal / Accountability */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-200 uppercase mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-gray-500">Privacy Policy (Fully Compliant)</span>
              </li>
              <li>
                <span className="text-gray-500">Terms of Advocacy</span>
              </li>
              <li>
                <span className="text-gray-500">Anonymity & Security Protection</span>
              </li>
              <li>
                <span className="text-gray-500">Case Submission Disclaimers</span>
              </li>
              <li>
                <Link href="/admin" className="text-indigo-500 hover:text-indigo-400 font-medium">Admin Portal</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>Â© {currentYear} Apnijanta. All rights reserved. Structured Urgency for Student Change.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500" /> for institutional transparency.
          </p>
        </div>
      </div>
    </footer>
  );
}



