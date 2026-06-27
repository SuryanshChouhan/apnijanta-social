import React from 'react';
import Link from 'next/link';
import { School, ShieldAlert, Heart, Info, MessageSquare } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface FooterProps {
  openEmergencyModal: () => void;
}

export default function Footer({ openEmergencyModal }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { content, getContentArray } = useContent();

  const platformLinks = getContentArray<{label: string, path: string}>('footer_platform_links');
  const actionLinks = getContentArray<{label: string, path: string}>('footer_action_links');

  // fallback arrays just in case DB is empty
  const defaultPlatform = [
    { label: 'Home / Initiatives', path: '/' },
    { label: 'Insights & Blog', path: '/blog' },
    { label: 'Honest College Truths', path: '/colleges' },
    { label: 'Request Help Portal', path: '/get-help' }
  ];
  
  const defaultAction = [
    { label: 'Success Stories', path: '/#victories' },
  ];

  const displayPlatform = platformLinks.length > 0 ? platformLinks : defaultPlatform;
  const displayAction = actionLinks.length > 0 ? actionLinks : defaultAction;

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
              {content['footer_desc'] || 'Structured urgency for student change. We champion student voices, expose institutional hidden costs, and provide direct peer support.'}
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-200 uppercase mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              {displayPlatform.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.path || '/'}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-200 uppercase mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              {displayAction.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.path || '/'}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/editorial-policy"
                  className="hover:text-white transition-colors"
                >
                  Editorial & Review Policy
                </Link>
              </li>
              <li>
                <button onClick={openEmergencyModal} className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-red-500 font-medium mt-2">
                  <ShieldAlert className="w-3.5 h-3.5" /> Emergency Response
                </button>
              </li>
            </ul>
          </div>

          {/* Contact, Trust & Legal */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-200 uppercase mb-4">Contact & Legal</h3>
            <div className="space-y-4 text-sm text-gray-400 mb-6">
              <p className="flex items-start gap-2">
                <Info className="w-4 h-4 mt-0.5 text-indigo-400" />
                <span>
                  <strong>Apnijanta Trust</strong><br/>
                  Bhopal, Madhya Pradesh 462047, India
                </span>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                apnijantaofficial@gmail.com
              </p>
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Disclaimer</Link>
              </li>
              <li>
                <Link href="/admin" className="text-indigo-500 hover:text-indigo-400 font-medium">Admin Portal</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} Apnijanta. All rights reserved. Structured Urgency for Student Change.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500" /> for institutional transparency.
          </p>
        </div>
      </div>
    </footer>
  );
}
