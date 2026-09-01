import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import food6 from '../assets/foods/food6.webp';
import food7 from '../assets/foods/food7.webp';
import food8 from '../assets/foods/food8.webp';
import food9 from '../assets/foods/food9.webp';
import food10 from '../assets/foods/food10.webp';

export default function HomeGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = useMemo(() => [
    { src: food6, alt: 'Grilled octopus salad plate' },
    { src: food7, alt: 'Chicken wrap with french fries' },
    { src: food8, alt: 'Tropical cocktail drink with umbrella' },
    { src: food9, alt: 'Meatballs with marinara sauce and garlic bread' },
    { src: food10, alt: 'French onion and chicken soups' },
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const currentImage = images[currentIndex];

  return (
    <section
      aria-labelledby="food-showcase-title"
      className="relative min-h-[65vh] flex items-center py-20 border-y border-slate-200 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-slate-900">
        <img
          key={currentImage.src}
          src={currentImage.src}
          alt={currentImage.alt}
          width="1400"
          height="1100"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl space-y-6">
          <span className="bg-[#0093b2] text-white px-3.5 py-1.5 rounded-md text-xs font-black uppercase tracking-widest inline-block shadow-md">
            Fresh & Flavorful
          </span>
          <h2 id="food-showcase-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-lg">
            A Taste of the Coast
          </h2>
          <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-medium drop-shadow-md">
            From fresh seafood and hearty comfort classics to signature tropical cocktails, our menu is crafted to satisfy every craving. We source high-quality ingredients to deliver bold flavors and generous portions that keep our guests coming back for more.
          </p>

          <ul className="space-y-3 text-white font-medium pb-4 drop-shadow-md">
            <li className="flex items-center gap-3"><span aria-hidden="true" className="text-[#0093b2] text-xl font-bold">✓</span>Signature Craft Cocktails</li>
            <li className="flex items-center gap-3"><span aria-hidden="true" className="text-[#0093b2] text-xl font-bold">✓</span>Fresh Seafood & Hearty Soups</li>
            <li className="flex items-center gap-3"><span aria-hidden="true" className="text-[#0093b2] text-xl font-bold">✓</span>Shareable Appetizers</li>
          </ul>

          <Link to="/menu" className="bg-[#0093b2] hover:bg-[#007a94] transition-colors text-white inline-block text-sm px-8 py-3.5 font-bold shadow-lg rounded-full">
            Explore Our Menu
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3" aria-label="Food showcase slides">
        {images.map((img, index) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-[#0093b2] scale-125 shadow-md' : 'bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to food showcase slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}
