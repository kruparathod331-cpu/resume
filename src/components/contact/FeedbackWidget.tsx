import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ThumbsUp, Flame, Rocket, Heart, Sparkles } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const FeedbackWidget: React.FC = () => {
  const { playChime, playBlip } = useAudio();
  const [selectedReaction, setSelectedReaction] = useState<string | null>(() => {
    return localStorage.getItem('krupa_portfolio_reaction');
  });

  const reactions = [
    { id: 'rocket', label: 'Futuristic', icon: <Rocket className="h-4 w-4" /> },
    { id: 'fire', label: 'Inspiring', icon: <Flame className="h-4 w-4" /> },
    { id: 'thumbsup', label: 'Clean UI', icon: <ThumbsUp className="h-4 w-4" /> },
    { id: 'heart', label: 'Creative', icon: <Heart className="h-4 w-4" /> },
  ];

  const handleReact = (id: string) => {
    playBlip(1000);
    setSelectedReaction(id);
    localStorage.setItem('krupa_portfolio_reaction', id);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#a855f7', '#3b82f6', '#06b6d4']
    });
  };

  return (
    <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-center space-y-3">
      <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-purple-300">
        <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
        <span>VISITOR IMPRESSION</span>
      </div>
      <p className="text-sm font-semibold text-white">How did you enjoy the digital experience?</p>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        {reactions.map((r) => {
          const isSelected = selectedReaction === r.id;
          return (
            <button
              key={r.id}
              onClick={() => handleReact(r.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40 scale-105'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {r.icon}
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>

      {selectedReaction && (
        <p className="text-xs font-mono text-cyan-400 animate-fade-in pt-1">
          Thank you for exploring! Your feedback is saved locally.
        </p>
      )}
    </div>
  );
};
