import React from 'react';
import { Award, BookCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export const ProgressBar: React.FC = () => {
  const { progress, completionPercentage, totalActivitiesCompleted } = useProgress();

  const completedClassesCount = progress.completedLessons.length;
  const isFinished = completionPercentage >= 100;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Main Progress Indicator */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Sparkles size={16} />
              </span>
              <span className="text-sm font-bold text-white">Progreso General del Curso</span>
            </div>
            <span className="text-sm font-mono font-extrabold text-cyan-400">
              {completionPercentage}%
            </span>
          </div>

          {/* Progress track */}
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 h-full rounded-full transition-all duration-700 shadow-sm shadow-cyan-500/50"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 shrink-0">
          <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
            <BookCheck size={18} className="text-cyan-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">{completedClassesCount} de 5</div>
              <div className="text-[10px] text-slate-400">Clases listas</div>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">{totalActivitiesCompleted}</div>
              <div className="text-[10px] text-slate-400">Actividades</div>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
            <Award size={18} className="text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">
                {isFinished ? '¡Graduado!' : `${5 - completedClassesCount} restantes`}
              </div>
              <div className="text-[10px] text-slate-400">Estado general</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
