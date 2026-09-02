import { useEffect, useState } from 'react';

const INITIAL_FORM_DATA = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  requests: '',
};

const RESTAURANT_PHONE = '+16315053200';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [submitted, setSubmitted] = useState(false);

  // ---------------------------------------------------------
  // CLOSE WITH ESCAPE + LOCK BACKGROUND SCROLL
  // ---------------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  // ---------------------------------------------------------
  // RESET WHEN MODAL CLOSES
  // ---------------------------------------------------------
  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setFormData(INITIAL_FORM_DATA);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ---------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // This remains a reservation REQUEST.
    // It is not an automatically confirmed reservation.
    setSubmitted(true);
  };

  // Prevent selecting dates before today.
  const today = new Date().toISOString().split('T')[0];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      {/* =====================================================
          BACKDROP
      ===================================================== */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#001421]/75 backdrop-blur-sm"
        aria-label="Close booking window"
      />

      {/* =====================================================
          MODAL
      ===================================================== */}
      <div className="relative z-10 flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] bg-white text-[#06283d] shadow-2xl">

        {/* ===================================================
            HEADER
        =================================================== */}
        <div className="relative shrink-0 overflow-hidden bg-[#06283d] px-6 py-6 sm:px-8 sm:py-7">

          {/* Decorative glow */}
          <div
            className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#0093b2]/30 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="absolute -bottom-24 left-1/3 h-40 w-40 rounded-full bg-[#5ed7e5]/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 flex items-start justify-between gap-5">

            <div className="min-w-0">

              <div className="mb-3 flex items-center gap-2">
                <span className="h-1 w-8 rounded-full bg-[#5ed7e5]" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#5ed7e5]">
                  RESERVATIONS
                </span>
              </div>

              <h2
                id="booking-modal-title"
                className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl"
              >
                Book A Table
              </h2>

              <p className="mt-2 max-w-md text-sm font-medium leading-6 text-slate-300">
                Request a table at RipTides Cocktails & Grill.
              </p>

            </div>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl font-light text-white transition-all hover:bg-white/20 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ed7e5]"
              aria-label="Close booking window"
            >
              <span aria-hidden="true">×</span>
            </button>

          </div>
        </div>

        {/* ===================================================
            SCROLLABLE CONTENT
        =================================================== */}
        <div className="min-h-0 flex-1 overflow-y-auto">

          <div className="p-6 sm:p-8">

            {submitted ? (
              /* =================================================
                 SUCCESS STATE
              ================================================= */
              <div className="py-4 text-center sm:py-8">

                {/* Success icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e5f7fa] text-4xl text-[#008fa8] ring-8 ring-[#f2fbfc]">
                  ✓
                </div>

                <p className="section-kicker mt-7">
                  REQUEST RECEIVED
                </p>

                <h3 className="mt-2 text-3xl font-black tracking-tight text-[#06283d]">
                  Thanks, {formData.name}!
                </h3>

                <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-7 text-slate-600 sm:text-base">
                  Your reservation request has been received. Our team will
                  contact you at{' '}
                  <strong className="text-[#06283d]">
                    {formData.phone}
                  </strong>{' '}
                  to confirm availability.
                </p>

                {/* Reservation summary */}
                <div className="mx-auto mt-7 max-w-md rounded-2xl border border-slate-200 bg-[#f7f4ec] p-5 text-left sm:p-6">

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#06283d] text-lg text-white">
                      📅
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-[#008fa8]">
                        REQUESTED RESERVATION
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#06283d]">
                        We'll confirm your table by phone.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">

                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 text-sm">
                      <span className="font-bold text-slate-500">
                        Date
                      </span>

                      <span className="text-right font-black text-[#06283d]">
                        {formData.date}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 text-sm">
                      <span className="font-bold text-slate-500">
                        Time
                      </span>

                      <span className="text-right font-black text-[#06283d]">
                        {formData.time}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 text-sm">
                      <span className="font-bold text-slate-500">
                        Guests
                      </span>

                      <span className="text-right font-black text-[#06283d]">
                        {formData.guests}
                      </span>
                    </div>

                    {formData.requests && (
                      <div className="pt-1 text-sm">
                        <span className="font-bold text-slate-500">
                          Special request
                        </span>

                        <p className="mt-1 font-medium leading-6 text-[#06283d]">
                          {formData.requests}
                        </p>
                      </div>
                    )}

                  </div>
                </div>

                <div className="mx-auto mt-7 max-w-md">
                  <p className="text-xs font-medium text-slate-500">
                    Need an immediate answer?
                  </p>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">

                    <a
                      href={`tel:${RESTAURANT_PHONE}`}
                      className="btn-gold justify-center"
                    >
                      CALL (631) 505-3200
                    </a>

                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-secondary justify-center"
                    >
                      CLOSE
                    </button>

                  </div>
                </div>

              </div>
            ) : (
              /* =================================================
                 RESERVATION FORM
              ================================================= */
              <>
                <div className="mb-7">

                  <p className="section-kicker">
                    REQUEST YOUR TABLE
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-[#06283d] sm:text-3xl">
                    Tell Us When You'd Like to Visit
                  </h3>

                  <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-slate-600">
                    Fill out the form below and our team will contact you
                    to confirm availability.
                  </p>

                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* =================================================
                     NAME + PHONE
                  ================================================= */}
                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label
                        htmlFor="booking-name"
                        className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                      >
                        Full Name <span aria-hidden="true">*</span>
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
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-medium text-[#06283d] outline-none transition-all placeholder:text-slate-400 focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                      >
                        Phone Number <span aria-hidden="true">*</span>
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
                        inputMode="tel"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-medium text-[#06283d] outline-none transition-all placeholder:text-slate-400 focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                      />
                    </div>

                  </div>

                  {/* =================================================
                     DATE + TIME + GUESTS
                  ================================================= */}
                  <div className="grid gap-5 sm:grid-cols-3">

                    <div>
                      <label
                        htmlFor="booking-date"
                        className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                      >
                        Date <span aria-hidden="true">*</span>
                      </label>

                      <input
                        id="booking-date"
                        name="date"
                        type="date"
                        required
                        min={today}
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3.5 font-medium text-[#06283d] outline-none transition-all focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-time"
                        className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                      >
                        Time <span aria-hidden="true">*</span>
                      </label>

                      <input
                        id="booking-time"
                        name="time"
                        type="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3.5 font-medium text-[#06283d] outline-none transition-all focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="booking-guests"
                        className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                      >
                        Guests <span aria-hidden="true">*</span>
                      </label>

                      <select
                        id="booking-guests"
                        name="guests"
                        required
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3.5 font-medium text-[#06283d] outline-none transition-all focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
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

                  {/* =================================================
                     SPECIAL REQUESTS
                  ================================================= */}
                  <div>
                    <label
                      htmlFor="booking-requests"
                      className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                    >
                      Special Requests{' '}
                      <span className="font-medium normal-case tracking-normal text-slate-400">
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      id="booking-requests"
                      name="requests"
                      rows={4}
                      value={formData.requests}
                      onChange={handleChange}
                      placeholder="Birthday, outdoor seating, accessibility needs, etc."
                      className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-medium text-[#06283d] outline-none transition-all placeholder:text-slate-400 focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                    />
                  </div>

                  {/* =================================================
                     IMPORTANT NOTICE
                  ================================================= */}
                  <div className="rounded-2xl border border-[#0093b2]/20 bg-[#e5f7fa]/60 p-4 sm:p-5">

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-base shadow-sm">
                        ℹ️
                      </div>

                      <div>
                        <p className="text-sm font-black text-[#06283d]">
                          Reservation request
                        </p>

                        <p className="mt-1 text-xs font-medium leading-5 text-slate-600 sm:text-sm">
                          This form sends a{' '}
                          <strong className="text-[#06283d]">
                            reservation request
                          </strong>
                          . Your table is not confirmed until RipTides
                          confirms availability with you.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* =================================================
                     SUBMIT
                  ================================================= */}
                  <button
                    type="submit"
                    className="btn-primary w-full justify-center !py-4"
                  >
                    REQUEST RESERVATION
                    <span aria-hidden="true">→</span>
                  </button>

                </form>

                {/* =================================================
                   OR CALL
                ================================================= */}
                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200" />

                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-[#f7f4ec] p-5 sm:p-6">

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#06283d] text-xl text-white">
                      📞
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg font-black text-[#06283d]">
                        Prefer to call?
                      </h3>

                      <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                        For immediate availability or large parties, call
                        our team directly.
                      </p>

                      <a
                        href={`tel:${RESTAURANT_PHONE}`}
                        className="mt-4 inline-flex items-center rounded-full bg-[#06283d] px-5 py-2.5 text-sm font-black text-white transition-all hover:bg-[#002b45] hover:-translate-y-0.5"
                      >
                        (631) 505-3200
                      </a>
                    </div>

                  </div>
                </div>

                {/* =================================================
                   RESTAURANT INFO
                ================================================= */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-[#008fa8]">
                      LOCATION
                    </p>

                    <p className="mt-2 text-sm font-bold leading-6 text-[#06283d]">
                      168 East Montauk Highway
                      <br />
                      Lindenhurst, NY 11757
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-[#008fa8]">
                      HOURS
                    </p>

                    <p className="mt-2 text-sm font-bold leading-6 text-[#06283d]">
                      Mon: 3:00 PM – 12:00 AM
                      <br />
                      Tue – Sun: 2:00 PM – 12:00 AM
                    </p>
                  </div>

                </div>

                {/* Continue browsing */}
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 w-full rounded-full border border-slate-300 bg-white px-6 py-3 font-bold text-slate-600 transition-all hover:border-[#06283d] hover:bg-[#f7f4ec] hover:text-[#06283d]"
                >
                  CONTINUE BROWSING
                </button>

              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}