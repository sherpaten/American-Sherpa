import { lazy, Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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
const Admin = lazy(() => import('./pages/Admin'));
const MembershipPortal = lazy(() => import('./pages/MembershipPortal'));

function PageFallback() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center bg-[#f7f4ec] px-6 text-center"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center">
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

function AppContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();
  // Admin and member portal are standalone workspaces, not public-site pages.
  // Normalize case/trailing slashes so /Admin and /admin behave identically.
  const normalizedPath = location.pathname.replace(/\/+$/, '').toLowerCase() || '/';
  const isStandaloneRoute = normalizedPath === '/admin' || normalizedPath === '/membership-portal';

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className={isStandaloneRoute ? '' : 'flex min-h-screen flex-col bg-[#f7f4ec]'}>
      {!isStandaloneRoute && (
        <>
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <Header onBookTable={openBooking} />
        </>
      )}

      <main id="main-content" className={isStandaloneRoute ? '' : 'flex-grow'}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/merchandise" element={<Merchandise />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/membership-portal" element={<MembershipPortal />} />
          </Routes>
        </Suspense>
      </main>

      {!isStandaloneRoute && (
        <>
          <Footer onBookTable={openBooking} />
          <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
