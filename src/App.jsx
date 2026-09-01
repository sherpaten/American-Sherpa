import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Home from './pages/Home';

// Load secondary pages only when the visitor navigates to them.
const About = lazy(() => import('./pages/About'));
const Menu = lazy(() => import('./pages/Menu'));
const Events = lazy(() => import('./pages/Events'));
const Contact = lazy(() => import('./pages/Contact'));
const Merchandise = lazy(() => import('./pages/Merchandise'));

function PageFallback() {
  return (
    <div
      className="min-h-[40vh] flex items-center justify-center bg-white text-[#002B45]"
      role="status"
      aria-live="polite"
    >
      Loading page…
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
      <div className="flex flex-col min-h-screen">

        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>

        <Header onBookTable={openBooking} />

        <main id="main-content" className="flex-grow">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/merchandise" element={<Merchandise />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />

        <BookingModal
          isOpen={isBookingOpen}
          onClose={closeBooking}
        />

      </div>
    </Router>
  );
}