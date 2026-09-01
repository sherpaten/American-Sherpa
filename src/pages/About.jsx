import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import outdoor from '../assets/outdoor.webp';
import restaurantphoto3 from '../assets/restaurentphoto3.webp'; // keeping exact asset filename
import restaurantphoto5 from '../assets/restaurantphoto5.webp';
import restaurantphoto6 from '../assets/restaurantphoto6.webp';

export default function About() {
  return (
    <div className="bg-white text-black flex flex-col">
      <SEO title="About RipTides Cocktails & Grill | Lindenhurst, NY" description="Learn about RipTides Cocktails & Grill in Lindenhurst, NY \u2014 a neighborhood destination for great food, drinks, live music and community gatherings." path="/about" image={outdoor} />
      
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden border-b border-slate-200 text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={outdoor} 
            alt="RipTides Grill Exterior" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#001428]/85"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full flex flex-col items-center space-y-6 py-20 mt-10">
          <div className="text-cyan-300 text-sm font-black uppercase tracking-[0.2em] drop-shadow-md">
            Welcome to the Neighborhood
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight drop-shadow-lg">
            About RipTides
          </h1>
          <p className="text-slate-200 text-lg sm:text-xl max-w-2xl drop-shadow font-medium leading-relaxed">
            Great food, cold drinks, and a place where everyone feels like a regular.
          </p>
        </div>
      </section>

      {/* SECTION 2 — OUR STORY (Split Layout using restaurantphoto5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-4xl sm:text-5xl font-black text-[#001428] leading-tight">
              More Than Just a Restaurant.
            </h2>
            <h3 className="text-xl text-[#0093b2] font-bold">
              We built RipTides for the community.
            </h3>
            
            <div className="space-y-4 text-slate-600 font-medium text-lg leading-relaxed">
              <p>
                Located right on East Montauk Highway in Lindenhurst, RipTides was created with a simple goal in mind: to be the ultimate local hangout. We wanted to build a place where you can grab a casual dinner with family, catch the game with friends, or enjoy a great night out with live music.
              </p>
              <p>
                We believe that great food shouldn't have to be complicated, and a great bar shouldn't have to be pretentious. That's why we focus on fresh ingredients, a welcoming atmosphere, and genuine hospitality.
              </p>
            </div>

            <div className="pt-6">
              <Link to="/menu" className="inline-block bg-[#0093b2] hover:bg-[#007a94] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
                SEE OUR MENU
              </Link>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 h-[400px] lg:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src={restaurantphoto5} 
              alt="Inside RipTides Bar and Dining" 
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#ffb116] rounded-full blur-2xl opacity-40 z-0"></div>
          </div>

        </div>
      </section>

      {/* SECTION 3 — ATMOSPHERE GALLERY (Using restaurantphoto6 & restaurentphoto3) */}
      <section className="bg-slate-50 border-y border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-black">The RipTides Atmosphere</h2>
            <p className="text-slate-600 font-medium text-lg">
              A quick look at the spaces where good times happen every single week.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-[2rem] overflow-hidden shadow-xl h-[350px] border border-slate-200">
              <img 
                src={restaurantphoto6} 
                alt="RipTides Atmosphere" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-[2rem] overflow-hidden shadow-xl h-[350px] border border-slate-200">
              <img 
                src={restaurantphoto3} 
                alt="RipTides Interior and Seating" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — COMMUNITY TEXT BLOCK */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-[#001428] mb-6">Proudly Serving Lindenhurst</h2>
        <div className="w-24 h-1 bg-[#0093b2] mx-auto mb-8 rounded-full"></div>
        <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
          We are incredibly proud to be part of the vibrant South Shore community. Our staff, our musicians, and most importantly, our guests, all contribute to making RipTides a local landmark. Thank you for making us your destination for good times on Montauk Highway.
        </p>
      </section>

      {/* SECTION 5 — FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        <div className="bg-[#001428] rounded-[2.5rem] p-10 sm:p-16 text-center shadow-2xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-[-30%] right-[-5%] w-80 h-80 bg-[#0093b2] rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-[-30%] left-[-5%] w-80 h-80 bg-[#0093b2] rounded-full blur-3xl opacity-20"></div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 relative z-10">Come Experience It Yourself</h2>
          <p className="text-slate-300 font-medium text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Stop by for happy hour, book a table for dinner, or join us this weekend for live entertainment. We can't wait to host you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <Link to="/events" className="bg-[#ffb116] hover:bg-[#e59e13] text-black font-black text-base px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto text-center">
              BOOK A TABLE
            </Link>
            <Link to="/contact" className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full sm:w-auto text-center">
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}