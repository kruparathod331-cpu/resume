import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';

// Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollProgress } from './components/common/ScrollProgress';
import { CustomCursor } from './components/common/CustomCursor';
import { CommandPalette } from './components/common/CommandPalette';
import { DigitalBusinessCard } from './components/common/DigitalBusinessCard';
import { ResumeModal } from './components/common/ResumeModal';
import { WelcomeScreen } from './components/welcome/WelcomeScreen';
import { VideoIntroModal } from './components/welcome/VideoIntroModal';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { TechStackSection } from './components/skills/TechStackSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { CertificatesSection } from './components/certificates/CertificatesSection';
import { GitHubDashboard } from './components/github/GitHubDashboard';
import { Workspace3D } from './components/workspace/Workspace3D';
import { CodingPlayground } from './components/playground/CodingPlayground';
import { TechDiscoveriesSection } from './components/discoveries/TechDiscoveriesSection';
import { CurrentlyBuildingSection } from './components/now/CurrentlyBuildingSection';
import { ContactSection } from './components/contact/ContactSection';
import { DeveloperTerminal } from './components/terminal/DeveloperTerminal';
import { AIAssistantWidget } from './components/assistant/AIAssistantWidget';
import { ThemeStudioModal } from './components/theme/ThemeStudioModal';

export function AppContent() {
  const [welcomeOpen, setWelcomeOpen] = useState<boolean>(() => {
    // Show cinematic welcome on fresh visits, or remember if entered this session
    return sessionStorage.getItem('krupa_welcome_entered') !== 'true';
  });

  const [videoIntroOpen, setVideoIntroOpen] = useState(false);
  const [themeStudioOpen, setThemeStudioOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const handleEnterPortfolio = () => {
    sessionStorage.setItem('krupa_welcome_entered', 'true');
    setWelcomeOpen(false);
  };

  const handleReopenWelcome = () => {
    setWelcomeOpen(true);
  };

  // Global keyboard shortcuts:
  // - Ctrl + K / Cmd + K -> Command Palette
  // - ~ or ` or Ctrl + ' -> Terminal
  // - Alt + T -> Theme Studio
  // - Alt + A -> AI Assistant
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      } else if (e.key === '`' && !e.ctrlKey && !e.altKey) {
        // Toggle terminal only when not typing inside input/textarea
        const tag = (e.target as HTMLElement).tagName.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault();
          setTerminalOpen(prev => !prev);
        }
      } else if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setThemeStudioOpen(prev => !prev);
      } else if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAiAssistantOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      {/* Scroll Progress Bar at very top */}
      <ScrollProgress />

      {/* Custom Desktop Halo Cursor */}
      <CustomCursor />

      {/* Cinematic Welcome Screen on initial load */}
      {welcomeOpen && (
        <WelcomeScreen
          onEnter={handleEnterPortfolio}
          onOpenVideo={() => setVideoIntroOpen(true)}
        />
      )}

      {/* Top Navigation */}
      <Navbar
        onOpenThemeStudio={() => setThemeStudioOpen(true)}
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenCard={() => setCardOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative">
        {/* Section 4: Main Hero */}
        <HeroSection
          onOpenResume={() => setResumeOpen(true)}
          onOpenAIAssistant={() => setAiAssistantOpen(true)}
        />

        {/* Section 5 & 12: About Me & My Journey Timeline */}
        <AboutSection />

        {/* Section 8: Interactive Tech Stack */}
        <TechStackSection />

        {/* Section 9: Project Lab */}
        <ProjectsSection />

        {/* Section 10: Verified Certificates & Achievements */}
        <CertificatesSection />

        {/* Section 11: GitHub Activity Sync */}
        <GitHubDashboard />

        {/* Section 14: Virtual 3D Developer Workspace */}
        <Workspace3D
          onOpenProjects={() => scrollTo('projects')}
          onOpenGitHub={() => scrollTo('github')}
          onOpenSkills={() => scrollTo('skills')}
          onOpenAbout={() => scrollTo('about')}
        />

        {/* Section 15: Coding Playground */}
        <CodingPlayground />

        {/* Section 16: Tech Discoveries Radar */}
        <TechDiscoveriesSection />

        {/* Section 17: Currently Building / Now Page */}
        <CurrentlyBuildingSection />

        {/* Section 18 & 19: Contact and Connect + Feedback Widget */}
        <ContactSection />
      </main>

      {/* Section 20: Footer */}
      <Footer
        onOpenThemeStudio={() => setThemeStudioOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCard={() => setCardOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenWelcome={handleReopenWelcome}
      />

      {/* Floating Personal AI Assistant (Section 7) */}
      <AIAssistantWidget
        isOpen={aiAssistantOpen}
        onToggle={() => setAiAssistantOpen(!aiAssistantOpen)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenProjects={() => scrollTo('projects')}
        onOpenContact={() => scrollTo('contact')}
      />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenThemeStudio={() => setThemeStudioOpen(true)}
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenCard={() => setCardOpen(true)}
        onOpenVideo={() => setVideoIntroOpen(true)}
      />

      {/* Interactive Developer Terminal (Section 13) */}
      <DeveloperTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenAIAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Interactive Theme Studio (Section 6) */}
      <ThemeStudioModal
        isOpen={themeStudioOpen}
        onClose={() => setThemeStudioOpen(false)}
      />

      {/* Interactive Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Digital Business Card Modal with QR Code */}
      <DigitalBusinessCard
        isOpen={cardOpen}
        onClose={() => setCardOpen(false)}
      />

      {/* Introduction Video Modal */}
      <VideoIntroModal
        isOpen={videoIntroOpen}
        onClose={() => setVideoIntroOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <AppContent />
      </AudioProvider>
    </ThemeProvider>
  );
}
