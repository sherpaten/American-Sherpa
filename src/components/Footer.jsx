import { Link } from 'react-router-dom';

const socialLinks = {
  instagram: 'https://www.instagram.com/riptidescocktailsandgrill',
  facebook: 'https://www.facebook.com/riptidescocktailsandgrill',
  tiktok: 'https://www.tiktok.com/@riptides54',
};

export default function Footer({ onBookTable }) {
  return (
    <footer className="bg-[#06283D] text-white">

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}
      <div className="mx-auto w-full max-w-[1500px] px-5 py-12 sm:px-8 md:py-14 lg:px-10">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.9fr_0.9fr] lg:gap-8 xl:gap-10">

          {/* =================================================
              BRAND
          ================================================== */}
          <div className="lg:pr-4">

            <Link
              to="/"
              className="inline-flex items-center gap-4 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ED7E5] focus-visible:ring-offset-4 focus-visible:ring-offset-[#06283D]"
            >
              <img
                src="/logo.webp"
                alt="RipTides Cocktails & Grill"
                width="220"
                height="70"
                loading="lazy"
                decoding="async"
                className="h-16 w-auto"
              />

              <span className="border-l border-white/20 pl-4 text-[10px] font-black uppercase leading-tight tracking-[0.22em] text-white/85">
                American
                <br />
                Sherpa
              </span>
            </Link>

            <p className="mt-5 max-w-md text-[15px] leading-7 text-white/65">
              Modern flavors inspired by the sea. Fresh seafood, seasonal
              dishes, and crafted cocktails in Lindenhurst.
            </p>

            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
              Owned by American Sherpa
            </p>

            {/* Social Media */}
            <div className="mt-6 flex items-center gap-3">

              {/* Facebook */}
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit RipTides Cocktails and Grill on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-200 hover:-translate-y-1 hover:border-[#5ED7E5]/50 hover:bg-[#0093B2] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ED7E5]"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-4.5 w-4.5"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit RipTides Cocktails and Grill on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-200 hover:-translate-y-1 hover:border-[#5ED7E5]/50 hover:bg-[#0093B2] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ED7E5]"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit RipTides Cocktails and Grill on TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all duration-200 hover:-translate-y-1 hover:border-[#5ED7E5]/50 hover:bg-[#0093B2] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ED7E5]"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M16.6 5.82c-.72-.83-1.12-1.9-1.12-3.01H12.1v13.08c0 1.48-1.2 2.68-2.68 2.68s-2.68-1.2-2.68-2.68 1.2-2.68 2.68-2.68c.28 0 .55.04.8.12V9.77c-.26-.04-.53-.06-.8-.06-3.75 0-6.79 3.04-6.79 6.79s3.04 6.79 6.79 6.79 6.79-3.04 6.79-6.79V9.87c1.45 1.04 3.22 1.65 5.13 1.65V7.74c-1.88 0-3.62-.72-4.91-1.92l.17-.02z" />
                </svg>
              </a>

            </div>
          </div>


          {/* =================================================
              VISIT US
          ================================================== */}
          <div>

            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#5ED7E5]">
              Visit Us
            </h3>

            <p className="text-[15px] leading-7 text-white/70">
              168 East Montauk Highway
              <br />
              Lindenhurst, NY 11757
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=168+E+Montauk+Hwy+Lindenhurst+NY+11757"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-[15px] font-bold text-white transition-colors hover:text-[#5ED7E5]"
            >
              Get Directions
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="tel:6315053200"
              className="mt-2 block text-[15px] text-white/70 transition-colors hover:text-[#5ED7E5]"
              aria-label="Call RipTides Cocktails and Grill at (631) 505-3200"
            >
              (631) 505-3200
            </a>

          </div>


          {/* =================================================
              HOURS
          ================================================== */}
          <div>

            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#5ED7E5]">
              Hours
            </h3>

            <div className="space-y-3 text-[15px]">

              <div>
                <p className="font-bold text-white">
                  Monday
                </p>

                <p className="mt-1 text-white/60">
                  3:00 PM – 12:00 AM
                </p>
              </div>

              <div>
                <p className="font-bold text-white">
                  Tuesday – Sunday
                </p>

                <p className="mt-1 text-white/60">
                  2:00 PM – 12:00 AM
                </p>
              </div>

            </div>

            <div className="mt-5 max-w-xs rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs leading-5 text-white/50">
                Hours may vary for private events and special occasions.
              </p>
            </div>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================== */}
          <div>

            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#5ED7E5]">
              Quick Links
            </h3>

            <div className="flex flex-col items-start gap-2.5 text-[15px]">

              <Link
                to="/menu"
                className="text-white/70 transition-colors hover:text-[#5ED7E5]"
              >
                Full Menu
              </Link>

              <button
                type="button"
                onClick={onBookTable}
                className="text-left text-white/70 transition-colors hover:text-[#5ED7E5] focus:outline-none"
              >
                Private Celebrations
              </button>

              <Link
                to="/events"
                className="text-white/70 transition-colors hover:text-[#5ED7E5]"
              >
                Events
              </Link>

              <Link
                to="/contact"
                className="text-white/70 transition-colors hover:text-[#5ED7E5]"
              >
                Contact Us
              </Link>

              <a
                href="https://order.toasttab.com/online/riptides-cocktail-and-grill-168-east-montauk-highway"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-2 rounded-full bg-[#0093B2] px-5 py-2.5 text-xs font-black text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#007F97] hover:shadow-lg hover:shadow-[#0093B2]/20"
              >
                Order Online
                <span aria-hidden="true">↗</span>
              </a>

            </div>

          </div>

        </div>
      </div>


      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}
      <div className="border-t border-white/10">

        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-2 px-5 py-5 text-center sm:px-8 md:flex-row md:items-center md:justify-between md:text-left lg:px-10">

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} RipTides Cocktails & Grill. All Rights Reserved.
          </p>

          <p className="text-xs text-white/30">
            Crafted with care in Lindenhurst, NY
          </p>

        </div>

      </div>

    </footer>
  );
}