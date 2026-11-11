import React, { useState } from 'react';
import { Check, X, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import type { TrueFalseQuestion } from '../../types/lesson';
import { useProgress } from '../../context/ProgressContext';

interface TrueFalseQuizProps {
  activityId: string;
  questions: TrueFalseQuestion[];
  title?: string;
}

export const TrueFalseQuiz: React.FC<TrueFalseQuizProps> = ({
  activityId,
  questions,
  title = '¿Verdadero o Falso?',
}) => {
  const { markActivityCompleted } = useProgress();
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [checked, setChecked] = useState(false);

  const handleChoose = (id: string, val: boolean) => {
    if (checked) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleValidate = () => {
    setChecked(true);
    markActivityCompleted(activityId);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          {title}
        </h4>
        {checked && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
          >
            <RotateCcw size={12} />
            Reintentar
          </button>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {questions.map((q) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.isTrue;

          return (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 transition-all"
            >
              <p className="text-sm font-medium text-slate-200 mb-3">{q.statement}</p>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleChoose(q.id, true)}
                  disabled={checked}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border transition ${
                    userAnswer === true
                      ? checked
                        ? q.isTrue
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-rose-950/60 border-rose-500 text-rose-300'
                        : 'bg-cyan-500/20 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Check size={14} />
                  Verdadero
                </button>

                <button
                  type="button"
                  onClick={() => handleChoose(q.id, false)}
                  disabled={checked}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border transition ${
                    userAnswer === false
                      ? checked
                        ? !q.isTrue
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-rose-950/60 border-rose-500 text-rose-300'
                        : 'bg-cyan-500/20 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <X size={14} />
                  Falso
                </button>
              </div>

              {checked && (
                <div
                  className={`mt-3 p-3 rounded-lg text-xs flex items-start gap-2 ${
                    isCorrect
                      ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-950/30 border border-rose-500/30 text-rose-300'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 size={15} className="shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={15} className="shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold">
                      {isCorrect ? '¡Correcto! ' : 'No del todo. '}
                    </span>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!checked && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleValidate}
            disabled={!allAnswered}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              allAnswered
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Verificar Afirmaciones
          </button>
        </div>
      )}
    </div>
  );
};
