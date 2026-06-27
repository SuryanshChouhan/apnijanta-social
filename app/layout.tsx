import React from 'react';
import type { Metadata } from 'next';
import { GlobalProvider } from '../src/context/GlobalContext';
import { ContentProvider } from '../src/context/ContentContext';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import ClientLayout from '../src/components/ClientLayout';
import '../src/index.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://apnijanta.com'),
  title: {
    default: 'Apnijanta | Expose Scam Colleges & Get Student Legal Help',
    template: '%s | Apnijanta'
  },
  description: 'Structured urgency for student change. Verify college accreditation, expose institutional hidden costs, read reviews, and get direct peer support or legal help in India.',
  keywords: ['student rights', 'scam colleges in India', 'college information', 'student protests', 'legal help for students', 'university guidelines', 'capitation fee rules'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://apnijanta.com',
    siteName: 'Apnijanta',
    title: 'Apnijanta | Empowering Student Voices',
    description: 'Verify college accreditation, expose institutional hidden costs, and get direct peer support or legal help in India.',
    images: [
      {
        url: '/og-image.jpg', // Place an og-image.jpg in the public folder eventually
        width: 1200,
        height: 630,
        alt: 'Apnijanta Platform Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apnijanta | Empowering Student Voices',
    description: 'Verify college accreditation, expose hidden costs, and get direct peer support or legal help.',
    images: ['/og-image.jpg'],
  }
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
          <ContentProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </ContentProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
