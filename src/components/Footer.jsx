import { Link } from 'react-router-dom';

export default function Footer({ onBookTable }) {
  return (
    <footer className="bg-[#002b5c] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand / Logo */}
        <div>
          <img
            src="/logo.webp"
            alt="RipTides Cocktails & Grill logo"
            width="60"
            height="50"
            className="h-10 md:h-12 w-auto"
            loading="lazy"
            decoding="async"
          />

          <h3 className="text-xl font-bold mb-4 text-[#0093b2]">
            RipTides Cocktails & Grill
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Modern flavors inspired by the sea. Fresh seafood, seasonal dishes,
            and crafted cocktails in Lindenhurst.
          </p>

          <p className="text-xs text-slate-400">
            Owned by American Sherpa
          </p>

          {/* Social Media */}
          <div className="flex items-center gap-4 mt-6">

            {/* Facebook */}
            <a
              href="https://www.facebook.com/riptidescocktailsandgrill"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit RipTides Cocktails and Grill on Facebook"
              className="text-slate-300 hover:text-[#0093b2] transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093b2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002b5c]"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/riptidescocktailsandgrill"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit RipTides Cocktails and Grill on Instagram"
              className="text-slate-300 hover:text-[#0093b2] transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093b2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002b5c]"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.333.014 8.741 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@riptides54"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit RipTides Cocktails and Grill on TikTok"
              className="text-slate-300 hover:text-[#0093b2] transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093b2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002b5c]"
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

        {/* Visit Us */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">
            Visit Us
          </h4>

          <p className="text-slate-300 text-sm leading-relaxed">
            168 East Montauk Highway<br />
            Lindenhurst, NY 11757
          </p>

          <a
            href="tel:6315053200"
            className="inline-block text-slate-300 text-sm mt-3 hover:text-[#0093b2] transition"
            aria-label="Call RipTides Cocktails and Grill at (631) 505-3200"
          >
            (631) 505-3200
          </a>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">
            Hours
          </h4>

          <p className="text-slate-300 text-sm">
            Mon: 3:00 PM – 12:00 AM
          </p>

          <p className="text-slate-300 text-sm mt-1">
            Tue – Sun: 2:00 PM – 12:00 AM
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">
            Quick Links
          </h4>

          <div className="flex flex-col space-y-2 text-sm text-slate-300">

            <Link
              to="/menu"
              className="hover:text-[#0093b2] transition"
            >
              Full Menu
            </Link>

            <button
              type="button"
              onClick={onBookTable}
              className="text-left hover:text-[#0093b2] transition"
            >
              Private Celebrations
            </button>

            <a
              href="https://order.toasttab.com/online/riptides-cocktail-and-grill-168-east-montauk-highway"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0093b2] transition"
            >
              Order Online (Toast)
            </a>

          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-700/60 text-center text-xs text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} RipTides Cocktails & Grill. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}