import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  FileText, 
  Mail, 
  Sparkles, 
  ChevronDown, 
  MapPin, 
  GraduationCap, 
  Terminal,
  ExternalLink,
  Bot
} from 'lucide-react';
import { profileData } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenAIAssistant: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onOpenAIAssistant,
}) => {
  const { playBlip } = useAudio();

  const roles = [
    "Aspiring AI/ML Engineer",
    "Full-Stack Developer",
    "Creative Problem Solver",
    "Aspiring Startup Builder",
    "Computer Science Innovator"
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect for rotating titles
  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        if (displayText.length + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  const scrollTo = (id: string) => {
    playBlip(750);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background Cyber Grid & Radiant Auroras */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] sm:h-[650px] sm:w-[650px] rounded-full bg-gradient-to-tr from-purple-600/15 via-blue-600/15 to-cyan-400/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & CTAs (7 cols) */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-4 py-1.5 text-xs font-mono text-purple-200 backdrop-blur-md shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wide">{profileData.currentStatus}</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Hello, I'm <br />
              <span className="text-gradient drop-shadow-sm">{profileData.fullName}</span>
            </h1>

            {/* Rotating Role with Monospace Cursor */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start gap-1 font-mono text-xl sm:text-2xl text-cyan-300">
              <span>&gt; </span>
              <span className="font-semibold text-white">{displayText}</span>
              <span className="w-2.5 h-6 bg-purple-400 inline-block animate-pulse" />
            </div>
          </div>

          {/* Tagline & Short Introduction */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Computer Science student at <strong className="text-white font-semibold">Government Engineering College, Gandhinagar</strong> with a builder's mindset. Crafting intelligent applications at the intersection of <span className="text-purple-300 font-medium">Artificial Intelligence, Machine Learning, and Full-Stack Development</span>.
          </p>

          {/* Location & College pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/5">
              <MapPin className="h-3.5 w-3.5 text-purple-400" />
              <span>{profileData.location}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/5">
              <GraduationCap className="h-3.5 w-3.5 text-cyan-400" />
              <span>GEC Gandhinagar (B.Tech CSE)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/5">
              <Terminal className="h-3.5 w-3.5 text-emerald-400" />
              <span>{profileData.tagline}</span>
            </div>
          </div>

          {/* Action Buttons (The 4 requested buttons) */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
            {/* 1. Explore My Work */}
            <button
              onClick={() => scrollTo('projects')}
              className="glow-btn flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* 2. Download Resume */}
            <button
              onClick={() => { playBlip(750); onOpenResume(); }}
              className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-950/30 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:bg-purple-900/40 hover:text-white transition-all active:scale-95 cursor-pointer"
            >
              <FileText className="h-4 w-4 text-purple-400" />
              <span>Download Resume</span>
            </button>

            {/* 3. Contact Me */}
            <button
              onClick={() => scrollTo('contact')}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all active:scale-95 cursor-pointer"
            >
              <Mail className="h-4 w-4 text-blue-400" />
              <span>Contact Me</span>
            </button>

            {/* 4. Ask My AI Assistant */}
            <button
              onClick={() => { playBlip(1100); onOpenAIAssistant(); }}
              className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/30 px-5 py-3.5 text-sm font-semibold text-cyan-200 hover:bg-cyan-900/40 hover:text-white transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <Bot className="h-4 w-4 text-cyan-400" />
              <span>Ask My AI Assistant</span>
            </button>
          </div>
        </div>

        {/* Right Column: High-Impact Portrait with Animated Gradient Framing (5 cols) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-72 h-84 sm:w-80 sm:h-96 md:w-96 md:h-[440px]">
            {/* Radiant Ambient Glow Behind */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 opacity-50 blur-2xl animate-pulse" />

            {/* Futuristic Multi-layer Framing */}
            <div className="relative h-full w-full rounded-3xl p-1 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-400 shadow-2xl">
              <div className="relative h-full w-full rounded-[22px] bg-[#0c1024] overflow-hidden">
                <img
                  src={profileData.profilePhoto}
                  alt={profileData.fullName}
                  className="h-full w-full object-cover object-top filter contrast-[1.05]"
                />

                {/* Bottom subtle gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060813] via-[#060813]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <div>
                    <p className="text-xs font-mono text-purple-300">Verified Identity</p>
                    <p className="text-sm font-bold text-white tracking-wide">{profileData.fullName}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> Online
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Tech Badges around Portrait */}
            <div className="absolute -top-3 -right-3 sm:-right-6 flex items-center gap-2 rounded-xl border border-purple-500/30 bg-[#0c1024]/90 px-3.5 py-2 text-xs font-mono text-white shadow-xl backdrop-blur-md animate-bounce" style={{ animationDuration: '4s' }}>
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>Python & spaCy NLP</span>
            </div>

            <div className="absolute top-1/2 -left-4 sm:-left-8 -translate-y-1/2 flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-[#0c1024]/90 px-3.5 py-2 text-xs font-mono text-white shadow-xl backdrop-blur-md animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>React & FastAPI</span>
            </div>

            <div className="absolute -bottom-3 -right-2 sm:-right-4 flex items-center gap-2 rounded-xl border border-blue-500/30 bg-[#0c1024]/90 px-3.5 py-2 text-xs font-mono text-white shadow-xl backdrop-blur-md">
              <span className="text-cyan-300 font-bold">4+</span>
              <span className="text-slate-300">Live Deployed Apps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Animated Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-slate-400 hover:text-white transition-colors" onClick={() => scrollTo('about')}>
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Scroll Down</span>
        <ChevronDown className="h-4 w-4 animate-bounce text-purple-400" />
      </div>
    </section>
  );
};
