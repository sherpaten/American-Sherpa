import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import food6 from '../assets/foods/food6.webp';
import food7 from '../assets/foods/food7.webp';
import food8 from '../assets/foods/food8.webp';
import food9 from '../assets/foods/food9.webp';
import food10 from '../assets/foods/food10.webp';

export default function HomeGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const images = useMemo(
    () => [
      {
        src: food6,
        alt: 'Grilled octopus salad plate',
        label: 'Fresh From The Kitchen',
      },
      {
        src: food7,
        alt: 'Chicken wrap with french fries',
        label: 'Comfort Favorites',
      },
      {
        src: food8,
        alt: 'Tropical cocktail drink with umbrella',
        label: 'Signature Cocktails',
      },
      {
        src: food9,
        alt: 'Meatballs with marinara sauce and garlic bread',
        label: 'Hearty Favorites',
      },
      {
        src: food10,
        alt: 'French onion and chicken soups',
        label: 'Made To Warm You Up',
      },
    ],
    []
  );

  // ---------------------------------------------------------
  // AUTOMATIC SLIDESHOW
  // ---------------------------------------------------------
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [images.length, isPaused]);

  // ---------------------------------------------------------
  // SLIDE CONTROLS
  // ---------------------------------------------------------
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % images.length
    );
  };

  const currentImage = images[currentIndex];

  return (
    <section
      aria-labelledby="food-showcase-title"
      className="relative isolate overflow-hidden bg-[#06283d] py-24 sm:py-28 lg:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}
      <div className="absolute inset-0">

        <img
          key={currentImage.src}
          src={currentImage.src}
          alt={currentImage.alt}
          width="1400"
          height="1100"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700"
        />

        {/* Main dark overlay */}
        <div
          className="absolute inset-0 bg-[#06283d]/55"
          aria-hidden="true"
        />

        {/* Left-side readability */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#002b45]/95 via-[#06283d]/70 to-[#06283d]/25"
          aria-hidden="true"
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#06283d]/90 to-transparent"
          aria-hidden="true"
        />

      </div>

      {/* =====================================================
          DECORATIVE GLOW
      ===================================================== */}
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-[#0093b2]/15 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#5ed7e5]/10 blur-3xl"
        aria-hidden="true"
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="site-container relative z-10">

        <div className="max-w-2xl">

          {/* Kicker */}
          <div className="brand-line mb-7">
            <span className="section-kicker !text-[#5ed7e5]">
              A TASTE OF RIPTIDES
            </span>
          </div>

          {/* Current slide label */}
          <div className="mb-5">
            <span className="brand-badge">
              {currentImage.label}
            </span>
          </div>

          {/* Heading */}
          <h2
            id="food-showcase-title"
            className="text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            A Taste of the Coast.
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base font-medium leading-8 text-slate-200 sm:text-lg">
            From fresh seafood and hearty comfort classics to signature
            tropical cocktails, our menu is crafted to satisfy every
            craving. High-quality ingredients, bold flavors, and generous
            portions make every visit worth coming back for.
          </p>

          {/* Features */}
          <ul className="mt-7 grid gap-3 text-sm font-bold text-white sm:grid-cols-2">

            <li className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0093b2]/20 text-[#5ed7e5]"
                aria-hidden="true"
              >
                ✓
              </span>
              Signature Craft Cocktails
            </li>

            <li className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0093b2]/20 text-[#5ed7e5]"
                aria-hidden="true"
              >
                ✓
              </span>
              Fresh Seafood
            </li>

            <li className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0093b2]/20 text-[#5ed7e5]"
                aria-hidden="true"
              >
                ✓
              </span>
              Hearty Comfort Food
            </li>

            <li className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0093b2]/20 text-[#5ed7e5]"
                aria-hidden="true"
              >
                ✓
              </span>
              Shareable Favorites
            </li>

          </ul>

          {/* CTA */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">

            <Link
              to="/menu"
              className="btn-primary justify-center"
            >
              EXPLORE OUR MENU
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/contact"
              className="btn-secondary justify-center !border-white/40 !bg-white/10 !text-white hover:!bg-white/20"
            >
              VISIT RIPTIDES
            </Link>

          </div>

        </div>
      </div>

      {/* =====================================================
          SLIDE CONTROLS
      ===================================================== */}
      <div className="absolute inset-x-0 bottom-7 z-20">
        <div className="site-container">

          <div className="flex items-center justify-between gap-5">

            {/* Counter */}
            <div className="hidden text-xs font-black uppercase tracking-[0.2em] text-white/70 sm:block">
              <span className="text-white">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="mx-2 text-white/30">/</span>
              {String(images.length).padStart(2, '0')}
            </div>

            {/* Dots */}
            <div
              className="flex items-center gap-2"
              aria-label="Food showcase slides"
            >
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ed7e5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06283d] ${
                    index === currentIndex
                      ? 'w-8 bg-[#5ed7e5]'
                      : 'w-2 bg-white/40 hover:bg-white/80'
                  }`}
                  aria-label={`Go to food showcase slide ${index + 1}`}
                  aria-current={
                    index === currentIndex ? 'true' : undefined
                  }
                />
              ))}
            </div>

            {/* Previous / Next */}
            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={goToPrevious}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-lg text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ed7e5]"
                aria-label="Previous food showcase slide"
              >
                ←
              </button>

              <button
                type="button"
                onClick={goToNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-lg text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ed7e5]"
                aria-label="Next food showcase slide"
              >
                →
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          SCREEN READER STATUS
      ===================================================== */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        Showing food showcase slide {currentIndex + 1} of{' '}
        {images.length}: {currentImage.alt}
      </div>

    </section>
  );
}