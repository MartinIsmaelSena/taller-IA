import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, Link2, Sparkles } from 'lucide-react';
import type { MatchingPair } from '../../types/lesson';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../common/Confetti';

interface MatchActivityProps {
  activityId: string;
  pairs: MatchingPair[];
  title?: string;
  description?: string;
}

export const MatchActivity: React.FC<MatchActivityProps> = ({
  activityId,
  pairs,
  title = 'Actividad: Relacionar Conceptos',
  description = 'Hacé clic en un concepto de la izquierda y luego en su definición correspondiente en la derecha.',
}) => {
  const { markActivityCompleted } = useProgress();
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // conceptId -> definitionId
  const [shuffledDefinitions] = useState(() => {
    return [...pairs].sort(() => Math.random() - 0.5);
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const handleConceptClick = (id: string) => {
    if (matches[id]) return; // already matched
    setSelectedConcept(id);
  };

  const handleDefinitionClick = (defId: string) => {
    if (!selectedConcept) return;

    // Check if this definition is already matched
    const alreadyMatched = Object.values(matches).includes(defId);
    if (alreadyMatched) return;

    const newMatches = { ...matches, [selectedConcept]: defId };
    setMatches(newMatches);
    setSelectedConcept(null);

    // If all matched
    if (Object.keys(newMatches).length === pairs.length) {
      // Check if all correct
      const allCorrect = pairs.every((p) => newMatches[p.id] === p.id);
      if (allCorrect) {
        setIsCompleted(true);
        markActivityCompleted(activityId);
        triggerConfetti();
      }
    }
  };

  const handleReset = () => {
    setMatches({});
    setSelectedConcept(null);
    setIsCompleted(false);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Link2 className="text-cyan-400" size={18} />
            {title}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition cursor-pointer"
        >
          <RotateCcw size={12} />
          Reiniciar
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Concepts Column */}
        <div className="space-y-2.5">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
            1. Concepto
          </span>
          {pairs.map((p) => {
            const isMatched = !!matches[p.id];
            const isCorrect = matches[p.id] === p.id;
            const isSelected = selectedConcept === p.id;

            return (
              <button
                key={p.id}
                onClick={() => handleConceptClick(p.id)}
                disabled={isMatched}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs md:text-sm font-medium flex items-center justify-between ${
                  isMatched
                    ? isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 opacity-90'
                      : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                    : isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 ring-2 ring-cyan-500/40 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900 cursor-pointer'
                }`}
              >
                <span>{p.concept}</span>
                {isMatched && (
                  <CheckCircle2 size={16} className={isCorrect ? 'text-emerald-400' : 'text-rose-400'} />
                )}
              </button>
            );
          })}
        </div>

        {/* Definitions Column */}
        <div className="space-y-2.5">
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider block mb-1">
            2. Definición
          </span>
          {shuffledDefinitions.map((d) => {
            const matchedConceptId = Object.keys(matches).find((key) => matches[key] === d.id);
            const isMatched = !!matchedConceptId;
            const isCorrect = matchedConceptId === d.id;

            return (
              <button
                key={d.id}
                onClick={() => handleDefinitionClick(d.id)}
                disabled={isMatched || !selectedConcept}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs leading-relaxed flex items-start gap-2.5 ${
                  isMatched
                    ? isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 opacity-90'
                      : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                    : selectedConcept
                    ? 'bg-slate-950/80 border-violet-500/40 text-slate-200 hover:border-violet-400 hover:bg-violet-950/30 cursor-pointer shadow-sm'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 opacity-70 cursor-not-allowed'
                }`}
              >
                <span className="flex-1">{d.definition}</span>
                {isMatched && (
                  <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {isCompleted && (
        <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} />
            <span>¡Excelente! Relacionaste todos los conceptos con su definición correspondiente.</span>
          </div>
        </div>
      )}
    </div>
  );
};
