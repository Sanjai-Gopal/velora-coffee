import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, ArrowRight, ArrowLeft } from "lucide-react";

interface Critique {
  quote: string;
  author: string;
  role: string;
  source: string;
  location: string;
}

const CRITIQUES: Critique[] = [
  {
    quote: "The most complex sensory alignment I've ever witnessed. Velora's custom acoustic coffee chambers feel less like a normal coffee house and more like a high-end temple of liquid art.",
    author: "Vivienne Vance",
    role: "Global Design Director",
    source: "Aesthetic Spatial Magazine",
    location: "Tokyo Off-Shoot",
  },
  {
    quote: "A culinary miracle. Their levitation roasting eliminates metal heat taint altogether, achieving pristine flavor clarity. The 24k Gold emulsion Geisha sets a new global benchmark.",
    author: "Chef Kenjiro Sato",
    role: "Michelin 3-Star Sensory Inspector",
    source: "The Grand Gastronomist",
    location: "Kyoto Base",
  },
  {
    quote: "Merging molecular extraction pressures with binaural soundscapes under an organic glass dome is pure poetry. They've effectively transformed caffeine into an ethereal spiritual ritual.",
    author: "Marcus Al-Mansoori",
    role: "Luxury Portfolio Curator",
    source: "Sovereign Dubai Curator Guild",
    location: "Dubai Marina Solarium",
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prevIdx) => (prevIdx === 0 ? CRITIQUES.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setIndex((prevIdx) => (prevIdx === CRITIQUES.length - 1 ? 0 : prevIdx + 1));
  };

  return (
    <section id="velora-literary-reviews" className="relative py-28 px-4 md:px-8 border-b border-gold-200/5 bg-[#0A0A0A]">
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(58,26,16,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-20">
        <div className="text-center space-y-3 mb-10">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-gold-450 font-mono">
            ★ LITERARY REVIEWS
          </span>
          <h2 className="font-editorial text-4xl md:text-5xl text-gold-50 tracking-tight">
            The Sovereign Critique
          </h2>
        </div>

        <div className="relative glass-panel rounded-3xl p-8 md:p-14 border border-gold-300/10 shadow-lg overflow-hidden min-h-[300px] flex flex-col justify-between">
          <Quote className="absolute top-8 left-8 h-12 w-12 text-gold-300/10 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <p className="font-editorial text-2xl md:text-3xl font-light text-gold-100 italic leading-snug tracking-wide">
                "{CRITIQUES[index].quote}"
              </p>

              <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-display text-xs uppercase font-bold text-gold-300 tracking-wider">
                    {CRITIQUES[index].author}
                  </h4>
                  <p className="text-[10px] text-espresso-300 font-mono">
                    {CRITIQUES[index].role} — <span className="italic">{CRITIQUES[index].source}</span>
                  </p>
                </div>
                
                <span className="text-[9px] font-mono uppercase bg-white/[0.02] border border-white/5 py-1 px-3.5 rounded-full text-espresso-400">
                  {CRITIQUES[index].location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CONTROL SWITCHES */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={prev}
              id="critique-prev-btn"
              className="h-10 w-10 border border-white/5 hover:border-gold-400/30 hover:bg-gold-500/5 rounded-full flex items-center justify-center text-espresso-300 hover:text-gold-300 transition-all cursor-pointer select-none"
              aria-label="Previous review"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              id="critique-next-btn"
              className="h-10 w-10 border border-white/5 hover:border-gold-400/30 hover:bg-gold-500/5 rounded-full flex items-center justify-center text-espresso-300 hover:text-gold-300 transition-all cursor-pointer select-none"
              aria-label="Next review"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
