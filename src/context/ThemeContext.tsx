import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemePreset, CustomThemeSettings } from '../types';
import { themePresets } from '../data/portfolioData';

interface ThemeContextType {
  currentThemeId: string;
  themePreset: ThemePreset;
  customSettings: CustomThemeSettings;
  setThemePreset: (presetId: string) => void;
  updateCustomSettings: (settings: Partial<CustomThemeSettings>) => void;
  resetTheme: () => void;
  randomizeTheme: () => void;
  isCustom: boolean;
}

const defaultCustomSettings: CustomThemeSettings = {
  primary: '#a855f7',
  secondary: '#3b82f6',
  accent: '#06b6d4',
  bgPrimary: '#060813',
  bgSecondary: '#0c1024',
  textColor: '#f8fafc',
  cardRadius: 16,
  glowIntensity: 0.4,
  cursorEffect: true,
  reducedMotion: false
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState<string>(() => {
    return localStorage.getItem('krupa_portfolio_theme') || 'midnight-purple';
  });

  const [customSettings, setCustomSettings] = useState<CustomThemeSettings>(() => {
    const saved = localStorage.getItem('krupa_portfolio_custom_theme');
    return saved ? JSON.parse(saved) : defaultCustomSettings;
  });

  const [isCustom, setIsCustom] = useState<boolean>(() => currentThemeId === 'custom');

  const themePreset = themePresets.find(p => p.id === currentThemeId) || themePresets[0];

  useEffect(() => {
    const root = document.documentElement;

    if (currentThemeId === 'custom') {
      root.removeAttribute('data-theme');
      root.style.setProperty('--color-primary', customSettings.primary);
      root.style.setProperty('--color-secondary', customSettings.secondary);
      root.style.setProperty('--color-accent', customSettings.accent);
      root.style.setProperty('--bg-primary', customSettings.bgPrimary);
      root.style.setProperty('--bg-secondary', customSettings.bgSecondary);
      root.style.setProperty('--text-main', customSettings.textColor);
      root.style.setProperty('--card-radius', `${customSettings.cardRadius}px`);
      root.style.setProperty('--glow-intensity', `${customSettings.glowIntensity}`);
      root.style.setProperty('--cursor-visible', customSettings.cursorEffect ? '1' : '0');
    } else {
      root.setAttribute('data-theme', currentThemeId);
      root.style.removeProperty('--color-primary');
      root.style.removeProperty('--color-secondary');
      root.style.removeProperty('--color-accent');
      root.style.removeProperty('--bg-primary');
      root.style.removeProperty('--bg-secondary');
      root.style.removeProperty('--text-main');
      root.style.setProperty('--card-radius', `${customSettings.cardRadius}px`);
      root.style.setProperty('--glow-intensity', `${themePreset.glowIntensity}`);
      root.style.setProperty('--cursor-visible', customSettings.cursorEffect ? '1' : '0');
    }

    if (customSettings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    localStorage.setItem('krupa_portfolio_theme', currentThemeId);
  }, [currentThemeId, customSettings, themePreset]);

  const setThemePreset = (presetId: string) => {
    if (presetId === 'custom') {
      setIsCustom(true);
      setCurrentThemeId('custom');
    } else {
      setIsCustom(false);
      setCurrentThemeId(presetId);
    }
  };

  const updateCustomSettings = (newSettings: Partial<CustomThemeSettings>) => {
    setCustomSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('krupa_portfolio_custom_theme', JSON.stringify(updated));
      return updated;
    });
    setIsCustom(true);
    setCurrentThemeId('custom');
  };

  const resetTheme = () => {
    setCurrentThemeId('midnight-purple');
    setIsCustom(false);
    setCustomSettings(defaultCustomSettings);
    localStorage.removeItem('krupa_portfolio_theme');
    localStorage.removeItem('krupa_portfolio_custom_theme');
  };

  const randomizeTheme = () => {
    const randomIndex = Math.floor(Math.random() * themePresets.length);
    const chosen = themePresets[randomIndex];
    setThemePreset(chosen.id);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentThemeId,
        themePreset,
        customSettings,
        setThemePreset,
        updateCustomSettings,
        resetTheme,
        randomizeTheme,
        isCustom
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
