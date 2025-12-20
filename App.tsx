import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { SectionId } from './types.ts';
import { Youtube, Instagram, Mail, Menu, X, PlayCircle, BookOpen, Wind, ChevronDown, Play, Globe } from 'lucide-react';
import PlantOracle from './components/PlantOracle.tsx';
import SymbioticWeb from './components/SymbioticWeb.tsx';
import RelaxationChart from './components/RelaxationChart.tsx';
import YouTubeSection from './components/YouTubeSection.tsx';
import Research from './src/pages/Research.tsx';
import { LINKS } from './src/config/links.ts';

// --- Home Page Component ---
const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle anchor scrolling on mount or location change
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      {/* Hero Section */}
      <section id={SectionId.HOME} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Complex Overlay for Depth */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/id/28/1920/1080"
            alt="Ancient Forest Sanctuary"
            className="w-full h-full object-cover"
          />
          {/* Gradients to ensure text readability */}
          <div className="absolute inset-0 bg-sanctuary-dark/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-sanctuary-dark via-transparent to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-sanctuary-dark/80 via-transparent to-sanctuary-dark/80"></div>
        </div>

        {/* We Are The Ark Badge - Banner Corner */}
        <a href={LINKS.WE_ARE_THE_ARK} target="_blank" rel="noreferrer" className="absolute top-24 right-4 md:right-10 z-20 group animate-fade-in delay-700">
          <div className="bg-sanctuary-earth/40 backdrop-blur-md border border-sanctuary-sage/50 p-2 md:p-3 rounded-lg flex items-center gap-3 hover:bg-sanctuary-earth/60 transition-colors shadow-lg">
            <div className="w-10 h-10 rounded-full border border-sanctuary-gold flex items-center justify-center bg-sanctuary-dark/50">
              <span className="font-serif font-bold text-[8px] text-center leading-none text-sanctuary-gold">WE ARE<br />THE ARK</span>
            </div>
            <div className="hidden md:block text-left">
              <div className="text-[10px] text-sanctuary-mist/70 uppercase tracking-widest font-bold">Official Supporter</div>
              <div className="text-xs text-sanctuary-mist font-serif italic">Rewilding our world</div>
            </div>
          </div>
        </a>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl pt-16">
          <div className="mb-6 flex justify-center animate-fade-in-up">
            <div className="px-4 py-1 border border-sanctuary-gold/50 rounded-full bg-sanctuary-dark/30 backdrop-blur-md">
              <span className="text-sanctuary-gold text-xs font-bold uppercase tracking-[0.2em]">The Channel @TheSanctuaryofSleep</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-sanctuary-mist mb-6 leading-tight animate-fade-in-up delay-100 drop-shadow-2xl">
            Awaiting Upon Betty and<br />
            Lou the Guardians
          </h1>

          <p className="text-lg md:text-2xl text-sanctuary-mist/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up delay-200 drop-shadow-lg">
            A convergence of the old world and modern wellness.
            <br className="hidden md:block" />
            Rejoining the symbiotic bonds between plant and person.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-300">
            <a
              href={`#${SectionId.JOURNEYS}`}
              className="group relative bg-sanctuary-gold text-sanctuary-dark px-10 py-4 rounded overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              <div className="relative z-10 flex items-center gap-3 font-serif font-bold text-lg">
                <Play fill="currentColor" size={20} /> Watch Latest Ritual
              </div>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </a>

            <a
              href={`#${SectionId.ORACLE}`}
              className="text-sanctuary-mist hover:text-white border-b border-sanctuary-mist/30 hover:border-white pb-1 transition-all font-serif italic text-lg"
            >
              Speak with Grace &rarr;
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-sanctuary-mist/50">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Mission Section */}
      <section id={SectionId.MISSION} className="py-24 bg-sanctuary-dark relative border-b border-sanctuary-sage/20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <SymbioticWeb />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-serif text-sanctuary-mist mb-6 border-l-4 border-sanctuary-gold pl-6">
              Ecological Civilization & <br /> The Symbiotic Bond
            </h2>
            <p className="text-sanctuary-mist/70 mb-6 leading-relaxed">
              We are all about rejoining the bonds of our symbiotic partners back into sight. People have become blind to the energies that plants and humans share consciously.
            </p>
            <p className="text-sanctuary-mist/70 mb-6 leading-relaxed">
              Plants are crucial for human survival, providing nutrition, warmth, clothing, and shelter, as well as the air that we breathe. They enhance our environment, enriching our lives and increasing our wellbeing.
            </p>
            <p className="text-sanctuary-leaf italic font-serif text-lg">
              "We must conserve and safeguard their future to create an ecological civilization."
            </p>
          </div>
        </div>
      </section>

      {/* Journeys (YouTube) Section */}
      <section id={SectionId.JOURNEYS} className="bg-sanctuary-dark relative">
        <YouTubeSection />
      </section>

      {/* Offerings Section */}
      <section id={SectionId.OFFERINGS} className="py-24 bg-sanctuary-earth/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-sanctuary-mist mb-4">Our Offerings</h2>
            <div className="w-24 h-1 bg-sanctuary-gold mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-sanctuary-dark border border-sanctuary-sage/30 p-8 rounded-lg hover:border-sanctuary-gold transition-colors duration-500">
              <div className="w-14 h-14 bg-sanctuary-earth/50 rounded-full flex items-center justify-center mb-6 group-hover:bg-sanctuary-gold group-hover:text-sanctuary-dark transition-colors duration-500 text-sanctuary-gold">
                <BookOpen size={28} />
              </div>
              <h3 className="text-2xl font-serif text-sanctuary-mist mb-4">Biblical & Ancient Botanicals</h3>
              <p className="text-sanctuary-mist/60 leading-relaxed mb-6">
                Exploring the heritage of plants that have healed and soothed for millennia. From the cleansing power of Hyssop to the grounding wisdom of Frankincense.
              </p>
            </div>
            <div className="group bg-sanctuary-dark border border-sanctuary-sage/30 p-8 rounded-lg hover:border-sanctuary-gold transition-colors duration-500 relative transform md:-translate-y-4 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-sanctuary-gold"></div>
              <div className="w-14 h-14 bg-sanctuary-earth/50 rounded-full flex items-center justify-center mb-6 group-hover:bg-sanctuary-gold group-hover:text-sanctuary-dark transition-colors duration-500 text-sanctuary-gold">
                <PlayCircle size={28} />
              </div>
              <h3 className="text-2xl font-serif text-sanctuary-mist mb-4">The Sleepy Narrative</h3>
              <p className="text-sanctuary-mist/60 leading-relaxed mb-6">
                Story-driven ambient sessions designed to lower your heart rate and quiet the "inner noise." Meticulously researched 2-hour journeys.
              </p>
            </div>
            <div className="group bg-sanctuary-dark border border-sanctuary-sage/30 p-8 rounded-lg hover:border-sanctuary-gold transition-colors duration-500">
              <div className="w-14 h-14 bg-sanctuary-earth/50 rounded-full flex items-center justify-center mb-6 group-hover:bg-sanctuary-gold group-hover:text-sanctuary-dark transition-colors duration-500 text-sanctuary-gold">
                <Wind size={28} />
              </div>
              <h3 className="text-2xl font-serif text-sanctuary-mist mb-4">Aromatherapy for the Ears</h3>
              <p className="text-sanctuary-mist/60 leading-relaxed mb-6">
                Soundscapes crafted to evoke the scent and spirit of a living apothecary. Bridging the gap between historical narrative and modern wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Oracle Section */}
      <section id={SectionId.ORACLE} className="py-24 bg-sanctuary-dark relative overflow-hidden border-t border-sanctuary-sage/20">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" className="text-sanctuary-sage" fill="currentColor" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <PlantOracle />
        </div>
      </section>

      {/* Science/Data Section */}
      <section id={SectionId.SCIENCE} className="py-24 bg-sanctuary-earth/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif text-sanctuary-mist mb-6">The Science of Deep Rest</h2>
              <p className="text-sanctuary-mist/70 mb-6 leading-relaxed">
                Plant scientists must work together to ensure the survival of these crucial organisms. We not only tell stories; we measure the impact of ancient wisdom on modern physiology.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-sanctuary-gold rounded-full"></span>
                  <span className="text-sanctuary-mist/80">Lowered Heart Rate Variability</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-sanctuary-gold rounded-full"></span>
                  <span className="text-sanctuary-mist/80">Reduction in Cognitive Noise</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-sanctuary-gold rounded-full"></span>
                  <span className="text-sanctuary-mist/80">Enhanced Mental Clarity</span>
                </li>
              </ul>
              <Link
                to={LINKS.RESEARCH}
                className="text-sanctuary-gold border-b border-sanctuary-gold pb-1 hover:text-white hover:border-white transition-all"
              >
                Read the Research
              </Link>
            </div>
            <div>
              <RelaxationChart />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// --- Layout Component (Nav & Footer) ---
