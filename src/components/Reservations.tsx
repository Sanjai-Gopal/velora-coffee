import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Sparkles, MapPin, Calendar, Clock, User, QrCode, ClipboardCheck } from "lucide-react";

export default function Reservations() {
  const [location, setLocation] = useState<"tokyo" | "dubai">("tokyo");
  const [deck, setDeck] = useState<"sensory-pod" | "brew-bar" | "solarium">("sensory-pod");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sensoryPref, setSensoryPref] = useState("floral-acidic");
  const [time, setTime] = useState("19:30");
  const [isBooked, setIsBooked] = useState(false);
  const [bookingHash, setBookingHash] = useState("");

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please provide sovereign credentials.");
      return;
    }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let hash = "VL-";
    for (let i = 0; i < 6; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setBookingHash(hash);
    setIsBooked(true);
  };

  return (
    <section id="velora-private-booking" className="relative py-28 px-4 md:px-8 bg-[#0A0A0A] border-b border-gold-200/5">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(98,54,24,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LOUNGE VISUAL BLOCK (Left: 5-cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="font-display text-xs uppercase tracking-[0.3em] text-gold-450 font-mono flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-gold-300" /> EXCLUSIVE REGISTRATION
              </span>
              <h2 className="font-editorial text-4xl md:text-5xl text-gold-50 tracking-tight leading-none">
                Sovereign Lounges
              </h2>
              <p className="font-sans text-xs md:text-sm text-espresso-200 leading-relaxed font-light">
                Private access is restricted to credentialed holders and pre-registered guests. Enjoy individual volumetric micro-climates, acoustic boundaries, and custom multi-sensory paring protocols.
              </p>
            </div>

            {/* Rendered Lounge Asset Card */}
            <div className="rounded-3xl overflow-hidden relative aspect-video border border-gold-300/10 group shadow-lg">
              <img
                src="/images/lounge_interior_1779429015580.png"
                alt="Velora Luxury Architectural Lounge Tokyo Ginza"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold-400" />
                <span className="font-mono text-[9px] tracking-widest text-gold-200 uppercase">
                  GINZA SITE // RESIDENCE SUITE
                </span>
              </div>
            </div>

            {/* Spec details lines */}
            <div className="space-y-2.5 font-mono text-[9px] text-espresso-400 border-t border-white/5 pt-4">
              <div className="flex justify-between">
                <span>VIP BARRIERS:</span>
                <span className="text-gold-300">ACTIVE [432HZ ACOUSTIC LOCK]</span>
              </div>
              <div className="flex justify-between">
                <span>DRESS CALIBER:</span>
                <span className="text-gold-300">MODERN MINIMAL / GOTHIC CHIC</span>
              </div>
            </div>
          </div>

          {/* FORM CHASSIS / PASS COMPONENT (Right: 7-cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!isBooked ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-panel p-6 md:p-10 rounded-[32px] border border-gold-300/10 space-y-6"
                >
                  <div className="border-b border-white/5 pb-4">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-gold-400">SIGNATURE REGISTRATION PORTAL</span>
                    <h3 className="font-editorial text-2xl font-bold text-gold-100">Request Custom Lounge Alignment</h3>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    
                    {/* Location toggle */}
                    <div className="grid grid-cols-2 gap-3 pb-2">
                      <button
                        type="button"
                        id="loc-tokyo-select"
                        onClick={() => setLocation("tokyo")}
                        className={`py-3 px-4 rounded-xl font-display text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                          location === "tokyo"
                            ? "bg-gold-500/10 border-gold-400 text-gold-200"
                            : "bg-black/20 border-white/5 text-espresso-300 hover:border-gold-300/10"
                        }`}
                      >
                        <MapPin className="h-3.5 w-3.5" /> TOKYO // GINZA CORE
                      </button>
                      <button
                        type="button"
                        id="loc-dubai-select"
                        onClick={() => setLocation("dubai")}
                        className={`py-3 px-4 rounded-xl font-display text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                          location === "dubai"
                            ? "bg-gold-500/10 border-gold-400 text-gold-200"
                            : "bg-black/20 border-white/5 text-espresso-300 hover:border-gold-300/10"
                        }`}
                      >
                        <MapPin className="h-3.5 w-3.5" /> DUBAI // MARINA PAVILION
                      </button>
                    </div>

                    {/* Zone selector */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-wider font-mono text-espresso-400">
                        Choose Sensory Deck Zone
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "sensory-pod", label: "Sensory Pod", fee: "$250" },
                          { id: "brew-bar", label: "Obsidian Bar", fee: "$150" },
                          { id: "solarium", label: "Glass Solarium", fee: "$200" },
                        ].map((z) => (
                          <button
                            key={z.id}
                            type="button"
                            id={`zone-seat-${z.id}`}
                            onClick={() => setDeck(z.id as any)}
                            className={`p-3 rounded-xl border transition-all text-center flex flex-col justify-center cursor-pointer ${
                              deck === z.id
                                ? "bg-espresso-950/40 border-gold-300/40 text-gold-300"
                                : "bg-black/15 border-white/5 text-espresso-450 hover:border-gold-350/5"
                            }`}
                          >
                            <span className="font-display text-[10px] font-bold uppercase tracking-wider">{z.label}</span>
                            <span className="font-mono text-[8px] text-espresso-400 mt-0.5">{z.fee} Commit</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider font-mono text-espresso-400">Guest Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-espresso-400" />
                          <input
                            required
                            type="text"
                            id="guest-raw-name"
                            placeholder="Sovereign Holder"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 py-3 pl-9 pr-4 rounded-xl text-xs font-sans text-white focus:outline-none focus:border-gold-400 transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider font-mono text-espresso-400">Communication Terminal</label>
                        <input
                          required
                          type="email"
                          id="guest-crypto-email"
                          placeholder="guest@velora.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-black/40 border border-white/5 py-3 px-4 rounded-xl text-xs font-sans text-white focus:outline-none focus:border-gold-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Micro parameters */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider font-mono text-espresso-400">Target Time</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-espresso-400" />
                          <input
                            type="time"
                            id="reserve-target-time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 py-3 pl-9 pr-4 rounded-xl text-xs font-sans text-white focus:outline-none focus:border-gold-200 focus:accent-gold-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider font-mono text-espresso-400">Sensory Tuning Preference</label>
                        <select
                          id="reserve-sensory-pref"
                          value={sensoryPref}
                          onChange={(e) => setSensoryPref(e.target.value)}
                          className="w-full bg-black/40 border border-white/5 py-3 px-3 rounded-xl text-xs font-sans text-gold-300 focus:outline-none focus:border-gold-400 transition-colors h-11"
                        >
                          <option value="floral-acidic" className="bg-espresso-950 text-gold-100">Bright Floral Geishas</option>
                          <option value="earthy-bold" className="bg-espresso-950 text-gold-100">Deep Earthy Volcanics</option>
                          <option value="gold-decaf" className="bg-espresso-950 text-gold-100">Low Caffeine Gilded Drops</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      id="action-submit-reservation"
                      className="w-full bg-gold-400 hover:bg-gold-500 text-espresso-950 font-display text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-xl transition-all duration-300 active:scale-98 shadow-md hover:shadow-gold-500/10 cursor-pointer mt-2"
                    >
                      REQUEST ENTRY EMBLEM
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="ticket"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-panel p-8 rounded-[32px] border border-gold-400/30 space-y-6 relative overflow-hidden"
                >
                  {/* Confetti golden glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,rgba(188,130,49,0.2),transparent_70%)] pointer-events-none" />

                  <div className="text-center space-y-2 pb-4 border-b border-dashed border-white/10">
                    <span className="font-display text-[9px] font-bold tracking-[0.3em] text-gold-400 uppercase">VELORA CREDENTIAL CARD</span>
                    <h3 className="font-editorial text-3xl font-light text-gold-50">Reservation Cleared</h3>
                    <p className="text-[10px] font-mono text-espresso-300 uppercase">ACCESS SECTOR: GINZA LOUNGE 3</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 text-center border-b border-dashed border-white/10 pb-6">
                    <div>
                      <p className="text-[8px] font-mono text-espresso-400 uppercase">MEMBER</p>
                      <p className="text-xs font-mono font-bold text-gold-200 mt-0.5 truncate">{name}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-mono text-espresso-400 uppercase">ALIGNED INDEX</p>
                      <p className="text-xs font-mono font-bold text-gold-200 mt-0.5 uppercase">{deck}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-mono text-espresso-400 uppercase">ARRIVAL COORDINATE</p>
                      <p className="text-xs font-mono font-bold text-gold-200 mt-0.5">{time}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-mono text-espresso-400 uppercase">ENTRY DECRYPTION</p>
                      <p className="text-xs font-mono font-bold text-gold-200 mt-0.5 text-gold-450">{bookingHash}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6 bg-black/40 border border-white/5 p-5 rounded-2xl">
                    <div className="bg-gold-100 p-2.5 rounded-xl border border-gold-400/10 flex items-center justify-center shadow-inner">
                      <QrCode className="h-16 w-16 text-black" />
                    </div>
                    <div className="space-y-1.5 text-left text-xs">
                      <p className="font-mono text-[9px] text-gold-400 uppercase flex items-center gap-1.5 font-bold">
                        <ClipboardCheck className="h-4.5 w-4.5 text-gold-500 animate-pulse" /> DIGITAL ACCESS EMBLEM GENERATED
                      </p>
                      <p className="font-sans text-espresso-200 leading-normal text-[11px] font-light">
                        This digital badge is loaded to your credential stack. Reveal this barcode near GINZA or DUBAI portal scanner upon arrival for physical resonance field bypass.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <button
                      id="close-ticket-reset-btn"
                      onClick={() => setIsBooked(false)}
                      className="border border-white/5 hover:border-white/10 text-espresso-300 hover:text-white font-display text-[10px] uppercase font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer"
                    >
                      BOOK ANOTHER DECKS
                    </button>
                    <button
                      id="save-pass-offline-btn"
                      onClick={() => alert("Credentials synced to offline storage block.")}
                      className="bg-gold-400 hover:bg-gold-500 text-espresso-950 font-display text-[11px] font-bold uppercase tracking-widest py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer"
                    >
                      SYNC TO SMART PASS
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
