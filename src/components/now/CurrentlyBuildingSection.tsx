import React from 'react';
import { 
  Flame, 
  BookOpen, 
  Sparkles, 
  Cpu, 
  CheckCircle, 
  Clock, 
  Compass, 
  Layers 
} from 'lucide-react';
import { currentlyBuildingData } from '../../data/portfolioData';

export const CurrentlyBuildingSection: React.FC = () => {
  const lastUpdated = "November 2026";

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'building':
        return { label: 'Building', color: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30', icon: <Flame className="h-3.5 w-3.5 text-emerald-400" /> };
      case 'learning':
        return { label: 'Learning', color: 'bg-purple-950/60 text-purple-300 border-purple-500/30', icon: <Cpu className="h-3.5 w-3.5 text-purple-400" /> };
      case 'exploring':
        return { label: 'Exploring', color: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30', icon: <Compass className="h-3.5 w-3.5 text-cyan-400" /> };
      case 'improving':
        return { label: 'Improving', color: 'bg-blue-950/60 text-blue-300 border-blue-500/30', icon: <Layers className="h-3.5 w-3.5 text-blue-400" /> };
      case 'reading':
        return { label: 'Reading', color: 'bg-amber-950/60 text-amber-300 border-amber-500/30', icon: <BookOpen className="h-3.5 w-3.5 text-amber-400" /> };
      default:
        return { label: 'Active', color: 'bg-white/10 text-white border-white/20', icon: <Sparkles className="h-3.5 w-3.5" /> };
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden border-purple-500/30 shadow-2xl">
        {/* Header with Last Updated badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE PULSE / NOW PAGE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What I'm <span className="text-gradient">Currently Building</span>
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/10 shrink-0">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>Updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Real-time Focus Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentlyBuildingData.map((item, idx) => {
            const badge = getTypeBadge(item.type);
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 flex flex-col justify-between hover:bg-white/[0.04] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${badge.color}`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                      {item.tag}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                {item.progressPercent !== undefined && (
                  <div className="pt-2">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>Sprint Velocity</span>
                      <span className="text-purple-300 font-bold">{item.progressPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-black/50 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                        style={{ width: `${item.progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
