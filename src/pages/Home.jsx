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
    'https://order.toasttab.com/online/riptides-cocktail-and-grill-168-east-montauk-highway';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'RipTides Cocktails & Grill',
    image: [
      'https://www.riptideslindenhurst.com/logo.webp',
    ],
    url: 'https://www.riptideslindenhurst.com/',
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
  };

  return (
    <div className="bg-[#F7F4EC] text-[#06283D]">

      {/* =====================================================
          SEO
      ====================================================== */}
      <SEO
        title="RipTides Cocktails & Grill | Seafood, Burgers, Wings & Live Music"
        description="Visit RipTides Cocktails & Grill in Lindenhurst, NY for fresh seafood, burgers, wings, tacos, handcrafted cocktails, live music and good times."
        path="/"
        image="/logo.webp"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative isolate min-h-[620px] overflow-hidden sm:min-h-[680px] lg:min-h-[720px]">

        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={photo1}
            alt="RipTides Bar and Seating in Lindenhurst, NY"
            width="1920"
            height="1080"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />

          {/* Dark coastal overlay */}
          <div className="absolute inset-0 bg-[#031C2C]/70" />

          {/* Soft gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#031C2C]/90 via-[#031C2C]/35 to-[#031C2C]/30" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[620px] items-center justify-center px-4 py-20 text-center sm:min-h-[680px] sm:px-6 lg:min-h-[720px] lg:px-8">

          <div className="max-w-5xl">

            {/* Rating */}
            <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md sm:text-sm">

              <span className="text-[#F4B321]">
                ★
              </span>

              <span>
                4.5 (187+ Reviews)
              </span>

              <span className="text-white/40">
                •
              </span>

              <span>
                Women-Owned
              </span>

              <span className="hidden text-white/40 sm:inline">
                •
              </span>

              <span className="hidden sm:inline">
                LGBTQ+ Friendly
              </span>

            </div>

            {/* Heading */}
            <h1 className="mx-auto max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">

              Lindenhurst&apos;s
              <span className="block text-[#5ED7E5]">
                Favorite Coastal
              </span>
              Gathering Spot

            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8 lg:text-xl">

              Welcome to RipTides Cocktails & Grill, the South Shore&apos;s
              destination for cheerful nautical atmosphere, incredible
              comfort food, fresh seafood, and ice-cold craft drinks.

            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

              <a
                href={toastUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order pickup online from RipTides Cocktails & Grill through Toast"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#F4B321] px-7 py-3.5 text-sm font-black text-[#06283D] shadow-xl shadow-black/20 transition-all duration-200 hover:-translate-y-1 hover:bg-[#FFC94D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B321] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06283D]"
              >
                Order Pickup Online
                <span className="ml-2" aria-hidden="true">
                  ↗
                </span>
              </a>

              <Link
                to="/menu"
                aria-label="View the full RipTides Cocktails & Grill menu"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-black text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#06283D]"
              >
                View Full Menu
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>

            </div>

          </div>
        </div>

        {/* Bottom wave-like divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F7F4EC] to-transparent" />

      </section>

      {/* =====================================================
          HOSPITALITY
      ====================================================== */}
      <section className="section">

        <div className="site-container">

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Image */}
            <div className="order-2 lg:order-1">

              <div className="image-frame group aspect-[4/3]">

                <img
                  src={photo2}
                  alt="RipTides Cocktails & Grill bar interior in Lindenhurst"
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Decorative badge */}
                <div className="absolute bottom-5 left-5 rounded-2xl border border-white/20 bg-[#06283D]/90 px-5 py-4 text-white shadow-xl backdrop-blur-md">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5ED7E5]">
                    RipTides
                  </p>
                  <p className="mt-1 text-sm font-bold">
                    Good food. Good people.
                  </p>
                </div>

              </div>

            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">

              <span className="section-kicker">
                Hospitality First
              </span>

              <h2 className="section-title">
                Feel Right at Home
              </h2>

              <div className="mt-6 h-px w-16 bg-[#F4B321]" />

              <p className="section-copy mt-6">
                At RipTides, stellar service comes standard. Whether you are
                grabbing a quick lunch, relaxing at the clean bar, or enjoying
                happy hour specials served directly to your table, our
                attentive staff ensures every visit is memorable.
              </p>

              <p className="section-copy mt-4">
                Enjoy a vibrant setting complete with a pool table, cozy
                dining space, and an electric atmosphere designed for good
                conversations.
              </p>

              <Link
                to="/about"
                className="btn-secondary mt-7"
              >
                Discover RipTides
                <span aria-hidden="true">
                  →
                </span>
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOD GALLERY
      ====================================================== */}
      <section className="bg-white py-4">

        <HomeGallery />

      </section>

      {/* =====================================================
          LIVE MUSIC
      ====================================================== */}
      <section className="section bg-white">

        <div className="site-container">

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Content */}
            <div>

              <span className="section-kicker">
                South Shore Entertainment
              </span>

              <h2 className="section-title">
                Cool Bands, Karaoke & Local Events
              </h2>

              <div className="mt-6 h-px w-16 bg-[#F4B321]" />

              <p className="section-copy mt-6">
                RipTides is Lindenhurst&apos;s hub for live entertainment. We
                host regular live music performances featuring bands across
                multiple genres, high-energy karaoke nights, and fun community
                events.
              </p>

              <p className="section-copy mt-4">
                Pair your favorite cold beer or signature cocktail with live
                local talent for an unbeatable night out on Long Island.
              </p>

              <Link
                to="/events"
                className="btn-primary mt-7"
              >
                View Nightlife Schedule
                <span aria-hidden="true">
                  →
                </span>
              </Link>

            </div>

            {/* Image */}
            <div>

              <div className="image-frame group aspect-[4/3]">

                <img
                  src={photo4}
                  alt="RipTides Cocktails & Grill neon bar lighting"
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-[#06283D]/85 px-5 py-4 text-white backdrop-blur-md">

                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5ED7E5]">
                    Live at RipTides
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    Music • Karaoke • Events
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          ORDERING CTA
      ====================================================== */}
      <section className="relative isolate overflow-hidden py-24 sm:py-32">

        {/* Background */}
        <div className="absolute inset-0">

          <img
            src={outdoor}
            alt="RipTides Cocktails & Grill outdoor seating in Lindenhurst"
            width="1920"
            height="1080"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-[#031C2C]/75" />

          <div className="absolute inset-0 bg-gradient-to-br from-[#06283D]/85 via-transparent to-[#0093B2]/35" />

        </div>

        {/* Content */}
        <div className="relative z-10 site-container px-4 text-center sm:px-6 lg:px-8">

          <div className="mx-auto max-w-4xl">

            <span className="inline-flex rounded-full border border-[#5ED7E5]/30 bg-[#0093B2]/20 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#5ED7E5] backdrop-blur-sm">
              Visit Us Today
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Dine-In, Takeaway,
              <span className="block text-[#5ED7E5]">
                or Delivery
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Experience RipTides your way. Join us in our cheerful nautical
              dining room, grab takeout on your way home, or have your meal
              delivered directly to your doorstep.
            </p>

            {/* Features */}
            <div className="mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-2">

              {[
                'Fast & Easy Toast Ordering',
                'Convenient Curbside Pickup',
                'Secure Online Payments',
                'Customizable Menu Options',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 backdrop-blur-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F4B321] text-xs font-black text-[#06283D]">
                    ✓
                  </span>

                  {item}
                </div>
              ))}

            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">

              <a
                href={toastUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order food from RipTides Cocktails & Grill through Toast"
                className="btn-gold"
              >
                Order Toast Online
                <span aria-hidden="true">
                  ↗
                </span>
              </a>

              <Link
                to="/contact"
                aria-label="Find RipTides hours, location and contact information"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-black text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white/20"
              >
                Find Hours & Location
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}