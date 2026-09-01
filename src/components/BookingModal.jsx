import { useEffect, useState } from 'react';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    requests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Close with Escape + prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Reset modal state when it closes
  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        requests: '',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // For now this is a reservation REQUEST,
    // not an automatic confirmed reservation.
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
        aria-label="Close booking window"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white text-slate-900 shadow-2xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0089a8] to-[#0093b2] px-6 py-6 text-white">
          <div className="flex items-start justify-between gap-4">

            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
                Reservations
              </span>

              <h2
                id="booking-modal-title"
                className="mt-1 text-2xl sm:text-3xl font-black"
              >
                Book A Table
              </h2>

              <p className="mt-2 text-sm text-white/90">
                Request a table at RipTides Cocktails & Grill.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-2xl hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close booking window"
            >
              ×
            </button>

          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">

          {submitted ? (
            /* =========================
               SUCCESS STATE
               ========================= */
            <div className="text-center py-8">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0093b2]/10 text-3xl">
                ✓
              </div>

              <h3 className="mt-5 text-2xl font-black text-[#002B45]">
                Request Received
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 max-w-md mx-auto">
                Thanks, {formData.name}. Your reservation request has been
                received. Our team will contact you at {formData.phone} to
                confirm availability.
              </p>

              <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-5 text-left max-w-md mx-auto">
                <p className="text-xs font-black uppercase tracking-widest text-[#0093b2]">
                  Requested Reservation
                </p>

                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p>
                    <strong>Date:</strong> {formData.date}
                  </p>

                  <p>
                    <strong>Time:</strong> {formData.time}
                  </p>

                  <p>
                    <strong>Guests:</strong> {formData.guests}
                  </p>

                  {formData.requests && (
                    <p>
                      <strong>Request:</strong> {formData.requests}
                    </p>
                  )}
                </div>
              </div>

              <p className="mt-6 text-xs text-slate-500">
                Need an immediate answer? Call us directly.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">

                <a
                  href="tel:+16315053200"
                  className="rounded-full bg-[#ffb116] px-6 py-3 font-bold text-black transition-all hover:bg-[#e59e13] hover:scale-[1.02]"
                >
                  Call (631) 505-3200
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-slate-300 px-6 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  Close
                </button>

              </div>

            </div>
          ) : (
            <>
              {/* =========================
                 RESERVATION FORM
                 ========================= */}
              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid sm:grid-cols-2 gap-4">

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Full Name *
                    </label>

                    <input
                      id="booking-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0093b2] focus:ring-2 focus:ring-[#0093b2]/20"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Phone Number *
                    </label>

                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(631) 555-1234"
                      autoComplete="tel"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0093b2] focus:ring-2 focus:ring-[#0093b2]/20"
                    />
                  </div>

                </div>

                <div className="grid sm:grid-cols-3 gap-4">

                  {/* Date */}
                  <div>
                    <label
                      htmlFor="booking-date"
                      className="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Date *
                    </label>

                    <input
                      id="booking-date"
                      name="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0093b2] focus:ring-2 focus:ring-[#0093b2]/20"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label
                      htmlFor="booking-time"
                      className="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Time *
                    </label>

                    <input
                      id="booking-time"
                      name="time"
                      type="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:border-[#0093b2] focus:ring-2 focus:ring-[#0093b2]/20"
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label
                      htmlFor="booking-guests"
                      className="block text-sm font-bold text-slate-700 mb-2"
                    >
                      Guests *
                    </label>

                    <select
                      id="booking-guests"
                      name="guests"
                      required
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#0093b2] focus:ring-2 focus:ring-[#0093b2]/20"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="7">7 Guests</option>
                      <option value="8">8 Guests</option>
                      <option value="9">9 Guests</option>
                      <option value="10">10 Guests</option>
                      <option value="11">11 Guests</option>
                      <option value="12">12 Guests</option>
                      <option value="13+">13+ Guests</option>
                    </select>
                  </div>

                </div>

                {/* Special Requests */}
                <div>
                  <label
                    htmlFor="booking-requests"
                    className="block text-sm font-bold text-slate-700 mb-2"
                  >
                    Special Requests
                    <span className="font-normal text-slate-400">
                      {' '} (Optional)
                    </span>
                  </label>

                  <textarea
                    id="booking-requests"
                    name="requests"
                    rows="3"
                    value={formData.requests}
                    onChange={handleChange}
                    placeholder="Birthday, outdoor seating, accessibility needs, etc."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#0093b2] focus:ring-2 focus:ring-[#0093b2]/20"
                  />
                </div>

                {/* Notice */}
                <div className="rounded-2xl border border-[#0093b2]/20 bg-[#0093b2]/5 p-4">
                  <div className="flex gap-3">

                    <span className="text-xl" aria-hidden="true">
                      ℹ️
                    </span>

                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                      This form sends a <strong>reservation request</strong>.
                      Your table is not confirmed until RipTides confirms
                      availability with you.
                    </p>

                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#0093b2] px-6 py-3.5 font-black text-white shadow-md transition-all hover:bg-[#007a94] hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002B45] focus-visible:ring-offset-2"
                >
                  REQUEST RESERVATION
                </button>

              </form>

              {/* =========================
                 OR CALL
                 ========================= */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Or
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#0093b2]/10 text-2xl">
                    📞
                  </div>

                  <div>
                    <h3 className="font-black text-lg">
                      Prefer to call?
                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      For immediate availability or large parties, call our
                      team directly.
                    </p>

                    <a
                      href="tel:+16315053200"
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-[#0093b2] px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-[#007a94] hover:scale-105"
                    >
                      (631) 505-3200
                    </a>
                  </div>

                </div>

              </div>

              {/* Restaurant Information */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-[#0093b2]">
                    Location
                  </p>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                    168 East Montauk Highway
                    <br />
                    Lindenhurst, NY 11757
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-[#0093b2]">
                    Hours
                  </p>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                    Mon: 3:00 PM – 12:00 AM
                    <br />
                    Tue – Sun: 2:00 PM – 12:00 AM
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 w-full rounded-full border border-slate-300 px-6 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-100"
              >
                Continue Browsing
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}