import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle } from 'lucide-react';
import type { QuizQuestion } from '../../types/lesson';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

interface MultipleChoiceQuizProps {
  quizId: string;
  questions: QuizQuestion[];
  title?: string;
}

export const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({
  quizId,
  questions,
  title = 'Autoevaluación de Conceptos',
}) => {
  const { saveQuizScore } = useProgress();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleCheck = () => {
    setSubmitted(true);
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    const percentage = Math.round((correctCount / questions.length) * 100);
    saveQuizScore(quizId, percentage);

    if (percentage >= 80) {
      triggerConfetti();
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const allAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);
  const correctCount = submitted
    ? questions.filter((q) => selectedAnswers[q.id] === q.correctAnswer).length
    : 0;
  const scorePercent = submitted ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-7 shadow-xl my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <HelpCircle size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-xs text-slate-400">Respondé cada pregunta para comprobar lo que aprendiste.</p>
          </div>
        </div>

        {submitted && (
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
              scorePercent >= 70
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              Puntaje: {correctCount}/{questions.length} ({scorePercent}%)
            </div>
            <button
              onClick={handleRetry}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer border border-slate-700"
            >
              <RotateCcw size={13} />
              Reintentar
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-7">
        {questions.map((q, qIndex) => {
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctAnswer;

          return (
            <div key={q.id} className="p-4 md:p-5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-cyan-400 text-xs font-bold shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <h4 className="text-sm md:text-base font-semibold text-slate-100 leading-snug">
                  {q.question}
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-2.5 mt-3 pl-0 sm:pl-9">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  const isThisCorrect = q.correctAnswer === optIdx;

                  let optionStyles = 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900';

                  if (isSelected && !submitted) {
                    optionStyles = 'border-cyan-500 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-500/50';
                  }

                  if (submitted) {
                    if (isThisCorrect) {
                      optionStyles = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 font-medium ring-1 ring-emerald-500/50';
                    } else if (isSelected && !isThisCorrect) {
                      optionStyles = 'border-rose-500/80 bg-rose-950/40 text-rose-200 line-through';
                    } else {
                      optionStyles = 'border-slate-800/60 bg-slate-950/40 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs md:text-sm flex items-center justify-between group ${optionStyles} ${
                        submitted ? 'cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-mono font-semibold border ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                            : 'border-slate-700 bg-slate-800/50 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {submitted && isThisCorrect && (
                        <CheckCircle2 size={17} className="text-emerald-400 shrink-0 ml-2" />
                      )}
                      {submitted && isSelected && !isThisCorrect && (
                        <XCircle size={17} className="text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`mt-3 sm:ml-9 p-3 rounded-lg text-xs leading-relaxed flex items-start gap-2 ${
                  isCorrect
                    ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-950/30 border border-rose-500/30 text-rose-300'
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold">{isCorrect ? '¡Correcto! ' : 'Incorrecto. '}</span>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          {!submitted
            ? allAnswered
              ? 'Todas las preguntas respondidas. ¡Listo para comprobar!'
              : 'Seleccioná una opción para cada pregunta.'
            : scorePercent >= 70
            ? '¡Excelente trabajo! Has demostrado comprender los conceptos clave.'
            : 'Podés repasar la explicación de cada respuesta o reintentar el cuestionario.'}
        </p>

        {!submitted ? (
          <button
            onClick={handleCheck}
            disabled={!allAnswered}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all shadow-md ${
              allAnswered
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white cursor-pointer hover:shadow-cyan-500/25'
                : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
            }`}
          >
            Comprobar Respuestas
          </button>
        ) : (
          <button
            onClick={handleRetry}
            className="px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer flex items-center gap-2"
          >
            <RotateCcw size={14} />
            Hacer de nuevo
          </button>
        )}
      </div>
    </div>
  );
};
