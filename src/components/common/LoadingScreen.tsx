import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.jpg';

interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
  duration?: number; // duration in ms, default 1700 (1.7s)
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Preparando el entorno de aprendizaje...',
  subMessage,
  duration = 1700,
  onComplete,
}) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const actualDuration = prefersReducedMotion ? 400 : duration;

    // Trigger completion
    const timer = setTimeout(() => {
      setFadingOut(true);
      const closeTimer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 250);
      return () => clearTimeout(closeTimer);
    }, actualDuration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-300 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center space-y-6">
        {/* Subtle Institutional Logo badge */}
        <div className="h-10 w-10 rounded-xl bg-white p-1 border border-slate-800 shadow-md flex items-center justify-center overflow-hidden mb-2">
          <img
            src={logoImg}
            alt="Logo Institucional"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Central Spinning Symbol: </> doing exactly 5 full turns (1800deg) */}
        <div className="relative flex items-center justify-center">
          {/* Subtle outer tech ring */}
          <div className="absolute w-24 h-24 rounded-full border border-cyan-500/20 animate-pulse"></div>

          {/* The Spinning Element */}
          <div
            className="animate-spin-five w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 p-0.5 shadow-xl shadow-cyan-500/20 flex items-center justify-center"
            style={{ willChange: 'transform' }}
          >
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <span className="font-mono font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 select-none tracking-tighter">
                &lt;/&gt;
              </span>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-1.5">
          <h4 className="text-sm sm:text-base font-bold text-slate-100 tracking-tight">
            {message}
          </h4>
          <p className="text-xs text-slate-400 font-mono">
            {subMessage || 'Desarrollo Web desde Cero'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-56 bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800 p-0.5 shadow-inner">
          <div className="animate-progress-fill h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 shadow-sm shadow-cyan-500/50"></div>
        </div>
      </div>
    </div>
  );
};
