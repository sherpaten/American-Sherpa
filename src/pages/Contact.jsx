import { useState } from 'react';
import { Link } from 'react-router-dom';

import SEO from '../components/SEO';

import restaurantphoto2 from '../assets/restaurantphoto2.webp';
import restaurentphoto4 from '../assets/restaurentphoto4.webp';
import outdoor from '../assets/outdoor.webp';

const TOAST_URL =
  'https://order.toasttab.com/online/riptides-cocktail-and-grill-168-east-montauk-highway';

const MAPS_URL =
  'https://maps.google.com/?q=168+East+Montauk+Highway,+Lindenhurst,+NY+11757';

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
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

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

  return (
    <main className="bg-[#f7f4ec] text-[#06283d]">

      <SEO
        title="Contact RipTides Cocktails & Grill | Lindenhurst, NY"
        description="Contact RipTides Cocktails & Grill at 168 East Montauk Highway in Lindenhurst, NY for reservations, private events, menu questions and more."
        path="/contact"
        image={outdoor}
      />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section
        aria-labelledby="contact-hero-title"
        className="relative min-h-[620px] overflow-hidden bg-[#06283d]"
      >
        <div className="absolute inset-0">
          <img
            src={restaurantphoto2}
            alt="Dining area at RipTides Cocktails & Grill in Lindenhurst"
            className="h-full w-full object-cover object-center"
            width="1600"
            height="900"
            fetchPriority="high"
            decoding="async"
          />

          <div
            className="absolute inset-0 bg-gradient-to-r from-[#002b45]/95 via-[#06283d]/80 to-[#06283d]/55"
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-[#06283d]/90 via-transparent to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="site-container relative z-10 flex min-h-[620px] items-center">
          <div className="max-w-3xl py-24 sm:py-32">

            <div className="brand-line mb-7">
              <span className="section-kicker text-[#5ed7e5]">
                VISIT RIPTIDES
              </span>
            </div>

            <h1
              id="contact-hero-title"
              className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Come See Us.
            </h1>

            <p className="mt-7 max-w-2xl text-xl font-bold leading-relaxed text-white sm:text-2xl">
              Good food, cold drinks, and good times are waiting in
              Lindenhurst.
            </p>

            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-200 sm:text-lg">
              Whether you're joining us for dinner, meeting friends at the
              bar, watching the game, or planning your next celebration,
              we'd love to see you.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
                aria-label="Get directions to RipTides Cocktails & Grill"
              >
                GET DIRECTIONS
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href="tel:+16315053200"
                className="btn-secondary justify-center !border-white !bg-white !text-[#06283d] hover:!bg-slate-100"
                aria-label="Call RipTides Cocktails & Grill at 631 505 3200"
              >
                CALL (631) 505-3200
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          LOCATION + HOURS
      ===================================================== */}
      <section
        aria-labelledby="find-riptides-title"
        className="section section-white"
      >
        <div className="site-container">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="section-kicker">
              FIND US
            </p>

            <h2
              id="find-riptides-title"
              className="section-title mt-3"
            >
              Find RipTides
            </h2>

            <p className="section-copy mx-auto mt-5">
              Come by for dinner, drinks, live entertainment, or simply
              a good time with friends.
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-2">

            {/* ADDRESS */}
            <article className="card group flex min-h-[360px] flex-col items-center justify-center p-8 text-center sm:p-10">

              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e5f7fa] text-3xl shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                <span aria-hidden="true">📍</span>
              </div>

              <p className="section-kicker">
                OUR LOCATION
              </p>

              <h3 className="mt-3 text-2xl font-black text-[#06283d]">
                Visit Us
              </h3>

              <address className="mt-5 not-italic">
                <p className="text-lg font-bold text-[#06283d]">
                  168 East Montauk Highway
                </p>

                <p className="mt-1 text-lg font-medium text-slate-600">
                  Lindenhurst, NY 11757
                </p>
              </address>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 font-black tracking-wide text-[#008fa8] transition-colors hover:text-[#06283d]"
                aria-label="Get directions to 168 East Montauk Highway"
              >
                GET DIRECTIONS
                <span aria-hidden="true">→</span>
              </a>

            </article>

            {/* HOURS */}
            <article className="card-dark relative min-h-[360px] overflow-hidden p-8 sm:p-10">

              <div
                className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0093b2]/20 blur-3xl"
                aria-hidden="true"
              />

              <div
                className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[#5ed7e5]/10 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">

                <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl ring-1 ring-white/10">
                  <span aria-hidden="true">🕒</span>
                </div>

                <p className="section-kicker !text-[#5ed7e5]">
                  WHEN TO VISIT
                </p>

                <h3 className="mt-3 text-2xl font-black text-white">
                  Hours of Operation
                </h3>

                <dl className="mt-8 w-full max-w-md space-y-4 text-left">

                  <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-4">
                    <dt className="font-bold text-slate-300">
                      Mon – Thu
                    </dt>

                    <dd className="text-right font-bold text-white">
                      12:00 PM – 11:00 PM
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-4">
                    <dt className="font-bold text-slate-300">
                      Fri – Sat
                    </dt>

                    <dd className="text-right font-bold text-white">
                      12:00 PM – 1:00 AM
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-5">
                    <dt className="font-bold text-slate-300">
                      Sunday
                    </dt>

                    <dd className="text-right font-bold text-white">
                      12:00 PM – 10:00 PM
                    </dd>
                  </div>

                </dl>

              </div>
            </article>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM
      ===================================================== */}
      <section
        aria-labelledby="contact-form-title"
        className="section section-cream"
      >
        <div className="site-container">

          <div className="grid items-stretch gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">

            {/* IMAGE PANEL */}
            <div className="image-frame relative min-h-[520px] overflow-hidden rounded-[2rem] shadow-2xl lg:min-h-full">

              <img
                src={restaurentphoto4}
                alt="Bar and restaurant atmosphere at RipTides Cocktails & Grill"
                className="absolute inset-0 h-full w-full object-cover"
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-[#002b45]/95 via-[#06283d]/35 to-transparent"
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">

                <span className="brand-badge">
                  RIPTIDES COCKTAILS & GRILL
                </span>

                <h2 className="mt-5 max-w-lg text-3xl font-black leading-tight text-white sm:text-4xl">
                  Good Food.
                  <br />
                  Cold Drinks.
                  <br />
                  Good Times.
                </h2>

                <p className="mt-5 max-w-lg text-base font-medium leading-7 text-slate-200">
                  Stop by our Lindenhurst location or reach out to our team.
                  We're happy to help with questions, reservations, events,
                  and celebrations.
                </p>

              </div>
            </div>

            {/* FORM */}
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl sm:p-10">

              <div className="mb-9">
                <p className="section-kicker">
                  GET IN TOUCH
                </p>

                <h2
                  id="contact-form-title"
                  className="section-title mt-3"
                >
                  Let's Talk
                </h2>

                <p
                  id="contact-form-description"
                  className="section-copy mt-5"
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
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
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
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-medium text-[#06283d] outline-none transition-all placeholder:text-slate-400 focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
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
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-medium text-[#06283d] outline-none transition-all placeholder:text-slate-400 focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                    />
                  </div>

                </div>

                {/* PHONE + INQUIRY */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
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
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-medium text-[#06283d] outline-none transition-all placeholder:text-slate-400 focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-type"
                      className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                    >
                      What can we help with?{' '}
                      <span aria-hidden="true">*</span>
                    </label>

                    <select
                      name="inquiry_type"
                      id="inquiry-type"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-medium text-[#06283d] outline-none transition-all focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
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
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                  >
                    Message <span aria-hidden="true">*</span>
                  </label>

                  <textarea
                    name="message"
                    id="contact-message"
                    required
                    rows={6}
                    placeholder="How can we help you?"
                    className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-medium text-[#06283d] outline-none transition-all placeholder:text-slate-400 focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
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
                  className="btn-primary mt-2 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                  {!isSubmitting && <span aria-hidden="true">→</span>}
                </button>

                {/* RESULT */}
                <div
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className={
                    result
                      ? `rounded-xl border p-4 text-center text-sm font-bold ${
                          result.includes('Success')
                            ? 'border-green-200 bg-green-50 text-green-700'
                            : result.includes('Sending')
                            ? 'border-slate-200 bg-slate-50 text-slate-600'
                            : 'border-red-200 bg-red-50 text-red-700'
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
          WHY VISIT
      ===================================================== */}
      <section
        aria-labelledby="next-visit-title"
        className="section section-white"
      >
        <div className="site-container">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="section-kicker">
              YOUR NEXT VISIT
            </p>

            <h2
              id="next-visit-title"
              className="section-title mt-3"
            >
              What Brings You to RipTides?
            </h2>

            <p className="section-copy mx-auto mt-5">
              Whatever brings you through the door, we've got something
              waiting for you.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* DINNER */}
            <article className="card group flex flex-col p-7 sm:p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e5f7fa] text-2xl transition-transform duration-300 group-hover:-translate-y-1">
                🍽️
              </div>

              <h3 className="text-xl font-black text-[#06283d]">
                Dinner
              </h3>

              <p className="mt-3 flex-grow text-sm font-medium leading-6 text-slate-600">
                Come hungry. Leave happy.
              </p>

              <Link
                to="/menu"
                className="mt-7 inline-flex items-center gap-2 text-sm font-black tracking-wide text-[#008fa8] transition-colors hover:text-[#06283d]"
              >
                VIEW MENU
                <span aria-hidden="true">→</span>
              </Link>
            </article>

            {/* DRINKS */}
            <article className="card group flex flex-col p-7 sm:p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e5f7fa] text-2xl transition-transform duration-300 group-hover:-translate-y-1">
                🍸
              </div>

              <h3 className="text-xl font-black text-[#06283d]">
                Drinks
              </h3>

              <p className="mt-3 flex-grow text-sm font-medium leading-6 text-slate-600">
                Cocktails, beer, and good times at the bar.
              </p>

              <Link
                to="/menu"
                className="mt-7 inline-flex items-center gap-2 text-sm font-black tracking-wide text-[#008fa8] transition-colors hover:text-[#06283d]"
              >
                SEE DRINK MENU
                <span aria-hidden="true">→</span>
              </Link>
            </article>

            {/* EVENTS */}
            <article className="card group flex flex-col p-7 sm:p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e5f7fa] text-2xl transition-transform duration-300 group-hover:-translate-y-1">
                🎸
              </div>

              <h3 className="text-xl font-black text-[#06283d]">
                Events
              </h3>

              <p className="mt-3 flex-grow text-sm font-medium leading-6 text-slate-600">
                See what's happening this week.
              </p>

              <Link
                to="/events"
                className="mt-7 inline-flex items-center gap-2 text-sm font-black tracking-wide text-[#008fa8] transition-colors hover:text-[#06283d]"
              >
                VIEW EVENTS
                <span aria-hidden="true">→</span>
              </Link>
            </article>

            {/* PRIVATE PARTIES */}
            <article className="card group flex flex-col p-7 sm:p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff4d6] text-2xl transition-transform duration-300 group-hover:-translate-y-1">
                🎉
              </div>

              <h3 className="text-xl font-black text-[#06283d]">
                Private Parties
              </h3>

              <p className="mt-3 flex-grow text-sm font-medium leading-6 text-slate-600">
                Planning something special?
              </p>

              <a
                href="#inquiry-type"
                className="mt-7 inline-flex items-center gap-2 text-sm font-black tracking-wide text-[#008fa8] transition-colors hover:text-[#06283d]"
              >
                PLAN YOUR EVENT
                <span aria-hidden="true">→</span>
              </a>
            </article>

          </div>
        </div>
      </section>

      {/* =====================================================
          ORDER / FINAL CTA
      ===================================================== */}
      <section className="section section-navy !pt-0">
        <div className="site-container">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#002b45] shadow-2xl">

            <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#0093b2]/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#5ed7e5]/10 blur-3xl" />

            <div className="relative z-10 grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:p-16">

              <div>
                <span className="gold-badge">
                  RIPTIDES COCKTAILS & GRILL
                </span>

                <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  See You at RipTides.
                </h2>

                <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-200 sm:text-lg">
                  Fresh food, cold drinks, live music, and local energy.
                  Come hang out with us in Lindenhurst.
                </p>

                <address className="mt-5 not-italic font-bold text-[#5ed7e5]">
                  168 East Montauk Highway
                  <br />
                  Lindenhurst, NY 11757
                </address>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold justify-center whitespace-nowrap"
                >
                  GET DIRECTIONS
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  href={TOAST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary justify-center whitespace-nowrap !border-white/30 !bg-white/10 !text-white hover:!bg-white/20"
                >
                  ORDER ONLINE
                  <span aria-hidden="true">↗</span>
                </a>

              </div>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
}