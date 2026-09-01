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

export default function Events() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending your request...");

    const formData = new FormData(event.target);
    formData.append("access_key", "995ed907-5485-4119-8eb8-4f3502fd0d8c");
    formData.append(
      "subject",
      "New Table Reservation from RipTides Website"
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult(
          "Success! Your reservation request has been sent. We will contact you shortly to confirm."
        );
        event.target.reset();
      } else {
        setResult("Error: " + data.message);
      }
    } catch (error) {
      setResult(
        "An error occurred while sending. Please try calling us instead."
      );
    }

    setIsSubmitting(false);
  };

  const events = [
    {
      image: Event1,
      day: "Fri",
      date: "24",
      type: "Live Music",
      typeClass: "bg-cyan-100 text-[#0093b2]",
      title: "The South Shore Boys",
      details: "Classic Rock & Blues • 8:00 PM",
      description:
        "Grab a drink, order something from the grill, and enjoy a night of live local music.",
      alt: "Live music event at RipTides Cocktails & Grill in Lindenhurst, NY",
    },
    {
      image: Event2,
      day: "Sat",
      date: "25",
      type: "Karaoke",
      typeClass: "bg-purple-100 text-purple-700",
      title: "Karaoke Night",
      details: "Live Karaoke • 9:00 PM",
      description:
        "Take the stage, sing your favorite songs, and enjoy a night of music and good times.",
      alt: "Karaoke night event at RipTides Cocktails & Grill in Lindenhurst, NY",
    },
    {
      image: Event3,
      day: "Sun",
      date: "26",
      type: "Specials",
      typeClass: "bg-orange-100 text-orange-700",
      title: "Foodball Is Back",
      details: "Food • Drinks • Sports",
      description:
        "Relax with friends, catch the game, and make Sunday your favorite day of the week.",
      alt: "Football at RipTides Cocktails & Grill in Lindenhurst, NY",
    },
    {
      image: Event4,
      day: "Fri",
      date: "31",
      type: "Prize",
      typeClass: "bg-cyan-100 text-[#0093b2]",
      title: "Trivia Night",
      details: "Test your Knowledge • After 7:00 PM",
      description:
        "Enjoy great food, drinks, and Trivia Night in the relaxed RipTides atmosphere.",
      alt: "Trivia night at RipTides Cocktails & Grill in Lindenhurst, NY",
    },
    {
      image: Event5,
      day: "Sat",
      date: "01",
      type: "Special Event",
      typeClass: "bg-orange-100 text-orange-700",
      title: "BINGO Night",
      details: "Food • Drinks • Entertainment",
      description:
        "Bring your friends and enjoy another great night of food, drinks, music, and fun.",
      alt: "BINGO Night at RipTides Cocktails & Grill in Lindenhurst, NY",
    },
  ];

  return (
    <div className="bg-white text-black flex flex-col pb-12">
      <SEO
        title="RipTides Events & Live Music | Lindenhurst, NY"
        description="See what is happening at RipTides Cocktails & Grill in Lindenhurst, NY, including live music, karaoke, sports, special events and private parties."
        path="/events"
        image={outdoor}
      />

      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-slate-200 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src={outdoor}
            alt="RipTides Cocktails & Grill outdoor area and events"
            width="1600"
            height="1000"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-[#001428]/85"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full flex flex-col items-center space-y-6 py-20 mt-10">
          <div className="text-cyan-300 text-sm font-black uppercase tracking-[0.2em] drop-shadow-md">
            Good Times Are Always On The Horizon
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight drop-shadow-lg">
            Reservations & <br className="hidden sm:block" />
            Live Events
          </h1>

          <p className="text-slate-200 text-lg sm:text-xl max-w-2xl drop-shadow font-medium leading-relaxed">
            Book your table for a casual dinner, enjoy live local music, sing
            along at karaoke, or plan your next celebration at RipTides.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <a
              href="#upcoming-events"
              className="bg-[#0093b2] hover:bg-[#007a94] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1"
            >
              VIEW UPCOMING EVENTS
            </a>

            <a
              href="#private-events"
              className="bg-white hover:bg-slate-100 text-[#001428] font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1"
            >
              PLAN A PRIVATE EVENT
            </a>
          </div>

          <div className="pt-8 text-slate-300 text-xs sm:text-sm font-bold tracking-widest uppercase">
            Live Music • Karaoke • Sports • Private Parties • Special Events
          </div>
        </div>
      </section>

      {/* SECTION 2 — UPCOMING EVENTS */}
      <section
        id="upcoming-events"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full"
      >
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-black text-black">
            What's Happening at RipTides
          </h2>

          <h3 className="text-xl text-[#0093b2] font-bold">
            There's always something going on.
          </h3>

          <p className="text-slate-600 font-medium text-lg">
            Whether you're stopping by for dinner, meeting friends for drinks,
            or looking for a night out, our events keep the week interesting
            and the weekend even better.
          </p>
        </div>

        {/* EVENT GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((eventItem, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group overflow-hidden"
            >
              {/* EVENT IMAGE */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 bg-slate-200">
                <img
                  src={eventItem.image}
                  alt={eventItem.alt}
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* DATE + TYPE */}
              <div className="flex items-start justify-between mb-6 gap-4">
                <div className="bg-[#001428] text-white text-center p-3 rounded-2xl min-w-[80px] shadow-md group-hover:bg-[#0093b2] transition-colors">
                  <div className="text-sm font-bold uppercase text-cyan-300 group-hover:text-white">
                    {eventItem.day}
                  </div>

                  <div className="text-2xl font-black">
                    {eventItem.date}
                  </div>
                </div>

                <span
                  className={`${eventItem.typeClass} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-right`}
                >
                  {eventItem.type}
                </span>
              </div>

              {/* EVENT CONTENT */}
              <h3 className="text-2xl font-black text-black mb-2">
                {eventItem.title}
              </h3>

              <p className="text-slate-500 text-sm font-bold mb-4">
                {eventItem.details}
              </p>

              <p className="text-slate-600 mb-8 font-medium">
                {eventItem.description}
              </p>

              <Link
                to="/contact"
                className="text-[#0093b2] font-bold hover:text-[#001428] transition-colors flex items-center gap-2"
              >
                VIEW EVENT <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2.5 — RESERVATION FORM */}
      <section className="bg-slate-100 border-y border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-4xl font-black text-black mb-4">
                Book Your Table
              </h2>

              <p className="text-slate-600 font-medium text-lg leading-relaxed">
                Planning a dinner out or wanting to guarantee a spot for the
                game? Fill out the form to secure your table. For parties
                larger than 8, please call us directly.
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-300 h-80">
              <img
                src={photo4}
                alt="RipTides Cocktails & Grill neon bar lighting"
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="bg-[#001428] p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-700 text-white order-1 lg:order-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0093b2] rounded-bl-full opacity-20"></div>

            <h3 className="text-3xl font-black mb-8 text-white relative z-10">
              Reserve a Spot
            </h3>

            <form
              onSubmit={onSubmit}
              className="space-y-5 relative z-10"
            >
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold text-cyan-300 tracking-wider uppercase"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="phone"
                    className="text-xs font-bold text-cyan-300 tracking-wider uppercase"
                  >
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300 transition-colors"
                    placeholder="(631) 505-3200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label
                    htmlFor="date"
                    className="text-xs font-bold text-cyan-300 tracking-wider uppercase"
                  >
                    Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="time"
                    className="text-xs font-bold text-cyan-300 tracking-wider uppercase"
                  >
                    Time
                  </label>

                  <input
                    type="time"
                    name="time"
                    id="time"
                    required
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="guests"
                  className="text-xs font-bold text-cyan-300 tracking-wider uppercase"
                >
                  Number of Guests
                </label>

                <select
                  name="guests"
                  id="guests"
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300 transition-colors"
                >
                  <option value="1-2">1-2 People</option>
                  <option value="3-4">3-4 People</option>
                  <option value="5-6">5-6 People</option>
                  <option value="7-8">7-8 People</option>
                </select>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="text-xs font-bold text-cyan-300 tracking-wider uppercase"
                >
                  Special Requests (Optional)
                </label>

                <textarea
                  name="message"
                  id="message"
                  rows="3"
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300 transition-colors"
                  placeholder="Celebrating a birthday, prefer a booth, etc."
                ></textarea>
              </div>

              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ffb116] hover:bg-[#e59e13] disabled:opacity-50 disabled:cursor-not-allowed text-black font-black text-lg py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] mt-4"
              >
                {isSubmitting ? "Sending..." : "Request Reservation"}
              </button>

              {result && (
                <div
                  className={`mt-4 p-4 rounded-xl text-center font-bold text-sm ${
                    result.includes("Success")
                      ? "bg-green-500/20 text-green-300 border border-green-500/50"
                      : "bg-red-500/20 text-red-300 border border-red-500/50"
                  }`}
                >
                  {result}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE RIPTIDES EXPERIENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full text-center">
        <h2 className="text-4xl sm:text-5xl font-black text-black mb-4">
          More Than Just a Night Out
        </h2>

        <p className="text-slate-600 font-medium text-lg mb-16 max-w-2xl mx-auto">
          There's always a reason to stay a little longer.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">
              🎸
            </div>

            <div className="text-xs font-bold text-[#0093b2] uppercase tracking-wider mb-2">
              Live Music
            </div>

            <h4 className="text-xl font-black text-black mb-3">
              Local talent. Great atmosphere.
            </h4>

            <p className="text-slate-600 text-sm font-medium">
              Enjoy live performances from local musicians and bands while you
              dine, drink, and hang out with friends.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">
              🎤
            </div>

            <div className="text-xs font-bold text-[#0093b2] uppercase tracking-wider mb-2">
              Karaoke
            </div>

            <h4 className="text-xl font-black text-black mb-3">
              Your stage. Your song. Your night.
            </h4>

            <p className="text-slate-600 text-sm font-medium">
              Grab the mic and sing your favorite songs during our high-energy
              karaoke nights.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">
              🍻
            </div>

            <div className="text-xs font-bold text-[#0093b2] uppercase tracking-wider mb-2">
              Game Days
            </div>

            <h4 className="text-xl font-black text-black mb-3">
              Big games. Cold drinks. Good company.
            </h4>

            <p className="text-slate-600 text-sm font-medium">
              Catch your favorite teams while enjoying food, drinks, and the
              energy of the RipTides crowd.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">
              🎉
            </div>

            <div className="text-xs font-bold text-[#0093b2] uppercase tracking-wider mb-2">
              Private Events
            </div>

            <h4 className="text-xl font-black text-black mb-3">
              Make your next event one to remember.
            </h4>

            <p className="text-slate-600 text-sm font-medium">
              Birthdays, celebrations, gatherings, and private events can be
              hosted right here at RipTides.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — PRIVATE EVENTS CTA */}
      <section
        id="private-events"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full"
      >
        <div className="bg-[#001428] rounded-[2.5rem] p-8 sm:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-[#0093b2] rounded-full blur-3xl opacity-20"></div>

          <div className="absolute bottom-[-50%] right-[-10%] w-96 h-96 bg-[#0093b2] rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Make Your Next Celebration
              <br className="hidden sm:block" /> a RipTides Night
            </h2>

            <h3 className="text-xl text-cyan-300 font-bold mb-8">
              Your Guests. Your Music. Our Space.
            </h3>

            <p className="text-slate-300 font-medium text-lg mb-12 max-w-2xl mx-auto">
              Planning something special? RipTides offers a relaxed setting
              for birthdays, celebrations, corporate gatherings, and other
              private events. Our team can help you put together the right
              food, drinks, entertainment, and setup for your group.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                "3-Hour Private Party",
                "Buffet Options",
                "Passed Appetizers",
                "Bar Options",
                "DJ & Dancing",
                "Flexible Setup",
              ].map((feature, i) => (
                <span
                  key={i}
                  className="bg-slate-800/50 border border-slate-700 text-white px-5 py-2 rounded-full text-sm font-bold shadow-sm"
                >
                  ✓ {feature}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/contact"
                className="bg-[#ffb116] hover:bg-[#e59e13] text-black font-black text-base px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto"
              >
                PLAN YOUR EVENT
              </Link>

              <a
                href="tel:6315053200"
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto"
              >
                CALL (631) 505-3200
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}