import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { profileData, skillsData, projectsData, certificatesData, journeyMilestones } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import { useAudio } from '../../context/AudioContext';

interface DeveloperTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenAIAssistant: () => void;
}

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export const DeveloperTerminal: React.FC<DeveloperTerminalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenAIAssistant
}) => {
  const { setThemePreset } = useTheme();
  const { playBlip } = useAudio();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-300 font-bold">KrupaOS v2.6.4 (x86_64-portfolio-linux-gnu)</p>
          <p className="text-slate-400">Welcome to Krupa Rathod's Developer Environment.</p>
          <p className="text-purple-300">Type <span className="text-yellow-400 font-bold font-mono">help</span> to view available terminal commands or <span className="text-yellow-400 font-bold font-mono">exit</span> to close.</p>
        </div>
      )
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMatrixMode, setIsMatrixMode] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const availableCommands = [
    'help', 'about', 'skills', 'projects', 'certificates', 
    'github', 'journey', 'resume', 'contact', 'theme', 
    'clear', 'whoami', 'matrix', 'date', 'ai', 'sudo', 'exit'
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    playBlip(600);
    setCommandHistory(prev => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let output: React.ReactNode = null;

    switch (mainCmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-cyan-300 font-bold mb-2">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-slate-300">
              <div><span className="text-yellow-400 font-bold">about</span> : Background, degree & engineering approach</div>
              <div><span className="text-yellow-400 font-bold">skills</span> : Categorized technical stack</div>
              <div><span className="text-yellow-400 font-bold">projects</span> : Interactive projects with live URLs</div>
              <div><span className="text-yellow-400 font-bold">certificates</span> : List verified credentials & awards</div>
              <div><span className="text-yellow-400 font-bold">journey</span> : Career and college milestones</div>
              <div><span className="text-yellow-400 font-bold">github</span> : GitHub repositories and profile</div>
              <div><span className="text-yellow-400 font-bold">resume</span> : Open interactive CV modal</div>
              <div><span className="text-yellow-400 font-bold">contact</span> : Email and social coordinates</div>
              <div><span className="text-yellow-400 font-bold">theme &lt;name&gt;</span> : Change theme (e.g. matrix, cyber, blue)</div>
              <div><span className="text-yellow-400 font-bold">ai</span> : Launch KrupaBot AI Assistant</div>
              <div><span className="text-yellow-400 font-bold">matrix</span> : Toggle terminal matrix mode</div>
              <div><span className="text-yellow-400 font-bold">clear</span> : Clear terminal output</div>
              <div><span className="text-yellow-400 font-bold">whoami</span> : Current session identity</div>
              <div><span className="text-yellow-400 font-bold">exit</span> : Close terminal window</div>
            </div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">IDENTITY: {profileData.fullName}</p>
            <p className="text-purple-300">TITLE: {profileData.professionalTitle}</p>
            <p>LOCATION: {profileData.location} • GEC Gandhinagar</p>
            <p className="text-slate-400 leading-relaxed">{profileData.personalIntroduction}</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-300 font-bold">TECHNICAL SKILLS MATRIX:</p>
            <div className="space-y-1 text-slate-300">
              <p><span className="text-purple-300">Languages:</span> C, C++, Java, Python, JavaScript</p>
              <p><span className="text-purple-300">Frontend:</span> React.js, Tailwind CSS, HTML5, CSS3, Bootstrap</p>
              <p><span className="text-purple-300">Backend:</span> Python, FastAPI, Flask, Node.js, Express.js, REST APIs</p>
              <p><span className="text-purple-300">Databases:</span> PostgreSQL, MongoDB, MySQL, Firebase, SQLite</p>
              <p><span className="text-purple-300">AI / ML:</span> spaCy NLP, Scikit-learn, TensorFlow, PyTorch, Pandas, NumPy</p>
              <p><span className="text-purple-300">Tools:</span> VS Code, Git, GitHub, Postman, Docker, Figma, Vercel</p>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-3 text-xs font-mono">
            <p className="text-cyan-300 font-bold">PRODUCTION PROJECTS & LAB REPOSITORIES:</p>
            {projectsData.map(p => (
              <div key={p.id} className="p-2 rounded bg-white/[0.03] border border-white/5 space-y-1">
                <p className="text-yellow-300 font-bold">{p.title}</p>
                <p className="text-slate-300">{p.shortDescription}</p>
                <p className="text-purple-300">Tech: {p.technologies.join(', ')}</p>
                <p className="text-cyan-400">Live: <a href={p.liveDemoUrl} target="_blank" rel="noreferrer" className="underline">{p.liveDemoUrl}</a></p>
              </div>
            ))}
          </div>
        );
        break;

      case 'certificates':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-300 font-bold">VERIFIED CERTIFICATIONS & HACKATHONS:</p>
            {certificatesData.map(c => (
              <p key={c.id} className="text-slate-300">
                • <strong className="text-white">{c.title}</strong> — {c.issuer} ({c.date})
              </p>
            ))}
          </div>
        );
        break;

      case 'journey':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-300 font-bold">CHRONOLOGICAL JOURNEY:</p>
            {journeyMilestones.map(m => (
              <p key={m.id} className="text-slate-300">
                <span className="text-purple-300 font-bold">[{m.date}]</span> {m.title}: {m.description}
              </p>
            ))}
          </div>
        );
        break;

      case 'github':
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">GITHUB ACCOUNT:</p>
            <p>User: @kruparathod331-cpu</p>
            <p>Profile: <a href="https://github.com/kruparathod331-cpu" target="_blank" rel="noreferrer" className="text-purple-400 underline">https://github.com/kruparathod331-cpu</a></p>
            <p>Featured repos: FITCHECK, GRANTLY, SHOPSMART, CARE-CIRCLE-</p>
          </div>
        );
        break;

      case 'resume':
        onOpenResume();
        output = <p className="text-xs font-mono text-emerald-400">✓ Launched interactive Resume Modal.</p>;
        break;

      case 'ai':
        onOpenAIAssistant();
        output = <p className="text-xs font-mono text-cyan-400">✓ Launched Krupa's AI Assistant.</p>;
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">CONTACT COORDINATES:</p>
            <p>Email: <a href={`mailto:${profileData.email}`} className="text-purple-300 underline">{profileData.email}</a></p>
            <p>LinkedIn: <a href={profileData.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-purple-300 underline">{profileData.socialLinks.linkedin}</a></p>
            <p>GitHub: <a href={profileData.socialLinks.github} target="_blank" rel="noreferrer" className="text-purple-300 underline">{profileData.socialLinks.github}</a></p>
          </div>
        );
        break;

      case 'theme':
        if (arg.includes('cyber') || arg.includes('neon')) {
          setThemePreset('cyberpunk-neon');
          output = <p className="text-xs font-mono text-rose-400">Theme switched to Cyberpunk Neon.</p>;
        } else if (arg.includes('matrix') || arg.includes('green')) {
          setThemePreset('matrix-inspired');
          output = <p className="text-xs font-mono text-emerald-400">Theme switched to Matrix Inspired.</p>;
        } else if (arg.includes('blue')) {
          setThemePreset('electric-blue');
          output = <p className="text-xs font-mono text-cyan-400">Theme switched to Electric Blue.</p>;
        } else if (arg.includes('minimal')) {
          setThemePreset('premium-minimal');
          output = <p className="text-xs font-mono text-slate-200">Theme switched to Premium Minimal.</p>;
        } else {
          setThemePreset('midnight-purple');
          output = <p className="text-xs font-mono text-purple-400">Theme set to Midnight Purple (Default). Available: cyber, blue, matrix, minimal.</p>;
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'whoami':
        output = <p className="text-xs font-mono text-yellow-300">visitor@krupa-universe [role: Tech Explorer / Collaborator]</p>;
        break;

      case 'matrix':
        setIsMatrixMode(!isMatrixMode);
        output = <p className="text-xs font-mono text-emerald-400">Matrix phosphorus phosphor mode toggled.</p>;
        break;

      case 'date':
        output = <p className="text-xs font-mono text-slate-300">{new Date().toString()}</p>;
        break;

      case 'sudo':
        output = <p className="text-xs font-mono text-red-400">Permission denied: You already possess root access to explore all projects and credentials.</p>;
        break;

      case 'exit':
        onClose();
        return;

      default:
        output = (
          <p className="text-xs font-mono text-red-400">
            command not found: {trimmed}. Type <span className="text-yellow-400 font-bold">help</span> to view available commands.
          </p>
        );
    }

    setHistory(prev => [...prev, { command: trimmed, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      const match = availableCommands.find(c => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Developer Terminal"
    >
      <div 
        className={`relative w-full ${
          isMaximized ? 'h-[94vh] max-w-6xl' : 'max-w-3xl h-[560px]'
        } flex flex-col rounded-2xl border ${
          isMatrixMode ? 'border-emerald-500/60 shadow-emerald-950/60 bg-[#020b05]' : 'border-purple-500/30 bg-[#0a0d1f] shadow-purple-950/40'
        } shadow-2xl overflow-hidden transition-all duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-black/60 select-none">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block cursor-pointer" onClick={onClose} />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block cursor-pointer" onClick={() => setIsMaximized(false)} />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
            <div className="ml-3 flex items-center gap-1.5 text-xs font-mono text-slate-300">
              <TerminalIcon className="h-3.5 w-3.5 text-purple-400" />
              <span>krupa@portfolio-dev: ~ (bash)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-white"
              title={isMaximized ? "Restore window" : "Maximize window"}
            >
              {isMaximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-white"
              title="Close terminal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-mono text-xs ${
            isMatrixMode ? 'text-emerald-400' : 'text-slate-200'
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400 font-bold">krupa@portfolio:~$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <div className="pl-4 pt-1">{item.output}</div>
            </div>
          ))}

          {/* Active Command Input Line */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-emerald-400 font-bold shrink-0">krupa@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white font-mono text-xs focus:outline-none caret-cyan-400"
              autoFocus
              spellCheck={false}
            />
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Status Footer */}
        <div className="border-t border-white/10 px-4 py-2 bg-black/40 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>[Tab] Autocomplete</span>
            <span>[↑↓] History</span>
            <span>'help' for commands</span>
          </div>
          <span>UTF-8 • Connected</span>
        </div>
      </div>
    </div>
  );
};
