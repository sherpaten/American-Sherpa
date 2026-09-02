import SEO from '../components/SEO';

import Iteam1 from '../assets/merchandise/Iteam1.jpg';
import Iteam2 from '../assets/merchandise/Iteam2.jpg';
import Iteam3 from '../assets/merchandise/Iteam3.jpg';

export default function Merchandise() {
  const merchandise = [
    {
      image: Iteam1,
      name: 'RipTides Coastal Hoodie',
      price: '$45.00',
      description:
        'Stay comfortable while bringing the RipTides coastal vibes home with you.',
      alt: 'RipTides Coastal Hoodie merchandise',
    },
    {
      image: Iteam2,
      name: 'RipTides Official Gear',
      price: '$35.00',
      description:
        'Show your RipTides spirit with official restaurant merchandise.',
      alt: 'Official RipTides Cocktails & Grill merchandise',
    },
    {
      image: Iteam3,
      name: 'RipTides Coastal Collection',
      price: '$30.00',
      description:
        'Take a piece of the RipTides atmosphere with you wherever you go.',
      alt: 'RipTides coastal merchandise collection',
    },
  ];

  return (
    <main className="bg-[#f7f4ec] text-[#06283d]">
      <SEO
        title="RipTides Merchandise | Official Restaurant Gear"
        description="Shop official RipTides Cocktails & Grill merchandise and take the RipTides coastal vibes home with you."
        path="/merchandise"
        image={Iteam1}
      />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#001428] text-white">

        {/* Decorative background */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#008fa8]/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#5ed7e5]/10 blur-3xl" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#001428]/30 via-transparent to-[#001428]/60" />

        <div className="relative z-10 site-container py-24 sm:py-28 lg:py-32 text-center">

          <span className="section-kicker text-[#5ed7e5]">
            Official RipTides Gear
          </span>

          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-[0.95]">
            Take RipTides
            <br className="hidden sm:block" />
            <span className="text-[#5ed7e5]"> Home With You</span>
          </h1>

          <p className="max-w-2xl mx-auto mt-7 text-slate-300 text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
            Take the coastal vibes home with you. Explore official RipTides
            Cocktails & Grill merchandise and show your RipTides spirit.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">

            <span className="brand-badge">
              Coastal Style
            </span>

            <span className="brand-badge">
              Official Gear
            </span>

            <span className="brand-badge">
              RipTides Spirit
            </span>

          </div>

        </div>
      </section>

      {/* =====================================================
          MERCHANDISE
      ===================================================== */}
      <section className="section section-white">

        <div className="site-container">

          {/* SECTION INTRO */}
          <div className="max-w-3xl mx-auto text-center mb-14">

            <span className="section-kicker">
              Shop RipTides
            </span>

            <h2 className="section-title mt-4">
              Official RipTides Gear
            </h2>

            <div className="brand-line mx-auto my-6" />

            <p className="section-description mx-auto">
              Bring a little bit of RipTides home with you.
            </p>

          </div>

          {/* PRODUCTS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

            {merchandise.map((item, index) => (
              <article
                key={item.name}
                className="card group overflow-hidden p-0 flex flex-col"
              >

                {/* PRODUCT IMAGE */}
                <div className="relative aspect-square overflow-hidden bg-[#f3f1eb]">

                  <img
                    src={item.image}
                    alt={item.alt}
                    width="1000"
                    height="1000"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-contain p-6 sm:p-8 transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Coming Soon Badge */}
                  <div className="absolute top-5 left-5">
                    <span className="gold-badge">
                      Coming Soon
                    </span>
                  </div>

                </div>

                {/* PRODUCT CONTENT */}
                <div className="p-6 sm:p-7 flex flex-col flex-1">

                  <div className="flex items-start justify-between gap-4">

                    <h3 className="text-2xl font-black text-[#06283d] leading-tight">
                      {item.name}
                    </h3>

                    <span className="text-[#008fa8] font-black text-lg whitespace-nowrap">
                      {item.price}
                    </span>

                  </div>

                  <p className="text-slate-600 font-medium leading-relaxed mt-4">
                    {item.description}
                  </p>

                  {/* BUTTON */}
                  <div className="mt-auto pt-7">

                    <button
                      type="button"
                      disabled
                      className="w-full rounded-xl border border-[#06283d]/10 bg-[#06283d] px-5 py-3.5 text-sm font-black uppercase tracking-wide text-white opacity-70 cursor-not-allowed"
                    >
                      Store Launching Soon
                    </button>

                  </div>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          BRAND / COMING SOON CTA
      ===================================================== */}
      <section className="section section-cream">

        <div className="site-container">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#001428] px-6 py-16 sm:px-12 lg:px-20 text-center shadow-2xl">

            {/* Decorative glow */}
            <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#008fa8]/20 blur-3xl" />

            <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#5ed7e5]/10 blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto">

              <span className="gold-badge">
                Coming Soon
              </span>

              <div className="text-5xl mt-7 mb-5">
                🌊
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                Store Launching
                <br />
                <span className="text-[#5ed7e5]">
                  Soon
                </span>
              </h2>

              <div className="brand-line mx-auto my-6 bg-[#5ed7e5]" />

              <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                Our official merchandise store is coming soon. Check back
                for RipTides apparel, coastal gear, and more.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-3 mt-8">

                {[
                  'RipTides Apparel',
                  'Coastal Gear',
                  'Official Merchandise',
                  'More Coming Soon',
                ].map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white"
                  >
                    <span className="text-[#5ed7e5]">✓</span>
                    {feature}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL BRAND STATEMENT
      ===================================================== */}
      <section className="bg-[#f7f4ec] pb-20">

        <div className="site-container">

          <div className="border-t border-slate-200 pt-14 text-center">

            <span className="section-kicker">
              RipTides Cocktails & Grill
            </span>

            <h2 className="section-title-sm mt-3">
              More Than A Restaurant
            </h2>

            <p className="section-description max-w-xl mx-auto mt-3">
              Great food, cold drinks, good company, and now a little
              RipTides style to take with you.
            </p>

          </div>

        </div>

      </section>
    </main>
  );
}