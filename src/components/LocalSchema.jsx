// src/components/LocalSchema.jsx
export default function LocalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "RipTides Cocktails & Grill",
    "image": "https://www.riptideslindenhurst.com/images/hero-bg.jpg", 
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "168 East Montauk Highway",
      "addressLocality": "Lindenhurst",
      "addressRegion": "NY",
      "postalCode": "11757",
      "addressCountry": "US"
    },
    "telephone": "+1-631-505-3200",
    "url": "https://www.riptideslindenhurst.com",
    "servesCuisine": ["Seafood", "Burgers", "American", "Cocktails"],
    "priceRange": "$$"
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}