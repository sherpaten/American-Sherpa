import SEO from '../components/SEO';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import photo4 from '../assets/restaurentphoto4.webp';
import outdoor from '../assets/outdoor.webp';

import Event1 from '../assets/Event1.jpeg';
import Event2 from '../assets/Event2.png';
import Event3 from '../assets/Event3.png';
import Event4 from '../assets/Event4.png';
import Event5 from '../assets/Event5.png';

const TOAST_URL =
  'https://order.toasttab.com/online/riptides-cocktail-and-grill-168-east-montauk-highway';

export default function Events() {
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult('Sending your request...');

    const formData = new FormData(event.target);

    formData.append(
      'access_key',
      '995ed907-5485-4119-8eb8-4f3502fd0d8c'
    );

    formData.append(
      'subject',
      'New Table Reservation from RipTides Website'
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
          'Success! Your reservation request has been sent. We will contact you shortly to confirm.'
        );

        event.target.reset();
      } else {
        setResult(`Error: ${data.message}`);
      }
    } catch (error) {
      setResult(
        'An error occurred while sending. Please try calling us instead.'
      );
    }

    setIsSubmitting(false);
  };

  const events = [
    {
      image: Event1,
      day: 'Fri',
      date: '24',
      type: 'Live Music',
      typeClass: 'bg-cyan-100 text-[#007a94]',
      title: 'The South Shore Boys',
      details: 'Classic Rock & Blues • 8:00 PM',
      description:
        'Grab a drink, order something from the grill, and enjoy a night of live local music.',
      alt: 'Live music event at RipTides Cocktails & Grill in Lindenhurst, NY',
    },
    {
      image: Event2,
      day: 'Sat',
      date: '25',
      type: 'Karaoke',
      typeClass: 'bg-purple-100 text-purple-700',
      title: 'Karaoke Night',
      details: 'Live Karaoke • 9:00 PM',
      description:
        'Take the stage, sing your favorite songs, and enjoy a night of music and good times.',
      alt: 'Karaoke night event at RipTides Cocktails & Grill in Lindenhurst, NY',
    },
    {
      image: Event3,
      day: 'Sun',
      date: '26',
      type: 'Specials',
      typeClass: 'bg-orange-100 text-orange-700',
      title: 'Foodball Is Back',
      details: 'Food • Drinks • Sports',
      description:
        'Relax with friends, catch the game, and make Sunday your favorite day of the week.',
      alt: 'Football at RipTides Cocktails & Grill in Lindenhurst, NY',
    },
    {
      image: Event4,
      day: 'Fri',
      date: '31',
      type: 'Prize',
      typeClass: 'bg-cyan-100 text-[#007a94]',
      title: 'Trivia Night',
      details: 'Test your Knowledge • After 7:00 PM',
      description:
        'Enjoy great food, drinks, and Trivia Night in the relaxed RipTides atmosphere.',
      alt: 'Trivia night at RipTides Cocktails & Grill in Lindenhurst, NY',
    },
    {
      image: Event5,
      day: 'Sat',
      date: '01',
      type: 'Special Event',
      typeClass: 'bg-orange-100 text-orange-700',
      title: 'BINGO Night',
      details: 'Food • Drinks • Entertainment',
      description:
        'Bring your friends and enjoy another great night of food, drinks, music, and fun.',
      alt: 'BINGO Night at RipTides Cocktails & Grill in Lindenhurst, NY',
    },
  ];

  const experiences = [
    {
      icon: '🎸',
      label: 'Live Music',
      title: 'Local talent. Great atmosphere.',
      description:
        'Enjoy live performances from local musicians and bands while you dine, drink, and hang out with friends.',
    },
    {
      icon: '🎤',
      label: 'Karaoke',
      title: 'Your stage. Your song. Your night.',
      description:
        'Grab the mic and sing your favorite songs during our high-energy karaoke nights.',
    },
    {
      icon: '🍻',
      label: 'Game Days',
      title: 'Big games. Cold drinks. Good company.',
      description:
        'Catch your favorite teams while enjoying food, drinks, and the energy of the RipTides crowd.',
    },
    {
      icon: '🎉',
      label: 'Private Events',
      title: 'Make your next event one to remember.',
      description:
        'Birthdays, celebrations, gatherings, and private events can be hosted right here at RipTides.',
    },
  ];

  return (
    <main className="bg-[#f7f4ec] text-[#06283d]">

      <SEO
        title="RipTides Events & Live Music | Lindenhurst, NY"
        description="See what is happening at RipTides Cocktails & Grill in Lindenhurst, NY, including live music, karaoke, sports, special events and private parties."
        path="/events"
        image={outdoor}
      />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative min-h-[72vh] flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0">
          <img
            src={outdoor}
            alt="RipTides Cocktails & Grill outdoor area and events"
            width="1600"
            height="1000"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center scale-105"
          />

          <div className="hero-overlay-dark absolute inset-0" />

          <div className="absolute inset-0 bg-gradient-to-b from-[#001428]/30 via-[#001428]/65 to-[#001428]/95" />
        </div>

        <div className="relative z-10 site-container text-center py-28 sm:py-32">

          <span className="section-kicker text-[#5ed7e5]">
            Good Times Are Always On The Horizon
          </span>

          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white">
            Reservations
            <br />
            <span className="text-[#5ed7e5]">& Live Events</span>
          </h1>

          <p className="section-copy text-slate-200 max-w-2xl mx-auto mt-7 text-base sm:text-lg lg:text-xl">
            Book your table for a casual dinner, enjoy live local music,
            sing along at karaoke, or plan your next celebration at RipTides.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-9">

            <a
              href="#upcoming-events"
              className="btn-primary min-w-[210px]"
            >
              VIEW UPCOMING EVENTS
            </a>

            <a
              href="#private-events"
              className="btn-secondary min-w-[210px]"
            >
              PLAN A PRIVATE EVENT
            </a>

          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-9 text-xs sm:text-sm uppercase tracking-[0.16em] font-bold text-slate-300">
            <span>Live Music</span>
            <span className="text-[#5ed7e5]">•</span>
            <span>Karaoke</span>
            <span className="text-[#5ed7e5]">•</span>
            <span>Sports</span>
            <span className="text-[#5ed7e5]">•</span>
            <span>Private Parties</span>
            <span className="text-[#5ed7e5]">•</span>
            <span>Special Events</span>
          </div>

        </div>
      </section>

      {/* =====================================================
          UPCOMING EVENTS
      ===================================================== */}
      <section
        id="upcoming-events"
        className="section section-white"
      >
        <div className="site-container">

          <div className="max-w-3xl mx-auto text-center mb-14">

            <span className="section-kicker">
              What's Happening
            </span>

            <h2 className="section-title mt-4">
              There's Always Something Going On
            </h2>

            <div className="brand-line mx-auto my-6" />

            <p className="section-description mx-auto">
              Whether you're stopping by for dinner, meeting friends for
              drinks, or looking for a night out, our events keep the week
              interesting and the weekend even better.
            </p>

          </div>

          {/* EVENT GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

            {events.map((eventItem, index) => (
              <article
                key={index}
                className="group card overflow-hidden p-0 flex flex-col"
              >

                {/* IMAGE */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">

                  <img
                    src={eventItem.image}
                    alt={eventItem.alt}
                    width="1200"
                    height="800"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#001428]/55 via-transparent to-transparent opacity-70" />

                  {/* DATE */}
                  <div className="absolute left-5 bottom-5 bg-[#06283d] text-white rounded-2xl px-4 py-3 min-w-[72px] text-center shadow-xl">

                    <div className="text-xs font-black uppercase tracking-widest text-[#5ed7e5]">
                      {eventItem.day}
                    </div>

                    <div className="text-2xl font-black leading-none mt-1">
                      {eventItem.date}
                    </div>

                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-6 sm:p-7 flex flex-col flex-1">

                  <div className="flex items-center justify-between gap-3 mb-4">

                    <span
                      className={`${eventItem.typeClass} text-[11px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider`}
                    >
                      {eventItem.type}
                    </span>

                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      RipTides
                    </span>

                  </div>

                  <h3 className="text-2xl font-black text-[#06283d] leading-tight">
                    {eventItem.title}
                  </h3>

                  <p className="text-[#008fa8] font-bold text-sm mt-2">
                    {eventItem.details}
                  </p>

                  <p className="text-slate-600 font-medium leading-relaxed mt-4">
                    {eventItem.description}
                  </p>

                  <div className="mt-auto pt-6">

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-[#008fa8] font-black text-sm uppercase tracking-wide hover:text-[#06283d] transition-colors"
                    >
                      VIEW EVENT
                      <span className="text-lg transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>

                  </div>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          RESERVATION SECTION
      ===================================================== */}
      <section className="section section-cream">

        <div className="site-container">

          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* LEFT */}
            <div>

              <span className="section-kicker">
                Reserve Your Table
              </span>

              <h2 className="section-title mt-4">
                Make It A RipTides Night
              </h2>

              <div className="brand-line my-6" />

              <p className="section-description max-w-xl">
                Planning a dinner out or wanting to guarantee a spot for
                the game? Fill out the form to request your table.
              </p>

              <p className="text-sm font-semibold text-slate-500 mt-4">
                For parties larger than 8, please call us directly.
              </p>

              {/* IMAGE */}
              <div className="image-frame mt-8 aspect-[4/3]">

                <img
                  src={photo4}
                  alt="RipTides Cocktails & Grill neon bar lighting"
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#001428]/50 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">

                  <span className="brand-badge">
                    RipTides Cocktails & Grill
                  </span>

                </div>

              </div>

            </div>

            {/* FORM */}
            <div className="relative">

              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#5ed7e5]/20 blur-3xl" />

              <div className="card-dark relative overflow-hidden">

                <div className="absolute top-0 right-0 w-48 h-48 rounded-bl-full bg-[#008fa8]/20" />

                <div className="relative z-10">

                  <span className="gold-badge">
                    Reservations
                  </span>

                  <h3 className="text-3xl sm:text-4xl font-black text-white mt-5">
                    Reserve A Spot
                  </h3>

                  <p className="text-slate-300 font-medium mt-3 mb-8">
                    Send us your preferred date and time and we'll get
                    back to you to confirm.
                  </p>

                  <form
                    onSubmit={onSubmit}
                    className="space-y-5"
                  >

                    {/* NAME + PHONE */}
                    <div className="grid sm:grid-cols-2 gap-5">

                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-black text-[#5ed7e5] uppercase tracking-wider mb-2"
                        >
                          Full Name
                        </label>

                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          autoComplete="name"
                          className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition-all focus:border-[#5ed7e5] focus:ring-2 focus:ring-[#5ed7e5]/20"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-black text-[#5ed7e5] uppercase tracking-wider mb-2"
                        >
                          Phone Number
                        </label>

                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          required
                          autoComplete="tel"
                          className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition-all focus:border-[#5ed7e5] focus:ring-2 focus:ring-[#5ed7e5]/20"
                          placeholder="(631) 505-3200"
                        />
                      </div>

                    </div>

                    {/* DATE + TIME */}
                    <div className="grid sm:grid-cols-2 gap-5">

                      <div>
                        <label
                          htmlFor="date"
                          className="block text-xs font-black text-[#5ed7e5] uppercase tracking-wider mb-2"
                        >
                          Date
                        </label>

                        <input
                          type="date"
                          name="date"
                          id="date"
                          required
                          className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white outline-none transition-all focus:border-[#5ed7e5] focus:ring-2 focus:ring-[#5ed7e5]/20"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="time"
                          className="block text-xs font-black text-[#5ed7e5] uppercase tracking-wider mb-2"
                        >
                          Time
                        </label>

                        <input
                          type="time"
                          name="time"
                          id="time"
                          required
                          className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white outline-none transition-all focus:border-[#5ed7e5] focus:ring-2 focus:ring-[#5ed7e5]/20"
                        />
                      </div>

                    </div>

                    {/* GUESTS */}
                    <div>

                      <label
                        htmlFor="guests"
                        className="block text-xs font-black text-[#5ed7e5] uppercase tracking-wider mb-2"
                      >
                        Number of Guests
                      </label>

                      <select
                        name="guests"
                        id="guests"
                        defaultValue="1-2"
                        className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white outline-none transition-all focus:border-[#5ed7e5] focus:ring-2 focus:ring-[#5ed7e5]/20"
                      >
                        <option value="1-2" className="text-black">
                          1-2 People
                        </option>

                        <option value="3-4" className="text-black">
                          3-4 People
                        </option>

                        <option value="5-6" className="text-black">
                          5-6 People
                        </option>

                        <option value="7-8" className="text-black">
                          7-8 People
                        </option>
                      </select>

                    </div>

                    {/* MESSAGE */}
                    <div>

                      <label
                        htmlFor="message"
                        className="block text-xs font-black text-[#5ed7e5] uppercase tracking-wider mb-2"
                      >
                        Special Requests
                        <span className="text-slate-500 ml-1 normal-case">
                          Optional
                        </span>
                      </label>

                      <textarea
                        name="message"
                        id="message"
                        rows="3"
                        className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 outline-none resize-none transition-all focus:border-[#5ed7e5] focus:ring-2 focus:ring-[#5ed7e5]/20"
                        placeholder="Birthday celebration, booth preference, etc."
                      />

                    </div>

                    {/* HONEYPOT */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      className="hidden"
                      style={{ display: 'none' }}
                    />

                    {/* SUBMIT */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-gold w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting
                        ? 'SENDING REQUEST...'
                        : 'REQUEST RESERVATION'}
                    </button>

                    {/* RESULT */}
                    {result && (
                      <div
                        className={`p-4 rounded-xl text-center font-bold text-sm ${
                          result.includes('Success')
                            ? 'bg-green-500/15 text-green-300 border border-green-500/30'
                            : result.includes('Error') ||
                              result.includes('error')
                            ? 'bg-red-500/15 text-red-300 border border-red-500/30'
                            : 'bg-white/10 text-slate-200 border border-white/10'
                        }`}
                        role="status"
                        aria-live="polite"
                      >
                        {result}
                      </div>
                    )}

                  </form>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          EXPERIENCE
      ===================================================== */}
      <section className="section section-white">

        <div className="site-container">

          <div className="max-w-3xl mx-auto text-center mb-14">

            <span className="section-kicker">
              The RipTides Experience
            </span>

            <h2 className="section-title mt-4">
              More Than Just A Night Out
            </h2>

            <div className="brand-line mx-auto my-6" />

            <p className="section-description mx-auto">
              There's always a reason to stay a little longer.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {experiences.map((experience) => (
              <article
                key={experience.label}
                className="card group hover:-translate-y-1 transition-transform duration-300"
              >

                <div className="text-4xl mb-6 transition-transform duration-300 group-hover:scale-110 origin-left">
                  {experience.icon}
                </div>

                <span className="section-kicker text-[#008fa8]">
                  {experience.label}
                </span>

                <h3 className="text-xl font-black text-[#06283d] mt-3 mb-3 leading-tight">
                  {experience.title}
                </h3>

                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {experience.description}
                </p>

              </article>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          PRIVATE EVENTS CTA
      ===================================================== */}
      <section
        id="private-events"
        className="section section-navy"
      >

        <div className="site-container">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#001c32] border border-white/10 px-6 py-16 sm:px-12 lg:px-20 text-center shadow-2xl">

            {/* DECORATIVE GLOW */}
            <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#008fa8]/20 blur-3xl" />

            <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#5ed7e5]/10 blur-3xl" />

            <div className="relative z-10 max-w-4xl mx-auto">

              <span className="gold-badge">
                Private Events
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mt-6">
                Make Your Next Celebration
                <br className="hidden sm:block" />
                <span className="text-[#5ed7e5]">
                  {' '}A RipTides Night
                </span>
              </h2>

              <p className="text-[#5ed7e5] font-bold text-lg mt-5">
                Your Guests. Your Music. Our Space.
              </p>

              <p className="text-slate-300 font-medium text-lg leading-relaxed max-w-2xl mx-auto mt-6">
                Planning something special? RipTides offers a relaxed
                setting for birthdays, celebrations, corporate gatherings,
                and other private events. Our team can help you put
                together the right food, drinks, entertainment, and setup
                for your group.
              </p>

              {/* FEATURES */}
              <div className="flex flex-wrap justify-center gap-3 mt-9">

                {[
                  '3-Hour Private Party',
                  'Buffet Options',
                  'Passed Appetizers',
                  'Bar Options',
                  'DJ & Dancing',
                  'Flexible Setup',
                ].map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white"
                  >
                    <span className="text-[#5ed7e5]">✓</span>
                    {feature}
                  </span>
                ))}

              </div>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

                <Link
                  to="/contact"
                  className="btn-gold min-w-[210px]"
                >
                  PLAN YOUR EVENT
                </Link>

                <a
                  href="tel:6315053200"
                  className="btn-secondary min-w-[210px]"
                >
                  CALL (631) 505-3200
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          ORDER CTA
      ===================================================== */}
      <section className="bg-[#f7f4ec] pb-20">

        <div className="site-container">

          <div className="border-t border-slate-200 pt-14 text-center">

            <span className="section-kicker">
              Hungry Yet?
            </span>

            <h2 className="section-title-sm mt-3">
              Make It A Full RipTides Experience
            </h2>

            <p className="section-description max-w-xl mx-auto mt-3">
              Grab a table, order your favorites, and settle in for a
              great night.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-7">

              <a
                href={TOAST_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                ORDER ONLINE
              </a>

              <Link
                to="/menu"
                className="btn-secondary border-[#06283d] text-[#06283d] hover:bg-[#06283d] hover:text-white"
              >
                VIEW MENU
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}