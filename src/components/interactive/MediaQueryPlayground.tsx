import React, { useState } from 'react';
import { Code2 } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

export const MediaQueryPlayground: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { markActivityCompleted } = useProgress();
  const breakpoint = 600;
  const [flexDirection, setFlexDirection] = useState<'column' | 'row'>('column');
  const [imageMaxWidth, setImageMaxWidth] = useState('100%');
  const [simulatedWidth, setSimulatedWidth] = useState(480);
  const [hasInteracted, setHasInteracted] = useState(false);

  const isQueryActive = simulatedWidth <= breakpoint;

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      markActivityCompleted(activityId);
      triggerConfetti();
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Code2 size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 3: Laboratorio Interactivo de Media Queries</h4>
            <p className="text-xs text-slate-400">
              Deslizá el ancho de la pantalla simulada y observá cuándo se activa la regla CSS.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          Ancho actual: <span className="text-emerald-400 font-bold">{simulatedWidth}px</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders & CSS Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-300">Simular ancho del navegador:</span>
              <span className="font-mono text-cyan-400">{simulatedWidth}px</span>
            </div>
            <input
              type="range"
              min="320"
              max="900"
              value={simulatedWidth}
              onChange={(e) => {
                setSimulatedWidth(Number(e.target.value));
                handleInteraction();
              }}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
              <span>320px (Móvil)</span>
              <span>600px (Breakpoint)</span>
              <span>900px (Desktop)</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Dirección de elementos en móvil:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setFlexDirection('column');
                  handleInteraction();
                }}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition ${
                  flexDirection === 'column'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                }`}
              >
                flex-direction: column (Apilar)
              </button>

              <button
                type="button"
                onClick={() => {
                  setFlexDirection('row');
                  handleInteraction();
                }}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition ${
                  flexDirection === 'row'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                }`}
              >
                flex-direction: row (Fila)
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Ancho máximo de imágenes (max-width):
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setImageMaxWidth('100%');
                  handleInteraction();
                }}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition ${
                  imageMaxWidth === '100%'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                100% (Fluido sin desborde)
              </button>
              <button
                type="button"
                onClick={() => {
                  setImageMaxWidth('700px');
                  handleInteraction();
                }}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition ${
                  imageMaxWidth === '700px'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                700px (Fijo romperá layout)
              </button>
            </div>
          </div>

          {/* Code display showing condition */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-slate-400 uppercase font-bold">Código CSS Activo</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isQueryActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {isQueryActive ? '¡Media Query ACTIVADA!' : 'Media Query inactiva (ancho > 600px)'}
              </span>
            </div>

            <div className="text-slate-500">/* Reglas por defecto */</div>
            <div className="text-cyan-300">.contenedor &#123; display: flex; &#125;</div>

            <div className={`mt-2 p-2 rounded transition-colors ${isQueryActive ? 'bg-emerald-950/40 text-emerald-200 border border-emerald-500/30' : 'text-slate-600'}`}>
              <div>@media (max-width: {breakpoint}px) &#123;</div>
              <div className="pl-4">.contenedor &#123; flex-direction: {flexDirection}; &#125;</div>
              <div className="pl-4">img &#123; max-width: {imageMaxWidth}; &#125;</div>
              <div>&#125;</div>
            </div>
          </div>
        </div>

        {/* Live Container Preview (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <span className="font-bold text-slate-200">
                Simulación del Contenedor Web
              </span>
              <span className="text-[11px]">
                {isQueryActive ? 'Modo Móvil' : 'Modo Escritorio'}
              </span>
            </div>

            <div
              className="p-4 rounded-xl border border-slate-700 bg-slate-900 transition-all duration-300 mx-auto overflow-hidden"
              style={{ width: `${Math.min(simulatedWidth, 520)}px` }}
            >
              <div
                className="flex gap-3 transition-all duration-300"
                style={{
                  flexDirection: isQueryActive ? flexDirection : 'row',
                }}
              >
                <div className="flex-1 p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-center">
                  <span className="text-xs font-bold text-white block">Tarjeta 1</span>
                  <p className="text-[10px] text-slate-400 mt-1">Robótica Educativa</p>
                </div>
                <div className="flex-1 p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-center">
                  <span className="text-xs font-bold text-white block">Tarjeta 2</span>
                  <p className="text-[10px] text-slate-400 mt-1">Programación Web</p>
                </div>
                <div className="flex-1 p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-center">
                  <span className="text-xs font-bold text-white block">Tarjeta 3</span>
                  <p className="text-[10px] text-slate-400 mt-1">Inteligencia Artificial</p>
                </div>
              </div>

              {imageMaxWidth === '700px' && isQueryActive && (
                <div className="mt-3 p-2 rounded bg-rose-950/60 border border-rose-500 text-rose-300 text-[11px] text-center font-bold">
                  ⚠️ ¡Atención! Con max-width: 700px en una pantalla de {simulatedWidth}px se generará un desborde horizontal (overflow roto).
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            💡 En este simulador, cuando el ancho desciende por debajo de {breakpoint}px, el navegador lee la Media Query y aplica <code className="text-emerald-300 font-mono">flex-direction: {flexDirection}</code>.
          </div>
        </div>
      </div>
    </div>
  );
};
