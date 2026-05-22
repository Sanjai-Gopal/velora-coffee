import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Eye, Maximize2, Shield, CalendarDays } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  imgUrl: string;
  colSpan: string;
  ratio: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "lounge-interior",
    title: "Sovereign Solarium Suite",
    subtitle: "Tokyo Ginza Architectural Design",
    imgUrl: "/src/assets/images/lounge_interior_1779429015580.png",
    colSpan: "md:col-span-8",
    ratio: "aspect-[16/9]",
  },
  {
    id: "gilded-pour",
    title: "Atomic Crema Ripple",
    subtitle: "Liquid Gold Infusion",
    imgUrl: "/src/assets/images/hero_espresso_1779428973163.png",
    colSpan: "md:col-span-4",
    ratio: "aspect-square md:aspect-auto",
  },
  {
    id: "molecular-extraction",
    title: "The Cryo Extraction Grid",
    subtitle: "Bespoke Pressure Lab",
    imgUrl: "/src/assets/images/brewing_lab_1779428992820.png",
    colSpan: "md:col-span-4",
    ratio: "aspect-square md:aspect-auto",
  },
  {
    id: "sensory-alignment",
    title: "The Dubai Marina Pavilion",
    subtitle: "Acoustic Reflection Lounge",
    imgUrl: "/src/assets/images/lounge_interior_1779429015580.png", // reusing interior with mirror blur
    colSpan: "md:col-span-8",
    ratio: "aspect-[16/9]",
  }
];

export default function Gallery() {
  const [fullscreenItem, setFullscreenItem] = useState<GalleryItem | null>(null);

  return (
    <section id="velora-immersive-gallery" className="relative py-28 px-4 md:px-8 bg-[#0A0A0A] border-b border-gold-200/5">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] radial-glow-gold pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-gold-450 font-mono">
            ★ VISUAL ARCHITECTURE
          </span>
          <h2 className="font-editorial text-4xl md:text-5xl text-gold-50 tracking-tight leading-none">
            The Immersion Grid
          </h2>
          <p className="font-sans text-xs md:text-sm text-espresso-300 uppercase letter-tracking-cinematic max-w-lg">
            Glimpse into our physical and culinary campuses across GINZA, TOKYO and MARINA, DUBAI.
          </p>
        </div>

        {/* BENTO GRID OF PICTURES */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`${item.colSpan} ${item.ratio} relative rounded-3xl overflow-hidden group glass-panel border border-white/5 cursor-pointer`}
              onClick={() => setFullscreenItem(item)}
            >
              {/* Core Image inside container */}
              <img
                src={item.imgUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter saturate-[0.85] brightness-[0.85]"
              />

              {/* Gold gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090605] via-[rgba(9,6,5,0.15)] to-transparent opacity-85" />

              {/* Text metadata bottom overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="space-y-1 select-none">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gold-400">
                    {item.subtitle}
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-gold-50 group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="p-3 border border-white/10 hover:border-gold-300/40 rounded-full bg-black/60 text-espresso-300 group-hover:text-gold-300 transition-colors">
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>

              {/* Static compass visual element top left */}
              <div className="absolute top-4 left-4 bg-black/40 border border-white/5 text-xs font-mono text-espresso-400 py-1 px-3.5 rounded-full select-none">
                {idx % 2 === 0 ? "GINZA // SITE-A" : "MARINA // SITE-B"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULL SCREEN LIGHTBOX IMAGES */}
      <AnimatePresence>
        {fullscreenItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-55 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setFullscreenItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-4xl w-full text-center space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-3xl overflow-hidden border border-gold-300/15 max-h-[75vh] w-full flex items-center justify-center relative">
                <img
                  src={fullscreenItem.imgUrl}
                  alt={fullscreenItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] w-full object-cover"
                />
                
                {/* Close instruction */}
                <button
                  onClick={() => setFullscreenItem(null)}
                  className="absolute top-4 right-4 bg-black/60 border border-white/10 text-white font-mono text-[10px] uppercase py-1 px-3.5 rounded-full hover:bg-gold-500 hover:text-black transition-colors cursor-pointer"
                >
                  Close [esc]
                </button>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] text-gold-400 tracking-widest">{fullscreenItem.subtitle}</span>
                <h4 className="font-editorial text-3xl font-bold text-gold-100">{fullscreenItem.title}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
