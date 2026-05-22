import { motion } from "motion/react";
import { Compass, Sparkles, MoveDown, Star, Play, Mic } from "lucide-react";

export default function Hero() {
  const scrollDown = () => {
    const el = document.getElementById("velora-brew-lab");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="velora-hero-deck"
      className="relative min-h-screen w-full flex items-center justify-center p-6 md:p-12 overflow-hidden border-b border-white/[0.03] bg-[#0A0A0A]"
    >
      {/* BACKGROUND ATMOSPHERE */}
      <div className="absolute inset-0 hero-glow pointer-events-none opacity-60" />
      <div className="absolute top-[-10%] right-[-15%] w-[600px] h-[600px] bg-[#2C1810] rounded-full blur-[160px] opacity-25 pointer-events-none"></div>

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.85)] z-20"></div>

      {/* Hero Content Grid (12-cols) */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-25 pt-20 pb-16">
        
        {/* LEFT COLUMN: BRANDING & PRODUCT STATEMENT (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-6 text-left select-none">
          {/* Glowing Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/5 rounded-full w-fit"
          >
            <Sparkles className="h-3 w-3 text-[#C5A059] animate-spin-slow" />
            <span className="font-sans text-[8px] md:text-[9px] font-bold uppercase tracking-[0.25em] text-[#C5A059]">
              The Signature Blend
            </span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="font-serif text-4xl md:text-5xl font-light text-white leading-tight"
            >
              Ethereal<br />
              <span className="italic gold-gradient">Obsidian</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-xs md:text-[13px] leading-relaxed text-[#D9C5B2]/70 border-l border-[#C5A059]/30 pl-4"
            >
              A cinematic journey of flavor. Sourced from high-altitude volcanic oil, roasted in complete acoustic isolation for 72 hours down to absolute molecular homeostasis.
            </motion.p>
          </div>

          {/* Tasting Notes (Immersive Style Glass Card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="glass p-5 rounded-md inline-block w-fit"
          >
            <div className="text-[9px] uppercase tracking-[0.2em] mb-2.5 text-[#D9C5B2]/40 font-mono">
              Sensory Notes
            </div>
            <div className="flex gap-4 items-end text-sm text-[#D9C5B2]">
              <span className="font-serif">Dark Cocoa</span>
              <span className="w-px h-3.5 bg-[#C5A059]/30 mb-0.5"></span>
              <span className="font-serif">Black Orchid</span>
              <span className="w-px h-3.5 bg-[#C5A059]/30 mb-0.5"></span>
              <span className="font-serif">Smoke</span>
            </div>
          </motion.div>
        </div>

        {/* CENTER COLUMN: ACTIVE THREE CANVAS PORTAL & FOCUS INDICATOR (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center min-h-[220px] lg:min-h-[400px] relative">
          
          {/* Real-time floating indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-4 lg:bottom-10 glass px-5 py-3 rounded-full flex items-center gap-3 shadow-lg z-30"
          >
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest text-[#D9C5B2] font-mono">
              Scroll to Craft
            </span>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: CURATED EXPERIENCE EDITIONS & CTA ACTIONS (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-6 select-none relative z-20">
          
          {/* Editions List */}
          <div className="space-y-4">
            {[
              { num: "EDITION 01", title: "Midnight Gold Pour", price: "$42.00" },
              { num: "EDITION 02", title: "Cloud Velvet Latte", price: "$28.00" },
              { num: "EDITION 03", title: "Truffle Cold Brew", price: "$36.00" },
            ].map((edition, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.15 }}
                className="flex justify-between items-end border-b border-white/10 pb-3 hover:border-gold-300/20 transition-all cursor-pointer group"
              >
                <div>
                  <div className="text-[8px] uppercase tracking-widest text-[#D9C5B2]/40 mb-1 font-mono">
                    {edition.num}
                  </div>
                  <div className="text-base text-white font-serif group-hover:text-[#C5A059] transition-colors">
                    {edition.title}
                  </div>
                </div>
                <div className="text-xs font-mono text-[#C5A059] font-semibold">{edition.price}</div>
              </motion.div>
            ))}
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-2">
            <button
              id="hero-launch-brew-btn"
              onClick={() => {
                const el = document.getElementById("velora-brew-lab");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full py-4 bg-[#C5A059] text-black font-mono text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all cursor-pointer shadow-lg active:scale-98 flex items-center justify-center gap-2"
            >
              <Compass className="h-4 w-4 animate-spin-slow" />
              THE BREW LAB
            </button>
            
            <button
              id="hero-quick-explore-btn"
              onClick={() => {
                const el = document.getElementById("velora-curated-menu");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full py-3.5 border border-white/10 text-white font-mono text-[10px] uppercase tracking-[0.3em] font-semibold hover:border-[#C5A059] hover:bg-white/5 transition-all text-center cursor-pointer"
            >
              THE FULL MENU
            </button>
          </div>

          {/* Stat strips */}
          <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 text-center">
            {[
              { val: "2200m", label: "HIGH CROPS" },
              { val: "CRYOCURE", label: "ROAST PATENT" },
              { val: "TYO/DXB", label: "LIVESTREAM" },
            ].map((stat, sIdx) => (
              <div key={sIdx} className="space-y-0.5">
                <span className="text-xs font-bold text-[#C5A059] font-mono block">
                  {stat.val}
                </span>
                <p className="text-[7px] font-mono uppercase text-[#D9C5B2]/40 leading-none">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Floating coordinates indicator (bottom left) */}
      <div className="absolute bottom-6 left-6 md:left-12 hidden lg:flex items-center gap-2 text-[8px] font-mono tracking-widest text-[#D9C5B2]/30 z-30">
        <span>CROP ALTITUDE OPTIMUM [2200m]</span>
        <span>•</span>
        <span>LATITUDE 35.672° N</span>
      </div>

      {/* Mouse indicator scroll down hint (bottom right) */}
      <button
        onClick={scrollDown}
        id="scroll-down-hint-btn"
        className="absolute bottom-6 right-6 md:right-12 text-[#C5A059] hover:text-white flex flex-col items-center gap-1.5 transition-colors cursor-pointer z-35 font-mono text-[8px] uppercase tracking-widest"
        aria-label="Scroll down to coffee molecular customizer"
      >
        <span>SCROLL FOR DEPTH</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="p-1 h-7 w-4.5 border border-[#C5A059]/30 rounded-full flex justify-center"
        >
          <span className="w-1 h-1 rounded-full bg-[#C5A059] block" />
        </motion.div>
      </button>
    </section>
  );
}
