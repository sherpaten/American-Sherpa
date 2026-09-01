import SEO from '../components/SEO';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import restaurantphoto2 from '../assets/restaurantphoto2.webp';
import restaurentphoto4 from '../assets/restaurentphoto4.webp';
import outdoor from '../assets/outdoor.webp';

export default function Contact() {
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setResult('Sending your message...');

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append(
      'access_key',
      '995ed907-5485-4119-8eb8-4f3502fd0d8c'
    );

    formData.append(
      'subject',
      'New Contact Inquiry from RipTides Website'
    );

    try {
      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setResult(
          'Success! Your message has been sent. Our team will get back to you shortly.'
        );
        form.reset();
      } else {
        setResult(
          `Error: ${data.message || 'Unable to send your message.'}`
        );
      }
    } catch {
      setResult(
        'An error occurred while sending. Please try calling us instead.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const focusClass =
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0093b2] focus-visible:ring-offset-2';

  return (
    <main className="bg-white text-black flex flex-col">

      <SEO
        title="Contact RipTides Cocktails & Grill | Lindenhurst, NY"
        description="Contact RipTides Cocktails & Grill at 168 East Montauk Highway in Lindenhurst, NY for reservations, private events, menu questions and more."
        path="/contact"
        image={outdoor}
      />

      {/* =====================================================
          SECTION 1 — HERO
      ===================================================== */}
      <section
        aria-labelledby="contact-hero-title"
        className="relative overflow-hidden border-b border-slate-200"
      >
        <div className="absolute inset-0">
          <img
            src={restaurantphoto2}
            alt="Dining area at RipTides Cocktails & Grill in Lindenhurst"
            className="w-full h-full object-cover"
            width="1600"
            height="900"
            fetchPriority="high"
            decoding="async"
          />

          <div
            className="absolute inset-0 bg-[#001428]/85"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">

          <p className="text-cyan-300 text-sm font-black uppercase tracking-[0.2em] mb-6">
            VISIT US
          </p>

          <h1
            id="contact-hero-title"
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight"
          >
            Come See Us
          </h1>

          <p className="text-xl sm:text-2xl text-white font-bold max-w-2xl mx-auto mt-6">
            Good food, cold drinks, and good times are waiting in Lindenhurst.
          </p>

          <p className="text-slate-100 text-lg max-w-3xl mx-auto font-medium leading-relaxed mt-5">
            Whether you're joining us for dinner, meeting friends at the bar,
            watching the game, or planning your next celebration, we'd love
            to see you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">

            <a
              href="https://maps.google.com/?q=168+East+Montauk+Highway,+Lindenhurst,+NY+11757"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to RipTides Cocktails & Grill"
              className={`bg-[#0093b2] hover:bg-[#007a94] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 ${focusClass}`}
            >
              GET DIRECTIONS
            </a>

            <a
              href="tel:+16315053200"
              aria-label="Call RipTides Cocktails & Grill at 631 505 3200"
              className={`bg-white hover:bg-slate-100 text-[#001428] border border-white font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 ${focusClass}`}
            >
              CALL (631) 505-3200
            </a>

          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 2 — LOCATION & HOURS
      ===================================================== */}
      <section
        aria-labelledby="find-riptides-title"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full"
      >
        <div className="text-center mb-12">

          <p className="text-[#0093b2] text-xs font-black uppercase tracking-[0.2em]">
            FIND US
          </p>

          <h2
            id="find-riptides-title"
            className="text-4xl sm:text-5xl font-black text-black mt-3"
          >
            Find RipTides
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">

          {/* ADDRESS */}
          <article className="bg-slate-50 border border-slate-200 rounded-3xl p-10 shadow-sm flex flex-col justify-center items-center text-center hover:shadow-xl transition-shadow">

            <div
              className="text-[#0093b2] text-5xl mb-6"
              aria-hidden="true"
            >
              📍
            </div>

            <h3 className="text-2xl font-black text-black mb-4">
              Address
            </h3>

            <address className="not-italic">
              <p className="text-slate-600 text-lg font-medium mb-1">
                168 East Montauk Highway
              </p>

              <p className="text-slate-600 text-lg font-medium mb-8">
                Lindenhurst, NY 11757
              </p>
            </address>

            <a
              href="https://maps.google.com/?q=168+East+Montauk+Highway,+Lindenhurst,+NY+11757"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to 168 East Montauk Highway"
              className={`text-[#0093b2] font-bold hover:text-[#001428] transition-colors flex items-center gap-2 ${focusClass}`}
            >
              GET DIRECTIONS
              <span aria-hidden="true">→</span>
            </a>

          </article>

          {/* HOURS */}
          <article className="bg-[#001428] text-white rounded-3xl p-10 shadow-md flex flex-col justify-center items-center relative overflow-hidden">

            <div
              className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#0093b2] rounded-full blur-3xl opacity-20"
              aria-hidden="true"
            />

            <div
              className="text-cyan-300 text-5xl mb-6 relative z-10"
              aria-hidden="true"
            >
              🕒
            </div>

            <h3 className="text-2xl font-black text-white mb-6 relative z-10">
              Hours of Operation
            </h3>

            <div className="relative z-10 w-full max-w-xs">

              <dl className="space-y-4">

                <div className="flex justify-between gap-4 border-b border-slate-700 pb-2">
                  <dt className="font-bold text-slate-300">
                    Mon – Thu
                  </dt>

                  <dd className="font-medium text-white text-right">
                    12:00 PM – 11:00 PM
                  </dd>
                </div>

                <div className="flex justify-between gap-4 border-b border-slate-700 pb-2">
                  <dt className="font-bold text-slate-300">
                    Fri – Sat
                  </dt>

                  <dd className="font-medium text-white text-right">
                    12:00 PM – 1:00 AM
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="font-bold text-slate-300">
                    Sunday
                  </dt>

                  <dd className="font-medium text-white text-right">
                    12:00 PM – 10:00 PM
                  </dd>
                </div>

              </dl>

            </div>
          </article>

        </div>
      </section>

      {/* =====================================================
          SECTION 3 — CONTACT / IMAGE + FORM
      ===================================================== */}
      <section
        aria-labelledby="contact-form-title"
        className="bg-slate-100 border-y border-slate-200 py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">

            {/* IMAGE */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[400px]">

              <img
                src={restaurentphoto4}
                alt="Bar and restaurant atmosphere at RipTides Cocktails & Grill"
                className="absolute inset-0 w-full h-full object-cover"
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
              />

              <div
                className="absolute inset-0 bg-[#001428]/45"
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10 text-white">

                <p className="inline-block bg-[#0093b2] px-3 py-1.5 rounded-md text-xs font-black uppercase tracking-widest mb-4">
                  RIPTIDES COCKTAILS & GRILL
                </p>

                <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                  Good Food. Cold Drinks. Good Times.
                </h2>

                <p className="mt-4 text-slate-100 font-medium leading-relaxed max-w-lg">
                  Stop by our Lindenhurst location or reach out to our team.
                  We're happy to help with questions, reservations, events,
                  and celebrations.
                </p>

              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200 text-black">

              <div className="mb-8">

                <p className="text-[#0093b2] text-xs font-black uppercase tracking-[0.2em]">
                  GET IN TOUCH
                </p>

                <h2
                  id="contact-form-title"
                  className="text-4xl sm:text-5xl font-black text-black mt-3"
                >
                  Let's Talk
                </h2>

                <p
                  id="contact-form-description"
                  className="text-slate-600 font-medium text-base leading-relaxed mt-4"
                >
                  Have a question about reservations, private parties,
                  menu items, events, or anything else? Send us a message.
                </p>

              </div>

              <form
                onSubmit={onSubmit}
                aria-describedby="contact-form-description"
                className="space-y-5"
              >

                {/* NAME + EMAIL */}
                <div className="grid sm:grid-cols-2 gap-5">

                  <div className="space-y-1">

                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold text-slate-600 tracking-wider uppercase"
                    >
                      Full Name <span aria-hidden="true">*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      id="contact-name"
                      required
                      autoComplete="name"
                      placeholder="Jane Doe"
                      className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-black placeholder:text-slate-500 ${focusClass}`}
                    />

                  </div>

                  <div className="space-y-1">

                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold text-slate-600 tracking-wider uppercase"
                    >
                      Email Address <span aria-hidden="true">*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      id="contact-email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      placeholder="jane@example.com"
                      className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-black placeholder:text-slate-500 ${focusClass}`}
                    />

                  </div>

                </div>

                {/* PHONE + INQUIRY */}
                <div className="grid sm:grid-cols-2 gap-5">

                  <div className="space-y-1">

                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-bold text-slate-600 tracking-wider uppercase"
                    >
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      id="contact-phone"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="(631) 505-3200"
                      className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-black placeholder:text-slate-500 ${focusClass}`}
                    />

                  </div>

                  <div className="space-y-1">

                    <label
                      htmlFor="inquiry-type"
                      className="block text-xs font-bold text-slate-600 tracking-wider uppercase"
                    >
                      What can we help with?{' '}
                      <span aria-hidden="true">*</span>
                    </label>

                    <select
                      name="inquiry_type"
                      id="inquiry-type"
                      required
                      defaultValue=""
                      className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-black ${focusClass}`}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>

                      <option value="General Question">
                        General Question
                      </option>

                      <option value="Reservation">
                        Reservation
                      </option>

                      <option value="Private Event">
                        Private Event
                      </option>

                      <option value="Catering / Party">
                        Catering / Party
                      </option>

                      <option value="Menu Question">
                        Menu Question
                      </option>

                      <option value="Event Information">
                        Event Information
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>

                  </div>

                </div>

                {/* MESSAGE */}
                <div className="space-y-1">

                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold text-slate-600 tracking-wider uppercase"
                  >
                    Message <span aria-hidden="true">*</span>
                  </label>

                  <textarea
                    name="message"
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-black placeholder:text-slate-500 resize-y ${focusClass}`}
                  />

                </div>

                {/* SPAM PREVENTION */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                  className={`w-full bg-[#001428] hover:bg-[#002a54] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-lg py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 mt-2 ${focusClass}`}
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>

                {/* RESULT */}
                <div
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className={
                    result
                      ? `mt-4 p-4 rounded-xl text-center font-bold text-sm ${
                          result.includes('Success')
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : result.includes('Sending')
                            ? 'bg-slate-50 text-slate-600 border border-slate-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`
                      : 'sr-only'
                  }
                >
                  {result || ' '}
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 4 — WHAT BRINGS YOU TO RIPTIDES?
      ===================================================== */}
      <section
        aria-labelledby="next-visit-title"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full"
      >

        <div className="text-center mb-12">

          <p className="text-[#0093b2] text-xs font-black uppercase tracking-[0.2em]">
            YOUR NEXT VISIT
          </p>

          <h2
            id="next-visit-title"
            className="text-3xl sm:text-4xl font-black text-black mt-3"
          >
            What Brings You to RipTides?
          </h2>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* DINNER */}
          <article className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col hover:shadow-xl transition-all hover:-translate-y-1">

            <div
              className="text-4xl mb-6"
              aria-hidden="true"
            >
              🍽️
            </div>

            <h3 className="text-xl font-black text-black mb-2">
              Dinner
            </h3>

            <p className="text-slate-600 text-sm font-medium mb-8 flex-grow">
              Come hungry. Leave happy.
            </p>

            <Link
              to="/menu"
              className={`text-[#0093b2] font-bold text-sm hover:text-[#001428] transition-colors flex items-center gap-2 ${focusClass}`}
            >
              VIEW MENU
              <span aria-hidden="true">→</span>
            </Link>

          </article>

          {/* DRINKS */}
          <article className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col hover:shadow-xl transition-all hover:-translate-y-1">

            <div
              className="text-4xl mb-6"
              aria-hidden="true"
            >
              🍸
            </div>

            <h3 className="text-xl font-black text-black mb-2">
              Drinks
            </h3>

            <p className="text-slate-600 text-sm font-medium mb-8 flex-grow">
              Cocktails, beer, and good times at the bar.
            </p>

            <Link
              to="/menu"
              className={`text-[#0093b2] font-bold text-sm hover:text-[#001428] transition-colors flex items-center gap-2 ${focusClass}`}
            >
              SEE DRINK MENU
              <span aria-hidden="true">→</span>
            </Link>

          </article>

          {/* EVENTS */}
          <article className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col hover:shadow-xl transition-all hover:-translate-y-1">

            <div
              className="text-4xl mb-6"
              aria-hidden="true"
            >
              🎸
            </div>

            <h3 className="text-xl font-black text-black mb-2">
              Events
            </h3>

            <p className="text-slate-600 text-sm font-medium mb-8 flex-grow">
              See what's happening this week.
            </p>

            <Link
              to="/events"
              className={`text-[#0093b2] font-bold text-sm hover:text-[#001428] transition-colors flex items-center gap-2 ${focusClass}`}
            >
              VIEW EVENTS
              <span aria-hidden="true">→</span>
            </Link>

          </article>

          {/* PRIVATE PARTIES */}
          <article className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col hover:shadow-xl transition-all hover:-translate-y-1">

            <div
              className="text-4xl mb-6"
              aria-hidden="true"
            >
              🎉
            </div>

            <h3 className="text-xl font-black text-black mb-2">
              Private Parties
            </h3>

            <p className="text-slate-600 text-sm font-medium mb-8 flex-grow">
              Planning something special?
            </p>

            <a
              href="#inquiry-type"
              className={`text-[#0093b2] font-bold text-sm hover:text-[#001428] transition-colors flex items-center gap-2 ${focusClass}`}
            >
              PLAN YOUR EVENT
              <span aria-hidden="true">→</span>
            </a>

          </article>

        </div>
      </section>

      {/* =====================================================
          SECTION 5 — FINAL CTA
      ===================================================== */}
      <section
        aria-labelledby="final-contact-title"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full"
      >

        <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">

          <img
            src={outdoor}
            alt="Outdoor seating area at RipTides Cocktails & Grill"
            className="absolute inset-0 w-full h-full object-cover"
            width="1600"
            height="900"
            loading="lazy"
            decoding="async"
          />

          <div
            className="absolute inset-0 bg-[#001428]/80"
            aria-hidden="true"
          />

          <div className="relative z-10 p-10 sm:p-16 text-center flex flex-col items-center">

            <p className="bg-[#0093b2] text-white px-3.5 py-1.5 rounded-md text-xs font-black uppercase tracking-widest inline-block shadow-md mb-6">
              VISIT RIPTIDES
            </p>

            <h2
              id="final-contact-title"
              className="text-4xl sm:text-5xl font-black text-white mb-4"
            >
              See You at RipTides
            </h2>

            <p className="text-cyan-300 font-bold text-lg mb-8 tracking-wide">
              Fresh food. Cold drinks. Live music. Local energy.
            </p>

            <address className="not-italic text-slate-100 font-medium text-lg mb-10">
              168 East Montauk Highway
              <br />
              Lindenhurst, NY 11757
            </address>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">

              <a
                href="https://maps.google.com/?q=168+East+Montauk+Highway,+Lindenhurst,+NY+11757"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to RipTides Cocktails & Grill"
                className={`bg-[#ffb116] hover:bg-[#e59e13] text-black font-black text-base px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto text-center ${focusClass}`}
              >
                GET DIRECTIONS
              </a>

              <Link
                to="/booking"
                aria-label="Book a table at RipTides Cocktails & Grill"
                className={`bg-white/10 hover:bg-white/20 text-white border border-white/40 font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto text-center ${focusClass}`}
              >
                BOOK A TABLE
              </Link>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}