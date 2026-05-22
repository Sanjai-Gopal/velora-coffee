import React, { useState } from "react";
import { Compass, Mail, ArrowRight, Instagram, Sparkles, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="velora-chronology-footer" className="relative bg-[#0c0908] border-t border-gold-200/5 pt-24 pb-12 px-6 md:px-12 overflow-hidden z-20">
      
      {/* Background shadow mask */}
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(188,130,49,0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative">
        
        {/* UPPER ROW: NEWSLETTER & INSTAGRAM SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* VIP Registry Formulation (5-cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-400 flex items-center gap-1.5 font-bold">
              <Sparkles className="h-3 w-3 animate-pulse" /> THE MEMBER REGISTRY
            </span>
            <h3 className="font-editorial text-3xl font-light text-gold-100 leading-tight">
              Sign the Velora Ledger
            </h3>
            <p className="font-sans text-xs text-espresso-200 max-w-sm leading-relaxed">
              Register your micro-communications terminal to receive sovereign notifications, private single-origin drops, and private lounge invitations.
            </p>

            <form onSubmit={handleSubscribe} className="relative max-w-md pt-2">
              {subscribed ? (
                <div className="flex items-center gap-2 text-gold-300 font-mono text-xs py-3 border-b border-gold-400/30">
                  <Check className="h-4.5 w-4.5 text-gold-500 animate-bounce" /> CREDENTIALS ADDED TO RECIPIENT ROTATOR.
                </div>
              ) : (
                <div className="relative">
                  <input
                    required
                    type="email"
                    placeholder="ENTER REGISTERED EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 focus:border-gold-400 py-3.5 pr-10 text-xs font-mono text-white tracking-widest focus:outline-none transition-colors placeholder:text-espresso-450 uppercase"
                  />
                  <button
                    type="submit"
                    id="newsletter-subscribe-btn"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-espresso-300 hover:text-gold-200 p-2 transition-colors cursor-pointer"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* INSTAGRAM INTENSIVE SHOWCASE FEED (7-cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-[10px] uppercase tracking-widest text-espresso-300 flex items-center gap-1.5 font-mono">
                <Instagram className="h-4 w-4 text-gold-300" /> INSTAGRAM SHOWCASE // @VELORACOFFEE
              </span>
              <span className="text-[9px] font-mono text-espresso-400">04 ATOMIC FEEDS</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: "feed-1", title: "CROP SEED", path: "/src/assets/images/hero_espresso_1779428973163.png" },
                { id: "feed-2", title: "LAB DIODES", path: "/src/assets/images/brewing_lab_1779428992820.png" },
                { id: "feed-3", title: "ARCH DECK", path: "/src/assets/images/lounge_interior_1779429015580.png" },
                { id: "feed-4", title: "GOLD CRUST", path: "/src/assets/images/hero_espresso_1779428973163.png" },
              ].map((feed, fIdx) => (
                <div
                  key={feed.id}
                  className="rounded-2xl overflow-hidden aspect-square relative border border-white/5 bg-black/40 group cursor-pointer"
                  onClick={() => alert(`Redirecting sovereign credentials to Instagram frame...`)}
                >
                  <img
                    src={feed.path}
                    alt={feed.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-55 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-85 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-100 group-hover:opacity-0 transition-opacity" />
                  <span className="absolute bottom-2.5 left-2.5 text-[8px] font-mono tracking-widest text-gold-400/80 group-hover:text-gold-200">
                    #{feed.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: DETAILED PHYSICAL COORDINATES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-white/5 pt-12 text-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 font-bold font-display text-[10px] uppercase tracking-widest text-gold-450">
              <Compass className="h-3.5 w-3.5" /> VELORA COFFEE
            </div>
            <p className="font-sans text-[11px] text-espresso-300 leading-relaxed font-light">
              Bespoke coffee formulations, acoustic levitation roasting, luxury spatial atmospheres. Pure molecular liquid gold design parameters.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-display font-semibold text-[10px] uppercase tracking-widest text-gold-300">SHIBUYA GINZA LAB</h4>
            <p className="font-mono text-[10px] text-espresso-300 space-y-1">
              <span>Chome Ginza, Tokyo Core</span> <br />
              <span>35.672° N, 139.764° E</span> <br />
              <span className="text-[9px] text-espresso-400">AM 08:00 – PM 23:00</span>
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-display font-semibold text-[10px] uppercase tracking-widest text-gold-300">DUBAI MARINA PIER</h4>
            <p className="font-mono text-[10px] text-espresso-300 space-y-1">
              <span>Marina Water Edge, Dubai</span> <br />
              <span>25.081° N, 55.136° E</span> <br />
              <span className="text-[9px] text-espresso-400">AM 07:00 – AM 02:00</span>
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-display font-semibold text-[10px] uppercase tracking-widest text-gold-300">PRIVATE SECRETS</h4>
            <p className="font-mono text-[10px] text-espresso-300 space-y-1">
              <span className="hover:text-gold-300 cursor-pointer block transition-colors">Hotline: +971 (4) 990 000</span>
              <span className="hover:text-gold-300 cursor-pointer block transition-colors">Digital Vault: vault@velora.com</span>
              <span className="text-gold-300 block">✓ CRYPTO-CHECKOUTS OK</span>
            </p>
          </div>
        </div>

        {/* BOTTOM ROW: ROMAN BRAND SILHOUETTE */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-espresso-400 gap-4">
          <p className="tracking-wide">
            © {new Date().getFullYear()} VELORA COFFEE SYSTEM INC. ALL PARAMETERS REGISTERED.
          </p>
          
          <div className="flex gap-4">
            <span className="hover:text-gold-300 cursor-pointer transition-colors">REGULAR VETTINGS</span>
            <span>•</span>
            <span className="hover:text-gold-300 cursor-pointer transition-colors">ATOMIC STANDARDS</span>
            <span>•</span>
            <span className="hover:text-gold-300 cursor-pointer transition-colors">PRIVACY BY PROTOCOL</span>
          </div>
        </div>

        {/* HUGE GOTHIC LETTERING */}
        <div className="text-center w-full select-none pt-4 pointer-events-none opacity-[0.012]">
          <h1 className="font-editorial text-[9rem] md:text-[14rem] font-bold text-white leading-none letter-tracking-ultra">
            VELORA
          </h1>
        </div>
      </div>
    </footer>
  );
}
