import React, { useState } from 'react';
import { 
  Code2, 
  Search, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Cpu, 
  Database, 
  Server, 
  Globe, 
  Terminal, 
  Boxes
} from 'lucide-react';
import { skillsData } from '../../data/portfolioData';
import { SkillItem } from '../../types';

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Technologies', icon: <Layers className="h-3.5 w-3.5" /> },
    { id: 'languages', label: 'Languages', icon: <Code2 className="h-3.5 w-3.5" /> },
    { id: 'frontend', label: 'Frontend', icon: <Globe className="h-3.5 w-3.5" /> },
    { id: 'backend', label: 'Backend', icon: <Server className="h-3.5 w-3.5" /> },
    { id: 'databases', label: 'Databases', icon: <Database className="h-3.5 w-3.5" /> },
    { id: 'ai_ml', label: 'AI & Machine Learning', icon: <Cpu className="h-3.5 w-3.5" /> },
    { id: 'tools', label: 'Dev Tools', icon: <Terminal className="h-3.5 w-3.5" /> },
    { id: 'cloud', label: 'Cloud & Deploy', icon: <Globe className="h-3.5 w-3.5" /> },
    { id: 'core', label: 'Engineering Core', icon: <Boxes className="h-3.5 w-3.5" /> },
  ];

  const filteredSkills = skillsData.filter((skill: SkillItem) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background flare */}
      <div className="absolute top-1/2 left-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-xs font-mono text-purple-300 mb-3">
          <Code2 className="h-3.5 w-3.5 text-cyan-400" />
          <span>TECHNICAL ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          My <span className="text-gradient">Tech Stack</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Proven frameworks, programming languages, databases, and AI libraries applied across production web apps and hackathon prototypes.
        </p>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md max-w-full overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/50'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Live Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. spaCy, React)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Skills Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className="glass-panel p-5 rounded-2xl group relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            {/* Top row: Icon, Category badge, Doc Link */}
            <div className="flex items-start justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:text-cyan-300 group-hover:border-cyan-400/40 transition-all">
                <Code2 className="h-5 w-5" />
              </div>

              <div className="flex items-center gap-2">
                {skill.featured && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <Sparkles className="h-2.5 w-2.5" /> Core
                  </span>
                )}
                {skill.docUrl && (
                  <a
                    href={skill.docUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                    title={`View official ${skill.name} documentation`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Skill Name */}
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight mb-1">
              {skill.name}
            </h3>

            {/* Description */}
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
              {skill.description}
            </p>

            {/* Subtle bottom line highlight */}
            <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              <span>{skill.category.replace('_', ' ')}</span>
              <span className="text-purple-400/60 group-hover:text-cyan-400 transition-colors">Active</span>
            </div>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-sm glass-panel rounded-2xl">
          No technologies found matching "{searchQuery}". Try searching for Python, React, FastAPI, or PostgreSQL.
        </div>
      )}
    </section>
  );
};
