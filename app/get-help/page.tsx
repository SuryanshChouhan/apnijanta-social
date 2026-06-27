import { Metadata } from 'next';
import GetHelpView from '../../src/components/GetHelpView';

export const metadata: Metadata = {
  title: 'Get Help | Free Legal Aid for Students in India',
  description: 'Report scam colleges, file a grievance for hidden fees, or seek free legal counsel for student rights violations in India.',
  alternates: {
    canonical: 'https://apnijanta.com/get-help',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Get Legal Help",
    "description": "Contact us for legal aid and to report scams in Indian colleges.",
    "url": "https://apnijanta.com/get-help",
    "mainEntity": {
      "@type": "ContactPoint",
      "email": "legal@apnijanta.com",
      "contactType": "Legal Support",
      "areaServed": "IN"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GetHelpView />
    </>
  );
}
