import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Search, 
  Tag, 
  Sparkles, 
  Calendar, 
  Globe,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';
import { techDiscoveries } from '../../data/portfolioData';
import { TechDiscovery } from '../../types';

export const TechDiscoveriesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('krupa_bookmarked_discoveries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const categories = ['All', 'AI & LLMs', 'Machine Learning', 'Web Tech', 'Developer Tools'];

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('krupa_bookmarked_discoveries', JSON.stringify(updated));
      return updated;
    });
  };

  const filtered = techDiscoveries.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featured = techDiscoveries.find(d => d.featured) || techDiscoveries[0];

  return (
    <section id="discoveries" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background Section Glow */}
      <div className="absolute top-1/3 left-10 h-96 w-96 rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-xs font-mono text-purple-300 mb-3">
          <Compass className="h-3.5 w-3.5 text-cyan-400" />
          <span>TECH RADAR & INNOVATIONS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Tech <span className="text-gradient">Discoveries</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Curated breakthroughs in Artificial Intelligence, agentic developer loops, multimodal research, and modern web architectures.
        </p>
      </div>

      {/* Featured Spotlight Card */}
      {featured && (
        <div className="glass-panel p-8 rounded-3xl mb-12 relative overflow-hidden group border-purple-500/40">
          <div className="absolute top-0 right-0 h-48 w-48 bg-purple-600/20 blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-gradient-to-r from-purple-600 to-cyan-500 text-white">
                  <Sparkles className="h-3 w-3" /> Featured Spotlight
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {featured.category} • {featured.publishedDate}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                {featured.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {featured.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {featured.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-white/[0.04] text-purple-300 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => toggleBookmark(featured.id)}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-2 text-xs font-mono"
              >
                {bookmarkedIds.includes(featured.id) ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 text-cyan-400" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    <span>Bookmark</span>
                  </>
                )}
              </button>

              <a
                href={featured.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30"
              >
                <span>Read Original Research</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discoveries..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50"
          />
        </div>
      </div>

      {/* Discoveries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const isSaved = bookmarkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="glass-panel p-6 rounded-3xl flex flex-col justify-between group hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 bg-purple-950/40 px-2.5 py-0.5 rounded-md border border-purple-500/20">
                    {item.category}
                  </span>

                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    title={isSaved ? "Remove bookmark" : "Save bookmark"}
                  >
                    {isSaved ? <BookmarkCheck className="h-4 w-4 text-cyan-400" /> : <Bookmark className="h-4 w-4" />}
                  </button>
                </div>

                <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors tracking-tight line-clamp-2">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-[11px] text-slate-500">{item.publishedDate}</span>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>{item.sourceName}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
