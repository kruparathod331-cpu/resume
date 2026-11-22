import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Terminal, 
  Palette, 
  FileText, 
  Sparkles, 
  FolderGit2, 
  Award, 
  Code, 
  Compass, 
  Send, 
  ExternalLink,
  Laptop
} from 'lucide-react';
import { projectsData } from '../../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenThemeStudio: () => void;
  onOpenAIAssistant: () => void;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenCard: () => void;
  onOpenVideo: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Actions' | 'Projects' | 'Connect';
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenThemeStudio,
  onOpenAIAssistant,
  onOpenTerminal,
  onOpenResume,
  onOpenCard,
  onOpenVideo
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const commands: CommandItem[] = [
    // Navigation
    { id: 'nav-home', title: 'Home / Hero', subtitle: 'Return to top of portfolio', category: 'Navigation', icon: <Compass className="h-4 w-4" />, action: () => scrollToSection('hero') },
    { id: 'nav-about', title: 'About Krupa', subtitle: 'Personal identity & background at GEC Gandhinagar', category: 'Navigation', icon: <Sparkles className="h-4 w-4" />, action: () => scrollToSection('about') },
    { id: 'nav-skills', title: 'Tech Stack & Skills', subtitle: 'Languages, frameworks, databases, and AI tools', category: 'Navigation', icon: <Code className="h-4 w-4" />, action: () => scrollToSection('skills') },
    { id: 'nav-projects', title: 'Project Lab', subtitle: 'Explore ShopSmart AI, FitCheck, GRANTLY & CareCircle', category: 'Navigation', icon: <FolderGit2 className="h-4 w-4" />, action: () => scrollToSection('projects') },
    { id: 'nav-certs', title: 'Certificates & Hackathons', subtitle: 'Verified credentials and awards', category: 'Navigation', icon: <Award className="h-4 w-4" />, action: () => scrollToSection('certificates') },
    { id: 'nav-journey', title: 'Learning Journey Timeline', subtitle: 'Milestones and college engineering progression', category: 'Navigation', icon: <Sparkles className="h-4 w-4" />, action: () => scrollToSection('journey') },
    { id: 'nav-workspace', title: 'Virtual 3D Developer Workspace', subtitle: 'Interactive 3D digital desk experience', category: 'Navigation', icon: <Laptop className="h-4 w-4" />, action: () => scrollToSection('workspace') },
    { id: 'nav-playground', title: 'Coding Playground', subtitle: 'Sandboxed code experiments & live preview', category: 'Navigation', icon: <Code className="h-4 w-4" />, action: () => scrollToSection('playground') },
    { id: 'nav-discoveries', title: 'Tech Discoveries & News', subtitle: 'Curated AI, ML & developer breakthroughs', category: 'Navigation', icon: <Compass className="h-4 w-4" />, action: () => scrollToSection('discoveries') },
    { id: 'nav-contact', title: 'Contact & Connect', subtitle: 'Send a message or reach out', category: 'Navigation', icon: <Send className="h-4 w-4" />, action: () => scrollToSection('contact') },

    // Actions
    { id: 'act-assistant', title: 'Ask AI Assistant', subtitle: 'Chat with Krupa\'s interactive AI companion', category: 'Actions', icon: <Sparkles className="h-4 w-4 text-cyan-400" />, action: () => { onClose(); onOpenAIAssistant(); } },
    { id: 'act-terminal', title: 'Launch Developer Terminal', subtitle: 'UNIX-style interactive command line', category: 'Actions', icon: <Terminal className="h-4 w-4 text-emerald-400" />, action: () => { onClose(); onOpenTerminal(); } },
    { id: 'act-theme', title: 'Open Theme Studio', subtitle: 'Customize visual appearance, accents & presets', category: 'Actions', icon: <Palette className="h-4 w-4 text-purple-400" />, action: () => { onClose(); onOpenThemeStudio(); } },
    { id: 'act-resume', title: 'View & Download Resume', subtitle: 'ATS-formatted interactive curriculum vitae', category: 'Actions', icon: <FileText className="h-4 w-4 text-amber-400" />, action: () => { onClose(); onOpenResume(); } },
    { id: 'act-card', title: 'Digital Business Card (QR)', subtitle: 'Scan QR code or download vCard contact', category: 'Actions', icon: <Sparkles className="h-4 w-4 text-blue-400" />, action: () => { onClose(); onOpenCard(); } },
    { id: 'act-video', title: 'Watch Intro Video', subtitle: 'Personal introduction video player', category: 'Actions', icon: <Sparkles className="h-4 w-4 text-rose-400" />, action: () => { onClose(); onOpenVideo(); } },

    // Projects
    ...projectsData.map(p => ({
      id: `proj-${p.id}`,
      title: p.title,
      subtitle: `${p.category} • ${p.technologies.slice(0, 3).join(', ')}`,
      category: 'Projects' as const,
      icon: <FolderGit2 className="h-4 w-4 text-cyan-400" />,
      action: () => scrollToSection('projects')
    })),

    // Connect
    { id: 'conn-linkedin', title: 'LinkedIn Profile', subtitle: 'Open Krupa\'s professional profile', category: 'Connect', icon: <ExternalLink className="h-4 w-4 text-blue-400" />, action: () => window.open('https://www.linkedin.com/in/krupa-rathod-4a1172423', '_blank') },
    { id: 'conn-github', title: 'GitHub Profile', subtitle: 'View @kruparathod331-cpu repositories', category: 'Connect', icon: <ExternalLink className="h-4 w-4 text-purple-400" />, action: () => window.open('https://github.com/kruparathod331-cpu', '_blank') },
    { id: 'conn-email', title: 'Send Email', subtitle: 'kr.rathod331@gmail.com', category: 'Connect', icon: <Send className="h-4 w-4 text-emerald-400" />, action: () => window.location.href = 'mailto:kr.rathod331@gmail.com' }
  ];

  const filtered = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          onClose(); // In parent toggles open
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="w-full max-w-2xl rounded-2xl border border-purple-500/30 bg-[#0c1024] shadow-2xl shadow-purple-900/50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-purple-500/20 px-4 py-3.5 bg-slate-900/90">
          <Search className="h-5 w-5 text-purple-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, project, or section (e.g. 'FitCheck', 'Skills', 'Theme')..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <span className="hidden sm:inline-block px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[11px] font-mono text-slate-400">
            ESC to close
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-white/5">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-400">
              No matching commands or projects found for "{query}".
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-purple-600/25 border border-purple-500/40 text-white' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-purple-500/30 text-purple-200' : 'bg-white/5 text-slate-400'}`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate text-white">{item.title}</p>
                      <p className="text-xs text-slate-400 truncate">{item.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300/80 shrink-0 ml-3 px-2 py-0.5 rounded bg-white/5">
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="flex items-center justify-between border-t border-purple-500/20 px-4 py-2.5 bg-slate-900/60 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>Krupa Rathod Portfolio Studio</span>
        </div>
      </div>
    </div>
  );
};
