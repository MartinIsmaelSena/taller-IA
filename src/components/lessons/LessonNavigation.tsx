import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

interface LessonNavigationProps {
  currentLessonId: number;
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({ currentLessonId }) => {
  const { setActiveView, markLessonCompleted, isLessonCompleted } = useProgress();

  const isCompleted = isLessonCompleted(currentLessonId);

  const handleMarkDone = () => {
    markLessonCompleted(currentLessonId);
    triggerConfetti();
  };

  const handlePrev = () => {
    if (currentLessonId > 1) {
      setActiveView('lesson', currentLessonId - 1);
    } else {
      setActiveView('home');
    }
  };

  const handleNext = () => {
    if (currentLessonId < 5) {
      setActiveView('lesson', currentLessonId + 1);
    } else {
      setActiveView('project');
    }
  };

  return (
    <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Previous button */}
      <button
        onClick={handlePrev}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition text-xs font-semibold cursor-pointer"
      >
        <ChevronLeft size={16} />
        {currentLessonId > 1 ? `Clase ${currentLessonId - 1}` : 'Volver al Inicio'}
      </button>

      {/* Complete lesson button */}
      <button
        onClick={handleMarkDone}
        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-md ${
          isCompleted
            ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
            : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950'
        }`}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>¡Clase Completada!</span>
          </>
        ) : (
          <>
            <Sparkles size={16} />
            <span>Marcar Clase como Completada</span>
          </>
        )}
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition text-xs cursor-pointer shadow-md"
      >
        <span>
          {currentLessonId < 5 ? `Avanzar a Clase ${currentLessonId + 1}` : 'Ir al Proyecto Integrador'}
        </span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
