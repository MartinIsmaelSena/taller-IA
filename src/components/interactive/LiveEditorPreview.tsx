import React, { useState } from 'react';
import { Eye, Sliders, Sparkles, Check, RotateCcw, Monitor } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

export const LiveEditorPreview: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { markActivityCompleted } = useProgress();
  const [title, setTitle] = useState('Bienvenidos al Taller de Innovación');
  const [paragraph, setParagraph] = useState('Desarrollamos soluciones digitales, robótica y páginas web interactivas para nuestra comunidad escolar.');
  const [bgColor, setBgColor] = useState('#0f172a'); // slate-900
  const [textColor, setTextColor] = useState('#ffffff');
  const [btnText, setBtnText] = useState('¡Conocé nuestros proyectos!');
  const [btnColor, setBtnColor] = useState('#06b6d4'); // cyan-500
  const [borderRadius, setBorderRadius] = useState(8);
  const [applied, setApplied] = useState(false);

  const colorPresets = [
    { name: 'Noche Pizarra', bg: '#0f172a', text: '#f8fafc', btn: '#06b6d4' },
    { name: 'Cibernético', bg: '#18181b', text: '#e4e4e7', btn: '#8b5cf6' },
    { name: 'Eco Taller', bg: '#064e3b', text: '#ecfdf5', btn: '#10b981' },
    { name: 'Solar', bg: '#78350f', text: '#fef3c7', btn: '#f59e0b' },
  ];

  const handleApplyPreset = (preset: typeof colorPresets[0]) => {
    setBgColor(preset.bg);
    setTextColor(preset.text);
    setBtnColor(preset.btn);
    markActivityCompleted(activityId);
  };

  const handleSaveChallenge = () => {
    setApplied(true);
    markActivityCompleted(activityId);
    triggerConfetti();
    setTimeout(() => setApplied(false), 2500);
  };

  const handleReset = () => {
    setTitle('Bienvenidos al Taller de Innovación');
    setParagraph('Desarrollamos soluciones digitales, robótica y páginas web interactivas para nuestra comunidad escolar.');
    setBgColor('#0f172a');
    setTextColor('#ffffff');
    setBtnText('¡Conocé nuestros proyectos!');
    setBtnColor('#06b6d4');
    setBorderRadius(8);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sliders size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 3: Mini Editor Visual con Live Preview</h4>
            <p className="text-xs text-slate-400">Modificá el título, texto, colores y botón. Observá el resultado en tiempo real.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={12} /> Restablecer
          </button>
          <button
            onClick={handleSaveChallenge}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            {applied ? <Check size={14} /> : <Sparkles size={14} />}
            {applied ? '¡Guardado!' : 'Validar Cambios'}
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              1. Título principal (&lt;h1&gt;):
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                markActivityCompleted(activityId);
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs md:text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              2. Párrafo descriptivo (&lt;p&gt;):
            </label>
            <textarea
              rows={3}
              value={paragraph}
              onChange={(e) => {
                setParagraph(e.target.value);
                markActivityCompleted(activityId);
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              3. Texto del Botón de Acción (CTA):
            </label>
            <input
              type="text"
              value={btnText}
              onChange={(e) => {
                setBtnText(e.target.value);
                markActivityCompleted(activityId);
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              4. Paletas de Colores Rápidas:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleApplyPreset(preset)}
                  className="p-2 rounded-lg border border-slate-700 bg-slate-950 hover:border-slate-600 text-left text-xs transition flex items-center gap-2 cursor-pointer"
                >
                  <span
                    className="w-4 h-4 rounded-full border border-slate-600 shrink-0"
                    style={{ backgroundColor: preset.btn }}
                  ></span>
                  <span className="text-slate-300 text-[11px] font-medium truncate">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Fondo (&lt;section&gt;):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-400">{bgColor}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Color Botón:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={btnColor}
                  onChange={(e) => setBtnColor(e.target.value)}
                  className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-400">{btnColor}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">Borde redondeado del botón:</span>
              <span className="font-mono text-cyan-400">{borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Preview Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="flex items-center gap-1.5 font-bold text-slate-300">
              <Monitor size={14} className="text-cyan-400" />
              Vista Previa en Vivo (Live Preview)
            </span>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1">
              <Eye size={12} /> Renderizado instantáneo
            </span>
          </div>

          {/* Simulated Browser Card */}
          <div className="rounded-xl border border-slate-700 overflow-hidden shadow-2xl bg-slate-950 flex flex-col flex-1">
            <div className="px-3.5 py-2 bg-slate-800/90 border-b border-slate-700 flex items-center gap-2 text-xs text-slate-400">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span className="ml-2 font-mono text-[11px] text-slate-400">preview-en-vivo.html</span>
            </div>

            {/* Custom Styled Preview Canvas */}
            <div
              className="p-8 flex-1 flex flex-col items-center justify-center text-center transition-colors duration-300 min-h-[220px]"
              style={{ backgroundColor: bgColor }}
            >
              <h3
                className="text-lg md:text-2xl font-bold mb-3 transition-colors duration-200 max-w-lg"
                style={{ color: textColor }}
              >
                {title || 'Título de ejemplo'}
              </h3>
              <p
                className="text-xs md:text-sm max-w-md opacity-90 leading-relaxed mb-6 transition-colors duration-200"
                style={{ color: textColor }}
              >
                {paragraph || 'Párrafo de descripción.'}
              </p>
              <button
                type="button"
                className="font-bold text-xs md:text-sm px-6 py-3 transition-all duration-200 shadow-lg cursor-pointer transform hover:scale-105"
                style={{
                  backgroundColor: btnColor,
                  color: '#090d16',
                  borderRadius: `${borderRadius}px`,
                }}
              >
                {btnText || 'Botón de Acción'}
              </button>
            </div>
          </div>

          {/* Generated Code Mirror */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
              Código HTML &amp; CSS generado automáticamente:
            </span>
            <div className="text-cyan-300">
              &lt;section style=&quot;background-color: {bgColor}; color: {textColor};&quot;&gt;
            </div>
            <div className="pl-4 text-slate-300">&lt;h1&gt;{title}&lt;/h1&gt;</div>
            <div className="pl-4 text-slate-300">&lt;p&gt;{paragraph}&lt;/p&gt;</div>
            <div className="pl-4 text-cyan-300">
              &lt;button style=&quot;background: {btnColor}; border-radius: {borderRadius}px;&quot;&gt;
              {btnText}&lt;/button&gt;
            </div>
            <div className="text-cyan-300">&lt;/section&gt;</div>
          </div>
        </div>
      </div>
    </div>
  );
};
