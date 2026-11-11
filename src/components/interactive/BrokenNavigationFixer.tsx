import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, RotateCcw, Wrench, Sparkles } from 'lucide-react';
import { CLASE3_BROKEN_LINKS, type BrokenLinkItem } from '../../data/activitiesData';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

export const BrokenNavigationFixer: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { markActivityCompleted } = useProgress();
  const [fixedHrefs, setFixedHrefs] = useState<Record<string, string>>({
    'bl-1': '#inicio',
    'bl-2': '#proyecto', // broken initial
    'bl-3': 'contacto',   // broken initial
    'bl-4': '#equipo',
  });
  const [checked, setChecked] = useState(false);

  const handleFixChange = (id: string, value: string) => {
    if (checked) return;
    setFixedHrefs((prev) => ({ ...prev, [id]: value }));
  };

  const handleVerify = () => {
    setChecked(true);
    // bl-2 should match '#proyectos' and bl-3 should match '#contacto'
    const isBl2Fixed = fixedHrefs['bl-2'].trim().toLowerCase() === '#proyectos';
    const isBl3Fixed = fixedHrefs['bl-3'].trim().toLowerCase() === '#contacto';

    if (isBl2Fixed && isBl3Fixed) {
      triggerConfetti();
      markActivityCompleted(activityId);
    }
  };

  const handleReset = () => {
    setFixedHrefs({
      'bl-1': '#inicio',
      'bl-2': '#proyecto',
      'bl-3': 'contacto',
      'bl-4': '#equipo',
    });
    setChecked(false);
  };

  const isBl2Correct = fixedHrefs['bl-2'].trim().toLowerCase() === '#proyectos';
  const isBl3Correct = fixedHrefs['bl-3'].trim().toLowerCase() === '#contacto';
  const allGood = isBl2Correct && isBl3Correct;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <Wrench size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 4: Corregir Enlaces Rotos en la Navegación</h4>
            <p className="text-xs text-slate-400">Dos de estos enlaces no llevan a su sección destino. Corregí sus atributos href.</p>
          </div>
        </div>

        {checked && (
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={12} /> Reiniciar
          </button>
        )}
      </div>

      <div className="mt-5 space-y-4">
        {CLASE3_BROKEN_LINKS.map((item: BrokenLinkItem) => {
          const currentValue = fixedHrefs[item.id];
          const isTargetMatch = currentValue.trim().toLowerCase() === `#${item.targetSectionId}`;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                checked
                  ? isTargetMatch
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-rose-950/20 border-rose-500/40'
                  : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-100">{item.navLabel}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      Destino: &lt;section id=&quot;{item.targetSectionId}&quot;&gt;
                    </span>
                  </div>
                  {item.isBroken && (
                    <p className="text-xs text-amber-300/90 flex items-center gap-1">
                      <AlertCircle size={13} className="shrink-0" />
                      {item.issueDescription}
                    </p>
                  )}
                </div>

                {/* Input field to edit href */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">href=</span>
                  <input
                    type="text"
                    value={currentValue}
                    onChange={(e) => handleFixChange(item.id, e.target.value)}
                    disabled={checked}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs focus:outline-none border ${
                      checked
                        ? isTargetMatch
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                          : 'bg-rose-950 border-rose-500 text-rose-300'
                        : 'bg-slate-900 border-slate-700 text-pink-300 focus:border-pink-500'
                    }`}
                  />
                  {checked && (
                    isTargetMatch ? (
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-[11px] text-rose-400 font-mono font-bold">
                        Debe ser #{item.targetSectionId}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {checked && allGood && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <Sparkles size={16} />
          <span>¡Excelente! Todos los enlaces de navegación coinciden exactamente con sus identificadores de destino.</span>
        </div>
      )}

      {!checked && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleVerify}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-500 hover:bg-pink-400 text-slate-950 cursor-pointer shadow-md transition"
          >
            Verificar Corrección
          </button>
        </div>
      )}
    </div>
  );
};
