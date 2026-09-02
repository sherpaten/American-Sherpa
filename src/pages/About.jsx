import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

import outdoor from '../assets/outdoor.webp';
import restaurantphoto3 from '../assets/restaurentphoto3.webp';
import restaurantphoto5 from '../assets/restaurantphoto5.webp';
import restaurantphoto6 from '../assets/restaurantphoto6.webp';

export default function About() {
  return (
    <div className="bg-[#F7F4EC] text-[#06283D] flex flex-col">

      <SEO
        title="About RipTides Cocktails & Grill | Lindenhurst, NY"
        description="Learn about RipTides Cocktails & Grill in Lindenhurst, NY — a neighborhood destination for great food, drinks, live music and community gatherings."
        path="/about"
        image={outdoor}
      />

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="relative min-h-[58vh] flex items-center overflow-hidden">

        <div className="absolute inset-0">
          <img
            src={outdoor}
            alt="RipTides Cocktails & Grill exterior"
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
          />

          <div className="absolute inset-0 bg-[#06283D]/75" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#06283D]/90 via-[#06283D]/60 to-transparent" />
        </div>

        <div className="site-container relative z-10 py-24">

          <div className="max-w-3xl">

            <span className="section-kicker text-[#5ED7E5]">
              Welcome to the Neighborhood
            </span>

            <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-[-0.04em] text-white">
              About
              <br />
              <span className="text-[#5ED7E5]">RipTides</span>
            </h1>

            <div className="brand-line mt-7" />

            <p className="mt-7 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/80">
              Great food, cold drinks, and a place where everyone feels like
              a regular.
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          OUR STORY
          ===================================================== */}

      <section className="section section-cream">

        <div className="site-container">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Text */}

            <div className="order-2 lg:order-1">

              <span className="section-kicker">
                Our Story
              </span>

              <h2 className="section-title mt-2">
                More Than Just
                <br />
                a Restaurant.
              </h2>

              <div className="brand-line mt-6" />

              <h3 className="mt-7 text-xl sm:text-2xl font-black text-[#008FA8]">
                We built RipTides for the community.
              </h3>

              <div className="section-copy space-y-5 max-w-xl">

                <p>
                  Located right on East Montauk Highway in Lindenhurst,
                  RipTides was created with a simple goal in mind: to be the
                  ultimate local hangout. We wanted to build a place where you
                  can grab a casual dinner with family, catch the game with
                  friends, or enjoy a great night out with live music.
                </p>

                <p>
                  We believe that great food shouldn't have to be complicated,
                  and a great bar shouldn't have to be pretentious. That's why
                  we focus on fresh ingredients, a welcoming atmosphere, and
                  genuine hospitality.
                </p>

              </div>

              <div className="mt-8">
                <Link
                  to="/menu"
                  className="btn-primary"
                >
                  SEE OUR MENU
                </Link>
              </div>

            </div>


            {/* Image */}

            <div className="order-1 lg:order-2">

              <div className="image-frame h-[420px] sm:h-[500px]">

                <img
                  src={restaurantphoto5}
                  alt="Inside RipTides bar and dining area"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06283D]/25 to-transparent pointer-events-none" />

              </div>

              {/* Decorative badge */}

              <div className="relative -mt-12 ml-6 sm:ml-10 w-fit">

                <div className="glass bg-[#06283D] text-white rounded-2xl px-6 py-4 shadow-xl">

                  <div className="text-[#F4B321] text-sm font-black uppercase tracking-widest">
                    Since Day One
                  </div>

                  <div className="mt-1 text-sm font-bold lowercase text-black">
                    Good food. Good people. Good times.
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ATMOSPHERE
          ===================================================== */}

      <section className="section section-white">

        <div className="site-container">

          <div className="max-w-3xl mb-14">

            <span className="section-kicker">
              The Experience
            </span>

            <h2 className="section-title mt-2">
              The RipTides
              <br />
              Atmosphere
            </h2>

            <div className="brand-line mt-6" />

            <p className="section-copy">
              A quick look at the spaces where good times happen every single
              week.
            </p>

          </div>


          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

            {/* Image 1 */}

            <div className="image-frame h-[360px] sm:h-[440px]">

              <img
                src={restaurantphoto6}
                alt="RipTides Cocktails & Grill atmosphere"
                loading="lazy"
                decoding="async"
              />

              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#06283D]/75 to-transparent">

                <span className="text-white text-sm font-bold uppercase tracking-widest">
                  Good Times
                </span>

              </div>

            </div>


            {/* Image 2 */}

            <div className="image-frame h-[360px] sm:h-[440px]">

              <img
                src={restaurantphoto3}
                alt="RipTides interior and seating"
                loading="lazy"
                decoding="async"
              />

              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#06283D]/75 to-transparent">

                <span className="text-white text-sm font-bold uppercase tracking-widest">
                  Your Local Spot
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          COMMUNITY
          ===================================================== */}

      <section className="section section-cream">

        <div className="site-container">

          <div className="max-w-4xl mx-auto text-center">

            <span className="section-kicker">
              Our Community
            </span>

            <h2 className="section-title mt-2">
              Proudly Serving
              <br />
              <span className="text-[#008FA8]">Lindenhurst</span>
            </h2>

            <div className="brand-line mt-7 mx-auto" />

            <p className="section-copy mx-auto mt-7 text-lg sm:text-xl">
              We are incredibly proud to be part of the vibrant South Shore
              community. Our staff, our musicians, and most importantly, our
              guests, all contribute to making RipTides a local landmark.
              Thank you for making us your destination for good times on
              Montauk Highway.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
          ===================================================== */}

      <section className="section pt-0">

        <div className="site-container">

          <div className="relative overflow-hidden rounded-[32px] bg-[#06283D] px-6 py-14 sm:px-12 sm:py-20 lg:px-20 text-center shadow-2xl">

            {/* Decorative circles */}

            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#008FA8]/20 blur-3xl" />

            <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#5ED7E5]/10 blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto">

              <span className="section-kicker text-[#5ED7E5]">
                Come See Us
              </span>

              <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white tracking-tight">
                Come Experience It
                <br className="hidden sm:block" />
                Yourself
              </h2>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/70">
                Stop by for happy hour, book a table for dinner, or join us
                this weekend for live entertainment. We can't wait to host
                you.
              </p>


              <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">

                <Link
                  to="/events"
                  className="btn-gold w-full sm:w-auto"
                >
                  BOOK A TABLE
                </Link>

                <Link
                  to="/contact"
                  className="btn-secondary w-full sm:w-auto"
                >
                  GET IN TOUCH
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}