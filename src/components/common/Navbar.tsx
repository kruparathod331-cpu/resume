import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Sparkles, 
  FileText, 
  Menu, 
  X, 
  Search, 
  Terminal, 
  QrCode,
  Volume2,
  VolumeX
} from 'lucide-react';
import { profileData } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';

interface NavbarProps {
  onOpenThemeStudio: () => void;
  onOpenAIAssistant: () => void;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenCard: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenThemeStudio,
  onOpenAIAssistant,
  onOpenTerminal,
  onOpenResume,
  onOpenCard,
  onOpenCommandPalette
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleMute, playBlip } = useAudio();

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'journey', label: 'Journey' },
    { id: 'github', label: 'GitHub' },
    { id: 'discoveries', label: 'Discoveries' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section spy
      const sections = navLinks.map(l => document.getElementById(l.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    playBlip(700);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060813]/85 backdrop-blur-xl border-b border-purple-500/15 py-3 shadow-lg shadow-purple-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 group text-left"
          aria-label="Krupa Rathod - Home"
        >
          <div className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-[1.5px] shadow-lg group-hover:shadow-purple-500/40 transition-shadow">
            <div className="h-full w-full bg-[#060813] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-white text-base tracking-tighter font-mono group-hover:text-cyan-300 transition-colors">
                KR
              </span>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-white text-sm tracking-tight block">
              {profileData.fullName}
            </span>
            <span className="text-[11px] font-mono text-purple-400 block -mt-0.5">
              AI / Full-Stack
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/50'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2">
          {/* Audio toggle button */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-white/5 transition-colors"
            title={isMuted ? "Audio muted (Click to unmute)" : "Audio active (Click to mute)"}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-slate-400" /> : <Volume2 className="h-4 w-4 text-cyan-400 animate-pulse" />}
          </button>

          {/* Search / Command Palette (Ctrl+K) */}
          <button
            onClick={() => { playBlip(900); onOpenCommandPalette(); }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-white/[0.04] border border-white/10 hover:border-purple-500/40 transition-colors"
            title="Open Command Palette (Ctrl + K)"
          >
            <Search className="h-3.5 w-3.5 text-purple-400" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-black/40 rounded border border-white/10 text-slate-400">Ctrl K</kbd>
          </button>

          {/* Terminal Shortcut */}
          <button
            onClick={() => { playBlip(800); onOpenTerminal(); }}
            className="p-2 rounded-xl text-slate-300 hover:text-emerald-400 hover:bg-white/5 border border-white/5 transition-colors"
            title="Open Developer Terminal"
            aria-label="Developer Terminal"
          >
            <Terminal className="h-4 w-4" />
          </button>

          {/* Digital QR Card */}
          <button
            onClick={() => { playBlip(850); onOpenCard(); }}
            className="p-2 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-white/5 border border-white/5 transition-colors"
            title="Digital Business Card & QR"
            aria-label="Digital Business Card"
          >
            <QrCode className="h-4 w-4" />
          </button>

          {/* Theme Studio shortcut */}
          <button
            onClick={() => { playBlip(1000); onOpenThemeStudio(); }}
            className="p-2 rounded-xl text-purple-300 hover:text-purple-200 bg-purple-950/40 border border-purple-500/30 hover:border-purple-500/60 transition-all hover:scale-105"
            title="Interactive Theme Studio"
            aria-label="Theme Studio"
          >
            <Palette className="h-4 w-4" />
          </button>

          {/* AI Assistant shortcut */}
          <button
            onClick={() => { playBlip(1100); onOpenAIAssistant(); }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 text-xs font-semibold hover:border-cyan-500/60 transition-all hover:scale-105 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ask AI</span>
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={() => { playBlip(750); onOpenResume(); }}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold shadow-md shadow-purple-600/30 hover:shadow-purple-600/50 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#0c1024]/98 border-b border-purple-500/20 backdrop-blur-2xl p-6 shadow-2xl animate-fade-in">
          <div className="grid grid-cols-2 gap-2 mb-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-2 text-left text-sm font-semibold rounded-xl transition-colors ${
                  activeSection === link.id
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-4 border-t border-white/10">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenResume(); }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-xs font-bold text-white shadow-lg"
            >
              <FileText className="h-4 w-4" />
              <span>View & Download Resume</span>
            </button>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAIAssistant(); }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 py-2 text-xs font-semibold text-cyan-300"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI Bot</span>
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenThemeStudio(); }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-950/40 py-2 text-xs font-semibold text-purple-300"
              >
                <Palette className="h-3.5 w-3.5" />
                <span>Theme</span>
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenTerminal(); }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 py-2 text-xs font-semibold text-emerald-300"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Terminal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