const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: SectionId) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-sanctuary-dark text-sanctuary-mist font-sans selection:bg-sanctuary-leaf selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-sanctuary-dark/95 border-b border-sanctuary-sage/30 shadow-lg py-3' : 'bg-gradient-to-b from-black/80 to-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick(SectionId.HOME)}>
            <img src="/logo-small.jpg" alt="Sanctuary of Sleep" className="w-9 h-9 rounded-full border border-sanctuary-gold object-cover" />
            <div className="text-xl md:text-2xl font-serif text-sanctuary-mist tracking-widest">
              SANCTUARY<span className="text-sanctuary-gold">OF</span>SLEEP
            </div>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            {Object.values(SectionId).map((id) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="text-xs tracking-[0.15em] font-bold uppercase text-sanctuary-mist/80 hover:text-sanctuary-gold transition-colors"
              >
                {id}
              </button>
            ))}
            <a href={LINKS.YOUTUBE_CHANNEL} target="_blank" rel="noreferrer" className="bg-sanctuary-gold text-sanctuary-dark px-4 py-1.5 rounded text-xs tracking-widest font-bold hover:bg-white transition-colors">
              SUBSCRIBE
            </a>
          </div>

          <button className="md:hidden text-sanctuary-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-sanctuary-dark border-b border-sanctuary-sage/50 p-6 flex flex-col gap-4 animate-fade-in shadow-2xl">
            {Object.values(SectionId).map((id) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="text-left text-lg tracking-widest uppercase hover:text-sanctuary-gold border-b border-sanctuary-earth/30 pb-2"
              >
                {id}
              </button>
            ))}
          </div>
        )}
      </nav>

      <Outlet />

      {/* Footer */}
      <footer className="bg-black pt-12 border-t border-sanctuary-sage/30">
        <div className="container mx-auto px-6">

          <div className="flex flex-col items-center justify-center border-b border-sanctuary-sage/20 pb-8 mb-8 text-center">
            <Globe className="text-sanctuary-gold mb-3 w-6 h-6" />
            <p className="text-sanctuary-mist/80 font-serif italic mb-3 text-lg">
              "Let’s give half of our gardens back to the wild."
            </p>
            <a
              href={LINKS.WE_ARE_THE_ARK}
              target="_blank"
              rel="noreferrer"
              className="text-sanctuary-gold hover:text-white transition-colors uppercase tracking-[0.15em] text-sm font-bold border-b border-transparent hover:border-white pb-1"
            >
              Build your own Ark at wearetheark.org
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-12">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-serif text-sanctuary-gold mb-2">Sanctuary of Sleep</h4>
              <p className="text-sanctuary-sage text-sm">Step into the sanctuary. Let the plants remember for you.</p>
            </div>

            <div className="flex gap-6">
              <a href={LINKS.YOUTUBE_CHANNEL} target="_blank" rel="noreferrer" className="text-sanctuary-mist hover:text-sanctuary-gold transition-colors">
                <Youtube size={24} />
              </a>
              <a href={LINKS.INSTAGRAM} target="_blank" rel="noreferrer" className="text-sanctuary-mist hover:text-sanctuary-gold transition-colors">
                <Instagram size={24} />
              </a>
              <a href={LINKS.EMAIL_MAILTO} className="text-sanctuary-mist hover:text-sanctuary-gold transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>
          <div className="pb-8 text-center text-xs text-sanctuary-sage">
            &copy; {new Date().getFullYear()} Sanctuary of Sleep. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="research" element={<Research />} />
      </Route>
    </Routes>
  );
};

export default App;