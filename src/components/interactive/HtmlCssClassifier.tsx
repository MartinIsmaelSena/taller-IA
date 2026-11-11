import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Code } from 'lucide-react';
import { CLASE2_HTML_CSS_ITEMS, type HtmlCssItem } from '../../data/activitiesData';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

export const HtmlCssClassifier: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { markActivityCompleted } = useProgress();
  const [answers, setAnswers] = useState<Record<string, 'HTML' | 'CSS'>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (id: string, category: 'HTML' | 'CSS') => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [id]: category }));
  };

  const handleCheck = () => {
    setSubmitted(true);
    const allCorrect = CLASE2_HTML_CSS_ITEMS.every((item) => answers[item.id] === item.correctCategory);
    if (allCorrect) {
      triggerConfetti();
    }
    markActivityCompleted(activityId);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allAnswered = CLASE2_HTML_CSS_ITEMS.every((item) => answers[item.id] !== undefined);
  const correctCount = submitted
    ? CLASE2_HTML_CSS_ITEMS.filter((item) => answers[item.id] === item.correctCategory).length
    : 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <Code size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 1: ¿HTML o CSS?</h4>
            <p className="text-xs text-slate-400">Indicá qué lenguaje se encarga de cada una de las siguientes tareas.</p>
          </div>
        </div>

        {submitted && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {correctCount} de {CLASE2_HTML_CSS_ITEMS.length} acertadas
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

      <div className="mt-5 space-y-3">
        {CLASE2_HTML_CSS_ITEMS.map((item: HtmlCssItem, idx) => {
          const userChoice = answers[item.id];
          const isCorrect = userChoice === item.correctCategory;

          return (
            <div key={item.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5 flex-1">
                <span className="w-5 h-5 rounded-md bg-slate-800 text-violet-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <p className="text-xs md:text-sm font-medium text-slate-200">{item.action}</p>
                  {submitted && (
                    <p className={`text-[11px] mt-1 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {item.explanation}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => handleSelect(item.id, 'HTML')}
                  disabled={submitted}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition border ${
                    userChoice === 'HTML'
                      ? submitted
                        ? item.correctCategory === 'HTML'
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-rose-950/60 border-rose-500 text-rose-300 line-through'
                        : 'bg-orange-500/20 border-orange-500 text-orange-300 ring-1 ring-orange-500'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  HTML
                </button>

                <button
                  type="button"
                  onClick={() => handleSelect(item.id, 'CSS')}
                  disabled={submitted}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition border ${
                    userChoice === 'CSS'
                      ? submitted
                        ? item.correctCategory === 'CSS'
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-rose-950/60 border-rose-500 text-rose-300 line-through'
                        : 'bg-blue-500/20 border-blue-500 text-blue-300 ring-1 ring-blue-500'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  CSS
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
                ? 'bg-violet-600 hover:bg-violet-500 text-white cursor-pointer shadow-md'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Verificar Respuestas
          </button>
        </div>
      )}
    </div>
  );
};
