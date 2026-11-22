import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Search, 
  ArrowRight
} from 'lucide-react';
import { GitHubIcon } from '../common/Icons';
import { projectsData } from '../../data/portfolioData';
import { ProjectItem } from '../../types';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'AI / Machine Learning', 'Full Stack', 'Web Development', 'EdTech & Automation'];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-10 h-96 w-96 rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-xs font-mono text-purple-300 mb-3">
          <FolderGit2 className="h-3.5 w-3.5 text-cyan-400" />
          <span>PORTFOLIO SHOWCASE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Project <span className="text-gradient">Lab</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Real-world applications engineered with modern web stacks, NLP tokenizers, and human-centric design. Click any project to open its deep architectural breakdown.
        </p>
      </div>

      {/* Controls: Category Filter + Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/50'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by tech or name..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-panel rounded-3xl overflow-hidden group flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              {/* Thumbnail Container */}
              <div 
                className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer"
                onClick={() => setActiveProject(project)}
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1024] via-transparent to-transparent opacity-80" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>{project.status}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-mono text-purple-200 bg-purple-950/80 border border-purple-500/30 backdrop-blur-md">
                  {project.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 
                  onClick={() => setActiveProject(project)}
                  className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors cursor-pointer mb-2"
                >
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {project.shortDescription}
                </p>

                {/* Technology Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-white/[0.03] border border-white/5 text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-0.5 rounded-lg text-[11px] font-mono bg-white/[0.03] border border-white/5 text-slate-400">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => setActiveProject(project)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>View Architecture Case Study</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="GitHub Repository"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600/30 text-purple-200 border border-purple-500/30 text-xs font-semibold hover:bg-purple-600/50 transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-sm glass-panel rounded-3xl">
          No projects found matching "{searchQuery}".
        </div>
      )}

      {/* Case Study Modal */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
