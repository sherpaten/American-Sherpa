import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const socialLinks = {
  instagram: 'https://www.instagram.com/riptidescocktailsandgrill',
  facebook: 'https://www.facebook.com/riptidescocktailsandgrill',
  tiktok: 'https://www.tiktok.com/@riptides54',
};

export default function Navbar({ onBookTable }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClass = (path) =>
    `relative py-2 text-sm font-bold tracking-wide transition-colors duration-200 ${
      isActive(path)
        ? 'text-[#008FA8]'
        : 'text-[#06283D] hover:text-[#008FA8]'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_4px_20px_rgba(6,40,61,0.08)]">

      {/* =====================================================
          TOP CONTACT BAR
      ====================================================== */}
      <div className="bg-[#06283D] text-white">
        <div className="site-container flex min-h-[36px] items-center justify-between gap-4 px-4 text-[11px] font-semibold sm:px-6 sm:text-xs lg:px-8">

          {/* Location */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=168+E+Montauk+Hwy+Lindenhurst+NY+11757"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 transition-colors hover:text-[#5ED7E5] sm:flex"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z"
              />
              <circle cx="12" cy="11" r="2.5" />
            </svg>

            <span>168 E Montauk Hwy, Lindenhurst, NY 11757</span>
          </a>

          {/* Phone + socials */}
          <div className="ml-auto flex items-center gap-3 sm:ml-0">

            <a
              href="tel:6315053200"
              className="flex items-center gap-2 transition-colors hover:text-[#5ED7E5]"
              aria-label="Call RipTides Cocktails and Grill"
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22 16.92v3a2 2 0 01-2.18 2
                  19.79 19.79 0 01-8.63-3.07
                  19.5 19.5 0 01-6-6
                  19.79 19.79 0 01-3.07-8.67
                  A2 2 0 014.11 2h3a2 2 0 012 1.72
                  12.84 12.84 0 00.7 2.81
                  2 2 0 01-.45 2.11L8.09 9.91
                  a16 16 0 006 6l1.27-1.27
                  a2 2 0 012.11-.45
                  12.84 12.84 0 002.81.7
                  A2 2 0 0122 16.92z"
                />
              </svg>

              <span>(631) 505-3200</span>
            </a>

            <span className="hidden h-4 w-px bg-white/20 sm:block" />

            {/* Instagram */}
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-[#5ED7E5]"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-[#5ED7E5]"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14 8h3V4h-3c-3.31 0-5 1.79-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.67.33-1 1-1z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="transition-colors hover:text-[#5ED7E5]"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M15.5 3c.4 2.1 1.6 3.5 3.5 4v3.1c-1.5-.1-2.8-.6-4-1.4v6.2c0 4.1-2.5 6.6-6.2 6.6-3.4 0-5.8-2.3-5.8-5.5 0-3.5 2.7-5.8 6.4-5.8.4 0 .8 0 1.2.1v3.2c-.4-.1-.8-.2-1.2-.2-1.5 0-2.6 1-2.6 2.5 0 1.4 1 2.5 2.4 2.5 1.6 0 2.5-1.1 2.5-3V3h3.8z" />
              </svg>
            </a>

          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN NAVIGATION
      ====================================================== */}
      <nav
        className="bg-white"
        aria-label="Main navigation"
      >
        <div className="site-container flex h-[76px] items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO + AMERICAN SHERPA */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093B2] focus-visible:ring-offset-4"
            aria-label="RipTides Cocktails and Grill home"
          >
            <img
              src="/logo.webp"
              alt="RipTides Cocktails & Grill"
              width="200"
              height="60"
              decoding="async"
              className="h-11 w-auto transition-transform duration-300 group-hover:scale-[1.03] sm:h-12"
            />

            <span className="hidden border-l border-[#06283D]/15 pl-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#06283D] sm:block">
              American
              <br />
              Sherpa
            </span>
          </Link>

          {/* =================================================
              DESKTOP NAV
          ================================================== */}
          <div className="hidden items-center gap-7 lg:flex">

            <Link
              to="/"
              className={navLinkClass('/')}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              Home
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0093B2]" />
              )}
            </Link>

            <Link
              to="/about"
              className={navLinkClass('/about')}
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              About
              {isActive('/about') && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0093B2]" />
              )}
            </Link>

            <Link
              to="/menu"
              className={navLinkClass('/menu')}
              aria-current={isActive('/menu') ? 'page' : undefined}
            >
              Menu
              {isActive('/menu') && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0093B2]" />
              )}
            </Link>

            <Link
              to="/events"
              className={navLinkClass('/events')}
              aria-current={isActive('/events') ? 'page' : undefined}
            >
              Events
              {isActive('/events') && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0093B2]" />
              )}
            </Link>

            <Link
              to="/merchandise"
              className={navLinkClass('/merchandise')}
              aria-current={isActive('/merchandise') ? 'page' : undefined}
            >
              Merchandise
              {isActive('/merchandise') && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0093B2]" />
              )}
            </Link>

            <Link
              to="/contact"
              className={navLinkClass('/contact')}
              aria-current={isActive('/contact') ? 'page' : undefined}
            >
              Contact
              {isActive('/contact') && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0093B2]" />
              )}
            </Link>

            {/* BOOK TABLE */}
            <button
              type="button"
              onClick={onBookTable}
              className="inline-flex items-center gap-2 rounded-full bg-[#0093B2] px-6 py-3 text-sm font-black text-white shadow-md shadow-[#0093B2]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#007F97] hover:shadow-lg hover:shadow-[#0093B2]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093B2] focus-visible:ring-offset-2"
            >
              Book A Table

              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </button>

          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#06283D]/10 bg-[#F7F4EC] text-[#06283D] transition hover:border-[#0093B2] hover:text-[#0093B2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093B2] lg:hidden"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>
            )}
          </button>

        </div>

        {/* ===================================================
            MOBILE NAVIGATION
        ==================================================== */}
        <div
          id="mobile-navigation"
          className={`border-t border-[#06283D]/10 bg-white px-4 pb-5 shadow-lg transition-all duration-300 lg:hidden ${
            isMenuOpen
              ? 'visible max-h-[600px] opacity-100'
              : 'invisible max-h-0 overflow-hidden opacity-0'
          }`}
        >
          <div className="site-container flex flex-col gap-1 pt-3">

            {[
              ['/', 'Home'],
              ['/about', 'About'],
              ['/menu', 'Menu'],
              ['/events', 'Events'],
              ['/merchandise', 'Merchandise'],
              ['/contact', 'Contact'],
            ].map(([path, label]) => (
              <Link
                key={path}
                to={path}
                onClick={closeMenu}
                className={`rounded-xl px-4 py-3.5 text-sm font-bold transition-colors ${
                  isActive(path)
                    ? 'bg-[#0093B2]/10 text-[#008FA8]'
                    : 'text-[#06283D] hover:bg-[#F7F4EC] hover:text-[#008FA8]'
                }`}
                aria-current={isActive(path) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => {
                closeMenu();
                onBookTable();
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#0093B2] px-6 py-3.5 text-sm font-black text-white shadow-md transition hover:bg-[#007F97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093B2] focus-visible:ring-offset-2"
            >
              Book A Table

              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </button>

            {/* Mobile socials */}
            <div className="mt-3 flex items-center justify-center gap-3 border-t border-[#06283D]/10 pt-4">

              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F4EC] text-[#06283D] transition hover:bg-[#0093B2] hover:text-white"
              >
                Instagram
              </a>

              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F4EC] text-[#06283D] transition hover:bg-[#0093B2] hover:text-white"
              >
                Facebook
              </a>

              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F4EC] text-[#06283D] transition hover:bg-[#0093B2] hover:text-white"
              >
                TikTok
              </a>

            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}