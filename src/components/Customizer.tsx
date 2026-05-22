import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, Cpu, Sparkles, Coffee, Compass, RotateCcw, Check, ShoppingBag } from "lucide-react";

interface BeanType {
  id: string;
  name: string;
  location: string;
  notes: string;
  color: string;
  baseSensory: { body: number; acidity: number; crema: number; floral: number; radiance: number };
}

const BEANS: BeanType[] = [
  {
    id: "ethiopian-cryo",
    name: "Ethiopian Cryo-Aged",
    location: "Yirgacheffe High Valley",
    notes: "Bergamot mist, Jasmine-honey glaze, White tea finish",
    color: "#e6bd8b",
    baseSensory: { body: 45, acidity: 94, crema: 60, floral: 95, radiance: 80 },
  },
  {
    id: "yemeni-basalt",
    name: "Yemen Geisha Volcanic",
    location: "Sana'a Obsidian Range",
    notes: "Mocha lava, Sun-aged cardamom, Deep black cherry",
    color: "#b07f50",
    baseSensory: { body: 95, acidity: 40, crema: 92, floral: 55, radiance: 65 },
  },
  {
    id: "lunar-anaerobic",
    name: "Lunar Highlands Anaerobic",
    location: "Acoustic-Aged Limited Reserve",
    notes: "Wild raspberry preserve, Cacao pulp, Cryo-mint breeze",
    color: "#cfa276",
    baseSensory: { body: 75, acidity: 80, crema: 78, floral: 85, radiance: 98 },
  },
];

