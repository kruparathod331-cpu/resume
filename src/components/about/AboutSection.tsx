import React from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  Target, 
  Cpu, 
  GraduationCap, 
  Languages, 
  HeartHandshake,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { profileData } from '../../data/portfolioData';
import { JourneyTimeline } from './JourneyTimeline';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-purple-600/10 blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-xs font-mono text-purple-300 mb-3">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>PERSONAL DIGITAL IDENTITY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About <span className="text-gradient">Me</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Curious mind, builder's mindset, and a relentless drive to turn emerging technologies into impactful real-world software.
        </p>
      </div>

      {/* Main Bio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
        {/* Left Column: Portrait & Key Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl relative overflow-hidden">
            {/* Ambient Corner Flare */}
            <div className="absolute top-0 right-0 h-32 w-32 bg-purple-500/20 blur-2xl pointer-events-none" />

            <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-lg">
              <img
                src={profileData.profilePhoto}
                alt={profileData.fullName}
                className="h-full w-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1024] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
                <span className="bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                  GEC Gandhinagar
                </span>
                <span className="bg-purple-900/60 text-purple-300 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-purple-500/30">
                  CSE Undergrad
                </span>
              </div>
            </div>

            {/* Quick Metrics & Badges */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-cyan-400" /> Education
                </span>
                <span className="text-white font-medium text-right text-[11px] max-w-[200px]">
                  B.Tech CSE @ GEC Gandhinagar
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 flex items-center gap-2">
                  <Languages className="h-4 w-4 text-purple-400" /> Languages
                </span>
                <span className="text-white font-medium">
                  {profileData.languages.join(' • ')}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 flex items-center gap-2">
                  <HeartHandshake className="h-4 w-4 text-amber-400" /> Hackathons
                </span>
                <span className="text-emerald-400 font-medium">
                  Active Participant & Finalist
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Story & Engineering Approach (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-8 rounded-3xl space-y-5">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-cyan-400" />
              <span>A Curious Mind with a Builder's Mindset</span>
            </h3>

            <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                I am a Computer Science student at <strong className="text-white">Government Engineering College, Gandhinagar (GEC Gandhinagar)</strong>, driven by an enduring curiosity to explore how <span className="text-purple-300 font-semibold">Artificial Intelligence, Machine Learning, and Full-Stack Engineering</span> can converge to create meaningful digital solutions.
              </p>
              <p>
                I believe in <strong className="text-cyan-300">learning by doing</strong> — experimenting far beyond traditional coursework, collaborating with peers, and building real-world projects that solve actual challenges. From building <em>FitCheck</em> (ATS resume parsing with spaCy NLP) to conceptualizing <em>GRANTLY</em> (AI-powered scholarship discovery) and <em>ShopSmart AI</em>, I love bringing ideas from mental whiteboard to live deployments.
              </p>
              <p className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-purple-200 text-sm font-mono italic">
                "{profileData.tagline} Stay curious. Build fearlessly. Learn endlessly. Innovate constantly."
              </p>
            </div>

            {/* Core Values / Problem Solving Approach */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                <Target className="h-4 w-4 text-purple-400" /> My Approach to Problem Solving
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-white font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>User-Centric Empathy</span>
                  </div>
                  <p className="text-slate-400">
                    Understanding the real friction points before writing a single line of architecture.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-white font-semibold">
                    <Cpu className="h-4 w-4 text-cyan-400" />
                    <span>Practical AI Integration</span>
                  </div>
                  <p className="text-slate-400">
                    Leveraging NLP, machine learning, and LLMs for genuine utility rather than decorative buzzwords.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-white font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-purple-400" />
                    <span>Clean & Scalable Code</span>
                  </div>
                  <p className="text-slate-400">
                    Strong object-oriented fundamentals, modular component trees, and transparent APIs.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-white font-semibold">
                    <Compass className="h-4 w-4 text-amber-400" />
                    <span>Continuous Exploration</span>
                  </div>
                  <p className="text-slate-400">
                    Participating in hackathons, experimenting with emerging research, and refining workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 12 & Journey: Interactive Vertical Timeline */}
      <div id="journey" className="pt-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-xs font-mono text-cyan-300 mb-2">
            <Compass className="h-3.5 w-3.5" />
            <span>PROGRESSION & MILESTONES</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            My Learning <span className="text-gradient">Journey</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-mono">
            Chronicle of education at GEC Gandhinagar, technical hackathons, and software exploration.
          </p>
        </div>

        <JourneyTimeline />
      </div>
    </section>
  );
};
