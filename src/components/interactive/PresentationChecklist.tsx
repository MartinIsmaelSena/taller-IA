import React, { useState } from 'react';
import { CheckSquare, Square, Sparkles, RotateCcw, ListChecks } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

interface ChecklistItem {
  id: string;
  category: string;
  label: string;
  detail: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk-1',
    category: 'Estrategia',
    label: 'Propósito y público objetivo definidos',
    detail: 'La página responde claramente a la pregunta: ¿Para quién es y qué problema resuelve?',
  },
  {
    id: 'chk-2',
    category: 'Estructura',
    label: 'Anatomía web completa (Header, Hero, Secciones, Footer)',
    detail: 'Tiene encabezado con logotipo, Hero de impacto con CTA, secciones temáticas y pie de página.',
  },
  {
    id: 'chk-3',
    category: 'Diseño',
    label: 'Identidad visual armónica y legible',
    detail: 'Paleta respetando la regla 60-30-10, contraste alto entre fondo y texto, y tipografía clara.',
  },
  {
    id: 'chk-4',
    category: 'Multimedia',
    label: 'Imágenes optimizadas para la web',
    detail: 'Formato WebP o JPG comprimido (menos de 300 KB por imagen) para que cargue velozmente.',
  },
  {
    id: 'chk-5',
    category: 'Navegación',
    label: 'Enlaces probados sin errores 404',
    detail: 'Los enlaces internos con # coinciden exactamente con los id de sus secciones correspondientes.',
  },
  {
    id: 'chk-6',
    category: 'Responsive',
    label: 'Verificación en teléfonos móviles con DevTools',
    detail: 'Probado con F12 en 375px. Sin desplazamiento horizontal indebido y botones táctiles amplios.',
  },
  {
    id: 'chk-7',
    category: 'Inteligencia Artificial',
    label: 'Uso crítico y ético de la IA',
    detail: 'Los textos generados por IA fueron revisados, adaptados y no contienen frases genéricas.',
  },
  {
    id: 'chk-8',
    category: 'Demostración',
    label: 'Pitch de presentación ensayado (3 a 5 min)',
    detail: 'El equipo sabe quién habla de qué parte, muestran la web en vivo y explican el proceso técnico.',
  },
];

export const PresentationChecklist: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { markActivityCompleted } = useProgress();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => new Set(['chk-1', 'chk-2']));

  const handleToggle = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      if (next.size >= 6) {
        markActivityCompleted(activityId);
      }
      if (next.size === CHECKLIST_ITEMS.length) {
        triggerConfetti();
      }
      return next;
    });
  };

  const handleCheckAll = () => {
    const all = new Set(CHECKLIST_ITEMS.map((c) => c.id));
    setCheckedItems(all);
    markActivityCompleted(activityId);
    triggerConfetti();
  };

  const handleReset = () => {
    setCheckedItems(new Set());
  };

  const completedCount = checkedItems.size;
  const isAllDone = completedCount === CHECKLIST_ITEMS.length;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ListChecks size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 3: Lista de Verificación para el Demo Day</h4>
            <p className="text-xs text-slate-400">Verificá los 8 puntos esenciales antes de publicar y exponer tu proyecto web.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCheckAll}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
          >
            Marcar todos
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={12} /> Limpiar
          </button>
        </div>
      </div>

      {/* Progress pill */}
      <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-300 font-medium">Estado de Preparación:</span>
        <div className="flex items-center gap-2">
          <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${(completedCount / CHECKLIST_ITEMS.length) * 100}%` }}
            ></div>
          </div>
          <span className="font-mono font-bold text-amber-400">
            {completedCount}/{CHECKLIST_ITEMS.length}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = checkedItems.has(item.id);

          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                isChecked
                  ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckSquare size={17} className="text-amber-400" />
                ) : (
                  <Square size={17} className="text-slate-600" />
                )}
              </div>

              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-xs font-bold ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                    {item.label}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                    {item.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {isAllDone && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <Sparkles size={16} />
          <span>¡Impecable! Tu proyecto cumple con todos los estándares profesionales para ser publicado y presentado.</span>
        </div>
      )}
    </div>
  );
};
