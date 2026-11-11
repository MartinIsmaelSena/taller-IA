import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, AlertTriangle } from 'lucide-react';
import { CLASE4_RESPONSIVE_ISSUES, type ResponsiveIssueItem } from '../../data/activitiesData';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

export const ResponsiveBugFinder: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { markActivityCompleted } = useProgress();
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (id: string, isBug: boolean) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [id]: isBug }));
  };

  const handleCheck = () => {
    setSubmitted(true);
    const allCorrect = CLASE4_RESPONSIVE_ISSUES.every((item) => answers[item.id] === item.isProblem);
    if (allCorrect) {
      triggerConfetti();
    }
    markActivityCompleted(activityId);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allAnswered = CLASE4_RESPONSIVE_ISSUES.every((item) => answers[item.id] !== undefined);
  const correctCount = submitted
    ? CLASE4_RESPONSIVE_ISSUES.filter((item) => answers[item.id] === item.isProblem).length
    : 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <AlertTriangle size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 1: Detectar Problemas Responsive en Móviles</h4>
            <p className="text-xs text-slate-400">Analizá cada comportamiento en celular y determiná si es un error o una buena práctica.</p>
          </div>
        </div>

        {submitted && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {correctCount} de {CLASE4_RESPONSIVE_ISSUES.length} acertadas
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
        {CLASE4_RESPONSIVE_ISSUES.map((item: ResponsiveIssueItem, idx) => {
          const userChoice = answers[item.id];
          const isCorrect = userChoice === item.isProblem;

          return (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-slate-800 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-sm text-slate-100">{item.name}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-7">{item.description}</p>
                {submitted && (
                  <p
                    className={`text-xs pl-7 mt-1 font-medium ${
                      isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {item.explanation}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pl-7 md:pl-0 shrink-0">
                <button
                  onClick={() => handleSelect(item.id, true)}
                  disabled={submitted}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                    userChoice === true
                      ? submitted
                        ? item.isProblem
                          ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                          : 'bg-emerald-950/70 border-emerald-500 text-emerald-300 line-through'
                        : 'bg-rose-500/20 border-rose-500 text-rose-300 ring-1 ring-rose-500'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  ⚠️ Es un problema
                </button>

                <button
                  onClick={() => handleSelect(item.id, false)}
                  disabled={submitted}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                    userChoice === false
                      ? submitted
                        ? !item.isProblem
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                          : 'bg-rose-950/70 border-rose-500 text-rose-300 line-through'
                        : 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  ✅ Buena práctica
                </button>

                {submitted && (
                  isCorrect ? (
                    <CheckCircle2 size={16} className="text-emerald-400 ml-1" />
                  ) : (
                    <XCircle size={16} className="text-rose-400 ml-1" />
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCheck}
            disabled={!allAnswered}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              allAnswered
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer shadow-md'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Verificar Diagnóstico
          </button>
        </div>
      )}
    </div>
  );
};
