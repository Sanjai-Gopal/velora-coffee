import { useState, useEffect } from "react";
import { Compass, ShieldCheck, Clock, Radio, Volume2 } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [systime, setSystime] = useState("");
  const [coords, setCoords] = useState("GINZA.TYO // 35.672°N 139.764°E");

  useEffect(() => {
    // Dynamic scroll tracking
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    // Atomic system clock
    const updateClock = () => {
      const now = new Date();
      const utcTime = now.toISOString().replace("T", "  ").substring(0, 19);
      setSystime(utcTime + " UTC");
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const triggerScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      id="velora-core-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 px-6 md:px-12 flex items-center justify-between ${
        scrolled
          ? "bg-[rgba(12,9,8,0.7)] border-b border-gold-200/5 backdrop-blur-md py-3.5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* BRAND EMBLEM */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <Compass className="h-4.5 w-4.5 text-[#C5A059] group-hover:rotate-90 transition-transform duration-500" />
        <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] font-light text-white">
          VELORA
        </span>
      </div>

      {/* NAV HOVER LINKS */}
      <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.25em] font-light text-[#D9C5B2]/70">
        {[
          { label: "Brew Lab", target: "velora-brew-lab" },
          { label: "Curated Menu", target: "velora-curated-menu" },
          { label: "Experience", target: "velora-sensory-experience" },
          { label: "Private Lounge", target: "velora-private-booking" },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => triggerScrollTo(item.target)}
            className="hover:text-white transition-opacity uppercase cursor-pointer relative py-1 group font-sans font-light"
          >
            {item.label}
            {/* Elegant magnetic horizontal line */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#C5A059] group-hover:w-full transition-all duration-300" />
          </button>
        ))}
      </div>

      {/* ATOMIC COORDINATES & SYSTEM STATE & CLOCK */}
      <div className="flex items-center gap-6 text-[9px] font-mono text-espresso-300">
        <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-4">
          <div className="flex items-center gap-1.5 opacity-60">
            <span className="font-semibold">{systime}</span>
          </div>
          <span
            className="text-espresso-400 cursor-pointer hover:text-gold-300 transition-colors uppercase"
            onClick={() =>
              setCoords((prev) =>
                prev.includes("GINZA")
                  ? "MARINA.DXB // 25.081°N 55.136°E"
                  : "GINZA.TYO // 35.672°N 139.764°E"
              )
            }
          >
            {coords}
          </span>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-pulse shadow-[0_0_8px_#C5A059]"></span>
          <span className="text-[#C5A059] font-sans text-[10px] tracking-widest uppercase font-light">Live Status</span>
        </div>
      </div>
    </nav>
  );
}
