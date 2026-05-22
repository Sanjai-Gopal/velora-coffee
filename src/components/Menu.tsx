import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Eye, Coffee, Zap, Layers, Milestone, Utensils, Heart } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  category: "brews" | "patisserie";
  price: string;
  shortDesc: string;
  fullDesc: string;
  pairingNotes: string;
  details: { temp: string; ph: string; caffeine: string; goldRatio: string };
  sensoryNotes: string[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "hyperion-nitro",
    name: "Hyperion Cryo Drip",
    category: "brews",
    price: "$28",
    shortDesc: "48-hour cold extract charged with premium molecular nitrogen. Subtle bergamot & pine.",
    fullDesc: "Our signature cryogenic extraction cold brew. Beans are dropped to -78°C inside anaerobic vessels. Poured through custom glass towers, creating a creamy head of fine cascade bubbles. Spritzed with cold-distilled organic orange blossom.",
    pairingNotes: "Pairs elegantly with our Cryohaven Yuzu Brioche Tart.",
    details: { temp: "4°C", ph: "5.4 pH", caffeine: "140mg", goldRatio: "N/A" },
    sensoryNotes: ["Acidity", "Bright Citrus", "Pine Needles"],
  },
  {
    id: "gold-geisha",
    name: "24K Liquid Geisha",
    category: "brews",
    price: "$45",
    shortDesc: "Panamanian Geisha extract poured over a gold-leaf cylinder. Edible saffron finish.",
    fullDesc: "The pinnacle of liquid gold craftsmanship. Double espresso pull of the rarest Panamanian Geisha bean, cascaded directly over a hand-carved ice sphere dusted with pure 24-karat gold flakes. Complemented by saffron-infused syrup.",
    pairingNotes: "Suggested pairing: Hand-spun Iranian Pistachio Croissant.",
    details: { temp: "68°C", ph: "5.1 pH", caffeine: "95mg", goldRatio: "8.5mg" },
    sensoryNotes: ["Deep Jasmine", "Sweet Peach", "Precious Gold"],
  },
  {
    id: "smoked-nebula",
    name: "Nebula Wood Latte",
    category: "brews",
    price: "$19",
    shortDesc: "Double ristretto over organic macadamia milk, smoked with applewood vapor.",
    fullDesc: "A comforting but highly theatrical brew. High-altitude Kenyan beans extracted as an intense short ristretto, blended into silky macadamia cream milk. Served under a solid hand-blown glass bell-jar filled with dense cold-pressed applewood vapor.",
    pairingNotes: "Excellent alongside the dark chocolate Infused Matcha Truffle Dome.",
    details: { temp: "62°C", ph: "5.8 pH", caffeine: "110mg", goldRatio: "1.0mg" },
    sensoryNotes: ["Velvet Smoke", "Toasted Pecan", "Creamy Cocoa"],
  },
  {
    id: "cryo-sphere-mocha",
    name: "Cryogenic Mocha Dome",
    category: "brews",
    price: "$22",
    shortDesc: "Molten cylinder of raw cocoa, melted on-table by double Geisha espresso stream.",
    fullDesc: "Bespoke chocolate-coffee ritual. An intricate hollow sphere crafted from Venezuelan raw organic chocolate sits proudly in a modern slate goblet. Hand-poured hot coffee melts the vault in front of you, spilling cream-infusions.",
    pairingNotes: "Grooms perfectly with the botanical Lavender mist.",
    details: { temp: "72°C", ph: "5.2 pH", caffeine: "120mg", goldRatio: "2.0mg" },
    sensoryNotes: ["Molten Cacao", "Vanilla Bean", "Toffee Crunch"],
  },
  {
    id: "gold-croissant",
    name: "Gold Spun Pistachio Croissant",
    category: "patisserie",
    price: "$20",
    shortDesc: "36-hour laminated pastry, rich Bronte pistachio paste, hand-spun golden curls.",
    fullDesc: "An architectural marvel of baking. French Charentes-Poitou butter is layered 81 times with volcanic wheat flour. Injected with a velvety, unroasted paste of Bronte pistachios, and crowned with hand-gilded caramel curls.",
    pairingNotes: "Exceptional accompaniment to a warm espresso setup.",
    details: { temp: "Warm", ph: "N/A", caffeine: "0mg", goldRatio: "4.5mg" },
    sensoryNotes: ["Butter Shards", "Nuts", "Toasted Caramel"],
  },
  {
    id: "yuzu-tart",
    name: "Cryohaven Yuzu Tart",
    category: "patisserie",
    price: "$18",
    shortDesc: "Ultra-crisp cocoa shell with frozen yuzu cream, torched lime meringue shards.",
    fullDesc: "A tangy sensory explosion. Saronno shortbread tartlet base containing a pristine citrus layer, decorated with a molecular freeze-dried yuzu gel sphere, lime zest meringue clouds, and a faint spray of ginger vapor.",
    pairingNotes: "Intensifies citrus undertones of the Hyperion Cold Drip.",
    details: { temp: "Chilled", ph: "3.2 pH", caffeine: "0mg", goldRatio: "N/A" },
    sensoryNotes: ["Zesty Yuzu", "Ginger Zing", "Lime Cloud"],
  },
  {
    id: "matcha-dome",
    name: "Uji Matcha Truffle Dome",
    category: "patisserie",
    price: "$24",
    shortDesc: "Ceremonial Kyoto matcha cream inside a dark chocolate velvet shell, frozen in dry ice.",
    fullDesc: "Kyoto meets Dubai. An outer velvet sphere of Belgian dark chocolate, cracked open to show an incredibly fluffy cold matcha mousse. Sits in a pool of hot raspberry syrup, releasing dense misty dry-ice cedar vapor on table.",
    pairingNotes: "Elevates the earthy basalt roasted Geisha bean beautifully.",
    details: { temp: "Sub-Zero", ph: "N/A", caffeine: "15mg", goldRatio: "N/A" },
    sensoryNotes: ["Earthy Umami", "Dark Berry Sour", "Velvet Ganache"],
  }
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState<"brews" | "patisserie">("brews");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(MENU_ITEMS[0]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="velora-curated-menu" className="relative py-28 px-4 md:px-8 border-b border-gold-200/5 bg-[#0A0A0A]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(58,26,16,0.1),transparent_65%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-gold-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" /> FLAVOR ARCHITECTURE
            </span>
            <h2 className="font-editorial text-4xl md:text-5xl text-gold-50 tracking-tight leading-none">
              The Curated Masterpieces
            </h2>
          </div>

          {/* TAB CHASSIS */}
          <div className="inline-flex p-1.5 bg-espresso-950/40 border border-gold-400/15 rounded-full backdrop-blur">
            <button
              id="menu-tab-brews"
              onClick={() => setActiveTab("brews")}
              className={`px-6 py-2 rounded-full font-display text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === "brews"
                  ? "bg-gold-400 text-espresso-950"
                  : "text-espresso-300 hover:text-gold-200"
              }`}
            >
              <Coffee className="h-3.5 w-3.5" /> Liquid Reserve
            </button>
            <button
              id="menu-tab-patisserie"
              onClick={() => setActiveTab("patisserie")}
              className={`px-6 py-2 rounded-full font-display text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === "patisserie"
                  ? "bg-gold-400 text-espresso-950"
                  : "text-espresso-300 hover:text-gold-200"
              }`}
            >
              <Utensils className="h-3.5 w-3.5" /> Prestige Patisserie
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* MENU CARDS COLUMN (7-cols) */}
          <div className="lg:col-span-7 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const isActive = selectedItem?.id === item.id;
                const isFav = favorites.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    id={`menu-card-item-${item.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    onClick={() => setSelectedItem(item)}
                    className={`group relative p-6 rounded-2xl glass-panel-light border transition-all duration-500 cursor-pointer flex flex-col md:flex-row md:items-center md:justify-between gap-6 overflow-hidden ${
                      isActive
                        ? "border-gold-400/40 bg-gold-400/[0.03] shadow-[0_0_20px_rgba(188,130,49,0.05)]"
                        : "border-white/5 hover:border-gold-300/15"
                    }`}
                  >
                    {/* Glowing highlight trace */}
                    <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-gold-300/60 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                    <div className="space-y-2 max-w-md">
                      <div className="flex items-center gap-3">
                        <h3 className="font-editorial text-xl font-bold text-gold-50 tracking-wide group-hover:text-gold-300 transition-colors duration-300">
                          {item.name}
                        </h3>
                        {item.details.goldRatio !== "N/A" && (
                          <div className="flex items-center gap-0.5 py-0.5 px-1.5 border border-gold-300/30 bg-gold-400/10 rounded text-[8px] font-mono uppercase text-gold-300 font-bold">
                            <Sparkles className="h-2.5 w-2.5 animate-pulse" /> Gold Dust
                          </div>
                        )}
                      </div>
                      <p className="font-sans text-xs text-espresso-200 line-clamp-2">
                        {item.shortDesc}
                      </p>
                      
                      {/* Taste particles tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.sensoryNotes.map((note, nIdx) => (
                          <span
                            key={nIdx}
                            className="text-[9px] font-mono text-espresso-400 bg-white/[0.02] border border-white/5 py-0.5 px-2 rounded-full"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                      <span className="font-display text-xl font-bold text-gold-300 tracking-wide">
                        {item.price}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          id={`menu-btn-fav-${item.id}`}
                          onClick={(e) => toggleFavorite(item.id, e)}
                          className="p-2 border border-white/5 hover:border-gold-400/20 hover:bg-gold-400/5 rounded-full transition-all cursor-pointer"
                          aria-label="Add to favorites"
                        >
                          <Heart
                            className={`h-4 w-4 transition-colors ${
                              isFav ? "fill-gold-400 text-gold-400" : "text-espresso-300 group-hover:text-gold-200"
                            }`}
                          />
                        </button>
                        <div className="p-2 border border-white/5 bg-white/[0.01] rounded-full text-espresso-400 group-hover:text-gold-300 transition-colors">
                          <Eye className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* EXTENDED DISPLAY PANEL (Right: 5-cols) */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              {selectedItem ? (
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel p-8 rounded-3xl space-y-6 overflow-hidden relative"
                >
                  {/* Glass layout mesh grids */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(188,130,49,0.12),transparent_70%)] pointer-events-none" />

                  <div className="flex justify-between items-start border-b border-white/5 pb-4">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-gold-450 flex items-center gap-1">
                        <Zap className="h-3 w-3" /> COFFEE FORMULA INDEX
                      </span>
                      <h3 className="font-editorial text-2xl font-bold text-gold-100 mt-1">
                        {selectedItem.name}
                      </h3>
                    </div>
                    <span className="font-display text-2xl font-bold text-gold-300 tracking-wide mt-2">
                      {selectedItem.price}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-mono text-espresso-400">
                        Culinary Concept
                      </span>
                      <p className="font-sans text-xs text-espresso-100 leading-relaxed">
                        {selectedItem.fullDesc}
                      </p>
                    </div>

                    {/* MOLECULAR SPECIFICATIONS */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {[
                        { label: "Volumetric Temp", value: selectedItem.details.temp },
                        { label: "Acidity Index", value: selectedItem.details.ph },
                        { label: "Active Caffeine", value: selectedItem.details.caffeine },
                        { label: "Suspended Gold", value: selectedItem.details.goldRatio },
                      ].map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-black/30 border border-white/5 p-3 rounded-xl flex flex-col justify-center"
                        >
                          <span className="text-[8px] font-mono uppercase text-espresso-400 leading-none mb-1">
                            {spec.label}
                          </span>
                          <span className="text-xs font-mono font-bold text-gold-200">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Dynamic Pairing card */}
                    <div className="border border-gold-300/10 bg-gold-450/[0.01] p-4 rounded-xl flex items-start gap-3">
                      <div className="p-1.5 h-6 w-6 mt-0.5 rounded bg-gold-500/10 text-gold-300 flex items-center justify-center font-mono text-[10px] font-bold">
                        ★
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-gold-400 uppercase">pairing recommendation</span>
                        <p className="font-sans text-[10px] text-espresso-200 leading-normal">
                          {selectedItem.pairingNotes}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-6">
                    <button
                      id={`order-instant-${selectedItem.id}`}
                      onClick={() => alert(`Enjoy a custom table ritual of ${selectedItem.name}. Ready for smart-wallet checkout.`)}
                      className="w-full bg-gold-400 hover:bg-gold-500 text-espresso-950 font-display text-xs font-bold uppercase tracking-[0.2em] py-3.5 px-6 rounded-xl transition-all duration-300 cursor-pointer shadow-md active:scale-98"
                    >
                      ORDER TO PRIVATE DECK
                    </button>
                    <div className="flex justify-center mt-3 gap-4 text-[9px] font-mono text-espresso-400">
                      <span>✓ IN-LOUNGE PAIRING</span>
                      <span>•</span>
                      <span>✓ CRYOCURED TABLE RITUAL</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
                  <p className="text-espresso-300 font-mono text-xs">
                    Select a curated marvel from the list to analyze molecular properties.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
