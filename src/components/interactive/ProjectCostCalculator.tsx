import React, { useState } from 'react';
import { Calculator, School, ShoppingBag, Newspaper, User, Sparkles } from 'lucide-react';
import { CLASE5_PROJECT_SCENARIOS } from '../../data/activitiesData';
import { useProgress } from '../../context/ProgressContext';

export const ProjectCostCalculator: React.FC<{ activityId: string }> = ({ activityId }) => {
  const { markActivityCompleted } = useProgress();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(CLASE5_PROJECT_SCENARIOS[0].id);
  const [exploredScenarios, setExploredScenarios] = useState<Set<string>>(new Set([CLASE5_PROJECT_SCENARIOS[0].id]));

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    setExploredScenarios((prev) => {
      const next = new Set(prev).add(id);
      if (next.size >= 2) {
        markActivityCompleted(activityId);
      }
      return next;
    });
  };

  const selectedScenario = CLASE5_PROJECT_SCENARIOS.find((s) => s.id === selectedScenarioId) || CLASE5_PROJECT_SCENARIOS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'School':
        return <School size={18} />;
      case 'ShoppingBag':
        return <ShoppingBag size={18} />;
      case 'Newspaper':
        return <Newspaper size={18} />;
      default:
        return <User size={18} />;
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 md:p-6 my-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Calculator size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Actividad 2: ¿Qué Necesita y Cuánto Cuesta esta Página?</h4>
            <p className="text-xs text-slate-400">Seleccioná distintos tipos de proyecto para comparar requisitos técnicos y costos reales.</p>
          </div>
        </div>

        <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          Analizados: {exploredScenarios.size} de {CLASE5_PROJECT_SCENARIOS.length}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenarios List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <span className="text-xs font-semibold text-slate-300 block mb-1">
            Elegí un Caso de Proyecto:
          </span>
          {CLASE5_PROJECT_SCENARIOS.map((item) => {
            const isSelected = item.id === selectedScenarioId;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectScenario(item.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 bg-amber-950/30 text-white ring-1 ring-amber-400'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <h6 className="text-xs md:text-sm font-bold">{item.name}</h6>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{item.description}</p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-amber-400 shrink-0 ml-2">
                  {item.approximateCost.includes('$0') ? 'Gratis' : 'Con Costo'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Diagnóstico de Infraestructura
              </span>
              <h5 className="text-base font-bold text-white mt-0.5">{selectedScenario.name}</h5>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Costo estimado:</span>
              <span className="text-sm font-bold text-amber-300 font-mono">
                {selectedScenario.approximateCost}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-200 block">🏠 Hosting Requerido:</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">{selectedScenario.hostingNeeded}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-200 block">🏷️ Nombre de Dominio:</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">{selectedScenario.domainNeeded}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-200 block">🔒 Certificado SSL / HTTPS:</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">{selectedScenario.sslNeeded}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-200 block">🗄️ Base de Datos:</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">{selectedScenario.databaseNeeded}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs flex items-center justify-between">
            <div>
              <span className="font-semibold text-amber-200">Plataforma sugerida:</span>
              <p className="text-amber-300 font-bold">{selectedScenario.recommendedPlatform}</p>
            </div>
            <Sparkles size={16} className="text-amber-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
