import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, LayoutGrid } from 'lucide-react';
import { CLASE1_SITE_TYPES, type SiteTypeScenario } from '../../data/activitiesData';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

export const SiteTypeClassifier: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { markActivityCompleted } = useProgress();
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (scenarioId: string, option: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [scenarioId]: option }));
  };

  const handleCheck = () => {
    setSubmitted(true);
    const allCorrect = CLASE1_SITE_TYPES.every((s) => userAnswers[s.id] === s.correctAnswer);
    if (allCorrect) {
      triggerConfetti();
    }
    markActivityCompleted(activityId);
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const allSelected = CLASE1_SITE_TYPES.every((s) => userAnswers[s.id] !== undefined);
  const correctCount = submitted
    ? CLASE1_SITE_TYPES.filter((s) => userAnswers[s.id] === s.correctAnswer).length
    : 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <LayoutGrid size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 1: Reconocer Tipos de Sitios Web</h4>
            <p className="text-xs text-slate-400">Identificá si cada situación corresponde a una web estática, dinámica, web app o CMS.</p>
          </div>
        </div>

        {submitted && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {correctCount}/{CLASE1_SITE_TYPES.length} acertadas
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={12} /> Reintentar
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 space-y-4">
        {CLASE1_SITE_TYPES.map((item: SiteTypeScenario, idx) => {
          const selected = userAnswers[item.id];
          const isCorrect = selected === item.correctAnswer;

          return (
            <div key={item.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-start gap-2.5 mb-3">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
                  {item.scenario}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pl-0 sm:pl-7">
                {item.options.map((opt) => {
                  const isThisSelected = selected === opt;
                  const isThisTarget = item.correctAnswer === opt;

                  let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80';

                  if (isThisSelected && !submitted) {
                    style = 'bg-cyan-500/20 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400';
                  }

                  if (submitted) {
                    if (isThisTarget) {
                      style = 'bg-emerald-950/50 border-emerald-500 text-emerald-300 font-bold';
                    } else if (isThisSelected && !isThisTarget) {
                      style = 'bg-rose-950/50 border-rose-500 text-rose-300 line-through';
                    } else {
                      style = 'bg-slate-950/40 border-slate-800/50 text-slate-600 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(item.id, opt)}
                      disabled={submitted}
                      className={`px-3 py-2 rounded-lg text-xs border text-center transition font-medium ${style} ${
                        submitted ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`mt-3 sm:ml-7 p-2.5 rounded-lg text-xs leading-relaxed flex items-start gap-2 ${
                  isCorrect
                    ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-950/30 border border-rose-500/30 text-rose-300'
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-emerald-400" />
                  ) : (
                    <XCircle size={14} className="shrink-0 mt-0.5 text-rose-400" />
                  )}
                  <div>
                    <span className="font-semibold">{isCorrect ? '¡Bien! ' : 'Ojo: '}</span>
                    {item.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCheck}
            disabled={!allSelected}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
              allSelected
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Comprobar Respuestas
          </button>
        </div>
      )}
    </div>
  );
};
