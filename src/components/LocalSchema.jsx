// src/components/LocalSchema.jsx

export default function LocalSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',

    '@id': 'https://www.riptideslindenhurst.com/#restaurant',

    name: 'RipTides Cocktails & Grill',

    description:
      'RipTides Cocktails & Grill in Lindenhurst, NY serving fresh seafood, burgers, wings, tacos, comfort food, handcrafted cocktails, and live entertainment.',

    url: 'https://www.riptideslindenhurst.com/',

    image: [
      'https://www.riptideslindenhurst.com/logo.webp',
      'https://www.riptideslindenhurst.com/images/hero-bg.jpg',
    ],

    telephone: '+1-631-505-3200',

    priceRange: '$$',

    servesCuisine: [
      'Seafood',
      'American',
      'Burgers',
      'Wings',
      'Tacos',
      'Cocktails',
    ],

    address: {
      '@type': 'PostalAddress',
      streetAddress: '168 East Montauk Highway',
      addressLocality: 'Lindenhurst',
      addressRegion: 'NY',
      postalCode: '11757',
      addressCountry: 'US',
    },

    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'US',
    },

    areaServed: {
      '@type': 'City',
      name: 'Lindenhurst',
    },

    sameAs: [
      'https://www.instagram.com/riptidescocktailsandgrill',
      'https://www.facebook.com/riptidescocktailsandgrill',
      'https://www.tiktok.com/@riptides54',
    ],

    hasMenu: {
      '@type': 'Menu',
      name: 'RipTides Cocktails & Grill Menu',
      url: 'https://www.riptideslindenhurst.com/menu',
    },

    acceptsReservations: true,

    potentialAction: [
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.riptideslindenhurst.com/contact',
          inLanguage: 'en-US',
          actionPlatform: [
            'https://schema.org/DesktopWebPlatform',
            'https://schema.org/MobileWebPlatform',
          ],
        },
        result: {
          '@type': 'Reservation',
          name: 'Restaurant Table Reservation',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}