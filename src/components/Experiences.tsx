import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Milestone, ShieldCheck, Flame, Compass, Star, Eye } from "lucide-react";

interface StepType {
  idx: string;
  title: string;
  subtitle: string;
  description: string;
  techLabel: string;
}

const EXPERIENCES_STEPS: StepType[] = [
  {
    idx: "01",
    title: "Cryogenic Bean Locking",
    subtitle: "Absolute Temperature Sealing",
    description: "Our rare Geisha single-origin crops undergo immediate dry-ice flash freezing to -78°C inside anaerobic nitrogen lockers. This completely suspends aromatic degradation, capturing volatile jasmine & chocolate esters permanently until extraction.",
    techLabel: "NITROGEN-FORCED BAROTROPIC CHAMBER",
  },
  {
    idx: "02",
    title: "Acoustic Levitation Roasting",
    subtitle: "Conduction-Free Space Thermal Processing",
    description: "Instead of scorching crops in high-heat drum roasters, we levitate beans in a highly-controlled acoustic soundscape field. High-frequency ultrasonic soundwaves rotate the seeds cleanly in mid-air inside a vacuum, roast-calibrating perfectly.",
    techLabel: "ULTRASONIC LEVITATION HARMONICS TRACE",
  },
  {
    idx: "03",
    title: "24K Gilded Molecular Emulsion",
    subtitle: "Precious Saffron and Gold Suspensions",
    description: "During extraction, the high-pressure espresso stream passes through gold-nano plates, dispersing pure 24-karat edible leaf micro-particulates uniformly into the golden cream crema. This alters bitterness threshold receptors for zero-bite finish.",
    techLabel: "PRECIOUS METAL EMULSIBILITY INDEX: 98.4%",
  },
  {
    idx: "04",
    title: "Sensory Salon Solarium",
    subtitle: "Controlled Micro-Acoustics",
    description: "A series of private tasting chambers custom-tuned to a continuous F-minor natural soundscape. Fully insulated with volcanic sand and dark high-density soundproofing elements. We coordinate light spectrums to elevate taste intensity.",
    techLabel: "ACOUSTIC INTENSIVITY SHIELD // 432HZ OFFSET",
  },
];

export default function Experiences() {
  const [activeStep, setActiveStep] = useState<StepType>(EXPERIENCES_STEPS[0]);

  return (
    <section
      id="velora-sensory-experience"
      className="relative py-28 px-4 md:px-8 border-b border-gold-200/5 bg-[#0A0A0A] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(188,130,49,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* STORY SELECTORS & TIMELINE (Left: 6-cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="font-display text-xs uppercase tracking-[0.3em] text-gold-450 flex items-center gap-1.5 font-mono">
                <Milestone className="h-3.5 w-3.5" /> THE CHRONOLOGICAL METHOD
              </span>
              <h2 className="font-editorial text-4xl md:text-5xl text-gold-50 tracking-tight leading-none">
                Sovereign Process <br />
                <span className="text-gold-gradient italic font-light">Uncompromised Science</span>
              </h2>
            </div>

            {/* Step list click-triggers */}
            <div className="space-y-3 pt-4">
              {EXPERIENCES_STEPS.map((step) => {
                const isActive = activeStep.idx === step.idx;
                return (
                  <button
                    key={step.idx}
                    id={`experience-step-trigger-${step.idx}`}
                    onClick={() => setActiveStep(step)}
                    className={`w-full p-5 rounded-2xl text-left transition-all duration-500 cursor-pointer border flex items-center gap-6 group relative overflow-hidden ${
                      isActive
                        ? "bg-gold-500/5 border-gold-400/40 shadow-inner"
                        : "bg-black/10 border-white/5 hover:border-gold-300/10 hover:bg-white/[0.01]"
                    }`}
                  >
                    <span
                      className={`font-display text-xl font-bold font-mono tracking-wider transition-colors duration-300 ${
                        isActive ? "text-gold-300" : "text-espresso-450 group-hover:text-espresso-200"
                      }`}
                    >
                      {step.idx}
                    </span>

                    <div className="space-y-0.5">
                      <h4
                        className={`font-display text-xs uppercase font-semibold transition-colors duration-350 ${
                          isActive ? "text-gold-100" : "text-espresso-200"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-espresso-400 font-mono tracking-tight leading-none group-hover:text-espresso-300 transition-all">
                        {step.subtitle}
                      </p>
                    </div>

                    {isActive && (
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-gold-400 shadow-[0_0_8px_#bc8231]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DISPLAY MEDIA CORE & CYBER APPARATUS VIEW (Right: 6-cols) */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.idx}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-8 rounded-[36px] relative overflow-hidden border border-gold-300/10 space-y-6"
              >
                {/* Image of the Cybernetic Brew Lab we generated */}
                <div className="w-full h-56 rounded-2xl overflow-hidden relative border border-white/5 shadow-inner">
                  <img
                    src="/images/brewing_lab_1779428992820.png"
                    alt="Velora Molecular Coffee Extraction Lab"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-65 group-hover:grayscale-0 transition-all duration-700"
                  />
                  {/* Glowing line indicators overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Micro label markings */}
                  <div className="absolute bottom-3 left-4 text-[8px] font-mono tracking-widest text-gold-300 uppercase flex items-center gap-1.5">
                    <Flame className="h-3 w-3 text-gold-450 animate-pulse" /> CYBER CONCENTRIC extraction
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-espresso-400 leading-none">
                      {activeStep.techLabel}
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-gold-100 tracking-wide mt-1">
                      {activeStep.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs text-espresso-200 leading-relaxed font-light">
                    {activeStep.description}
                  </p>

                  <div className="border-t border-white/5 pt-4 flex justify-between items-center text-[10px] font-mono text-gold-400 uppercase">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-4.5 w-4.5 text-gold-500" /> TOKYO GINZA LAB CALIBRATION
                    </span>
                    <span>✓ SCI-COFFEE VERIFIED</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