export default function Customizer() {
  const [selectedBean, setSelectedBean] = useState<BeanType>(BEANS[0]);
  const [grindSize, setGrindSize] = useState(240); // 150 to 750 microns
  const [pressure, setPressure] = useState(9.2); // 6 to 12 Bar
  const [goldLeaf, setGoldLeaf] = useState(2.5); // 0 to 10 mg
  const [infusion, setInfusion] = useState<"cardamom" | "lavender" | "cryo-mint" | "pure">("pure");
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewProgress, setBrewProgress] = useState(0);
  const [brewStep, setBrewStep] = useState("");
  const [brewComplete, setBrewComplete] = useState(false);
  const [sensory, setSensory] = useState(BEANS[0].baseSensory);

  // Re-calculate mock sensory scores based on user sliders
  useEffect(() => {
    const base = selectedBean.baseSensory;
    
    // Sliders affect coffee metrics
    const grindFactor = (grindSize - 400) / 300; // bigger grind decreases extraction, acidity, increases body slightly
    const pressureFactor = (pressure - 9) / 3; // sweet spot is 9 Bar. Excess increases crema density and bite, too low drops body
    const goldFactor = goldLeaf / 10;

    const newBody = Math.max(10, Math.min(100, Math.round(base.body - grindFactor * 15 + (pressure > 9 ? 12 : -8))));
    const newAcidity = Math.max(10, Math.min(100, Math.round(base.acidity + grindFactor * 25 - Math.abs(9 - pressure) * 8)));
    const newCrema = Math.max(10, Math.min(100, Math.round(base.crema + (pressure - 9) * 15 + (grindSize < 300 ? 10 : -8))));
    const newFloral = Math.max(10, Math.min(100, Math.round(base.floral - Math.abs(grindSize - 280) * 0.05 + (infusion !== "pure" ? 15 : 0))));
    const newRadiance = Math.max(10, Math.min(100, Math.round(base.radiance + goldFactor * 30 + (pressure > 10 ? 8 : 0))));

    setSensory({
      body: newBody,
      acidity: newAcidity,
      crema: newCrema,
      floral: newFloral,
      radiance: newRadiance,
    });
  }, [grindSize, pressure, goldLeaf, selectedBean, infusion]);

  // Handle Brew Simulation Timeline
  const startBrewingSequence = () => {
    setIsBrewing(true);
    setBrewProgress(0);
    setBrewComplete(false);

    // Audio cue (high frequency synth chime if context exists)
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const audioCtx = new AudioContextClass();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      }
    } catch (e) {
      // ignore empty audio
    }

    const steps = [
      { prg: 10, text: "Grooming portafilter bed with sonic distribution..." },
      { prg: 30, text: "Calibrating thermal element to 94.5°C..." },
      { prg: 50, text: "Initiating pre-infusion spray under 2.4 bar..." },
      { prg: 75, text: `Scaling pressure pump to peak extraction: ${pressure} Bar...` },
      { prg: 90, text: `Vaporizing premium botanical: ${infusion.toUpperCase()}...` },
      { prg: 98, text: `Suspending pure ${goldLeaf} mg gold particles into emulsion...` },
      { prg: 100, text: "Velora elixir extraction complete." },
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      setBrewProgress((prev) => {
        const next = prev + 1;
        const matchingStep = steps[currentStepIdx];
        if (matchingStep && next >= matchingStep.prg) {
          setBrewStep(matchingStep.text);
          currentStepIdx++;
        }
        if (next >= 100) {
          clearInterval(interval);
          setBrewComplete(true);
          return 100;
        }
        return next;
      });
    }, 60);
  };

  const resetBrew = () => {
    setIsBrewing(false);
    setBrewProgress(0);
    setBrewComplete(false);
    setBrewStep("");
  };

  // Convert sensory object to SVG polygon coordinates for Spider Chart (Radius = 75, Centered at x=85, y=85)
  const getRadarPoints = () => {
    const cx = 85;
    const cy = 85;
    const r = 60; // max radius
    const angles = [
      -Math.PI / 2, // Body (Top)
      -Math.PI / 2 + (Math.PI * 2) / 5, // Acidity
      -Math.PI / 2 + (Math.PI * 4) / 5, // Crema
      -Math.PI / 2 + (Math.PI * 6) / 5, // Floral
      -Math.PI / 2 + (Math.PI * 8) / 5, // Radiance
    ];

    const vals = [sensory.body, sensory.acidity, sensory.crema, sensory.floral, sensory.radiance];
    return angles
      .map((angle, i) => {
        const factor = vals[i] / 100;
        const x = cx + r * factor * Math.cos(angle);
        const y = cy + r * factor * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <section id="velora-brew-lab" className="relative py-28 px-4 md:px-8 border-b border-gold-200/5 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] radial-glow-gold pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-gold-400 mb-3 flex items-center gap-1.5">
            <Cpu className="h-3 w-3 animate-pulse" /> SENSORY CALIBRATOR
          </span>
          <h2 className="font-editorial text-4xl md:text-5xl text-gold-50 tracking-tight leading-none mb-4">
            The Molecular Brew Lab
          </h2>
          <p className="font-sans text-xs md:text-sm text-espresso-200 uppercase letter-tracking-cinematic max-w-lg">
            Formulate your bespoke signature cup. Manipulate volumetric pressures and botanical particulates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CONTROL SUITE (Left: 7-cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* BEAN ORIGIN SELECTOR */}
            <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-xs uppercase tracking-wider text-gold-200 flex items-center gap-2">
                  <Coffee className="h-4 w-4 text-gold-400" /> 01 / SELECT SINGLE ORIGIN SEED
                </span>
                <span className="text-[10px] font-mono text-gold-400">CROPS SELECTION</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {BEANS.map((bean) => (
                  <button
                    key={bean.id}
                    id={`bean-select-${bean.id}`}
                    onClick={() => {
                      setSelectedBean(bean);
                      setSensory(bean.baseSensory);
                    }}
                    className={`relative p-4 rounded-2xl text-left border flex flex-col justify-between h-40 transition-all duration-300 cursor-pointer ${
                      selectedBean.id === bean.id
                        ? "bg-espresso-950/40 border-gold-400/40 shadow-inner"
                        : "bg-black/20 border-white/5 hover:border-gold-300/15"
                    }`}
                  >
                    <div>
                      <h4 className="font-display text-xs uppercase font-semibold text-gold-100 tracking-wide mb-1">
                        {bean.name}
                      </h4>
                      <p className="font-sans text-[10px] text-espresso-300 font-mono tracking-tighter">
                        {bean.location}
                      </p>
                    </div>

                    <div>
                      <p className="font-sans text-[10px] text-espresso-200 line-clamp-2 italic pr-2">
                        "{bean.notes}"
                      </p>
                      {selectedBean.id === bean.id && (
                        <div className="absolute bottom-4 right-4 h-5 w-5 rounded-full bg-gold-400 text-black flex items-center justify-center text-[10px] scale-100">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* VOLUMETRIC SLIDERS */}
            <div className="glass-panel p-6 rounded-3xl space-y-6">
              <span className="font-display text-xs uppercase tracking-wider text-gold-200 flex items-center gap-2 mb-2">
                <Sliders className="h-4 w-4 text-gold-400" /> 02 / MOLECULAR METRICS SUITE
              </span>

              {/* Slider 1: Grind Size */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-espresso-200 uppercase">Grind Caliber</span>
                  <span className="text-gold-250 font-bold">{grindSize} µm</span>
                </div>
                <input
                  id="grind-caliber-slider"
                  type="range"
                  min="150"
                  max="700"
                  value={grindSize}
                  onChange={(e) => setGrindSize(parseInt(e.target.value))}
                  className="w-full accent-gold-400 h-1 bg-espresso-900 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-espresso-400">
                  <span>Atomic Fine (150µ)</span>
                  <span>Drip Balanced (450µ)</span>
                  <span>Coarse Crust (700µ)</span>
                </div>
              </div>

              {/* Slider 2: Atmospheric Pressure */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-espresso-200 uppercase">Volumetric Pressure</span>
                  <span className="text-gold-250 font-bold">{pressure.toFixed(1)} Bar</span>
                </div>
                <input
                  id="volumetric-pressure-slider"
                  type="range"
                  min="6.0"
                  max="12.0"
                  step="0.1"
                  value={pressure}
                  onChange={(e) => setPressure(parseFloat(e.target.value))}
                  className="w-full accent-gold-400 h-1 bg-espresso-900 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-espresso-400">
                  <span>Soft Extraction (6-Bar)</span>
                  <span>The Sweet Spot (9.2-Bar)</span>
                  <span>Ultra-Jet (12-Bar)</span>
                </div>
              </div>

              {/* Slider 3: Gold Leaf Infusion */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-espresso-200 uppercase flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-gold-400 animate-spin" /> Gold Emulsion Leaf
                  </span>
                  <span className="text-gold-300 font-bold">{goldLeaf.toFixed(1)} mg</span>
                </div>
                <input
                  id="gold-leaf-slider"
                  type="range"
                  min="0.0"
                  max="10.0"
                  step="0.5"
                  value={goldLeaf}
                  onChange={(e) => setGoldLeaf(parseFloat(e.target.value))}
                  className="w-full accent-gold-400 h-1 bg-espresso-900 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-espresso-400">
                  <span>None</span>
                  <span>Subtle Glitter (5mg)</span>
                  <span>Liquid Gold Cover (10mg)</span>
                </div>
              </div>
            </div>

            {/* BOTANICAL DISTILLATES */}
            <div className="glass-panel p-6 rounded-3xl">
              <span className="font-display text-xs uppercase tracking-wider text-gold-200 flex items-center gap-2 mb-4">
                <Compass className="h-4 w-4 text-gold-400" /> 03 / BOTANICAL THERMAL ATOMIZATION
              </span>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { id: "pure", label: "Pure Elixir", desc: "No botanicals" },
                  { id: "cardamom", label: "Cardamom Vapor", desc: "Smoked warm spice" },
                  { id: "lavender", label: "Lavender Frost", desc: "Soothing floral vapor" },
                  { id: "cryo-mint", label: "Cryo Mint Distillate", desc: "Bracing cool ozone" },
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`infusion-select-${item.id}`}
                    onClick={() => setInfusion(item.id as any)}
                    className={`p-3 rounded-2xl text-left border flex flex-col justify-between h-20 transition-all cursor-pointer ${
                      infusion === item.id
                        ? "bg-gold-500/10 border-gold-400 text-gold-100"
                        : "bg-black/20 border-white/5 text-espresso-300 hover:border-gold-300/10"
                    }`}
                  >
                    <span className="font-display text-[10px] uppercase font-bold tracking-wider leading-none">
                      {item.label}
                    </span>
                    <span className="text-[8px] font-mono text-espresso-400 leading-tight">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* VISUALIZER & BREW RADAR (Right: 5-cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* SPIDER SENSORY WHEEL */}
            <div className="glass-panel p-6 rounded-3xl flex flex-col items-center">
              <span className="font-display text-xs uppercase tracking-wider text-gold-300 mb-4 font-mono">
                REAL-TIME FLAVOR SIGNATURE
              </span>

              <div className="relative w-full aspect-square max-w-[260px] flex items-center justify-center">
                {/* SVG Radar spider charts */}
                <svg viewBox="0 8 170 170" className="w-full h-full overflow-visible">
                  {/* Outer Grid rings */}
                  {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, sIdx) => {
                    const r = 60 * scale;
                    const angles = [
                      -Math.PI / 2,
                      -Math.PI / 2 + (Math.PI * 2) / 5,
                      -Math.PI / 2 + (Math.PI * 4) / 5,
                      -Math.PI / 2 + (Math.PI * 6) / 5,
                      -Math.PI / 2 + (Math.PI * 8) / 5,
                    ];
                    const pts = angles.map((a) => `${85 + r * Math.cos(a)},${85 + r * Math.sin(a)}`).join(" ");
                    return (
                      <polygon
                        key={sIdx}
                        points={pts}
                        fill="none"
                        stroke="rgba(235, 214, 165, 0.08)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Axis lines */}
                  {[0, 1, 2, 3, 4].map((i) => {
                    const angle = -Math.PI / 2 + (i * Math.PI * 2) / 5;
                    const x = 85 + 60 * Math.cos(angle);
                    const y = 85 + 60 * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1="85"
                        y1="85"
                        x2={x}
                        y2={y}
                        stroke="rgba(235, 214, 165, 0.06)"
                        strokeWidth="1.2"
                      />
                    );
                  })}

                  {/* LABELS */}
                  <text x="85" y="16" fill="#e6bd8b" fontSize="7" fontFamily="Space Grotesk" textAnchor="middle" letterSpacing="0.5">
                    BODY
                  </text>
                  <text x="156" y="70" fill="#e6bd8b" fontSize="7" fontFamily="Space Grotesk" textAnchor="start" letterSpacing="0.5">
                    ACIDITY
                  </text>
                  <text x="134" y="152" fill="#e6bd8b" fontSize="7" fontFamily="Space Grotesk" textAnchor="start" letterSpacing="0.5">
                    CREMA
                  </text>
                  <text x="36" y="152" fill="#e6bd8b" fontSize="7" fontFamily="Space Grotesk" textAnchor="end" letterSpacing="0.5">
                    FLORAL
                  </text>
                  <text x="14" y="70" fill="#e6bd8b" fontSize="7" fontFamily="Space Grotesk" textAnchor="end" letterSpacing="0.5">
                    GLOW
                  </text>

                  {/* Active Polygon points */}
                  <polygon
                    points={getRadarPoints()}
                    fill="rgba(188, 130, 49, 0.18)"
                    stroke="#bc8231"
                    strokeWidth="1.8"
                    className="transition-all duration-300"
                  />

                  {/* Coordinate knots */}
                  {getRadarPoints()
                    .split(" ")
                    .map((pt, pIdx) => {
                      const [px, py] = pt.split(",");
                      return (
                        <circle
                          key={pIdx}
                          cx={px}
                          cy={py}
                          r="3"
                          fill="#f4ebd2"
                          stroke="#9c6324"
                          strokeWidth="1"
                        />
                      );
                    })}
                </svg>
              </div>

              {/* Numerical Indicators */}
              <div className="grid grid-cols-5 gap-1.5 w-full mt-4 border-t border-white/5 pt-4 text-center">
                {[
                  { name: "BDY", val: sensory.body },
                  { name: "ACD", val: sensory.acidity },
                  { name: "CRM", val: sensory.crema },
                  { name: "FLR", val: sensory.floral },
                  { name: "GLW", val: sensory.radiance },
                ].map((ind, i) => (
                  <div key={i} className="space-y-0.5">
                    <p className="text-[8px] font-mono text-espresso-400">{ind.name}</p>
                    <p className="text-xs font-mono font-bold text-gold-300">{ind.val}%</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION BREW AREA */}
            <div className="glass-panel p-6 rounded-3xl border border-gold-300/10 flex flex-col justify-end text-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isBrewing && !brewComplete ? (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 py-4"
                  >
                    <div className="h-14 w-14 rounded-full border border-gold-300/20 bg-espresso-950 flex items-center justify-center mx-auto text-gold-300">
                      <Coffee className="h-6 w-6 animate-float" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-gold-100 uppercase tracking-wider">
                        Acoustic Extractor Chamber
                      </h4>
                      <p className="text-[10px] text-espresso-300 max-w-xs mx-auto mt-1 leading-normal">
                        Brewing initializes atomic integration, calculating optimum espresso suspension with liquid gold flakes.
                      </p>
                    </div>

                    <button
                      id="launch-extraction-brew-btn"
                      onClick={startBrewingSequence}
                      className="w-full bg-gold-450 hover:bg-gold-500 text-espresso-950 font-display text-xs font-semibold uppercase tracking-[0.2em] py-3.5 px-6 rounded-xl transition-all duration-300 active:scale-98 shadow-md hover:shadow-gold-500/15 cursor-pointer mt-2"
                    >
                      BREW BESPOKE ELIXIR
                    </button>
                  </motion.div>
                ) : isBrewing && !brewComplete ? (
                  <motion.div
                    key="brewing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 py-6"
                  >
                    <div className="relative h-20 w-20 mx-auto flex items-center justify-center">
                      <span className="absolute inset-0 rounded-full border-2 border-dashed border-gold-400/20 animate-spin" />
                      <span className="absolute inset-2 rounded-full border border-gold-300/10" />
                      <span className="text-xs font-mono font-bold text-gold-300">{brewProgress}%</span>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-mono text-[9px] text-gold-400 tracking-wider">BREW SIMULATION ACTIVE</h5>
                      <p className="font-sans text-xs text-espresso-100 font-mono italic px-2 h-10 flex items-center justify-center">
                        "{brewStep}"
                      </p>
                      
                      {/* Fluid Chamber Fill Sim */}
                      <div className="w-full h-1 bg-espresso-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold-430 shadow-[0_0_10px_#bc8231] transition-all duration-100"
                          style={{ width: `${brewProgress}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 py-2"
                  >
                    <div className="h-12 w-12 rounded-full bg-gold-400 text-espresso-950 flex items-center justify-center mx-auto shadow-inner scale-100 animate-bounce">
                      <Check className="h-5 w-5" />
                    </div>

                    <div className="border border-gold-200/5 bg-black/40 p-4 rounded-2xl text-left font-mono">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                        <span className="text-[10px] text-gold-400">RECIPE CALIBRATED</span>
                        <span className="text-[9px] text-espresso-400">#VL-{Math.floor(1000 + Math.random() * 9000)}</span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-espresso-300">BASE:</span>
                          <span className="text-gold-200 uppercase text-[10px]">{selectedBean.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-espresso-300">PRESSURE:</span>
                          <span className="text-gold-200">{pressure.toFixed(1)} Bar</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-espresso-300">GRIND SIZE:</span>
                          <span className="text-gold-200">{grindSize} Micron</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-espresso-300">GOLD VALUE:</span>
                          <span className="text-gold-200">{goldLeaf} mg (24k)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-espresso-300">ATOMIZER:</span>
                          <span className="text-gold-100 uppercase">{infusion}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={resetBrew}
                        id="reset-calibration-btn"
                        className="flex-1 border border-white/10 hover:border-white/20 text-white font-display text-[10px] uppercase font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="h-3 w-3" /> RE-CALIBRATE
                      </button>
                      <button
                        id="add-recipe-bag-btn"
                        onClick={() => alert("Bespoke elixir loaded to digital smart-pass.")}
                        className="flex-1 bg-gold-400 hover:bg-gold-500 text-espresso-950 font-display text-[10px] uppercase font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="h-3 w-3" /> LOAD PASS
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
