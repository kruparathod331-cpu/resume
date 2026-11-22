import React, { useState } from 'react';
import { 
  Palette, 
  X, 
  RotateCcw, 
  Dices, 
  Check, 
  Sparkles, 
  Sliders, 
  Eye, 
  Contrast, 
  Save 
} from 'lucide-react';
import { themePresets } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';
import { useAudio } from '../../context/AudioContext';

interface ThemeStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeStudioModal: React.FC<ThemeStudioModalProps> = ({ isOpen, onClose }) => {
  const { 
    currentThemeId, 
    themePreset, 
    customSettings, 
    setThemePreset, 
    updateCustomSettings, 
    resetTheme, 
    randomizeTheme,
    isCustom 
  } = useTheme();

  const { playBlip, playChime } = useAudio();
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [savedNotification, setSavedNotification] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (presetId: string) => {
    playBlip(750);
    setThemePreset(presetId);
  };

  const handleRandomize = () => {
    playChime();
    randomizeTheme();
  };

  const handleSaveNotification = () => {
    playChime();
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Theme Studio"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl border border-purple-500/30 bg-[#0c1024] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-500/20 px-6 py-4 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Interactive Theme Studio</h3>
              <p className="text-xs text-slate-400">Customize the site's palette, glows, radius & aesthetics</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomize}
              className="p-2 rounded-xl text-slate-300 hover:text-cyan-300 hover:bg-white/10 transition-colors"
              title="Surprise me with a random theme"
            >
              <Dices className="h-4 w-4" />
            </button>
            <button
              onClick={resetTheme}
              className="p-2 rounded-xl text-slate-300 hover:text-amber-300 hover:bg-white/10 transition-colors"
              title="Reset to default theme"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Toggle: Presets vs Custom Studio */}
        <div className="flex border-b border-white/10 bg-black/30 px-6 gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('presets')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'presets'
                ? 'border-purple-500 text-purple-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="h-3.5 w-3.5" />
            <span>Preset Themes (8)</span>
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'custom'
                ? 'border-purple-500 text-purple-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Custom Visual Engine</span>
          </button>
        </div>

        {/* Studio Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {activeTab === 'presets' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-400 font-mono">
                Select from 8 meticulously balanced color environments engineered for contrast and cyber readability:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {themePresets.map((preset) => {
                  const isSelected = currentThemeId === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-purple-400 bg-purple-950/40 shadow-lg shadow-purple-950/50 scale-[1.02]'
                          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
                          {preset.name}
                          {preset.id === 'midnight-purple' && (
                            <span className="text-[10px] text-purple-300 font-mono px-1.5 py-0.2 rounded bg-purple-900/60">Default</span>
                          )}
                        </span>
                        {isSelected && <Check className="h-4 w-4 text-cyan-400 shrink-0" />}
                      </div>

                      <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                        {preset.description}
                      </p>

                      {/* Swatch preview dots */}
                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: preset.primary }} />
                        <span className="h-4 w-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: preset.secondary }} />
                        <span className="h-4 w-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: preset.accent }} />
                        <span className="h-4 w-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: preset.bgPrimary }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Color Pickers */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                  Color Matrix
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-slate-300">Primary Color:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={customSettings.primary}
                        onChange={(e) => updateCustomSettings({ primary: e.target.value })}
                        className="h-7 w-7 rounded cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-slate-400 uppercase">{customSettings.primary}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-slate-300">Secondary Color:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={customSettings.secondary}
                        onChange={(e) => updateCustomSettings({ secondary: e.target.value })}
                        className="h-7 w-7 rounded cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-slate-400 uppercase">{customSettings.secondary}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-slate-300">Accent Neon:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={customSettings.accent}
                        onChange={(e) => updateCustomSettings({ accent: e.target.value })}
                        className="h-7 w-7 rounded cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-slate-400 uppercase">{customSettings.accent}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="text-slate-300">Background Tone:</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={customSettings.bgPrimary}
                        onChange={(e) => updateCustomSettings({ bgPrimary: e.target.value })}
                        className="h-7 w-7 rounded cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-slate-400 uppercase">{customSettings.bgPrimary}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Geometry & Ergonomics Sliders */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                  Card Geometry & Glow Dynamics
                </h4>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>Card Corner Radius:</span>
                    <span>{customSettings.cardRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="32"
                    step="2"
                    value={customSettings.cardRadius}
                    onChange={(e) => updateCustomSettings({ cardRadius: Number(e.target.value) })}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>Neon Glow Intensity:</span>
                    <span>{Math.round(customSettings.glowIntensity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.9"
                    step="0.05"
                    value={customSettings.glowIntensity}
                    onChange={(e) => updateCustomSettings({ glowIntensity: Number(e.target.value) })}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Toggles: Custom Cursor & Reduced Motion */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                  Accessibility & Cursor Controls
                </h4>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-xs font-mono text-slate-300">
                    <p className="font-semibold text-white">Custom Futuristic Cursor</p>
                    <p className="text-slate-400 text-[11px]">Halo trailing dot on desktop mouse pointers</p>
                  </div>
                  <button
                    onClick={() => updateCustomSettings({ cursorEffect: !customSettings.cursorEffect })}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      customSettings.cursorEffect ? 'bg-cyan-600 text-white' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {customSettings.cursorEffect ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-xs font-mono text-slate-300">
                    <p className="font-semibold text-white">Reduced Motion Preference</p>
                    <p className="text-slate-400 text-[11px]">Disables fast pulses and keyframe animations</p>
                  </div>
                  <button
                    onClick={() => updateCustomSettings({ reducedMotion: !customSettings.reducedMotion })}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      customSettings.reducedMotion ? 'bg-purple-600 text-white' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {customSettings.reducedMotion ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-purple-500/20 px-6 py-3.5 bg-slate-900/80 text-xs text-slate-400">
          <span className="font-mono">
            {isCustom ? 'Active: Custom Theme' : `Active: ${themePreset.name}`}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveNotification}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors flex items-center gap-1.5"
            >
              {savedNotification ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Save className="h-3.5 w-3.5" />}
              <span>{savedNotification ? 'Saved to Browser!' : 'Save Theme'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
