import SEO from '../components/SEO';

import Iteam1 from '../assets/merchandise/Iteam1.jpg';
import Iteam2 from '../assets/merchandise/Iteam2.jpg';
import Iteam3 from '../assets/merchandise/Iteam3.jpg';

export default function Merchandise() {
  const merchandise = [
    {
      image: Iteam1,
      name: "RipTides Coastal Hoodie",
      price: "$45.00",
      description:
        "Stay comfortable while bringing the RipTides coastal vibes home with you.",
      alt: "RipTides Coastal Hoodie merchandise",
    },
    {
      image: Iteam2,
      name: "RipTides Official Gear",
      price: "$35.00",
      description:
        "Show your RipTides spirit with official restaurant merchandise.",
      alt: "Official RipTides Cocktails & Grill merchandise",
    },
    {
      image: Iteam3,
      name: "RipTides Coastal Collection",
      price: "$30.00",
      description:
        "Take a piece of the RipTides atmosphere with you wherever you go.",
      alt: "RipTides coastal merchandise collection",
    },
  ];

  return (
    <div className="bg-white text-black">
      <SEO
        title="RipTides Merchandise | Official Restaurant Gear"
        description="Shop official RipTides Cocktails & Grill merchandise and take the RipTides coastal vibes home with you."
        path="/merchandise"
        image={Iteam1}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#001428] text-white">
        <div className="absolute top-[-30%] left-[-10%] w-96 h-96 bg-[#0093b2] rounded-full blur-3xl opacity-20"></div>

        <div className="absolute bottom-[-40%] right-[-10%] w-96 h-96 bg-[#0093b2] rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <div className="text-cyan-300 text-sm font-black uppercase tracking-[0.2em] mb-4">
            Official RipTides Gear
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6">
            Take RipTides
            <br className="hidden sm:block" /> Home With You
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-lg sm:text-xl font-medium leading-relaxed">
            Take the coastal vibes home with you. Explore official RipTides
            Cocktails & Grill merchandise and show your RipTides spirit.
          </p>
        </div>
      </section>

      {/* MERCHANDISE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-black mb-4">
            Official RipTides Gear
          </h2>

          <p className="text-slate-600 text-lg font-medium">
            Bring a little bit of RipTides home with you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {merchandise.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
            >
              {/* PRODUCT IMAGE */}
              <div className="relative h-80 bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  width="1000"
                  height="1000"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* PRODUCT CONTENT */}
              <div className="p-8 text-left">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-2xl font-black text-slate-900">
                    {item.name}
                  </h3>

                  <span className="text-[#0093b2] font-black text-lg whitespace-nowrap">
                    {item.price}
                  </span>
                </div>

                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                  {item.description}
                </p>

                <button
                  type="button"
                  disabled
                  className="w-full bg-[#001428] text-white font-black py-3 rounded-xl opacity-70 cursor-not-allowed"
                >
                  STORE LAUNCHING SOON
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMING SOON CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-slate-100 border border-slate-200 rounded-[2.5rem] p-8 sm:p-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-6">🌊</div>

            <h2 className="text-4xl sm:text-5xl font-black text-black mb-5">
              Store Launching Soon
            </h2>

            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              Our official merchandise store is coming soon. Check back for
              RipTides apparel, coastal gear, and more.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}