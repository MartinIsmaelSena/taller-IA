import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Tag } from 'lucide-react';
import { CLASE2_TAG_ITEMS, type TagRecognitionItem } from '../../data/activitiesData';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

export const TagRecognitionActivity: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { markActivityCompleted } = useProgress();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (id: string, optIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [id]: optIdx }));
  };

  const handleCheck = () => {
    setSubmitted(true);
    const allCorrect = CLASE2_TAG_ITEMS.every((item) => answers[item.id] === item.correctAnswer);
    if (allCorrect) {
      triggerConfetti();
    }
    markActivityCompleted(activityId);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allAnswered = CLASE2_TAG_ITEMS.every((item) => answers[item.id] !== undefined);
  const correctCount = submitted
    ? CLASE2_TAG_ITEMS.filter((item) => answers[item.id] === item.correctAnswer).length
    : 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Tag size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 2: Reconocer Etiquetas HTML</h4>
            <p className="text-xs text-slate-400">Observá cada fragmento de código e identificá qué función cumple la etiqueta.</p>
          </div>
        </div>

        {submitted && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {correctCount} de {CLASE2_TAG_ITEMS.length} correctas
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

      <div className="mt-5 space-y-5">
        {CLASE2_TAG_ITEMS.map((item: TagRecognitionItem, idx) => {
          const userChoice = answers[item.id];
          const isCorrect = userChoice === item.correctAnswer;

          return (
            <div key={item.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-orange-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xs font-bold text-slate-200">{item.question}</span>
              </div>

              {/* Code Snippet Box */}
              <div className="my-2.5 p-3 rounded-lg bg-slate-900 font-mono text-xs text-orange-300 overflow-x-auto border border-slate-800">
                <pre className="m-0 whitespace-pre">{item.snippet}</pre>
              </div>

              {/* Options */}
              <div className="space-y-1.5 mt-2">
                {item.options.map((opt, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  const isTarget = item.correctAnswer === optIdx;

                  let optClass = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700';

                  if (isSelected && !submitted) {
                    optClass = 'bg-orange-950/40 border-orange-500 text-orange-200 ring-1 ring-orange-500';
                  }

                  if (submitted) {
                    if (isTarget) {
                      optClass = 'bg-emerald-950/50 border-emerald-500 text-emerald-300 font-medium';
                    } else if (isSelected && !isTarget) {
                      optClass = 'bg-rose-950/50 border-rose-500 text-rose-300 line-through';
                    } else {
                      optClass = 'bg-slate-950/30 border-slate-900 text-slate-600 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(item.id, optIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition ${optClass} ${
                        submitted ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <span>{opt}</span>
                      {submitted && isTarget && (
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 ml-2" />
                      )}
                      {submitted && isSelected && !isTarget && (
                        <XCircle size={14} className="text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`mt-2.5 p-2.5 rounded-lg text-xs flex items-start gap-2 ${
                  isCorrect
                    ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-950/30 border border-rose-500/30 text-rose-300'
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={14} className="text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-semibold">{isCorrect ? '¡Bien! ' : 'Explicación: '}</span>
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
            disabled={!allAnswered}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              allAnswered
                ? 'bg-orange-500 hover:bg-orange-400 text-slate-950 cursor-pointer shadow-md'
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
