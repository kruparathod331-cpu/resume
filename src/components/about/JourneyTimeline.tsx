import React from 'react';
import { Calendar, Tag, Sparkles, Compass, GraduationCap, Trophy, ArrowUpRight } from 'lucide-react';
import { journeyMilestones } from '../../data/portfolioData';

export const JourneyTimeline: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Education':
        return <GraduationCap className="h-4 w-4 text-cyan-400" />;
      case 'Hackathons':
        return <Trophy className="h-4 w-4 text-amber-400" />;
      case 'Innovation & Clubs':
        return <Sparkles className="h-4 w-4 text-purple-400" />;
      default:
        return <Compass className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <div className="relative mt-8">
      {/* Central Spine Line */}
      <div className="absolute top-4 bottom-4 left-4 sm:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-purple-500 via-cyan-400 to-blue-500/20" />

      <div className="space-y-12">
        {journeyMilestones.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={item.id}
              className={`relative flex flex-col sm:flex-row items-start ${
                isEven ? 'sm:flex-row-reverse' : ''
              } gap-6 sm:gap-12`}
            >
              {/* Center Glowing Indicator Icon */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-1.5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#060813] bg-[#0c1024] shadow-lg shadow-purple-900/50 z-10">
                {item.currentlyExploring ? (
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500" />
                  </span>
                ) : (
                  getCategoryIcon(item.category)
                )}
              </div>

              {/* Content Card (Left or Right on desktop) */}
              <div className="w-full sm:w-1/2 pl-12 sm:pl-0">
                <div
                  className={`glass-panel p-6 rounded-2xl relative ${
                    item.currentlyExploring
                      ? 'border-cyan-500/40 shadow-lg shadow-cyan-950/30'
                      : ''
                  }`}
                >
                  {/* Top row: Date & Currently Exploring badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-300">
                      <Calendar className="h-3.5 w-3.5 text-purple-400" />
                      {item.date}
                    </span>

                    {item.currentlyExploring ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                        <Sparkles className="h-3 w-3 animate-spin" /> Currently Exploring
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-white/[0.04] px-2.5 py-0.5 rounded-md"
                        >
                          <Tag className="h-2.5 w-2.5 text-purple-400" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.externalLink && (
                    <a
                      href={item.externalLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-200 font-mono"
                    >
                      <span>Explore details</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Spacer on desktop for alternate layout */}
              <div className="hidden sm:block sm:w-1/2" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
