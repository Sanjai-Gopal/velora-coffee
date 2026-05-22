import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Radio, Settings } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [hoverBeepIntensity, setHoverBeepIntensity] = useState(true);

  // Audio nodes refs for procedural synthesis
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneNodeA = useRef<OscillatorNode | null>(null);
  const droneNodeB = useRef<OscillatorNode | null>(null);
  const droneNodeC = useRef<OscillatorNode | null>(null);
  const noiseNode = useRef<AudioWorkletNode | ScriptProcessorNode | null>(null);
  const lfoNode = useRef<OscillatorNode | null>(null);
  const masterGain = useRef<GainNode | null>(null);

  // Start procedural ambient acoustic synth
  const startSynth = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Master Gain
      masterGain.current = ctx.createGain();
      masterGain.current.gain.setValueAtTime(volume * 0.18, ctx.currentTime);
      masterGain.current.connect(ctx.destination);

      // Lowpass filter for warm velvety espresso lounge sound
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(320, ctx.currentTime);
      lowpass.Q.setValueAtTime(1.5, ctx.currentTime);
      lowpass.connect(masterGain.current);

      // Procedural drone synthesis: 3 oscillators playing a beautiful minor 7th chord (F - Ab - C - Eb)
      // Base frequencies: F2 (87.31 Hz), Ab2 (103.83 Hz), C3 (130.81 Hz), Eb3 (155.56 Hz)
      droneNodeA.current = ctx.createOscillator();
      droneNodeA.current.type = "triangle";
      droneNodeA.current.frequency.setValueAtTime(87.31, ctx.currentTime);

      droneNodeB.current = ctx.createOscillator();
      droneNodeB.current.type = "sine";
      droneNodeB.current.frequency.setValueAtTime(130.81, ctx.currentTime);

      droneNodeC.current = ctx.createOscillator();
      droneNodeC.current.type = "triangle";
      droneNodeC.current.frequency.setValueAtTime(155.56, ctx.currentTime);

      // Modulating Gain Nodes to create breathing movement
      const gainA = ctx.createGain();
      const gainB = ctx.createGain();
      const gainC = ctx.createGain();

      gainA.gain.setValueAtTime(0.08, ctx.currentTime);
      gainB.gain.setValueAtTime(0.12, ctx.currentTime);
      gainC.gain.setValueAtTime(0.05, ctx.currentTime);

      // Slow LFO to sweep frequencies slightly
      lfoNode.current = ctx.createOscillator();
      lfoNode.current.type = "sine";
      lfoNode.current.frequency.setValueAtTime(0.12, ctx.currentTime); // very slow 0.12 Hz

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(1.5, ctx.currentTime); // swing 1.5 Hz

      lfoNode.current.connect(lfoGain);
      lfoGain.connect(droneNodeB.current.frequency); // sway middle voice

      // Connect drone voices
      droneNodeA.current.connect(gainA);
      droneNodeB.current.connect(gainB);
      droneNodeC.current.connect(gainC);

      gainA.connect(lowpass);
      gainB.connect(lowpass);
      gainC.connect(lowpass);

      // Start all nodes
      droneNodeA.current.start();
      droneNodeB.current.start();
      droneNodeC.current.start();
      lfoNode.current.start();

      // Procedural Steamer / White Noise component (warm cyber atmosphere filter)
      try {
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoiseSource = ctx.createBufferSource();
        whiteNoiseSource.buffer = noiseBuffer;
        whiteNoiseSource.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "bandpass";
        noiseFilter.frequency.setValueAtTime(450, ctx.currentTime);
        noiseFilter.Q.setValueAtTime(0.8, ctx.currentTime);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.015, ctx.currentTime);

        whiteNoiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain.current);

        whiteNoiseSource.start();
      } catch (err) {
        console.warn("Noise buffer failed to create, skipping background static", err);
      }

      setIsPlaying(true);
    } catch (e) {
      console.error("Web Audio API failed to initialize", e);
    }
  };

  // Stop procedural ambient synth
  const stopSynth = () => {
    try {
      if (droneNodeA.current) {
        droneNodeA.current.stop();
        droneNodeA.current.disconnect();
      }
      if (droneNodeB.current) {
        droneNodeB.current.stop();
        droneNodeB.current.disconnect();
      }
      if (droneNodeC.current) {
        droneNodeC.current.stop();
        droneNodeC.current.disconnect();
      }
      if (lfoNode.current) {
        lfoNode.current.stop();
        lfoNode.current.disconnect();
      }
      if (masterGain.current) {
        masterGain.current.disconnect();
      }
      setIsPlaying(false);
    } catch (e) {
      console.warn("Error shutting down audio modules", e);
    }
  };

  // Toggling controls
  const handleToggle = () => {
    if (isPlaying) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  // Upkeep volume tweaks dynamically
  useEffect(() => {
    if (masterGain.current && audioCtxRef.current) {
      masterGain.current.gain.linearRampToValueAtTime(
        volume * 0.18,
        audioCtxRef.current.currentTime + 0.15
      );
    }
  }, [volume]);

  // Clean up on component deletion
  useEffect(() => {
    return () => {
      try {
        if (isPlaying) {
          stopSynth();
        }
      } catch (err) {
        // quiet cleanup
      }
    };
  }, []);

  return (
    <div
      id="velora-audio-pod"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 py-2 px-3 border border-gold-200/5 bg-[rgba(16,12,10,0.7)] backdrop-blur-md rounded-full shadow-lg"
    >
      <button
        id="audio-synth-toggle-btn"
        onClick={handleToggle}
        className="relative group p-2 hover:bg-gold-500/10 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
        aria-label="Toggle Velora Atmospheric Acoustic Synth"
      >
        {isPlaying ? (
          <Volume2 className="h-4.5 w-4.5 text-gold-300 animate-pulse group-hover:scale-105 transition-transform" />
        ) : (
          <VolumeX className="h-4.5 w-4.5 text-espresso-300 group-hover:scale-105 transition-transform" />
        )}
        <div className="absolute right-full mr-3 bottom-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-espresso-950 border border-gold-400/20 py-0.5 px-2 text-[10px] uppercase font-display letter-tracking-cinematic rounded text-gold-200 pointer-events-none shadow">
          {isPlaying ? "Velora Acoustic Drone: Active" : "Ambient Wave Off"}
        </div>
      </button>

      {isPlaying && (
        <div className="flex items-center gap-2 pr-1 transition-all">
          <input
            id="volume-slide-controller"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-14 accent-gold-300 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            style={{
              height: "2px",
              background: "#3a1e12",
              borderRadius: "2px",
              appearance: "none",
            }}
          />
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-[1.5px] h-2 bg-gold-400/80 animate-[bounce_0.8s_infinite_100ms]" />
            <span className="w-[1.5px] h-3.5 bg-gold-400/80 animate-[bounce_0.8s_infinite_300ms]" />
            <span className="w-[1.5px] h-1.5 bg-gold-400/80 animate-[bounce_0.8s_infinite_500ms]" />
          </div>
        </div>
      )}
    </div>
  );
}
