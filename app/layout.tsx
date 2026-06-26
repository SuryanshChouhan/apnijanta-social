import React from 'react';
import type { Metadata } from 'next';
import { GlobalProvider } from '../src/context/GlobalContext';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import ClientLayout from '../src/components/ClientLayout';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'Apnijanta',
  description: 'Structured urgency for student change. We champion student voices, expose institutional hidden costs, and provide direct peer support.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans text-gray-700 antialiased selection:bg-indigo-500 selection:text-white">
        <GlobalProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </GlobalProvider>
      </body>
    </html>
  );
}
