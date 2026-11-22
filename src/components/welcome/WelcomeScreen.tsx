import React, { useState } from 'react';
import { ArrowRight, Play, Sparkles, Terminal, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { profileData } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';

interface WelcomeScreenProps {
  onEnter: () => void;
  onOpenVideo: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter, onOpenVideo }) => {
  const [isExiting, setIsExiting] = useState(false);
  const { isMuted, toggleMute, playChime } = useAudio();

  const handleEnter = () => {
    playChime();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#3b82f6', '#06b6d4']
    });
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#060813] transition-all duration-700 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Cyber Grid & Aurora Blobs */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Top Controls: Sound toggle & Skip */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-950/30 text-xs font-mono text-purple-300">
          <Terminal className="h-3.5 w-3.5 text-cyan-400" />
          <span>INITIALIZING DIGITAL SPACE</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            title={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5 text-slate-400" /> : <Volume2 className="h-3.5 w-3.5 text-cyan-400" />}
            <span className="hidden sm:inline">{isMuted ? "Audio: Off" : "Audio: On"}</span>
          </button>
          <button
            onClick={handleEnter}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            Skip Intro →
          </button>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="relative z-10 mx-4 max-w-xl text-center">
        {/* Profile Image with Pulsing Neon Ring */}
        <div className="relative mx-auto mb-6 h-36 w-36 sm:h-44 sm:w-44">
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600 opacity-80 blur-md animate-spin" style={{ animationDuration: '9s' }} />
          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/20 bg-[#0c1024]">
            <img
              src={profileData.profilePhoto}
              alt={profileData.fullName}
              className="h-full w-full object-cover object-center"
              onError={(e) => {
                // Fallback to stylized monogram if image missing
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="absolute bottom-1 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 border-2 border-[#060813] text-white shadow-lg">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>

        {/* Welcome Tagline */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-4">
          <ShieldCheck className="h-3.5 w-3.5" />
          Welcome to My Interactive Portfolio
        </div>

        {/* Name and Professional Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
          {profileData.fullName}
        </h1>
        <p className="text-lg sm:text-xl font-medium text-gradient mb-2">
          {profileData.professionalTitle}
        </p>
        <p className="text-xs sm:text-sm font-mono text-purple-300/80 mb-6">
          {profileData.tagline} • GEC Gandhinagar, Gujarat
        </p>

        {/* Quick Intro snippet */}
        <p className="text-sm text-slate-300/90 leading-relaxed max-w-md mx-auto mb-8">
          Step into an interactive digital workspace blending Artificial Intelligence, machine learning systems, full-stack engineering, and dynamic 3D experiences.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleEnter}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>ENTER PORTFOLIO</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onOpenVideo}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-950/30 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-purple-900/40 hover:text-white transition-all"
          >
            <Play className="h-4 w-4 text-cyan-400" />
            <span>Watch Intro Video</span>
          </button>
        </div>

        {/* Bottom subtle note */}
        <div className="mt-8 flex items-center justify-center gap-4 text-xs font-mono text-slate-500">
          <span>Press [Ctrl + K] anytime for Command Search</span>
          <span>•</span>
          <span>Interactive 3D Ready</span>
        </div>
      </div>
    </div>
  );
};
