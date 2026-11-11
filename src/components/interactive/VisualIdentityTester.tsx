import React, { useState } from 'react';
import { Palette, Check, Sparkles, Type } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

interface ThemePalette {
  id: string;
  name: string;
  vibe: string;
  dominant: string; // 60%
  secondary: string; // 30%
  accent: string; // 10%
  textColor: string;
}

const PALETTES: ThemePalette[] = [
  {
    id: 'cyber',
    name: 'Tech Cian & Slate',
    vibe: 'Tecnológico, moderno y profesional (ideal escuelas técnicas).',
    dominant: '#0f172a',
    secondary: '#1e293b',
    accent: '#06b6d4',
    textColor: '#f8fafc',
  },
  {
    id: 'violet-spark',
    name: 'Innovación Neón',
    vibe: 'Creativo, juvenil y orientado a programación de software.',
    dominant: '#18181b',
    secondary: '#27272a',
    accent: '#a855f7',
    textColor: '#fafafa',
  },
  {
    id: 'eco-growth',
    name: 'Sustentable & Robótica Verde',
    vibe: 'Proyectos ecológicos, huertas inteligentes y reciclaje.',
    dominant: '#022c22',
    secondary: '#064e3b',
    accent: '#10b981',
    textColor: '#f0fdf4',
  },
  {
    id: 'solar-energy',
    name: 'Energía & Taller Solar',
    vibe: 'Calidez, energía solar, electricidad y emprendimiento.',
    dominant: '#1c1917',
    secondary: '#292524',
    accent: '#f59e0b',
    textColor: '#fffbeb',
  },
];

const FONTS = [
  { id: 'sans', name: 'Sans-Serif (Moderna y Limpia)', fontClass: 'font-sans' },
  { id: 'mono', name: 'Monospace (Estilo Código y Terminal)', fontClass: 'font-mono' },
  { id: 'serif', name: 'Serif (Editorial y Elegante)', fontClass: 'font-serif' },
];

export const VisualIdentityTester: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { updateStudentProject, markActivityCompleted } = useProgress();
  const [selectedPalette, setSelectedPalette] = useState<ThemePalette>(PALETTES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [saved, setSaved] = useState(false);

  const handleSelectPalette = (p: ThemePalette) => {
    setSelectedPalette(p);
  };

  const handleSaveToProject = () => {
    updateStudentProject({
      primaryColor: selectedPalette.accent,
      fontFamily: selectedFont.name,
    });
    setSaved(true);
    markActivityCompleted(activityId);
    triggerConfetti();
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <Palette size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 1: Selector de Identidad Visual</h4>
            <p className="text-xs text-slate-400">Elegí una combinación armónica de colores y tipografía para tu web modelo.</p>
          </div>
        </div>

        <button
          onClick={handleSaveToProject}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-xs transition shadow-md cursor-pointer self-start sm:self-auto"
        >
          {saved ? <Check size={14} /> : <Sparkles size={14} />}
          {saved ? '¡Paleta Guardada!' : 'Aplicar a mi Proyecto'}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Choices (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <span className="text-xs font-semibold text-slate-300 block mb-2">
              1. Seleccioná una Paleta de Colores (Regla 60-30-10):
            </span>
            <div className="space-y-2">
              {PALETTES.map((pal) => {
                const isSelected = selectedPalette.id === pal.id;
                return (
                  <button
                    key={pal.id}
                    onClick={() => handleSelectPalette(pal)}
                    className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-pink-500 bg-pink-950/30 ring-1 ring-pink-500'
                        : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h6 className="text-xs font-bold text-slate-200">{pal.name}</h6>
                      <p className="text-[11px] text-slate-400 mt-0.5">{pal.vibe}</p>
                    </div>

                    {/* Color Swatch Circles */}
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span
                        className="w-4 h-4 rounded-full border border-slate-600"
                        title="Dominante 60%"
                        style={{ backgroundColor: pal.dominant }}
                      ></span>
                      <span
                        className="w-4 h-4 rounded-full border border-slate-600"
                        title="Secundario 30%"
                        style={{ backgroundColor: pal.secondary }}
                      ></span>
                      <span
                        className="w-4 h-4 rounded-full border border-slate-600 shadow-sm ring-1 ring-white/20"
                        title="Acento 10%"
                        style={{ backgroundColor: pal.accent }}
                      ></span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-300 block mb-2 flex items-center gap-1">
              <Type size={14} className="text-cyan-400" />
              2. Seleccioná la Tipografía Principal:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {FONTS.map((font) => (
                <button
                  key={font.id}
                  onClick={() => setSelectedFont(font)}
                  className={`p-2.5 rounded-lg border text-xs text-left transition cursor-pointer flex items-center justify-between ${
                    selectedFont.id === font.id
                      ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-400'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className={font.fontClass}>{font.name}</span>
                  {selectedFont.id === font.id && <Check size={14} className="text-cyan-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Mockup Preview (7 cols) */}
        <div className="lg:col-span-7">
          <div className="text-xs font-bold text-slate-400 mb-2">
            Vista Previa de la Identidad en una Tarjeta de Presentación:
          </div>

          <div
            className={`rounded-2xl border p-6 shadow-2xl transition-all duration-300 ${selectedFont.fontClass}`}
            style={{
              backgroundColor: selectedPalette.dominant,
              borderColor: selectedPalette.secondary,
              color: selectedPalette.textColor,
            }}
          >
            {/* Mock Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
                  style={{ backgroundColor: selectedPalette.accent, color: '#090d16' }}
                >
                  T5
                </span>
                <span className="font-bold text-sm tracking-wide">Técnica Digital 2026</span>
              </div>
              <div className="flex items-center gap-3 text-xs opacity-80">
                <span>Inicio</span>
                <span>Proyectos</span>
                <span>Contacto</span>
              </div>
            </div>

            {/* Mock Hero Body */}
            <div className="space-y-3">
              <span
                className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full inline-block"
                style={{
                  backgroundColor: `${selectedPalette.accent}20`,
                  color: selectedPalette.accent,
                  border: `1px solid ${selectedPalette.accent}40`,
                }}
              >
                PROYECTO INTEGRAL
              </span>

              <h4 className="text-xl md:text-2xl font-bold leading-tight">
                Diseño web moderno con inteligencia artificial y código limpio.
              </h4>

              <p className="text-xs opacity-85 leading-relaxed max-w-md">
                Combinamos paletas cromáticas accesibles con tipografías legibles para asegurar una experiencia atractiva en todos los dispositivos.
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg font-bold text-xs transition shadow-md cursor-pointer transform hover:scale-105"
                  style={{
                    backgroundColor: selectedPalette.accent,
                    color: '#090d16',
                  }}
                >
                  Llamada a la Acción (10%)
                </button>

                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-xs font-medium border border-white/20 transition hover:bg-white/5 cursor-pointer"
                  style={{ color: selectedPalette.textColor }}
                >
                  Ver detalles
                </button>
              </div>
            </div>

            {/* Palette Breakdown Stats */}
            <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="p-2 rounded bg-black/20">
                <span className="block opacity-60">Dominante (60%)</span>
                <span className="font-mono font-bold">{selectedPalette.dominant}</span>
              </div>
              <div className="p-2 rounded bg-black/20">
                <span className="block opacity-60">Secundario (30%)</span>
                <span className="font-mono font-bold">{selectedPalette.secondary}</span>
              </div>
              <div className="p-2 rounded bg-black/20">
                <span className="block opacity-60">Acento (10%)</span>
                <span className="font-mono font-bold" style={{ color: selectedPalette.accent }}>
                  {selectedPalette.accent}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
