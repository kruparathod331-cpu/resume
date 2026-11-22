import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const { customSettings } = useTheme();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button, a, input, textarea, select, [role="button"], .clickable');
      setIsPointer(!!clickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !customSettings.cursorEffect || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Outer Halo */}
      <div
        className="pointer-events-none fixed z-50 rounded-full border border-purple-400/50 transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '48px' : '32px',
          height: isPointer ? '48px' : '32px',
          backgroundColor: isPointer ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
          boxShadow: isPointer ? '0 0 15px rgba(168, 85, 247, 0.4)' : 'none',
        }}
      />
      {/* Inner Dot */}
      <div
        className="pointer-events-none fixed z-50 h-2 w-2 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#22d3ee]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};
