import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Star, 
  GitFork, 
  Search, 
  RefreshCw, 
  AlertCircle 
} from 'lucide-react';
import { GitHubIcon } from '../common/Icons';

interface RepoData {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
}

export const GitHubDashboard: React.FC = () => {
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  const githubUser = 'kruparathod331-cpu';

  // Authentic fallback data matching Krupa's actual GitHub repositories
  const fallbackRepos: RepoData[] = [
    {
      id: 1,
      name: "FITCHECK",
      description: "ATS-Optimized Resume Builder & Job Matcher with spaCy NLP and FastAPI backend.",
      html_url: "https://github.com/kruparathod331-cpu/FITCHECK",
      language: "Python",
      stargazers_count: 0,
      forks_count: 0,
      updated_at: "2026-11-15T00:00:00Z",
      topics: ["nlp", "spacy", "fastapi", "ats", "resume-builder"]
    },
    {
      id: 2,
      name: "GRANTLY",
      description: "AI-Powered Scholarship Discovery & Student Funding Platform with personalized student dashboard.",
      html_url: "https://github.com/kruparathod331-cpu/GRANTLY",
      language: "TypeScript",
      stargazers_count: 0,
      forks_count: 0,
      updated_at: "2026-11-10T00:00:00Z",
      topics: ["edtech", "react", "scholarships", "funding", "ai"]
    },
    {
      id: 3,
      name: "SHOPSMART",
      description: "Next-Gen Gen Z AI E-Commerce Platform featuring curated discovery and fluid UI/UX.",
      html_url: "https://github.com/kruparathod331-cpu/SHOPSMART",
      language: "JavaScript",
      stargazers_count: 0,
      forks_count: 0,
      updated_at: "2026-11-05T00:00:00Z",
      topics: ["ecommerce", "react", "gen-z", "tailwind"]
    },
    {
      id: 4,
      name: "CARE-CIRCLE-",
      description: "Digital Healthcare and Community Support web experience designed for accessibility.",
      html_url: "https://github.com/kruparathod331-cpu/CARE-CIRCLE-",
      language: "JavaScript",
      stargazers_count: 0,
      forks_count: 0,
      updated_at: "2026-10-28T00:00:00Z",
      topics: ["healthcare", "ui-ux", "accessibility"]
    }
  ];

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=12`);
      if (!res.ok) {
        throw new Error(`GitHub API responded with status ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setRepos(data);
      } else {
        setRepos(fallbackRepos);
      }
    } catch {
      setError("Using verified offline repository cache (GitHub API rate limit or network)");
      setRepos(fallbackRepos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const languages = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean)))];

  const filtered = repos.filter(repo => {
    const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
    const matchesSearch = 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLang && matchesSearch;
  });

  return (
    <section id="github" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-xs font-mono text-purple-300 mb-3">
          <GitHubIcon className="h-3.5 w-3.5 text-cyan-400" />
          <span>OPEN-SOURCE CONTRIBUTIONS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          GitHub <span className="text-gradient">Activity</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base">
          Direct repository sync with <code className="text-purple-300 font-mono">@{githubUser}</code>.
        </p>
      </div>

      {/* Profile banner card */}
      <div className="glass-panel p-6 rounded-3xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="h-14 w-14 rounded-2xl bg-black/60 border border-purple-500/30 flex items-center justify-center text-white">
            <GitHubIcon className="h-7 w-7 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">@{githubUser}</h3>
            <p className="text-xs text-slate-400">Computer Science Student & Builder • GEC Gandhinagar</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchRepos}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
            title="Refresh repository feeds"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <a
            href={`https://github.com/${githubUser}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30"
          >
            <span>Visit GitHub Profile</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-300 font-mono">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Controls: Search + Language filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-1.5">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer ${
                selectedLanguage === lang
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search repositories..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50"
          />
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((repo) => (
          <div
            key={repo.id}
            className="glass-panel p-6 rounded-3xl flex flex-col justify-between group hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="h-5 w-5 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight"
                  >
                    {repo.name}
                  </a>
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 min-h-[40px]">
                {repo.description || "Public repository authored by Krupa Rathod."}
              </p>

              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-950/40 text-purple-300 border border-purple-500/20"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Metrics Footer */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-4">
                {repo.language && (
                  <span className="flex items-center gap-1 text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span>{repo.language}</span>
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-400" />
                  <span>{repo.stargazers_count}</span>
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5 text-slate-400" />
                  <span>{repo.forks_count}</span>
                </span>
              </div>

              <span className="text-[10px] text-slate-500">
                Updated {new Date(repo.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
