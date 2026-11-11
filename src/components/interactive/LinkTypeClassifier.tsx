import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Link2 } from 'lucide-react';
import { CLASE3_LINK_ITEMS, type LinkTypeItem } from '../../data/activitiesData';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

export const LinkTypeClassifier: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { markActivityCompleted } = useProgress();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Enlace interno (#id)',
    'Enlace externo (https://)',
    'Enlace de correo (mailto:)',
    'Enlace de WhatsApp',
  ];

  const handleSelect = (id: string, cat: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [id]: cat }));
  };

  const handleCheck = () => {
    setSubmitted(true);
    const allCorrect = CLASE3_LINK_ITEMS.every((item) => answers[item.id] === item.correctType);
    if (allCorrect) {
      triggerConfetti();
    }
    markActivityCompleted(activityId);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allAnswered = CLASE3_LINK_ITEMS.every((item) => answers[item.id] !== undefined);
  const correctCount = submitted
    ? CLASE3_LINK_ITEMS.filter((item) => answers[item.id] === item.correctType).length
    : 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <Link2 size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 3: Reconocer Tipos de Enlaces</h4>
            <p className="text-xs text-slate-400">Identificá si cada hipervínculo es interno, externo, de correo o mensajería.</p>
          </div>
        </div>

        {submitted && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {correctCount} de {CLASE3_LINK_ITEMS.length} correctas
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
        {CLASE3_LINK_ITEMS.map((item: LinkTypeItem, idx) => {
          const userChoice = answers[item.id];
          const isCorrect = userChoice === item.correctType;

          return (
            <div key={item.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-xs font-bold text-slate-200">
                  #{idx + 1} {item.purpose}
                </span>
              </div>

              {/* Code snippet */}
              <div className="my-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-pink-300 overflow-x-auto">
                <pre className="m-0 whitespace-pre">{item.codeSnippet}</pre>
              </div>

              {/* Category options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-3">
                {categories.map((cat) => {
                  const isSelected = userChoice === cat;
                  const isTarget = item.correctType === cat;

                  let optClass = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900';

                  if (isSelected && !submitted) {
                    optClass = 'bg-pink-950/40 border-pink-500 text-pink-200 ring-1 ring-pink-500';
                  }

                  if (submitted) {
                    if (isTarget) {
                      optClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-medium';
                    } else if (isSelected && !isTarget) {
                      optClass = 'bg-rose-950/60 border-rose-500 text-rose-300 line-through';
                    } else {
                      optClass = 'bg-slate-950/30 border-slate-900 text-slate-600 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={cat}
                      onClick={() => handleSelect(item.id, cat)}
                      disabled={submitted}
                      className={`p-2 rounded-lg border text-xs text-center transition font-medium ${optClass} ${
                        submitted ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`mt-2.5 p-2 rounded-lg text-xs flex items-start gap-1.5 ${
                  isCorrect
                    ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-950/30 border border-rose-500/30 text-rose-300'
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 size={13} className="shrink-0 mt-0.5 text-emerald-400" />
                  ) : (
                    <XCircle size={13} className="shrink-0 mt-0.5 text-rose-400" />
                  )}
                  <span>{item.explanation}</span>
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
            disabled={!allAnswered}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              allAnswered
                ? 'bg-pink-500 hover:bg-pink-400 text-slate-950 cursor-pointer shadow-md'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Validar Clasificación
          </button>
        </div>
      )}
    </div>
  );
};
