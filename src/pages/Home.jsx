import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

import photo1 from '../assets/restaurantphoto1.webp';
import photo2 from '../assets/restaurantphoto2.webp';
import photo4 from '../assets/restaurentphoto4.webp';
import outdoor from '../assets/outdoor.webp';
import HomeGallery from '../components/HomeGallery';

export default function Home() {
  const toastUrl =
    "https://order.toasttab.com/online/riptides-cocktail-and-grill-168-east-montauk-highway";

  // SEO / Local Business Structured Data
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "RipTides Cocktails & Grill",
    "image": [
      "https://www.riptideslindenhurst.com/logo.webp"
    ],
    "url": "https://www.riptideslindenhurst.com/",
    "telephone": "+1-631-505-3200",
    "priceRange": "$$",
    "servesCuisine": [
      "Seafood",
      "American",
      "Burgers",
      "Wings",
      "Tacos",
      "Cocktails"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "168 East Montauk Highway",
      "addressLocality": "Lindenhurst",
      "addressRegion": "NY",
      "postalCode": "11757",
      "addressCountry": "US"
    }
  };

  return (
    <div className="bg-white text-black flex flex-col">

      {/* =========================================================
          SEO
          ========================================================= */}
      <SEO
        title="RipTides Cocktails & Grill | Seafood, Burgers, Wings & Live Music"
        description="Visit RipTides Cocktails & Grill in Lindenhurst, NY for fresh seafood, burgers, wings, tacos, handcrafted cocktails, live music and good times."
        path="/"
        image="/logo.webp"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />

      {/* =========================================================
          1. HERO BANNER
          ORIGINAL STRUCTURE + ORIGINAL IMAGE PRESERVED
          ========================================================= */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden border-b border-slate-200 text-center">

        <div className="absolute inset-0 z-0">
          <img
            src={photo1}
            alt="RipTides Bar and Seating in Lindenhurst, NY"
            width="1920"
            height="1080"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-[#001428]/85"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center space-y-5 py-16">

          <div className="text-cyan-300 text-xs sm:text-sm font-bold uppercase tracking-widest drop-shadow-md">
            ★ 4.5 (187+ Reviews)
            <span className="text-white/50 mx-2">•</span>
            Women-Owned
            <span className="text-white/50 mx-2">•</span>
            LGBTQ+ Friendly
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            Lindenhurst&apos;s Favorite Coastal Gathering Spot
          </h1>

          <p className="text-slate-100 text-lg sm:text-xl leading-relaxed max-w-3xl drop-shadow">
            Welcome to RipTides Cocktails & Grill, the South Shore&apos;s premier
            destination for cheerful nautical decor, incredible comfort food,
            and ice-cold craft drinks on East Montauk Highway.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-6">

            <a
              href={toastUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order pickup online from RipTides Cocktails & Grill through Toast"
              className="bg-[#ffb116] hover:bg-[#e59e13] text-black text-base px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
            >
              Order Pickup Online ↗
            </a>

            <Link
              to="/menu"
              aria-label="View the full RipTides Cocktails & Grill menu"
              className="bg-white/10 text-white hover:bg-white/20 border border-white/30 text-base px-8 py-3 rounded-full font-semibold transition-colors"
            >
              View Full Menu
            </Link>

          </div>
        </div>
      </section>

      {/* =========================================================
          2. HOSPITALITY SECTION
          ORIGINAL CONTENT + ORIGINAL IMAGE PRESERVED
          ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 lg:order-1 order-2 min-h-[340px]">
            <img
              src={photo2}
              alt="RipTides Cocktails & Grill bar interior in Lindenhurst"
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover min-h-[340px] hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="space-y-5 lg:order-2 order-1">

            <span className="bg-[#0093b2] text-white px-3.5 py-1.5 rounded-md text-xs font-black uppercase tracking-widest inline-block">
              Hospitality First
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-black leading-tight">
              Feel Right at Home
            </h2>

            <p className="text-black text-base sm:text-lg leading-relaxed font-medium">
              At RipTides, stellar service comes standard. Whether you are
              grabbing a quick lunch, relaxing at the clean bar, or enjoying
              happy hour specials served directly to your table, our attentive
              staff ensures every visit is memorable. Enjoy a vibrant setting
              complete with a pool table, cozy dining space, and an electric
              atmosphere designed for good conversations.
            </p>

          </div>
        </div>
      </section>

      {/* =========================================================
          3. SLIDING FOOD GALLERY
          ORIGINAL COMPONENT PRESERVED
          ========================================================= */}
      <HomeGallery />

      {/* =========================================================
          4. LIVE MUSIC SECTION
          ORIGINAL CONTENT + ORIGINAL IMAGE PRESERVED
          ========================================================= */}
      <section className="bg-slate-50 border-y border-slate-200 py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-5">

            <span className="bg-[#0093b2] text-white px-3.5 py-1.5 rounded-md text-xs font-black uppercase tracking-widest inline-block">
              South Shore Entertainment
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-black">
              Cool Bands, Karaoke & Local Events
            </h2>

            <p className="text-black text-base sm:text-lg leading-relaxed font-medium">
              RipTides is Lindenhurst&apos;s hub for live entertainment. We
              host regular live music performances featuring bands across
              multiple genres, high-energy karaoke nights, and fun community
              events. Pair your favorite cold beer or signature cocktail with
              live local talent for an unbeatable night out on Long Island.
            </p>

            <Link
              to="/events"
              aria-label="View the RipTides live music and events schedule"
              className="btn-primary inline-block mt-4 text-sm px-6 py-3 font-bold shadow-md"
            >
              View Nightlife Schedule
            </Link>

          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 min-h-[340px]">

            <img
              src={photo4}
              alt="RipTides Cocktails & Grill neon bar lighting"
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover min-h-[340px] hover:scale-105 transition-transform duration-700"
            />

          </div>

        </div>
      </section>

      {/* =========================================================
          5. ONLINE ORDERING CTA
          ORIGINAL STRUCTURE + ORIGINAL IMAGE PRESERVED
          ========================================================= */}
      <section className="relative w-full text-center py-24 sm:py-32 overflow-hidden">

        <div className="absolute inset-0 z-0">

          <img
            src={outdoor}
            alt="RipTides Cocktails & Grill outdoor seating in Lindenhurst"
            width="1920"
            height="1080"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/70"></div>

        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          <span className="bg-[#0093b2] text-white px-3.5 py-1.5 rounded-md text-xs font-black uppercase tracking-widest inline-block shadow-md mb-6">
            Visit Us Today
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white drop-shadow-lg mb-6">
            Dine-In, Takeaway, or Delivery
          </h2>

          <p className="text-slate-100 text-base sm:text-lg leading-relaxed drop-shadow text-center mb-8">
            Experience RipTides your way. Join us in our cheerful nautical
            dining room, grab takeout on your way home, or have your meal
            delivered directly to your doorstep.
          </p>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5 text-white font-medium text-left pb-10 w-full max-w-xl mx-auto">

            <div className="flex items-center gap-3">
              <span className="text-[#ffb116] text-xl font-bold">✓</span>
              Fast & Easy Toast Ordering
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#ffb116] text-xl font-bold">✓</span>
              Convenient Curbside Pickup
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#ffb116] text-xl font-bold">✓</span>
              Secure Online Payments
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#ffb116] text-xl font-bold">✓</span>
              Customizable Menu Options
            </div>

          </div>

          <div className="flex flex-wrap justify-center gap-4">

            <a
              href={toastUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order food from RipTides Cocktails & Grill through Toast"
              className="bg-[#ffb116] hover:bg-[#e59e13] text-black text-base px-8 py-3.5 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
            >
              Order Toast Online ↗
            </a>

            <Link
              to="/contact"
              aria-label="Find RipTides hours, location and contact information"
              className="bg-white/10 text-white hover:bg-white/20 border border-white/30 text-base px-8 py-3.5 rounded-full font-semibold transition-colors shadow-lg"
            >
              Find Hours & Location
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
}