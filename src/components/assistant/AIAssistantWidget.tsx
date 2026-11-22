import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Trash2, 
  ExternalLink
} from 'lucide-react';
import { profileData } from '../../data/portfolioData';
import { useAudio } from '../../context/AudioContext';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  links?: { label: string; url: string }[];
}

interface AIAssistantWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenResume: () => void;
  onOpenProjects: () => void;
  onOpenContact: () => void;
}

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({
  isOpen,
  onToggle,
  onOpenResume,
  onOpenProjects,
  onOpenContact
}) => {
  const { playBlip } = useAudio();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hello! I'm KrupaBot, Krupa Rathod's personal digital assistant. 🤖✨\n\nI can answer questions about Krupa's Computer Science degree at GEC Gandhinagar, technical skills, production applications (ShopSmart AI, FitCheck, GRANTLY), verified hackathon certificates, or contact details.\n\nWhat would you like to explore?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickQuestions = [
    "Who is Krupa Rathod?",
    "Show me her best projects",
    "What technologies does she know?",
    "Where is her resume?",
    "Tell me about her hackathons & certificates",
    "How can I contact Krupa?"
  ];

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Speech-to-Text handler
  const toggleListening = () => {
    playBlip(700);
    const win = window as unknown as Record<string, unknown>;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported by your current browser. You can type your question in the text box.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognition as any)();
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
        handleSend(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Text-to-Speech handler
  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  // Grounded Intelligence Engine (strictly based on Krupa's actual portfolio data)
  const processQuery = (rawQuery: string): { reply: string; links?: { label: string; url: string }[] } => {
    const q = rawQuery.toLowerCase();

    // 1. Identity & About
    if (q.includes('who are you') || q.includes('who is krupa') || q.includes('about') || q.includes('introduction')) {
      return {
        reply: `Krupa Rathod is an Aspiring AI/ML Engineer and Full-Stack Developer currently pursuing her B.Tech in Computer Science & Engineering at Government Engineering College, Gandhinagar (GEC Gandhinagar), Gujarat.\n\nShe is a builder and curious problem-solver who combines machine learning, NLP, and modern web architectures. Her mindset: "Stay curious. Build fearlessly. Learn endlessly. Innovate constantly." 🚀`,
        links: [
          { label: 'View About Section', url: '#about' },
          { label: 'LinkedIn Profile', url: profileData.socialLinks.linkedin }
        ]
      };
    }

    // 2. Projects
    if (q.includes('project') || q.includes('built') || q.includes('work') || q.includes('portfolio') || q.includes('shopsmart') || q.includes('fitcheck') || q.includes('grantly')) {
      return {
        reply: `Krupa has conceptualized and deployed 4 key production applications on Vercel:\n\n1. **FitCheck** – ATS-Optimized Resume Builder & Job Matcher with spaCy NLP and FastAPI.\n2. **ShopSmart AI** – Next-Gen Gen Z AI E-Commerce Platform.\n3. **GRANTLY** – AI-Powered Scholarship Discovery & Student Funding Dashboard.\n4. **CareCircle** – Accessible Healthcare & Community Support Web Platform.\n\nAll projects are live on Vercel with active GitHub repositories!`,
        links: [
          { label: 'Explore Project Lab', url: '#projects' },
          { label: 'FitCheck Live Demo', url: 'https://fitcheck-czjy.vercel.app/' },
          { label: 'ShopSmart AI Live Demo', url: 'https://frontend-eight-livid-19.vercel.app/' },
          { label: 'GRANTLY Live Demo', url: 'https://grantly-6084.vercel.app/' }
        ]
      };
    }

    // 3. Skills & Technologies
    if (q.includes('skill') || q.includes('technology') || q.includes('tech stack') || q.includes('language') || q.includes('python') || q.includes('react')) {
      return {
        reply: `Here is a summary of Krupa's technical capabilities:\n\n• **Languages:** Python, JavaScript, C, C++, Java\n• **Frontend:** React.js, Tailwind CSS, HTML5, CSS3, Bootstrap\n• **Backend:** FastAPI, Flask, Node.js, Express.js, REST APIs\n• **Databases:** PostgreSQL, MongoDB, MySQL, Firebase, SQLite\n• **AI / ML & NLP:** spaCy, Scikit-learn, TensorFlow, PyTorch, Pandas, NumPy, Matplotlib\n• **Tools & Platforms:** VS Code, Git, GitHub, Postman, Docker, Figma, Vercel, Render.`,
        links: [
          { label: 'View Interactive Skills Grid', url: '#skills' }
        ]
      };
    }

    // 4. Certificates & Hackathons
    if (q.includes('certificate') || q.includes('hackathon') || q.includes('achievement') || q.includes('award') || q.includes('credential')) {
      return {
        reply: `Krupa holds 6 verified certifications and hackathon credentials:\n\n1. **THE OUTPOST** – 6-Hour Frontend Hackathon (Frontend Arena & Unstop, Credential ID: FA-WGF4FLKW)\n2. **Claude Code 101** – Course Completion Badge (Claude Academy)\n3. **Breakpoint Hackathon 2026** – Idea Submission, Team GhostProtocol (Unstop)\n4. **Eureka Idea-Presentation** – Certificate of Achievement (E-Cell GEC Gandhinagar / SSIP / IIC)\n5. **Fund My Crazy: Build Night** – Google Student Ambassador Program 2026 (Gemini Multimodal)\n6. **AI in Action Job Simulation** – Forage & Vista Certification.`,
        links: [
          { label: 'View High-Res Certificates', url: '#certificates' }
        ]
      };
    }

    // 5. Resume
    if (q.includes('resume') || q.includes('cv') || q.includes('download') || q.includes('hire')) {
      return {
        reply: `You can view and print Krupa's complete ATS-optimized curriculum vitae right now through the interactive Resume modal on this website!`,
        links: [
          { label: 'Open Resume Viewer', url: '#resume' },
          { label: 'Connect on LinkedIn', url: profileData.socialLinks.linkedin }
        ]
      };
    }

    // 6. Contact & Email
    if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('github') || q.includes('reach') || q.includes('message')) {
      return {
        reply: `You can connect with Krupa through:\n\n• **Email:** kr.rathod331@gmail.com\n• **LinkedIn:** linkedin.com/in/krupa-rathod-4a1172423\n• **GitHub:** github.com/kruparathod331-cpu\n• **Campus:** Government Engineering College, Gandhinagar, Gujarat`,
        links: [
          { label: 'Send a Message', url: '#contact' }
        ]
      };
    }

    // 7. Education
    if (q.includes('education') || q.includes('college') || q.includes('gec') || q.includes('degree') || q.includes('study')) {
      return {
        reply: `Krupa is pursuing her Bachelor of Technology (B.Tech) in Computer Science & Engineering at Government Engineering College, Gandhinagar (GEC Gandhinagar). Her coursework covers Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Software Engineering.`,
        links: [
          { label: 'View Timeline Milestones', url: '#journey' }
        ]
      };
    }

    // 8. Default fallback grounded response
    return {
      reply: `Thank you for asking! As Krupa's digital companion, I have access to her verified education at GEC Gandhinagar, technical stack (Python, FastAPI, React, spaCy, PostgreSQL), deployed projects (ShopSmart AI, FitCheck, GRANTLY), and hackathon credentials.\n\nTry clicking one of the suggested prompts below, or ask me directly about her projects, skills, or resume!`,
      links: [
        { label: 'Explore Projects', url: '#projects' },
        { label: 'View Skills', url: '#skills' }
      ]
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    playBlip(850);
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processQuery(text);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        links: response.links
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
      speakText(response.reply);
    }, 550);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Chat session refreshed. How can I assist your exploration of Krupa Rathod's portfolio today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleLinkClick = (url: string) => {
    if (url === '#resume') {
      onOpenResume();
    } else if (url === '#projects') {
      onOpenProjects();
    } else if (url === '#contact') {
      onOpenContact();
    } else if (url.startsWith('#')) {
      const el = document.getElementById(url.replace('#', ''));
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <>
      {/* Floating Robot Companion Trigger (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onToggle}
          className="relative group flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-500 p-[2px] shadow-2xl shadow-purple-900/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Open KrupaBot AI Assistant"
        >
          {/* Animated pulsing outer halo */}
          <span className="absolute -inset-1 rounded-2xl bg-cyan-400 opacity-30 blur-md group-hover:opacity-60 animate-pulse transition-opacity" />

          <div className="relative h-full w-full bg-[#0c1024] rounded-[14px] flex items-center justify-center overflow-hidden">
            {/* Expressive Glowing Eyes Robot Graphic */}
            <div className="relative flex flex-col items-center">
              <div className="flex gap-1.5 mb-0.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              </div>
              <span className="h-1 w-3 rounded-full bg-purple-400" />
            </div>

            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-2 ring-[#0c1024] animate-ping" />
            )}
          </div>
        </button>
      </div>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 ${
            isMaximized
              ? 'inset-3 sm:inset-8'
              : 'bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[440px] h-[580px] max-h-[85vh]'
          } flex flex-col rounded-3xl border border-purple-500/40 bg-[#0c1024] shadow-2xl shadow-purple-950/60 overflow-hidden animate-fade-in`}
        >
          {/* Top Bar with Status & Controls */}
          <div className="flex items-center justify-between border-b border-purple-500/20 px-5 py-3.5 bg-slate-900/90 select-none">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300">
                <Bot className="h-5 w-5 text-cyan-300" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0c1024]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-white text-sm">KrupaBot AI</h3>
                  <span className="text-[10px] font-mono text-purple-300 px-1.5 py-0.2 rounded bg-purple-950/60 border border-purple-500/30">v2.6</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">Grounded Portfolio Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  voiceEnabled ? 'text-cyan-400 bg-cyan-950/50' : 'hover:text-white'
                }`}
                title={voiceEnabled ? "Voice Speech ON (Click to mute)" : "Voice Speech OFF (Click to enable)"}
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>

              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg hover:text-rose-400 transition-colors cursor-pointer"
                title="Clear conversation"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1.5 rounded-lg hover:text-white transition-colors hidden sm:block cursor-pointer"
                title={isMaximized ? "Restore window" : "Maximize window"}
              >
                {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>

              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg hover:text-white transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm bg-[#0a0d1f]">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}
                >
                  {isBot && (
                    <div className="h-7 w-7 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-2 ${isBot ? '' : 'text-right'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-left leading-relaxed ${
                        isBot
                          ? 'bg-[#121838] border border-purple-500/20 text-slate-200'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                      }`}
                    >
                      <p className="whitespace-pre-line text-xs sm:text-sm">{msg.text}</p>

                      {msg.links && msg.links.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 mt-2 border-t border-white/10">
                          {msg.links.map((link, lIdx) => (
                            <button
                              key={lIdx}
                              onClick={() => handleLinkClick(link.url)}
                              className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-900/60 transition-colors cursor-pointer"
                            >
                              <span>{link.label}</span>
                              <ExternalLink className="h-2.5 w-2.5" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span>KrupaBot is synthesizing response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts Bar */}
          <div className="p-2 border-t border-white/5 bg-black/40 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-300 bg-white/5 hover:bg-purple-900/40 hover:text-white border border-white/5 transition-colors cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Bottom Chat Input Form */}
          <div className="p-3 bg-slate-900/90 border-t border-purple-500/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
                    : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
                }`}
                title="Voice input (Speech to text)"
              >
                {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </button>

              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about projects, skills, hackathons..."
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/60"
              />

              <button
                type="submit"
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer shadow-md shadow-purple-600/30"
                title="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
