import { lazy, Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

import Home from './pages/Home';

// Lazy-load secondary pages so the initial bundle stays smaller.
const About = lazy(() => import('./pages/About'));
const Menu = lazy(() => import('./pages/Menu'));
const Events = lazy(() => import('./pages/Events'));
const Contact = lazy(() => import('./pages/Contact'));
const Merchandise = lazy(() => import('./pages/Merchandise'));

function PageFallback() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center bg-[#f7f4ec] px-6 text-center"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center">

        {/* Loading mark */}
        <div
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#d9eef1] border-t-[#0093b2] animate-spin"
          aria-hidden="true"
        />

        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#008fa8]">
          RIPTIDES
        </p>

        <p className="mt-2 text-sm font-bold text-[#06283d]">
          Loading page…
        </p>

      </div>
    </div>
  );
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => {
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-[#f7f4ec]">

        {/* Accessibility */}
        <a
          className="skip-link"
          href="#main-content"
        >
          Skip to main content
        </a>

        {/* =====================================================
            HEADER
        ===================================================== */}
        <Header onBookTable={openBooking} />

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}
        <main
          id="main-content"
          className="flex-grow"
        >
          <Suspense fallback={<PageFallback />}>
            <Routes>

              {/* HOME */}
              <Route
                path="/"
                element={<Home />}
              />

              {/* ABOUT */}
              <Route
                path="/about"
                element={<About />}
              />

              {/* MENU */}
              <Route
                path="/menu"
                element={<Menu />}
              />

              {/* EVENTS */}
              <Route
                path="/events"
                element={<Events />}
              />

              {/* CONTACT */}
              <Route
                path="/contact"
                element={<Contact />}
              />

              {/* MERCHANDISE */}
              <Route
                path="/merchandise"
                element={<Merchandise />}
              />

            </Routes>
          </Suspense>
        </main>

        {/* =====================================================
            FOOTER
        ===================================================== */}
        <Footer onBookTable={openBooking} />

        {/* =====================================================
            BOOKING MODAL
        ===================================================== */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={closeBooking}
        />

      </div>
    </Router>
  );
}