import React from 'react';
import { 
  ArrowUp, 
  Mail, 
  Terminal, 
  Palette, 
  QrCode, 
  Sparkles
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { profileData } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';

interface FooterProps {
  onOpenThemeStudio: () => void;
  onOpenTerminal: () => void;
  onOpenCard: () => void;
  onOpenResume: () => void;
  onOpenWelcome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenThemeStudio,
  onOpenTerminal,
  onOpenCard,
  onOpenResume,
  onOpenWelcome
}) => {
  const { playBlip } = useAudio();

  const scrollToTop = () => {
    playBlip(900);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    playBlip(750);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-purple-500/15 bg-[#04060f] pt-16 pb-12 px-4 sm:px-6">
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Col 1: Identity & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px] shadow-lg">
                <div className="h-full w-full bg-[#060813] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-white text-base tracking-tighter font-mono">
                    KR
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base tracking-tight">
                  {profileData.fullName}
                </h3>
                <p className="text-xs text-purple-400 font-mono">
                  {profileData.professionalTitle}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Computer Science student at Government Engineering College, Gandhinagar (GEC Gandhinagar). Passionate about turning Artificial Intelligence, Natural Language Processing, and full-stack web technologies into intuitive digital realities.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={profileData.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedInIcon className="h-4 w-4 text-cyan-400" />
              </a>
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
                title="GitHub Profile"
              >
                <GitHubIcon className="h-4 w-4 text-purple-400" />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
                title="Send Email"
              >
                <Mail className="h-4 w-4 text-blue-400" />
              </a>
              <button
                onClick={onOpenCard}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors cursor-pointer"
                title="Digital QR Card"
              >
                <QrCode className="h-4 w-4 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
              <button onClick={() => scrollTo('hero')} className="text-left hover:text-white transition-colors cursor-pointer">01. Home</button>
              <button onClick={() => scrollTo('about')} className="text-left hover:text-white transition-colors cursor-pointer">02. About</button>
              <button onClick={() => scrollTo('skills')} className="text-left hover:text-white transition-colors cursor-pointer">03. Skills</button>
              <button onClick={() => scrollTo('projects')} className="text-left hover:text-white transition-colors cursor-pointer">04. Projects</button>
              <button onClick={() => scrollTo('certificates')} className="text-left hover:text-white transition-colors cursor-pointer">05. Credentials</button>
              <button onClick={() => scrollTo('journey')} className="text-left hover:text-white transition-colors cursor-pointer">06. Journey</button>
              <button onClick={() => scrollTo('github')} className="text-left hover:text-white transition-colors cursor-pointer">07. GitHub</button>
              <button onClick={() => scrollTo('discoveries')} className="text-left hover:text-white transition-colors cursor-pointer">08. Discoveries</button>
              <button onClick={() => scrollTo('workspace')} className="text-left hover:text-white transition-colors cursor-pointer">09. 3D Lab</button>
              <button onClick={() => scrollTo('contact')} className="text-left hover:text-white transition-colors cursor-pointer">10. Contact</button>
            </div>
          </div>

          {/* Col 3: Interactive Features & Shortcuts (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              Interactive Tools & Studio
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-slate-300 border border-white/5 transition-colors cursor-pointer"
              >
                <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                <span>UNIX Terminal</span>
              </button>
              <button
                onClick={onOpenThemeStudio}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-slate-300 border border-white/5 transition-colors cursor-pointer"
              >
                <Palette className="h-3.5 w-3.5 text-purple-400" />
                <span>Theme Studio</span>
              </button>
              <button
                onClick={onOpenResume}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-slate-300 border border-white/5 transition-colors cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Interactive Resume</span>
              </button>
              <button
                onClick={onOpenWelcome}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-slate-300 border border-white/5 transition-colors cursor-pointer"
              >
                <span>Replay Intro</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 font-mono pt-1">
              Engineered with React 19, TypeScript, Vite, Tailwind CSS & Three.js.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            <span>© {new Date().getFullYear()} {profileData.fullName}. All rights reserved.</span>
            <span className="hidden sm:inline"> • {profileData.tagline}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-mono transition-colors cursor-pointer shadow-sm"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
