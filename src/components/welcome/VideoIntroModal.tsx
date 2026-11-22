import React from 'react';
import { X, ExternalLink, Play, Film } from 'lucide-react';

interface VideoIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export const VideoIntroModal: React.FC<VideoIntroModalProps> = ({
  isOpen,
  onClose,
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Introduction Video"
    >
      <div 
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-purple-500/30 bg-[#0c1024] shadow-2xl shadow-purple-900/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-500/20 px-6 py-4 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
              <Film className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Personal Introduction Video</h3>
              <p className="text-xs text-slate-400">Watch Krupa Rathod's journey and engineering philosophy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Frame */}
        <div className="relative aspect-video w-full bg-black">
          {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
            <iframe
              src={videoUrl}
              title="Krupa Rathod Introduction"
              className="h-full w-full border-0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
              <Play className="h-16 w-16 text-purple-400/60 mb-4 animate-pulse" />
              <h4 className="text-lg font-medium text-white mb-2">Custom Video Preview</h4>
              <p className="text-sm text-slate-400 max-w-md mb-6">
                Connect your YouTube video URL or personal video file in <code className="text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded font-mono text-xs">src/data/portfolioData.ts</code>.
              </p>
              <a
                href="https://linkedin.com/in/krupa-rathod-4a1172423"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
              >
                Connect on LinkedIn <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-900/60 border-t border-purple-500/20 text-xs text-slate-400">
          <span>Non-autoplay experience | Respects audio preferences</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
