import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar({ onBookTable }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClass = (path) =>
    `pb-1 transition-colors ${
      isActive(path)
        ? 'text-[#0093b2] border-b-2 border-[#0093b2]'
        : 'hover:text-[#0093b2]'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full font-sans shadow-md">

      {/* 1. Top Contact Bar */}
      <div className="bg-gradient-to-r from-[#0089a8] to-[#0093b2] text-white text-xs sm:text-sm py-1.5 px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between">

        {/* Location */}
        <div className="flex items-center gap-2 font-medium text-center sm:text-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <span>
            168 E Montauk Hwy, Lindenhurst, NY 11757
          </span>
        </div>

        {/* Phone & Socials */}
        <div className="flex items-center gap-4 mt-1 sm:mt-0 font-medium">

          {/* Phone */}
          <a
            href="tel:6315053200"
            className="flex items-center gap-2 hover:text-slate-200 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0093b2]"
            aria-label="Call RipTides Cocktails and Grill at (631) 505-3200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>

            <span>(631) 505-3200</span>
          </a>

          <span
            className="hidden sm:inline text-white/50"
            aria-hidden="true"
          >
            |
          </span>

          {/* Social Links */}
          <div className="flex items-center gap-3">

            {/* Facebook */}
            <a
              href="https://www.facebook.com/riptidescocktailsandgrill"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit RipTides Cocktails and Grill on Facebook"
              className="hover:text-slate-200 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0093b2]"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/riptidescocktailsandgrill"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit RipTides Cocktails and Grill on Instagram"
              className="hover:text-slate-200 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0093b2]"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-4 w-4"
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
              className="hover:text-slate-200 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0093b2]"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.09V2h-3.96v13.76a2.89 2.89 0 11-2.89-2.89c.3 0 .6.05.87.13V8.97a6.83 6.83 0 00-.87-.06A6.85 6.85 0 001.?? 15.76a6.85 6.85 0 106.85-6.85c-.23 0-.45.01-.67.03v3.91c.22-.03.44-.05.67-.05a2.96 2.96 0 110 5.92 2.96 2.96 0 01-2.96-2.96V2h3.96c.15 1.06.61 2.03 1.3 2.78.69.75 1.61 1.28 2.64 1.5v3.84a8.74 8.74 0 01-3.95-.98v5.62a6.85 6.85 0 11-6.85-6.85c.23 0 .45.01.67.03v3.91a2.96 2.96 0 10-.67 5.87 2.96 2.96 0 002.96-2.96V2h3.96v.6a4.83 4.83 0 003.77 4.09v3.84a8.74 8.74 0 01-1.07-.14z" />
              </svg>
            </a>

          </div>
        </div>
      </div>

      {/* 2. Main Navigation */}
      <nav
        className="bg-white text-slate-800 px-6 md:px-12"
        aria-label="Main navigation"
      >

        <div className="flex items-center justify-between py-2">

          {/* Logo + Owner */}
          <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-3 flex-shrink-0 transition-transform hover:scale-[1.02] rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093b2] focus-visible:ring-offset-2"
              aria-label="RipTides Cocktails and Grill home"
          >
         <img
                src="/logo.webp"
                alt="RipTides Cocktails & Grill"
                className="h-10 md:h-12 w-auto"
                width="200"
                height="60"
                decoding="async"
          />

          <span className="hidden sm:block text-xs md:text-sm font-bold tracking-wide text-[#002b5c] border-l border-slate-300 pl-3">
                American Sherpa
          </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">

            <div className="flex items-center space-x-5 xl:space-x-6 text-[12px] xl:text-[13px] font-bold tracking-widest uppercase">

              <Link to="/" className={navLinkClass('/')}>
                Home
              </Link>

              <Link to="/about" className={navLinkClass('/about')}>
                About
              </Link>

              <Link to="/menu" className={navLinkClass('/menu')}>
                Menu
              </Link>

              <Link to="/events" className={navLinkClass('/events')}>
                Events
              </Link>

              <Link to="/contact" className={navLinkClass('/contact')}>
                Contact
              </Link>

              <Link to="/merchandise" className={navLinkClass('/merchandise')}>
                Merchandise
              </Link>

            </div>

            {/* Desktop Book Table */}
            <button
              type="button"
              onClick={onBookTable}
              className="bg-[#0093b2] hover:bg-[#007a94] text-white text-[12px] xl:text-[13px] tracking-widest px-4 py-2 rounded shadow-md transition-all flex items-center gap-2 font-bold uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-[#001428] focus-visible:ring-offset-2"
            >
              Book A Table
              <span aria-hidden="true">📅</span>
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden ml-auto inline-flex items-center justify-center rounded-lg p-2 text-slate-800 hover:text-[#0093b2] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093b2] focus-visible:ring-offset-2"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

        </div>

        {/* Mobile Navigation Menu */}
        <div
          id="mobile-navigation"
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen
              ? 'max-h-[500px] opacity-100 pb-5'
              : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div className="border-t border-slate-200 pt-4">

            <div className="flex flex-col gap-1 text-sm font-bold tracking-widest uppercase">

              <Link
                to="/"
                onClick={closeMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                className={`rounded-lg px-4 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093b2] ${
                  isActive('/')
                    ? 'bg-[#0093b2]/10 text-[#0093b2]'
                    : 'hover:bg-slate-100'
                }`}
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                className={`rounded-lg px-4 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093b2] ${
                  isActive('/about')
                    ? 'bg-[#0093b2]/10 text-[#0093b2]'
                    : 'hover:bg-slate-100'
                }`}
              >
                About
              </Link>

              <Link
                to="/menu"
                onClick={closeMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                className={`rounded-lg px-4 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093b2] ${
                  isActive('/menu')
                    ? 'bg-[#0093b2]/10 text-[#0093b2]'
                    : 'hover:bg-slate-100'
                }`}
              >
                Menu
              </Link>

              <Link
                to="/events"
                onClick={closeMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                className={`rounded-lg px-4 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093b2] ${
                  isActive('/events')
                    ? 'bg-[#0093b2]/10 text-[#0093b2]'
                    : 'hover:bg-slate-100'
                }`}
              >
                Events
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                className={`rounded-lg px-4 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093b2] ${
                  isActive('/contact')
                    ? 'bg-[#0093b2]/10 text-[#0093b2]'
                    : 'hover:bg-slate-100'
                }`}
              >
                Contact
              </Link>

              <Link
                to="/merchandise"
                onClick={closeMenu}
                tabIndex={isMenuOpen ? 0 : -1}
                className={`rounded-lg px-4 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093b2] ${
                  isActive('/merchandise')
                    ? 'bg-[#0093b2]/10 text-[#0093b2]'
                    : 'hover:bg-slate-100'
                }`}
              >
                Merchandise
              </Link>

              {/* Mobile Book A Table */}
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onBookTable();
                }}
                tabIndex={isMenuOpen ? 0 : -1}
                className="mt-2 bg-[#0093b2] hover:bg-[#007a94] text-white rounded-lg px-4 py-3 text-center shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#001428] focus-visible:ring-offset-2"
              >
                Book A Table
                <span aria-hidden="true"> 📅</span>
              </button>

            </div>
          </div>
        </div>

      </nav>
    </header>
  );
}