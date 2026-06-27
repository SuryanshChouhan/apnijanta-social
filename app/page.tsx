import HomeView from '../src/components/HomeView';

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://apnijanta.com/#website",
        "url": "https://apnijanta.com",
        "name": "Apnijanta",
        "description": "Student rights and college verification platform.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://apnijanta.com/colleges?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://apnijanta.com/#organization",
        "name": "Apnijanta Student Rights Initiative",
        "url": "https://apnijanta.com",
        "logo": "https://apnijanta.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "legal@apnijanta.com",
          "contactType": "customer support"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Block A, Educational Trust Building",
          "addressLocality": "New Delhi",
          "postalCode": "110001",
          "addressCountry": "IN"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeView />
    </>
  );
}
