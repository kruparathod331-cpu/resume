import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Lightbulb, 
  AlertCircle, 
  GraduationCap, 
  Calendar,
  Copy,
  Check
} from 'lucide-react';
import { GitHubIcon } from '../common/Icons';
import { ProjectItem } from '../../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'architecture' | 'learnings'>('overview');
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const copyProjectLink = () => {
    navigator.clipboard.writeText(project.liveDemoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-purple-500/30 bg-[#0c1024] shadow-2xl shadow-purple-950/50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-purple-500/20 px-6 py-4 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {project.status}
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyProjectLink}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Copy live demo link"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Hero Banner with Thumbnail & CTA */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-950 shrink-0">
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="h-full w-full object-cover object-center filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1024] via-[#0c1024]/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-purple-300 font-medium drop-shadow-sm mt-1">
                Role: {project.role}
              </p>
            </div>

            <div className="flex gap-2.5">
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold shadow-lg hover:brightness-110 transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-white text-xs font-semibold hover:bg-white/10 transition-all"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex border-b border-purple-500/20 bg-slate-900/40 px-6 gap-2 text-xs font-mono font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-purple-500 text-purple-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Overview & Problem
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'features'
                ? 'border-purple-500 text-purple-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Key Features ({project.keyFeatures.length})
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'architecture'
                ? 'border-purple-500 text-purple-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Architecture & Tech Stack
          </button>
          <button
            onClick={() => setActiveTab('learnings')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'learnings'
                ? 'border-purple-500 text-purple-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Challenges & Learnings
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4" /> Project Overview
                </h4>
                <div className="text-slate-200 space-y-3 whitespace-pre-line text-sm">
                  {project.detailedExplanation}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4" /> The Problem Statement
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm">
                  {project.problemStatement}
                </p>
              </div>

              {/* Technologies Badges */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Cpu className="h-4 w-4 text-cyan-400" /> Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-purple-950/40 border border-purple-500/30 text-purple-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Core Functionality & Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                  <Layers className="h-4 w-4" /> Solution Architecture
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  {project.solutionArchitecture}
                </p>
              </div>

              {/* Development Timeline if present */}
              {project.timeline && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 mb-3 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" /> Engineering Milestones
                  </h4>
                  <div className="space-y-2.5">
                    {project.timeline.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs"
                      >
                        <span className="text-cyan-400 font-bold shrink-0">{`[Phase 0${idx + 1}]`}</span>
                        <div>
                          <strong className="text-white block font-sans text-sm">{step.phase}</strong>
                          <span className="text-slate-400 text-xs font-sans">{step.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'learnings' && (
            <div className="space-y-6">
              {/* Challenges */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4" /> Engineering Challenges Overcome
                </h4>
                <div className="space-y-2.5">
                  {project.challenges.map((challenge, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-amber-950/15 border border-amber-500/20 text-xs sm:text-sm text-slate-300"
                    >
                      • {challenge}
                    </div>
                  ))}
                </div>
              </div>

              {/* What I Learned */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4" /> Key Takeaways & Competencies
                </h4>
                <div className="space-y-2">
                  {project.whatILearned.map((learning, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs sm:text-sm text-slate-300 flex items-start gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{learning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-purple-500/20 px-6 py-3.5 bg-slate-900/80 text-xs text-slate-400">
          <span className="font-mono">Repository: {project.githubUrl.replace('https://github.com/', '@')}</span>
          <div className="flex gap-2">
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-colors flex items-center gap-1"
            >
              <span>Visit Live App</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
