"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ShieldAlert, BookOpen, School, FileText, ArrowRight, Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  openEmergencyModal: () => void;
}

export default function Navbar({ openEmergencyModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = usePathname();
  const navigate = useRouter();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Colleges', path: '/colleges' },
    { label: 'Resources', path: '/resources' },
    { label: 'Success Stories', path: '/', hash: '#victories' }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setMobileMenuOpen(false);
    if (item.hash) {
      if (currentPath !== item.path) {
        navigate.push(item.path);
      }
      setTimeout(() => {
        const el = document.getElementById(item.hash!.substring(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-20">
        
        {/* Brand Logo */}
        <Link 
          href="/"
          className="flex items-center gap-2 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
            <School className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
            Apnijanta
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => {
            const isActive = currentPath === item.path && !item.hash;
            return item.hash ? (
              <button
                key={index}
                onClick={() => handleNavClick(item)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 text-gray-600 hover:text-indigo-600 hover:bg-gray-50`}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={index}
                href={item.path}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-indigo-600 bg-indigo-50/50 font-bold'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={openEmergencyModal}
            className="px-4 py-2 border-2 border-red-200 text-red-600 bg-red-50/50 hover:bg-red-50 font-semibold text-sm rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            id="nav-btn-emergency"
          >
            <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
            <span>Emergency</span>
          </button>
          
          <Link 
            href="/get-help"
            className={`px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg shadow-md shadow-indigo-100 hover:shadow-indigo-200 transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              currentPath === '/get-help' ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
            }`}
            id="nav-btn-gethelp"
          >
            <span>Get Help</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={openEmergencyModal}
            className="p-2 border border-red-200 text-red-600 bg-red-50 rounded-lg active:scale-95"
            aria-label="Emergency help"
          >
            <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors active:scale-95"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg animate-fade-in duration-200 absolute top-20 left-0 w-full">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item, index) => {
              const isActive = currentPath === item.path && !item.hash;
              return item.hash ? (
                <button
                  key={index}
                  onClick={() => handleNavClick(item)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 text-gray-600 hover:text-indigo-600 hover:bg-gray-50`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={index}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/50 font-bold'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <button
                onClick={() => { setMobileMenuOpen(false); openEmergencyModal(); }}
                className="w-full py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-base rounded-xl flex items-center justify-center gap-2 border border-red-200"
              >
                <ShieldAlert className="w-5 h-5 text-red-500" />
                Emergency Hotline
              </button>
              <Link
                href="/get-help"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                Get Support Assistance
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}



