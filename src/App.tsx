import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Sparkles, Cpu } from "lucide-react";

// Import core sub-modules
import ThreeCanvas from "./components/ThreeCanvas";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Customizer from "./components/Customizer";
import Menu from "./components/Menu";
import Experiences from "./components/Experiences";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Reservations from "./components/Reservations";
import Footer from "./components/Footer";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing sensory grid...");

  // Premium loader timeline simulation
  useEffect(() => {
    const textSteps = [
      "Calibrating micro-atmospheric pressure pods...",
      "Configuring acoustic levitation node parameters...",
      "Tricured nitrogen roasting diagnostic...",
      "Opening 24K liquid gold emulsion chambers...",
      "Velora sensory terminals online."
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      setLoadingPercent((prev) => {
        const next = prev + 1;
        
        // Stagger load text indicators
        if (next === 25) {
          setLoadingText(textSteps[1]);
        } else if (next === 50) {
          setLoadingText(textSteps[2]);
        } else if (next === 75) {
          setLoadingText(textSteps[3]);
        } else if (next === 95) {
          setLoadingText(textSteps[4]);
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
          }, 400); // graceful extra break
          return 100;
        }
        return next;
      });
    }, 18);

    return () => clearInterval(interval);
  }, []);

  // Set up scroll tracker mapping (0.0 to 1.0)
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const pct = window.scrollY / scrollHeight;
        setScrollProgress(pct);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // First trigger
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* LAUNCHING LOADER SEQUENCE */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="velora-main-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#0c0908] z-55 flex flex-col items-center justify-center p-6 select-none"
          >
            {/* Ambient background particles */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(98,54,24,0.14),transparent_65%)] pointer-events-none" />

            <div className="space-y-6 text-center max-w-sm w-full relative">
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="h-16 w-16 rounded-full border border-dashed border-gold-300/30 flex items-center justify-center relative"
                >
                  <Compass className="h-6 w-6 text-gold-300 animate-pulse" />
                  <span className="absolute inset-2 rounded-full border border-gold-450/15" />
                </motion.div>
              </div>

              <div className="space-y-2">
                <h1 className="font-display text-xs uppercase tracking-ultra font-bold text-gold-450">
                  VELORA COFFEE
                </h1>
                <p className="font-sans text-[10px] text-espresso-300 uppercase tracking-widest font-mono">
                  SENSORY CALIBRATION SYSTEM
                </p>
              </div>

              {/* Loader percentage indicators */}
              <div className="space-y-3 pt-6">
                <div className="flex justify-between text-[9px] font-mono text-espresso-400">
                  <span className="text-left font-bold truncate pr-3 select-none">
                    {loadingText}
                  </span>
                  <span>{loadingPercent}%</span>
                </div>

                <div className="w-full h-[1.5px] bg-white/[0.03] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gold-450"
                    style={{ width: `${loadingPercent}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
              </div>

              <div className="flex justify-center text-[8px] font-mono text-espresso-450 gap-4 pt-4">
                <span>// INTENSITY: ULTRA-PREMIUM</span>
                <span>•</span>
                <span>TYO // DXB</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE EXPERIENCE INSIDE VIEWPORT */}
      {!loading && (
        <motion.div
          key="velora-core-world"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative min-h-screen bg-[#0c0908] text-espresso-100 selection:bg-gold-500 selection:text-black overflow-x-hidden"
        >
          {/* STATIC BACKGROUND RENDERING CHASSIS */}
          {/* The WebGL Canvas floats behind standard structural content layouts, utilizing CSS absolute boundaries. */}
          <ThreeCanvas scrollProgress={scrollProgress} />

          {/* SENSORY ELEMENTS OVERVIEW PANEL */}
          <Navbar />
          
          {/* Audio synthetics player toggle */}
          <AudioPlayer />

          {/* MAIN CHRONICLE DECKS */}
          <main className="relative z-20">
            <Hero />
            <Customizer />
            <Menu />
            <Experiences />
            <Gallery />
            <Testimonials />
            <Reservations />
          </main>

          {/* FOOTER */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}
