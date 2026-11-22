import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playBlip: (freq?: number) => void;
  playChime: () => void;
  isAmbientPlaying: boolean;
  toggleAmbient: () => void;
}

const AudioStateContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(true); // Disabled by default
  const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audioCtxRef = useRef<any>(null);
  const ambientOsc1 = useRef<OscillatorNode | null>(null);
  const ambientOsc2 = useRef<OscillatorNode | null>(null);
  const ambientGain = useRef<GainNode | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const win = window as unknown as Record<string, unknown>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const NativeAudioContext = (win.AudioContext || win.webkitAudioContext) as any;
      if (NativeAudioContext) {
        audioCtxRef.current = new NativeAudioContext();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playBlip = (freq: number = 880) => {
    if (isMuted) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio not permitted yet
    }
  };

  const playChime = () => {
    if (isMuted) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const chords = [523.25, 659.25, 783.99, 1046.5]; // C Major
      chords.forEach((freq, idx) => {
        setTimeout(() => {
          if (!audioCtxRef.current) return;
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
          gain.gain.setValueAtTime(0.03, audioCtxRef.current.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.4);
          osc.connect(gain);
          gain.connect(audioCtxRef.current.destination);
          osc.start();
          osc.stop(audioCtxRef.current.currentTime + 0.4);
        }, idx * 60);
      });
    } catch {
      // Audio fallback
    }
  };

  const startAmbient = () => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      stopAmbient();

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.02, ctx.currentTime);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, ctx.currentTime); // Low A

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      ambientOsc1.current = osc1;
      ambientOsc2.current = osc2;
      ambientGain.current = gain;
      setIsAmbientPlaying(true);
    } catch {
      setIsAmbientPlaying(false);
    }
  };

  const stopAmbient = () => {
    try {
      if (ambientOsc1.current) {
        ambientOsc1.current.stop();
        ambientOsc1.current.disconnect();
        ambientOsc1.current = null;
      }
      if (ambientOsc2.current) {
        ambientOsc2.current.stop();
        ambientOsc2.current.disconnect();
        ambientOsc2.current = null;
      }
      if (ambientGain.current) {
        ambientGain.current.disconnect();
        ambientGain.current = null;
      }
      setIsAmbientPlaying(false);
    } catch {
      // Ignored
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      if (next && isAmbientPlaying) {
        stopAmbient();
      }
      return next;
    });
  };

  const toggleAmbient = () => {
    if (isAmbientPlaying) {
      stopAmbient();
    } else {
      setIsMuted(false);
      startAmbient();
    }
  };

  useEffect(() => {
    return () => {
      stopAmbient();
    };
  }, []);

  return (
    <AudioStateContext.Provider
      value={{
        isMuted,
        toggleMute,
        playBlip,
        playChime,
        isAmbientPlaying,
        toggleAmbient
      }}
    >
      {children}
    </AudioStateContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioStateContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
};
